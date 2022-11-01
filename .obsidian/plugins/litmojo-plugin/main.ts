import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TAbstractFile, TFile, TFolder, Vault } from 'obsidian';
//import { CollectionManagerView, VIEW_TYPE_COLLECTION_MANAGER } from "./collection-manager-view";

//import { CompileSettingsModal } from './compile-settings-modal'

// You can use the getAPI() function to obtain the Dataview Plugin API; 
// this returns a DataviewApi object which provides various utilities, 
// including rendering dataviews, checking dataview's version, hooking 
// into the dataview event life cycle, and querying dataview metadata
// For full API definitions available, check:
// [index.ts](https://github.com/blacksmithgu/obsidian-dataview/blob/master/src/index.ts)
// or the plugin API definition:
// [plugin-api.ts](https://github.com/blacksmithgu/obsidian-dataview/blob/master/src/api/plugin-api.ts)

//import { DataviewApi, getAPI } from "obsidian-dataview";

// You can access various type utilities which let you check the types of objects and compare them via Values:
// import { getAPI, Values} from "obsidian-dataview";
// const dv = getAPI();

import { unified } from 'unified';
import { remove } from 'unist-util-remove'
import { visit, SKIP } from 'unist-util-visit'

import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter'
import remarkStringify from 'remark-stringify';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify'
import rehypeDocument from 'rehype-document'
import {toHast} from 'mdast-util-to-hast';
//@ts-expect-error remark-wiki-link does not have declaration file
import remarkWikiLink from 'remark-wiki-link'



interface LitMojoPluginSettings {
    mySetting: string;
    debug: string;
}

const DEFAULT_SETTINGS: LitMojoPluginSettings = {
    mySetting: 'default',
    debug: 'false'
}

export default class LitMojoPlugin extends Plugin {

    settings: LitMojoPluginSettings;
    
    debug: boolean = false;

    compileSettings: any;

    /*
    showCompileSettingsModal() {
        new CompileSettingsModal(this.app).open();
    }
    */

    async onload() {

        await this.loadSettings();

        if(this.settings.debug === 'true') {
            this.debug = true;
        }

        // console.log('settings loaded');

        // this.dvapi = getAPI();
        // console.log('dvapi: %o', this.dvapi);

        // new Notice("Hello")

        // Dataview events that are trigerred (in case needed later)...
        /*
        this.registerEvent(
            // @ts-ignore
            this.app.metadataCache.on("dataview:index-ready", () => {
                console.log('-- LitMojoPlugin > DataView event: dataview:index-ready')
            })
        );

        this.registerEvent(
            // @ts-ignore
            this.app.metadataCache.on("dataview:metadata-change",(type, file, oldPath?) => {
                console.log('-- LitMojoPlugin > DataView event: dataview:metadata-change')
            })
        );*/

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

                                if(this.debug) {
                                    console.debug('>> LitMojo > Compile > %o', file);
                                }
                        
                                // ====================================================================================
                                // LOAD COMPILE SETTINGS FROM FOLDER NOTE
                                // ====================================================================================

                                const folderNote: TAbstractFile = this.app.vault.getAbstractFileByPath(file.path + '/' + file.name + '.md');

                                if (!this.validateAndLoadCompileSettings(folderNote)) {
                                    return;
                                }

                                if(this.debug) {
                                    console.debug('-- LitMojo > Compile > compileSettings: %o', this.compileSettings);
                                }

                                // ====================================================================================
                                // SET DEFAULTS FOR MISSING COMPILE SETTINGS
                                // ====================================================================================

                                let bulletSetting = (this.compileSettings.bullet) ? this.compileSettings.bullet : '-';                      
                                
                                let compiledContent: string = '';
                                
                                // ====================================================================================
                                // GET FILES TO COMPILE
                                // ====================================================================================
                                // From the selected manuscript folder, pick out only the 
                                // files that are actually markdown files and that have 
                                // the litmojo.compile flag set to true.

                                let filesToCompile = this.getFilesToCompile(file);

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

                                if(this.debug) {
                                    console.debug('-- LitMojo > Compile > filesToCompile: %o', filesToCompile);
                                }

                                // As we loop, we'll parse all markdown files into mdast and then concatenate the child 
                                // nodes into a single array. We'll then use that array to create a new mdast and then
                                // convert that to a markdown string, HTML string, etc.
                                let mdastManuscript:any = {};

                                // ====================================================================================
                                // FOR EACH FILE TO COMPILE...
                                // ====================================================================================
                                for (let index = 0; index < filesToCompile.length; index++) {
                                    
                                    const file = filesToCompile[index];

                                    await this.app.vault.cachedRead(file).then(async (content) => {

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

                                console.dir(mdastManuscript);

                                // ====================================================================================
                                // DELETE EXISTING COMPILED MANUSCRIPT (if it exists)
                                // ====================================================================================
                                // First, try to get the compiled manustcript file to see if it already exists
                                const previouslyCompiledFile: TAbstractFile = this.app.vault.getAbstractFileByPath(this.compileSettings.path);
                                if (previouslyCompiledFile) {
                                    // If it exists, delete it before we create a new one
                                    this.app.vault.delete(previouslyCompiledFile);
                                }

                                // ====================================================================================
                                // IF MARKDOWN, STRINGIFY MARKDOWN
                                // ====================================================================================
                                if (this.compileSettings.path.endsWith('.md')) {
                                    // CONVERT MDAST TO MARKDOWN
                                    const markdown = await unified()
                                        .use(remarkWikiLink, { aliasDivider: '|' })
                                        .use(remarkStringify, {bullet: bulletSetting})
                                        .stringify(mdastManuscript);
                                    compiledContent += markdown;
                                }

                                // ====================================================================================
                                // IF HTML STRINGIFY HTML
                                // ====================================================================================
                                if(this.compileSettings.path.endsWith('.html')) {
                                    
                                    // For title, default to file name, but allow for override in frontmatter
                                    let titleSetting = file.name;
                                    if(this.compileSettings.title) {
                                        titleSetting = this.compileSettings.title;
                                    }

                                    // CONVERT MDAST TO MARKDOWN
                                    const markdown = await unified()
                                        .use(remarkWikiLink, { aliasDivider: '|' })
                                        .use(remarkStringify, {bullet: bulletSetting})
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
                                        .use(rehypeDocument, {title: titleSetting}) // Wrap HAST in HTML document
                                        .use(rehypeStringify) // Convert HAST to HTML
                                        .process(markdown); // or .process(content);
                                        compiledContent = String(htmlFile);            
                                }

                                // ====================================================================================
                                // WRITE COMPILED MANUSCRIPT AND NOTIFY SUCCESS
                                // ====================================================================================

                                this.app.vault.create(this.compileSettings.path, compiledContent).then((newFile) => {
                                    new Notice('Manuscript compiled to: ' + newFile.path);
                                });

                                // this.showCompileSettingsModal();

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

        // this.registerView(
        //     VIEW_TYPE_COLLECTION_MANAGER,
        //     (leaf) => new CollectionManagerView(leaf)
        // );

        // this.addRibbonIcon("dice", "Activate Colelction Manager view", () => {
        //     this.activateCollectionManagerView();
        // });

        // This creates an icon in the left ribbon. When clicked, it shows a notice.
        /*
        const ribbonIconEl = this.addRibbonIcon('dice', 'Sample Plugin', (evt: MouseEvent) => {
            // Called when the user clicks the icon.
            new Notice('This is a notice!');
        });

        // Perform additional things with the ribbon
        ribbonIconEl.addClass('my-plugin-ribbon-class');
        */

        // This adds a status bar item to the bottom of the app. Does not work on mobile apps.
        //const statusBarItemEl = this.addStatusBarItem();
        //statusBarItemEl.setText('Status Bar Text');

        // This adds a simple command that can be triggered anywhere
        /*
        this.addCommand({
            id: 'open-sample-modal-simple',
            name: 'Open sample modal (simple)',
            callback: () => {
                //new CompileSettingsModal(this.app).open();
                this.showCompileSettingsModal();
            }
        });
        */

        // This adds an editor command that can perform some operation on the current editor instance
        /*
        this.addCommand({
            id: 'sample-editor-command',
            name: 'Sample editor command',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                console.log(editor.getSelection());
                editor.replaceSelection('Sample Editor Command');
            }
        });
        */
        
        // This adds a complex command that can check whether the current state of the app allows execution of the command
        /*
        this.addCommand({
            id: 'open-sample-modal-complex',
            name: 'Open sample modal (complex)',
            checkCallback: (checking: boolean) => {
                // Conditions to check
                const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (markdownView) {
                    // If checking is true, we're simply "checking" if the command can be run.
                    // If checking is false, then we want to actually perform the operation.
                    if (!checking) {
                        //new CompileSettingsModal(this.app).open();
                        this.showCompileSettingsModal();
                    }

                    // This command will only show up in Command Palette when the check function returns true
                    return true;
                }
            }
        });
        */

        // This adds a settings tab so the user can configure various aspects of the plugin
        this.addSettingTab(new SampleSettingTab(this.app, this));

        // If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
        // Using this function will automatically remove the event listener when this plugin is disabled.
        /*
        this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
            console.log('click', evt);
        });
        */

        // When registering intervals, this function will automatically clear the interval when the plugin is disabled.
        // this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
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

    /*
    async activateCollectionManagerView() {
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_COLLECTION_MANAGER);

        await this.app.workspace.getRightLeaf(false).setViewState({
            type: VIEW_TYPE_COLLECTION_MANAGER,
            active: true,
        });

        this.app.workspace.revealLeaf(
            this.app.workspace.getLeavesOfType(VIEW_TYPE_COLLECTION_MANAGER)[0]
        );
    }
    */

    getFilesToCompile(folder: TFolder): TFile[] {
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

    validateAndLoadCompileSettings(folderNote: TAbstractFile): boolean {
        if (!folderNote) {
            new Notice('Compile aborted. No folder note found.');
            return false;
        } else {
            // Check if folder note has litmojo.path in frontmatter
            // If so, set it as the compilePath
            // If not, abort compile with prompt to user;
            if (folderNote instanceof TFile) {
                const folderNoteMeta = this.app.metadataCache.getFileCache(folderNote);
                if (folderNoteMeta.frontmatter?.litmojo?.path) {
                    this.compileSettings = folderNoteMeta.frontmatter.litmojo;                    
                    return true;
                } else {
                    new Notice('Compile aborted: litmojo.path not found in folder note frontmatter.');
                    return false;
                }
            }
        }
    }

}


class SampleSettingTab extends PluginSettingTab {
    plugin: LitMojoPlugin;

    constructor(app: App, plugin: LitMojoPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: 'Settings for my awesome plugin.' });

        new Setting(containerEl)
            .setName('Setting #1')
            .setDesc('It\'s a secret')
            .addText(text => text
                .setPlaceholder('Enter your secret')
                .setValue(this.plugin.settings.mySetting)
                .onChange(async (value) => {
                    console.log('Secret: ' + value);
                    this.plugin.settings.mySetting = value;
                    await this.plugin.saveSettings();
                }));
        
        new Setting(containerEl)
            .setName('Debug')
            .setDesc('true | false to log debug messages')
            .addText(text => text
                .setPlaceholder('false')
                .setValue(this.plugin.settings.debug)
                .onChange(async (value) => {
                    console.log('Debug: ' + value);
                    this.plugin.settings.debug = value;
                    if(this.plugin.settings.debug === 'true') {
                        this.plugin.debug = true;
                    } else {
                        this.plugin.debug = false;
                    }
                    await this.plugin.saveSettings();
                }));
    }
}
