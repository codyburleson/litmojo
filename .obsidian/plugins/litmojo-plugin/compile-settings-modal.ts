import { App, Modal, Setting, TFile, TFolder } from "obsidian";
import { CompileSettings, getFilesToCompile, validateAndLoadCompileSettings } from './utils'

export class CompileSettingsModal extends Modal {

  manuscriptFolder: TFolder;
  filesToCompile: TFile[] = [];
  
  compileSettings: CompileSettings;
  onCompile: (filesToCompile: TFile[]) => void;

  constructor(app: App, folder: TFolder, compileSettings: CompileSettings, onCompile: (filesToCompile: TFile[]) => void) {
    super(app);
    this.manuscriptFolder = folder;
    this.compileSettings = compileSettings;
    this.onCompile = onCompile;
  }

  onOpen() {

    // ====================================================================================
    // GET FILES TO COMPILE
    // ====================================================================================
    // From the selected manuscript folder, pick out only the 
    // files that are actually markdown files and that have 
    // the litmojo.compile flag set to true.

    this.filesToCompile = getFilesToCompile(this.manuscriptFolder);

    // ====================================================================================
    // SORT MANUSCRIPT PAGES
    // ====================================================================================
    this.filesToCompile.sort((a, b) => {
      const cacheA = this.app.metadataCache.getFileCache(a);
      const cacheB = this.app.metadataCache.getFileCache(b);
      const orderA = cacheA?.frontmatter?.litmojo?.order;
      const orderB = cacheB?.frontmatter?.litmojo?.order;
      return orderA - orderB;
    });

    //console.dir(this.filesToCompile);
    // if(this.debug) {
    //   console.debug('-- LitMojo > Compile > filesToCompile: %o', filesToCompile);
    // }

    let { contentEl } = this;
    contentEl.id = 'compile-settings-modal';

    const titleEl = contentEl.createEl("h1");
    titleEl.setText("LitMojo Compile");

    const settingsSubtitleEl = contentEl.createEl("h2");
    settingsSubtitleEl.setText("Manuscript Settings");

    new Setting(contentEl).addText((text) => 
      text.setValue(this.compileSettings.path).onChange((value) => {
        console.log(value);
      })).setName("Path");

    new Setting(contentEl).addText((text) => 
      text.setValue(this.compileSettings.title).onChange((value) => {
        console.log(value);
      })).setName("Title");

    new Setting(contentEl).addDropdown((dropdown) =>
      dropdown.addOption("-", "-").addOption("*", "*").addOption("+", "+").setValue(this.compileSettings.bullet).onChange((value) => {
        console.log(value);
      })).setName("Bullet");


    const pagesSubtitleEl = contentEl.createEl("h2");
    pagesSubtitleEl.setText("Manuscript Pages");

    const pagesTipEl = contentEl.createEl("p");
    pagesTipEl.setText("Select a page to modify individual page properties. Drag and drop to reorder pages.");

    const contentPanel = contentEl.createEl("div");
    contentPanel.id = "contentPanel";

    const column1 = contentPanel.createEl("div");
    //column1.id = "column1";
    column1.addClass("flex-left");

    const column2 = contentPanel.createEl("div");
    //column2.id = "column2";
    column2.setText('COLUMN 2')
    column2.addClass("flex-right");

    this.filesToCompile.forEach((file, index) => {
      // Add file to left panel

      const fileEl = column1.createEl("div");
      fileEl.id = `file-${index}`;
      // THIS SHOULD BE THE TITLE IN THE FILE'S META FRONTMATTER IF IT EXISTS...
      fileEl.setAttr("title", file.basename);
      fileEl.setText(file.basename);
    });

    new Setting(contentEl)
      .addButton((btn) =>
        btn
          .setButtonText("Cancel")
          .onClick(() => {
            this.close();
          }))
      .addButton((btn) =>
        btn
          .setButtonText("Compile")
          .setCta()
          .onClick(() => {
            this.close();
            this.onCompile(this.filesToCompile);
          }));

  }

  onClose() {
    let { contentEl } = this;
    contentEl.empty();
  }

}
