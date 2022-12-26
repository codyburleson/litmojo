import { App, PluginSettingTab,Setting } from "obsidian";
import LitMojoPlugin from 'main';

export class SampleSettingTab extends PluginSettingTab {

    plugin: LitMojoPlugin;

    constructor(app: App, plugin: LitMojoPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {

        const { containerEl } = this;

        containerEl.empty();

        containerEl.createEl('h2', { text: 'LitMojo Plugin Settings' });

        new Setting(containerEl)
            .setName('Debug')
            .setDesc('true | false to log debug messages')
            .addText(text => text
                .setPlaceholder('false')
                .setValue(this.plugin.settings.debug)
                .onChange(async (value) => {
                    console.log('Debug: ' + value);
                    this.plugin.settings.debug = value;
                    if (this.plugin.settings.debug === 'true') {
                        this.plugin.debug = true;
                    } else {
                        this.plugin.debug = false;
                    }
                    await this.plugin.saveSettings();
                }));
    }
}
