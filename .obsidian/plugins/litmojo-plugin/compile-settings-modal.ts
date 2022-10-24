import { App, Modal } from 'obsidian';

//import '@shoelace-style/shoelace/dist/components/button/button';

//import '@shoelace-style/shoelace/dist/themes/light.css';
//import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';

export class CompileSettingsModal extends Modal {

    constructor(app: App) {
        super(app);
        //setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.83/dist/');
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.setText('Woah mojo!');
        // @ts-ignore
        //contentEl.createEl("sl-button", { text: "Example" });
        //contentEl.Creat
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}
