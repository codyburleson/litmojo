import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TAbstractFile, TFile, TFolder, Vault } from 'obsidian';

import { unified } from 'unified';
import { remove } from 'unist-util-remove'
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter'
//@ts-expect-error remark-wiki-link does not have declaration file
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
}

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

                if(!compileSettings.bullet) {
                    compileSettings.bullet = '-';
                }

                let title = folderNote.basename;
                if(!compileSettings.title) {
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


export async function buildMDASTManuscript(app:App, filesToCompile: TFile[]): Promise<any> {

    // As we loop, we'll parse all markdown files into mdast and then concatenate the child 
    // nodes into a single array. We'll then use that array to create a new mdast
    let mdastManuscript:any = {};

    // ====================================================================================
    // FOR EACH FILE TO COMPILE...
    // ====================================================================================
    
    for (let index = 0; index < filesToCompile.length; index++) {
        
        const file = filesToCompile[index];

        await this.app.vault.cachedRead(file).then(async (content:string) => {

            // ====================================================================================
            // PARSE MARKDOWN DOCUMENT INTO ABSTRACT SYNTAX TREE (MDAST)
            // ====================================================================================

            const mdast = await unified()
                .use(remarkParse) // remark-parse
                .use(remarkFrontmatter, ['yaml'])
                .use(remarkWikiLink, { aliasDivider: '|' })
                .parse(content);

            // ====================================================================================
            // REMOVE FRONTMATTER FROM MDAST
            // ====================================================================================

            remove(mdast, 'yaml')

            // ====================================================================================
            // CONCATENATE MDAST TREES OR SET INITIAL TREE
            // ====================================================================================
            if(mdastManuscript.children) {
                mdastManuscript.children = mdastManuscript.children.concat(mdast.children);
            } else {
                mdastManuscript = mdast;
            }
        
        });

    } // END FOR EACH FILE TO COMPILE
    
                            
    return mdastManuscript;
}
