Settings for the compiler are defined per each manuscript in the frontmatter section of the manuscript folder's folder note. A "folder note" is a markdown file inside of a folder that has the same name as the parent folder.

Following is an example frontmatter YAML with all compiler settinng properties shown.

```
litmojo:
  path: TestContent/Compile/Frankenstein.md
  bullet: '-'
---
```
---

- **litmojo.path**
	- Required file path for the compiled manuscript. You must manually create any folders in the specified path if they do not exist. The file extension determines the type of file that will be created. At this time, only `.md` for markdown and `.html` for HTML are supported. You can create a PDF from the compiled manuscript using Obsidian's native Export to PDF feature.
- **litmojo.title**
	- Optional manuscript title (default: file basename of the manuscript folder note)
- **litmojo.bullet**
	- Optional marker to use for bullets of items in unordered lists (`'*'`, `'+'`, or `'-'`, default: `'-'`).
