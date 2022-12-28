import LitMojoPlugin from "main";
import {Setting, TextFileView, TFile, WorkspaceLeaf } from "obsidian";
import { getFiles } from "utils";

// Core SortableJS (without default plugins)
import Sortable from 'sortablejs/modular/sortable.core.esm.js';

// Complete SortableJS (with all plugins)
//import Sortable from 'sortablejs/modular/sortable.complete.esm.js';

export const VIEW_TYPE_MANUSCRIPT_SETTINGS = "manuscript-settings";

export class ManuscriptSettingsView extends TextFileView {
	plugin: LitMojoPlugin;

	constructor(leaf: WorkspaceLeaf, plugin: LitMojoPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	/**
	 * Unparse the manuscript settings file, and return the resulting text.
	 * @returns
	 */
	getViewData(): string {
		console.log('>> ManuscriptSettingsView.getViewData()')
		return this.data;
	}

	setViewData(data: string): void {
		console.log('>> ManuscriptSettingsView.setViewData()')

		// The full text contents of the folder note
		this.data = data;

		const manuscriptPageFiles = getFiles(this.file.parent);
		console.log('>> ManuscriptSettingsView.setViewData() - allFiles: ', manuscriptPageFiles)


		// log the state
		console.log('-- ManuscriptSettingsView.setViewData() - this.getState(): ', this.getState())


		this.plugin.app.fileManager.processFrontMatter(this.file, (frontmatter) => {	
			console.log('-- ManuscriptSettingsView.setViewData() - frontmatter', frontmatter)
			if(frontmatter?.litmojo) {
				console.log('-- frontmatter.litmojo: ', frontmatter.litmojo)
			}
		});	

		this.contentEl.empty();
		//this.contentEl.createDiv({ text: this.data });
		const root = this.contentEl.createDiv();
		root.id = "cs-root";

			const vTabsContainer = root.createEl("div");
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
										text.setValue("compile settings path").onChange((value) => {
											console.log(value);
										})).setName("Path").setDesc("The path to the manuscript output file, including the complete manuscript output file name; for example: 'Compiled Manuscripts/Frankenstein.md'. Supported extensions are .md and .html. Folders specified in the path must already exist in the vault.");
							
										new Setting(vTabManuscriptSettings).addText((text) =>
											text.setValue("compile settings title").onChange((value) => {
												console.log(value);
											})).setName("Title").setDesc("Specifies, for example, HTML document title when compiling to HTML.");
								
										// use this.compile settings bullet instead of the setValue("-")
										new Setting(vTabManuscriptSettings).addDropdown((dropdown) =>
											dropdown.addOption("-", "-").addOption("*", "*").addOption("+", "+").setValue("-").onChange((value) => {
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
			
												manuscriptPageFiles.forEach((file, index) => {
													
													const fileEl = uList.createEl("li");
													fileEl.id = `file-${index}`;
													fileEl.setAttr('data-id', file.path);
													// fileEl.addClass("file");
													// THIS SHOULD BE THE TITLE IN THE FILE'S META FRONTMATTER IF IT EXISTS...
													fileEl.setAttr("title", file.basename);
													
													// Create a checkbox inside the fileEl
													const checkbox = fileEl.createEl("input");
													checkbox.type = "checkbox";
													checkbox.id = `checkbox-${index}`;
													checkbox.setAttr("title", "Check to include in compile / uncheck to exclude");
													checkbox.setAttr("data-id", file.path);
													checkbox.addClass("checkbox");

													// create a span after the checkbox
													const span = fileEl.createEl("span");
													span.id = `span-${index}`;
													span.setAttr("data-id", file.path);
													span.addClass("span");
													span.setAttr("title", file.basename);
													span.setText(file.basename);

													//fileEl.setText(file.basename);
													
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
			
			new Setting(root)
			.addButton((btn) =>
				btn
					.setButtonText("Cancel")
					.onClick(() => {
						//this.close();
					}))
			.addButton((btn) =>
				btn
					.setButtonText("Compile")
					.setCta()
					.onClick(() => {
						//this.close();
						//console.log('-- sortable: %o', sortable.toArray());
						//this.onCompile(this.filesToCompile);
					}));
							
			
		//let files = getFiles(file);

	}

	getViewType() {
		console.log('>> ManuscriptSettingsView.setViewType()')
		return VIEW_TYPE_MANUSCRIPT_SETTINGS;
	}

	// async onOpen() {
	// 	console.log('>> ManuscriptSettingsView.onOpen()')
	// 	const container = this.containerEl.children[1];
	// 	container.empty();
	// 	container.createEl("h4", { text: "Manuscript Settings View" });
	// }

	async onClose() {
		console.log('>> ManuscriptSettingsView.onClose()')
		// Nothing to clean up.
	}

	clear(): void {
		console.log('>> ManuscriptSettingsView.clear()')
		
		this.data = "";
		  
		/*
        Obsidian *only* calls this after unloading a file, before loading the next.
        Specifically, from onUnloadFile, which calls save(true), and then optionally
        calls clear, if and only if this.file is still non-empty.  That means that
        in this function, this.file is still the *old* file, so we should not do
        anything here that might try to use the file (including its path), so we
        should avoid doing anything that refreshes the display.  (Since that could
        use the file, and would also flash an empty pane during navigation, depending
        on how long the next file load takes.)
        Given all that, it makes more sense to clean up our state from onLoadFile, as
        following a clear there are only two possible states: a successful onLoadFile
        updates our full state via setViewData(), or else it aborts with an error
        first.  So as long as setViewData() and the error handler for onLoadFile()
        fully reset the state (to a valid load state or a valid error state),
        there's nothing to do in this method.  (We can't omit it, since it's
        abstract.)
        */
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

}
