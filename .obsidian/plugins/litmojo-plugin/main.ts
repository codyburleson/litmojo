import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, TFile, TFolder } from 'obsidian';
import { CollectionManagerView, VIEW_TYPE_COLLECTION_MANAGER } from "./collection-manager-view";

import { CompileSettingsModal } from './compile-settings-modal'

// You can use the getAPI() function to obtain the Dataview Plugin API; 
// this returns a DataviewApi object which provides various utilities, 
// including rendering dataviews, checking dataview's version, hooking 
// into the dataview event life cycle, and querying dataview metadata
// For full API definitions available, check:
// [index.ts](https://github.com/blacksmithgu/obsidian-dataview/blob/master/src/index.ts)
// or the plugin API definition:
// [plugin-api.ts](https://github.com/blacksmithgu/obsidian-dataview/blob/master/src/api/plugin-api.ts)
import { getAPI } from "obsidian-dataview";
// You can access various type utilities which let you check the types of objects and compare them via Values:
// import { getAPI, Values} from "obsidian-dataview";
const dv = getAPI();

// Remember to rename these classes and interfaces!

interface LitMojoPluginSettings {
    mySetting: string;
}

const DEFAULT_SETTINGS: LitMojoPluginSettings = {
    mySetting: 'default'
}

export default class LitMojoPlugin extends Plugin {

    settings: LitMojoPluginSettings;

    showCompileSettingsModal() {
        new CompileSettingsModal(this.app).open();
    }

    async onload() {
        await this.loadSettings();

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
                menu.addItem((item) => {
                    item
                        .setTitle("Compile")
                        .setIcon("wand")
                        .onClick(async () => {

                            console.log('-- LitMojo.compile > file.path: %s',file.path);

                            // cnew Notice(file.path);

                            // Determine file or folder
                            
                            /*
                            const folderOrFile = this.app.vault.getAbstractFileByPath(file.path);

                            if (folderOrFile instanceof TFile) {
                                console.log("It's a file!");
                            } else if (folderOrFile instanceof TFolder) {
                                console.log("It's a folder!");
                            }
                            */
                            
                            //console.log("Test String: " + );

                            //let pages = dv.pages('\"' + file.path + '\"');

                            //console.log('-- LitMojo.compile > pages: %o',pages);

                            dv.pages('\"' + file.path + '\"')
                                .sort(p => p.litmojo?.order, 'asc')
                                .map(t => {
                                    console.log('-- file.name: %s', t.file.name)
                                })

                            this.showCompileSettingsModal();

                            //for (let i = 0; i < pages.length; i++) {

                                //let page = pages[i];

                                //console.log('-- LitMojo.compile > dv page: %s', page.title);

                                /*
                                if (page.litmojo) {
                                    if (page.title) {
                                        dv.el("strong", dv.fileLink(page.title));
                                    } else {
                                        dv.el("strong", dv.fileLink(page.file.name));
                                    }
                                    if (page.litmojo?.synopsis) {
                                        dv.paragraph(page.litmojo.synopsis);
                                    }
                                    // Use this to look at the page object in full...
                                    // dv.paragraph(page)
                                    dv.paragraph("---")
                                }
                                */

                            //}

                        });
                });
            })
        );

        /**
         * Registers the Publish menu, which should really only show up when there is a 
         * folder page with a litmojo publish config in the YAML frontmatter.
         */
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

        this.registerView(
            VIEW_TYPE_COLLECTION_MANAGER,
            (leaf) => new CollectionManagerView(leaf)
        );

        this.addRibbonIcon("dice", "Activate Colelction Manager view", () => {
            this.activateCollectionManagerView();
        });

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
        const statusBarItemEl = this.addStatusBarItem();
        statusBarItemEl.setText('Status Bar Text');


        // This adds a simple command that can be triggered anywhere
        this.addCommand({
            id: 'open-sample-modal-simple',
            name: 'Open sample modal (simple)',
            callback: () => {
                //new CompileSettingsModal(this.app).open();
                this.showCompileSettingsModal();
            }
        });

        // This adds an editor command that can perform some operation on the current editor instance
        this.addCommand({
            id: 'sample-editor-command',
            name: 'Sample editor command',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                console.log(editor.getSelection());
                editor.replaceSelection('Sample Editor Command');
            }
        });
        // This adds a complex command that can check whether the current state of the app allows execution of the command
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
        this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
    }

    async onunload() {
        this.app.workspace.detachLeavesOfType(VIEW_TYPE_COLLECTION_MANAGER);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

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
    }
}
