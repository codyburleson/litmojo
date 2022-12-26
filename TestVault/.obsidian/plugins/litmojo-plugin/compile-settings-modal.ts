import { App, Modal, Setting, TFile, TFolder } from "obsidian";
import { CompileSettings, getFilesToCompile, validateAndLoadCompileSettings } from './utils'

// Default SortableJS
//import Sortable from 'sortablejs';

// Core SortableJS (without default plugins)
import Sortable from 'sortablejs/modular/sortable.core.esm.js';

// Complete SortableJS (with all plugins)
//import Sortable from 'sortablejs/modular/sortable.complete.esm.js';

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

	showTabContent(elmId: string) {
		document.getElementById(elmId).classList.remove('hidden');
		document.getElementById(elmId + '-nav').classList.add('is-active');
	}

	hideAllTabs() {
		document.getElementById('manuscript-settings-tab').classList.add('hidden');
		document.getElementById('pages-tab').classList.add('hidden');
		document.getElementById('manuscript-settings-tab-nav').classList.remove('is-active');
		document.getElementById('pages-tab-nav').classList.remove('is-active');
	}

	onOpen() {

		// ====================================================================================
		// GET FILES TO COMPILE
		// ====================================================================================
		// From the selected manuscript folder, pick out only the 
		// files that are actually markdown files and that have 
		// the litmojo.compile flag set to true.

		this.filesToCompile = getFilesToCompile(this.manuscriptFolder);

		//console.dir(this.filesToCompile);
		// if(this.debug) {
		//   console.debug('-- LitMojo > Compile > filesToCompile: %o', filesToCompile);
		// }

		// ====================================================================================
		// SETUP MODAL ID AND CLASSES
		// ====================================================================================
		let { contentEl } = this; // class="modal-content"
		contentEl.id = 'compile-settings-modal';

		contentEl.parentElement.classList.add('mod-settings');
		contentEl.parentElement.classList.add('mod-sidebar-layout');

			const vTabsContainer = contentEl.createEl("div");
			vTabsContainer.className = "vertical-tabs-container";

				const vTabHeader = vTabsContainer.createEl("div");
				vTabHeader.className = "vertical-tab-header";

					const vTabHeaderGroup = vTabHeader.createEl("div");
					vTabHeaderGroup.className = "vertical-tab-header-group";

						const vTabHeaderGroupTitle = vTabHeaderGroup.createEl("div");
						vTabHeaderGroupTitle.className = "vertical-tab-header-group-title";
						vTabHeaderGroupTitle.setText("LitMojo Compile Options");
			
						const vTabHeaderGroupItems = vTabHeaderGroup.createEl("div");
						vTabHeaderGroupItems.className = "vertical-tab-header-group-items";

							const vTabNavItem1 = vTabHeaderGroupItems.createEl("div");
							vTabNavItem1.className = "vertical-tab-nav-item";
							vTabNavItem1.setText("Manuscript Settings");
							vTabNavItem1.classList.add("is-active");
							vTabNavItem1.id = "manuscript-settings-tab-nav";
							vTabNavItem1.addEventListener('click', () => {
								this.hideAllTabs();
								this.showTabContent('manuscript-settings-tab');
							});

							const vTabNavItem2 = vTabHeaderGroupItems.createEl("div");
							vTabNavItem2.className = "vertical-tab-nav-item";
							vTabNavItem2.setText("Pages");
							vTabNavItem2.id = "pages-tab-nav";
							vTabNavItem2.addEventListener('click', () => {
								this.hideAllTabs();
								this.showTabContent('pages-tab');
							});

				const vTabContentContainer = vTabsContainer.createEl("div");
				vTabContentContainer.className = "vertical-tab-content-container";
					
					const vTabContent = vTabContentContainer.createEl("div");
					vTabContentContainer.className = "vertical-tab-content";

						const vTabManuscriptSettings = vTabContent.createEl("div");
						vTabManuscriptSettings.id = "manuscript-settings-tab";

							new Setting(vTabManuscriptSettings).addText((text) =>
							text.setValue(this.compileSettings.path).onChange((value) => {
								console.log(value);
							})).setName("Path").setDesc("The path to the manuscript output file, including the complete manuscript output file name; for example: 'Compiled Manuscripts/Frankenstein.md'. Supported extensions are .md and .html. Folders specified in the path must already exist in the vault.");
				
							new Setting(vTabManuscriptSettings).addText((text) =>
								text.setValue(this.compileSettings.title).onChange((value) => {
									console.log(value);
								})).setName("Title").setDesc("Specifies, for example, HTML document title when compiling to HTML.");
					
							new Setting(vTabManuscriptSettings).addDropdown((dropdown) =>
								dropdown.addOption("-", "-").addOption("*", "*").addOption("+", "+").setValue(this.compileSettings.bullet).onChange((value) => {
									console.log(value);
								})).setName("Bullet").setDesc("Specifies the bullet character to use for unordered lists when compiling to Markdown.");
						
						const vTabPages = vTabContent.createEl("div");
						vTabPages.id = "pages-tab";
						vTabPages.classList.add("hidden");

							//const contentPanel = vTabPages.createEl("div");
							//contentPanel.id = "contentPanel";

							const column1 = vTabPages.createEl("div");
							column1.addClass("flex-left");

								const uList = column1.createEl("ul");
								uList.id = "items";

									this.filesToCompile.forEach((file, index) => {
										const fileEl = uList.createEl("li");
										fileEl.id = `file-${index}`;
										fileEl.setAttr('data-id', file.path);
										// fileEl.addClass("file");
										// THIS SHOULD BE THE TITLE IN THE FILE'S META FRONTMATTER IF IT EXISTS...
										fileEl.setAttr("title", file.basename);
										fileEl.setText(file.basename);
										
										// onlcick of fileEl, show the file's content in the right column
										fileEl.addEventListener('dblclick', () => {
											//this.showFileContent(fileEl, file);
											console.log(file);
											
											// get all DOM elements with class 'is-active' and remove the class
											const activeEls = document.querySelectorAll('.is-active');
											activeEls.forEach((el) => {
												el.classList.remove('is-active');
											});

											fileEl.classList.add('is-active');

										});

									});

									var sortable = new Sortable(uList, {
										animation: 150,
										ghostClass: 'sortable-ghost',
										dataIdAttr: 'data-id',
									});

							const column2 = vTabPages.createEl("div");
							column2.setText('COLUMN 2')
							column2.addClass("flex-right");
							new Setting(vTabContentContainer)
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
										console.log('-- sortable: %o', sortable.toArray());
										this.onCompile(this.filesToCompile);
									}));
					
	}

	onClose() {
		let { contentEl } = this;
		contentEl.empty();
	}

}
