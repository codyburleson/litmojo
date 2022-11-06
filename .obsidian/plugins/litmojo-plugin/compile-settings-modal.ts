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
      })).setName("Path").setDesc("The path to the manuscript output file, including the complete manuscript output file name; for example: 'Compiled Manuscripts/Frankenstein.md'. Supported extensions are .md and .html. Folders specified in the path must already exist in the vault.");

    new Setting(contentEl).addText((text) =>
      text.setValue(this.compileSettings.title).onChange((value) => {
        console.log(value);
      })).setName("Title").setDesc("Specifies, for example, HTML document title when compiling to HTML.");

    new Setting(contentEl).addDropdown((dropdown) =>
      dropdown.addOption("-", "-").addOption("*", "*").addOption("+", "+").setValue(this.compileSettings.bullet).onChange((value) => {
        console.log(value);
      })).setName("Bullet").setDesc("Specifies the bullet character to use for unordered lists when compiling to Markdown.");

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

      const dropTarget = column1.createEl("div");
      dropTarget.id = `dropTarget-${index}`;
      dropTarget.addClass("drop-target");
      dropTarget.addEventListener('dragover', this.dragOver);
      dropTarget.addEventListener('dragleave', this.dragLeave);
      dropTarget.addEventListener('drop', this.drop);

      // DRAG AND DROP
      // See: https://www.javascripttutorial.net/web-apis/javascript-drag-and-drop/

      const fileEl = column1.createEl("div");
      fileEl.id = `file-${index}`;
      fileEl.addClass("file");
      // THIS SHOULD BE THE TITLE IN THE FILE'S META FRONTMATTER IF IT EXISTS...
      fileEl.setAttr("title", file.basename);
      fileEl.setAttr("draggable", "true");
      fileEl.setText(file.basename);
      fileEl.addEventListener('dragstart', this.dragStart);
      //fileEl.addEventListener('drop', this.drop);

    });

    // One final drop target
    
    const dropTargetLast = column1.createEl("div");
    dropTargetLast.id = `dropTarget-${this.filesToCompile.length + 1}`;
    dropTargetLast.addClass("drop-target");
    dropTargetLast.addEventListener('dragover', this.dragOver);
    dropTargetLast.addEventListener('dragleave', this.dragLeave);
    dropTargetLast.addEventListener('drop', this.drop);
    
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

  dragStart(e: DragEvent) {
    //@ts-ignore
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
      //@ts-ignore
      e.target.classList.add('hide');
    }, 0);
  }

  dragOver(e: DragEvent) {
    e.preventDefault();
    //@ts-ignore
    e.target.classList.add('drag-over');
  }
  dragLeave(e: DragEvent) {
    //@ts-ignore
    e.target.classList.remove('drag-over');
  }
  drop(e: DragEvent) {
    console.log(e);
    //@ts-ignore
    e.target.classList.remove('drag-over');

    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);

    // add it to the drop target
    //@ts-ignore
    e.target.appendChild(draggable);

    // display the draggable element
    draggable.classList.remove('hide');
  }

}
