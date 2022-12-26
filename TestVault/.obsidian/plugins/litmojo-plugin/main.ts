import { App, Editor, MarkdownView, Modal, Notice, Plugin, TAbstractFile, TFile, TFolder, Vault } from 'obsidian';

import {
	SampleSettingTab
} from 'settings';

import { CompileSettingsModal } from './compile-settings-modal'
import { buildMDASTManuscript, CompileSettings, getFilesToCompile, validateAndLoadCompileSettings } from './utils'

// You can use the getAPI() function to obtain the Dataview Plugin API; 
// this returns a DataviewApi object which provides various utilities, 
// including rendering dataviews, checking dataview's version, hooking 
// into the dataview event life cycle, and querying dataview metadata
// For full API definitions available, check:
// [index.ts](https://github.com/blacksmithgu/obsidian-dataview/blob/master/src/index.ts)
// or the plugin API definition:
// [plugin-api.ts](https://github.com/blacksmithgu/obsidian-dataview/blob/master/src/api/plugin-api.ts)

import { unified } from 'unified';
import { remove } from 'unist-util-remove'

import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter'

import { Options } from 'remark-stringify';
import remarkStringify from 'remark-stringify';

import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify'
import rehypeDocument from 'rehype-document'
import remarkWikiLink from 'remark-wiki-link'

interface LitMojoPluginSettings {
    debug: string;
}

const DEFAULT_SETTINGS: LitMojoPluginSettings = {
    debug: 'false'
}

export default class LitMojoPlugin extends Plugin {

    settings: LitMojoPluginSettings;

    debug: boolean = false;

    compileSettings: CompileSettings;

    async onload(): Promise<void> {

        await this.loadSettings();

        if (this.settings.debug === 'true') {
            this.debug = true;
            console.log('settings loaded');
        }

        /**
         * Registers the Compile menu, which should really only show up when there is a 
         * folder page with a litmojo compile config in the YAML frontmatter.
         */
        this.registerEvent(

            this.app.workspace.on("file-menu", (menu, file) => {

                if (file instanceof TFile) {

                    /*
                    menu.addItem((item) => {
                        item
                            .setTitle("Publish")
                            .setIcon("paper-plane")
                            .onClick(async () => {
                                new Notice(file.path);
                            });
                    });
                    */

                } else if (file instanceof TFolder) {

                    menu.addItem((item) => {
                        item
                            .setTitle("Compile")
                            .setIcon("wand")
                            .onClick(async () => {

                                if (this.debug) {
                                    console.debug('>> LitMojo > Compile > %o', file);
                                }

                                // ====================================================================================
                                // LOAD COMPILE SETTINGS FROM FOLDER NOTE
                                // ====================================================================================

                                const folderNote: TAbstractFile = this.app.vault.getAbstractFileByPath(file.path + '/' + file.name + '.md');

                                this.compileSettings = validateAndLoadCompileSettings(folderNote);

                                if (!this.compileSettings) {
                                    return;
                                }

                                if (this.debug) {
                                    console.debug('-- LitMojo > Compile > compileSettings: %o', this.compileSettings);
                                }

                                // ====================================================================================
                                // SET DEFAULTS FOR MISSING COMPILE SETTINGS
                                // ====================================================================================

                                //let bulletSetting = (this.compileSettings.bullet) ? this.compileSettings.bullet : '-';                      

                                let compiledContent: string = '';

                                new CompileSettingsModal(this.app, file, this.compileSettings, async (result) => {

                                    // Uncomment when using compile settings modal...
                                    // let filesToCompile = result;
                                    // ...and comment out this line:
                                    let filesToCompile = getFilesToCompile(file);

                                    if (this.debug) {
                                        console.debug('-- LitMojo > Compile > filesToCompile: %o', filesToCompile);
                                    }

                                    let mdastManuscript: any = await buildMDASTManuscript(this.app, filesToCompile, this.compileSettings);
                                    
                                    if (this.debug) {
                                        console.debug('-- LitMojo > Compile > mdastManuscript: %o', mdastManuscript);
                                    }

                                    // ====================================================================================
                                    // DELETE EXISTING COMPILED MANUSCRIPT (if it exists)
                                    // ====================================================================================
                                    // First, try to get the compiled manustcript file to see if it already exists

                                    const previouslyCompiledFile: TAbstractFile = this.app.vault.getAbstractFileByPath(this.compileSettings.path);
                                    if (previouslyCompiledFile) {
                                        // If it exists, delete it before we create a new one
                                        this.app.vault.delete(previouslyCompiledFile);
                                    }

                                    const remarkStringifyOptions: Options = {
                                        bullet: this.compileSettings.bullet ? this.compileSettings.bullet : '-',
                                    };

                                    // ====================================================================================
                                    // IF MARKDOWN, STRINGIFY MARKDOWN
                                    // ====================================================================================
                                    if (this.compileSettings.path.endsWith('.md')) {
                                        // CONVERT MDAST TO MARKDOWN
                                        const markdown = await unified()
                                            .use(remarkWikiLink, { aliasDivider: '|' })
                                            .use(remarkStringify, remarkStringifyOptions)
                                            .stringify(mdastManuscript);
                                        compiledContent += markdown;
                                    }

                                    // ====================================================================================
                                    // IF HTML STRINGIFY HTML
                                    // ====================================================================================

                                    if (this.compileSettings.path.endsWith('.html')) {

                                        // CONVERT MDAST TO MARKDOWN
                                        const markdown = await unified()
                                            .use(remarkWikiLink, { aliasDivider: '|' })
                                            .use(remarkStringify, remarkStringifyOptions)
                                            .stringify(mdastManuscript);

                                        // ABOVE IT REDUNTANT TO ABOVE ABOVE
                                        // Also, do I need to concvert MDAST to String and then Parse it yet again?
                                        // Certainly there's a way to just use the MDAST I've already got.
                                        const htmlFile = await unified()
                                            .use(remarkParse) // Parse markdown to MDAST
                                            // .use(remarkWikiLink, { 
                                            //     aliasDivider: '|', 
                                            //     hrefTemplate: (permalink:string) => `${permalink}`,
                                            //     pageResolver: (pageName:string) => [pageName.replace(/ /g, '-').toLowerCase()]
                                            //  })
                                            .use(remarkFrontmatter, ['yaml'])
                                            .use(() => (tree) => remove(tree, 'yaml')) // remove frontmatter // is this needed?
                                            .use(remarkRehype) // Convert MDAST to HAST
                                            .use(rehypeDocument, { title: this.compileSettings.title }) // Wrap HAST in HTML document
                                            .use(rehypeStringify) // Convert HAST to HTML
                                            .process(markdown); // or .process(content);
                                        compiledContent = String(htmlFile);
                                    }

                                    // ====================================================================================
                                    // WRITE COMPILED MANUSCRIPT AND NOTIFY SUCCESS
                                    // ====================================================================================

                                    let compileFolder = this.compileSettings.path.substring(0, this.compileSettings.path.lastIndexOf('/'));
                                    if(this.debug)  {  
                                        console.debug('-- LitMojo > Compile > compileFolder: %o', compileFolder);
                                    }

                                    this.fileExists( compileFolder ).then((exists) => {

                                        if (exists) {
                                            this.app.vault.create(this.compileSettings.path, compiledContent).then((newFile) => {
                                                new Notice('Manuscript compiled to: ' + newFile.path);
                                            });
                                        } else {
                                            new Notice('Compile folder does not exist: ' + compileFolder,7000);
                                        }

                                    });


                                }).open();


                            });
                    });

                }

            })
        );

        /**
         * Registers the Publish menu, which should really only show up when there is a 
         * folder page with a litmojo publish config in the YAML frontmatter.
         */
        /*
         this.registerEvent(
            this.app.workspace.on("file-menu", (menu, file) => {
                menu.addItem((item) => {
                    item
                        .setTitle("Publish")
                        .setIcon("paper-plane")
                        .onClick(async () => {
                            new Notice(file.path);
                        });
                });
            })
        );
        */

        // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
        //const statusBarItemEl = this.addStatusBarItem();
        //statusBarItemEl.setText('Status Bar Text');

        // This adds a settings tab so the user can configure various aspects of the plugin
        this.addSettingTab(new SampleSettingTab(this.app, this));

    }

    async onunload() {
        // this.app.workspace.detachLeavesOfType(VIEW_TYPE_COLLECTION_MANAGER);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async fileExists(filePath: string): Promise<boolean> {
        return await this.app.vault.adapter.exists(filePath);
    }

}
