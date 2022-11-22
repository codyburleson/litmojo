# LitMojo Plugin for Obsidian

LitMojo is an Obsidian plugin for writers with a vision to enhance writing and publishing. 

## Features

We're just getting started, so we only offer one feature for now:

### Longform Compiler

The Longform Compiler feature allows you to compile a manuscript into markdown or HTML from multiple markdown files.

## User Guide

### Step One - Configure Manuscript Compile Settings

Create a folder note inside the folder containing your manuscript pages—a markdown file that must be named the same as the parent folder. This is the file where you will configure the compile settings for your manuscript.

Tip: We recommend using AidenLx's Folder Note plugin for Obsidian to manage folder notes.

In the folder note for your manuscript, you must create a frontmatter section with YAML that looks like this:

```
---
litmojo:
  path: TestContent/Compile/Frankenstein.md,
  exclude:
    headings:
      - "Heading Title for Section to Exclude 1"
      - "Heading Title for Section to Exclude 2"
---
```
 
**path** - required; is where you define the file path for the compiled manuscript. You must manually create any folders in the specified path if they do not exist. The file extension determines the type of file that will be created. At this time, only `.md` for markdown and `.html` for HTML are supported. You can create a PDF from the compiled manuscript using Obsidian's native Export to PDF feature.
**exclude** - optional; defines sections to exclude. Supports a string array of one or more heading titles. Any section with a heading that has a matching title will be ommited from the compilation.

See [[Manuscript Compiler Settings]] for more.

### Step Two - Configure Individual Pages

Each markdown document in your manuscript folder must have a frontmatter section that looks like the following:

```
---
litmojo:
  order: 5
  compile: true
---
```

- **order** - a number that specifies the order in which the document will be inserted in the compiled manuscript. We recommend using increments of 5 or 10 so that you you'll have a little elbow room to insert pages in between two others without having to modify the order of remaining pages.
- **compile** - a boolean value (true|false) that specifies whether or not the given page should be included in the manuscript when compiled. 

### Step Three - Compile

Right-click on your manuscript folder and choose Compile. Your manuscript will be compiled into the file specified by the path you gave in the frontmatter of the manuscript's folder note.

#### Notes

- Under Settings > Files and Links, turn on Detect all File Extensions if you want to see HTML manuscript files in Obsidian's file explorer after they've been compiled.