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

## Step 4 - Push the Repo to GitHub
- Create a new repo in GitHub using the GitHub UI (e.g. in my case, named "litmojo")
- Follow the instructions given in the UI after creating the remote repo to connect your local repo. In my case, that's just the addition of these steps:

```bash
git branch -M main
git remote add origin git@github.com:codyburleson/litmojo.git
git push -u origin main
```

Great! Now we've got a good starting point: a vault, a local repo, and a remote. What are we missing now? The custom plugin itself!

## Step 5 - Clone the Sample Plugin

Since we're going to be editing the plugin right in the `.obsidian/plugins` directory, and since we're going to start with the Sample Plugin, we need to clone the repo, remove its inner `.git` directory, rename it, edit the configuration, then move the plugin folder where we want it.

- Navigate to [Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin), and click the button to "Use this template"; in my case, I'm naming it "litmojo-plugin."
- Now clone the repo to your local machine:
  ```bash
  git clone git@github.com:codyburleson/litmojo-plugin.git
  ```
- Once the plugin has been cloned locally, cut it and paste it into the `.obsidian/plugins` folder in the vault.
- Delete the `.git` folder witin the plugin root because our vault root is what holds the `.git` folder now.
- You can delete the repo you just cloned from the sample on GitHub now because the plugin now exists within your vault repo instead.

## Step 6 - Edit the Plugin Manifest
- Change into the plugin directory (`.obsidian/plugins/litmojo-plugin`)
- Execute `code .` to launch VS Code from that location
- Edit the manifest.json file with the new plugin name, etc...
  ```bash
  {
	"id": "litmojo",
	"name": "LitMojo",
	"version": "1.0.1",
	"minAppVersion": "0.14.6",
	"description": "Great tools for writing and publishing.",
	"author": "Cody Burleson",
	"authorUrl": "https://publish.obsidian.md/litmojo/LitMojo/README",
	"isDesktopOnly": false
}
```

## Step 7 - Create .hotreload File
In the plugin root, create an empty file called `.hotreload`. The Hot Reload plugin depends on this file to trigger it to do its thing.

## Step 8 - Install Package Dependencies and Run
- Install the package dependencies with the following command:
  ```bash
	npm install
  ```
  - Run the plugin project with:
    ```bash
    npm run dev
```
- Relaunch Obsidian and reopen the development vault.
- In Settings > Community plugins, enable your new custom plugin
- The second you enable the plugin, all the text turns red because of a style defined in the styles.css file. Let's test the Hot Reload capability now by editing styles.css and commenting out the line: `color: red`. all the text in Obsidian should switch back to its default color.

Great! Now we have a development vault and a new working plugin based on the sample plugin. We're ready to rock-n-roll! But, let's commit this stable checkpoint to GitHub before we move forward.

## Step 9 - Commit the Stable Checkpoint

Now, that I've got things working out of VS Code, I just use the VS Code Git tools to stage the changes, commit them with a message, and sync to the remote repo.

We've done everything we set out to do in the Objectives for this session. Now it's time to have some real fun!

## References
- [Obsidian Plugin Developer Docs](https://marcus.se.net/obsidian-plugin-docs/)
- [Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin), template plugin project repo on GitHub
- [community-plugins.json](https://github.com/obsidianmd/obsidian-releases/blob/master/community-plugins.json) - approved Obsidian plugins with references to their respective GitHub repos
-  [Obsidian Help](https://help.obsidian.md/Obsidian/Index) - the official Obsidian documentation, which appears to provide no information about developing custom plugins



