## Today's Objectives:
- Setup a new Obsidian plugin project
- Acid test the plugin (ensure the code builds and the plugin works in Obsidian)
- Commit the source code baseline to GitHub

## Anatomy of an Obsidian Plugin
Following are what appear to be the minimum plugin requirements:

-   A `README.md` that describes the purpose of the plugin, and how to use it.
-   A `LICENSE` that determines how others are allowed to use the plugin and its source code. If you need help to pick a license for your plugin, refer to [Choose a License](https://choosealicense.com/).
-   A `manifest.json` that describes your plugin. For more information, refer to [Manifest](https://marcus.se.net/obsidian-plugin-docs/manifest).
-   Upload the following plugin assets to the release, as binary attachments:
-   `main.js`
-   `styles.css` (optional)

## Step 1 - Create and Configure a New Obsidian Vault
I've chosen to develop my plugin within an Obsidian vault that will act as a sort of mono-repo that has the plugin source right where it deploys as a plugin under `.obsidian/plugins`.

- Create a new Obsidian vault (for me, this is at `c:\repos\litmojo`)
- Configure the vault with some default preferred settings
	- A README file in the root. This will be the README.md file that loads in the GitHub web UI and it may also be the landing page of the website published from the repo using Obsidian Publish.
	- Settings > 
		- Editor > Use Legacy Editor: Off (for now)
		- Appearance > Base Theme: White (a personal preference)
		- Community Plugins > Safe Mode: Off

## Step 2 - Add and Enable the Hot Reload Plugin
- Create the `plugins` directory within `.obsidian` first 
- Put the Hot Reload plugin in `.obsidian/plugins` directory. We'll be using this plugin to aid development.
- Restart Obsidian and reopen the vault.
- Navigate to Settings > Community plugins and enable Hot Reload

## Step 3 - Initialize the Vault as a Git Repo and Perform Initial Commit

In PowerShell, change into the vault's root directory and execute:

```bash
git init
git add .
git commit -m "initial commit"
```

## References
- [Obsidian Plugin Developer Docs](https://marcus.se.net/obsidian-plugin-docs/)
- [Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin), template plugin project repo on GitHub
- [community-plugins.json](https://github.com/obsidianmd/obsidian-releases/blob/master/community-plugins.json) - approved Obsidian plugins with references to their respective GitHub repos
-  [Obsidian Help](https://help.obsidian.md/Obsidian/Index) - the official Obsidian documentation, which appears to provide no information about developing custom plugins

