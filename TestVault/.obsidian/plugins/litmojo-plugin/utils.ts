import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TAbstractFile, TFile, TFolder, Vault } from 'obsidian';

import { unified } from 'unified';
import { remove } from 'unist-util-remove'
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter'
import remarkWikiLink from 'remark-wiki-link'

/*
export type Options = {
    bullet?: "-" | "*" | "+" | undefined;
    bulletOther?: "-" | "*" | "+" | undefined;
    bulletOrdered?: "." | ")" | undefined;
    bulletOrderedOther?: "." | ")" | undefined;
    closeAtx?: boolean | undefined;
    emphasis?: "*" | "_" | undefined;
    fence?: "~" | "`" | undefined;
    fences?: boolean | undefined;
    incrementListMarker?: boolean | undefined;
    listItemIndent?: "tab" | "one" | "mixed" | undefined;
    quote?: "\"" | "'" | undefined;
    resourceLink?: boolean | undefined;
    rule?: "-" | "*" | "_" | undefined;
    ruleRepetition?: number | undefined;
    ruleSpaces?: boolean | undefined;
    setext?: boolean | undefined;
    strong?: "*" | "_" | undefined;
    tightDefinitions?: boolean | undefined;
    extensions?: Options[] | undefined;
    handlers?: Handlers | undefined;
    join?: Join[] | undefined;
    unsafe?: Unsafe[] | undefined;
};
*/

export interface CompileSettings {
    path: string,
    bullet?: "-" | "*" | "+" | undefined,
    title: string,
    exclude?: { headings?: string[];}
}

/**
 * Gets all manuscript files from a folder and sorts them by litmojo.order.
 * @param folder the folder to get files from
 * @returns 
 */
export function getFiles(folder: TFolder): TFile[] {

	const folderNoteFilePath = folder.path + "/" + folder.name + ".md"

    let files: TFile[] = [];
    Vault.recurseChildren(folder, (childFile) => {
        if (childFile instanceof TFile) {
            if(childFile.extension === 'md' && childFile.path !== folderNoteFilePath) {
            //const childFileMeta = this.app.metadataCache.getFileCache(childFile);
            //if (childFileMeta.frontmatter?.litmojo?.compile) {
                files.push(childFile);
            //}
            }
        }
    });

    // ====================================================================================
    // SORT MANUSCRIPT PAGES
    // ====================================================================================
    files.sort((a, b) => {
        const cacheA = this.app.metadataCache.getFileCache(a);
        const cacheB = this.app.metadataCache.getFileCache(b);
        const orderA = cacheA?.frontmatter?.litmojo?.order;
        const orderB = cacheB?.frontmatter?.litmojo?.order;
        return orderA - orderB;
    });

    return files;
}

// DEPRECATED
export function getFilesToCompile(folder: TFolder): TFile[] {
    let filesToCompile: TFile[] = [];
    Vault.recurseChildren(folder, (childFile) => {
        ;
        if (childFile instanceof TFile) {
            // if(childFile.extension === 'md') {
            const childFileMeta = this.app.metadataCache.getFileCache(childFile);
            if (childFileMeta.frontmatter?.litmojo?.compile) {
                filesToCompile.push(childFile);
            }
            //}
        }
    });

    // ====================================================================================
    // SORT MANUSCRIPT PAGES
    // ====================================================================================
    filesToCompile.sort((a, b) => {
        const cacheA = this.app.metadataCache.getFileCache(a);
        const cacheB = this.app.metadataCache.getFileCache(b);
        const orderA = cacheA?.frontmatter?.litmojo?.order;
        const orderB = cacheB?.frontmatter?.litmojo?.order;
        return orderA - orderB;
    });

    return filesToCompile;
}

export function validateAndLoadCompileSettings(folderNote: TAbstractFile): CompileSettings | null {
    if (!folderNote) {
        new Notice('Compile aborted. No folder note found.');
        return null;
    } else {
        // Check if folder note has litmojo.path in frontmatter
        // If so, set it as the compilePath
        // If not, abort compile with prompt to user;
        if (folderNote instanceof TFile) {
            const folderNoteMeta = this.app.metadataCache.getFileCache(folderNote);
            if (folderNoteMeta.frontmatter?.litmojo?.path) {

                let compileSettings = folderNoteMeta.frontmatter.litmojo;

                // SET DEFAULTS -----------------------------------------------------------------------

                if (!compileSettings.bullet) {
                    compileSettings.bullet = '-';
                }

                let title = folderNote.basename;
                if (!compileSettings.title) {
                    compileSettings.title = title;
                }

                // ------------------------------------------------------------------------------------

                return compileSettings;

            } else {
                new Notice('Compile aborted: litmojo.path not found in folder note frontmatter.');
                return null;
            }
        }
    }
}

export async function buildMDASTManuscript(app: App, filesToCompile: TFile[], compileSettings: CompileSettings): Promise<any> {

    // As we loop, we'll parse all markdown files into mdast and then concatenate the child 
    // nodes into a single array. We'll then use that array to create a new mdast
    let mdastManuscript: any = {};

    // ====================================================================================
    // FOR EACH FILE TO COMPILE...
    // ====================================================================================

    for (let index = 0; index < filesToCompile.length; index++) {

        const file = filesToCompile[index];

        await this.app.vault.cachedRead(file).then(async (content: string) => {

            // ====================================================================================
            // PARSE MARKDOWN DOCUMENT INTO ABSTRACT SYNTAX TREE (MDAST)
            // ====================================================================================

            let mdast = await unified()
                .use(remarkParse) // remark-parse
                .use(remarkFrontmatter, ['yaml'])
                .use(remarkWikiLink, { aliasDivider: '|' })
                .parse(content);

            // ====================================================================================
            // If exclude is defined, remove sections from mdast that match the exclude criteria
            // ====================================================================================

            // if (compileSettings.exclude !== undefined) {
            //     console.log('ALL GOOD!')
            // }
            
            // If compileSettings.exclude.headings is defined, remove those headings from the mdast
            
            if (compileSettings.exclude?.headings) {

                let culling = false;
                let cullingDepth = -1;
                mdast = remove(mdast, (node:any) => {

                    if(node.type === 'heading') {

                        if(! culling) {
                            // If we reach an exclude node, set culling to true
                            // and set the cullingDepth to the current node depth
                            // and return true to remove the node
                            if(compileSettings.exclude.headings.includes(node.children[0].value)) {
                                cullingDepth = node.depth;
                                culling = true;
                                return true;
                            }
                        }

                        if(culling && node.depth > cullingDepth) {
                            return true;
                        } else {
                            if(compileSettings.exclude.headings.includes(node.children[0].value)) {
                                cullingDepth = node.depth;
                                culling = true;
                                return true;
                            } else {
                                culling = false;
                                cullingDepth = -1;
                                return false;
                            }
                        }
                    } else {
                        if(culling) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                });
                
            }
            
            // ====================================================================================

            // UNCOMMENT TO LOG MDAST FOR EACH FILE BEFORE IT IS CONCATENATED TO THE MANUSCRIPT 
            // MDAST

            //console.log(`utils.ts: mdast for ${file.name}`, mdast);

            // ====================================================================================
            // REMOVE FRONTMATTER FROM MDAST
            // ====================================================================================

            remove(mdast, 'yaml')

            // For some reason, this plugin (above) is not removing the frontmatter from the mdast if there
            // is no other content except frontmatter. So, we'll check for just stand-alone yaml and
            // remove it if it exists.

            if (mdast.type === 'root' && mdast.children.length === 1 && mdast.children[0].type === 'yaml') {
                mdast.children = [];
            }

            // ====================================================================================
            // CONCATENATE MDAST TREES OR SET INITIAL TREE
            // ====================================================================================
            if (mdastManuscript.children) {
                mdastManuscript.children = mdastManuscript.children.concat(mdast.children);
            } else {
                mdastManuscript = mdast;
            }

        });

    } // END FOR EACH FILE TO COMPILE

    return mdastManuscript;
}
