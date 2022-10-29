Great Article: https://pcarion.com/posts/markdown-unified/

# Markdown parser with unified pipeline

2020-06-23

5 min read

The markdown format is a _natural_ format to store structured content for a content management system:

-   it is a text format which is both easy to read and easy to write without any tool
-   it describes only the structure of the content, and is totally presentation free
-   with the addition of [front matter](https://jekyllrb.com/docs/front-matter/), you can then easily add all the meta information required to support the content: name of the author, date, tags etc…

That’s the reason why most static sites generators rely on that format to store their content.

You still need some extra tooling to integrated markdown content in a website.

For instance, you need mechanisms:

-   to wrap the content in a generated HTML page with possibly a header, sidebar, footer etc…
-   to process the content, such as applying a code highlighter on code blocks
-   to generate a table of content for the home page of the site

There are also _a lot_ of markdown parsers and they come in 2 flavors:

-   they transform the markdown input into HTML (or some other formats like pdf)
-   they provide an API to give access to an Abstract Syntax Tree (AST) for further processing

In the latter category comes [unified](https://unifiedjs.com/)

# Unified

The best way to understand what unified is about is to look first at some code:

```javascript
unified()
  .use(markdown) // 1
	.use(toc) // 2
  .use(remark2rehype) // 3
  .use(doc, {title: 'My Web site'}) // 4
  .use(html) // 5
  .process('# Hello world!', function (err, file) { // 6
    console.error(report(err || file))
    console.log(String(file))
  })
```

Unified provides an entire pipeline to process structured data:

-   step 1: you parse some input text data into a Markdown AST tree
-   step 2: you transform the markdown AST to add a table of content on top of the document
-   step 3: you transform the markdown tree into an HTML tree
-   step 4: you add in the HTML header the title of the page
-   step 5: you transform the HTML tree into a html text representation
-   step 6: that’s where the processing takes place XXYYZZ:
    -   you provide the markdown text input to be parsed in step 1
    -   you retrieve the html data at the end of the pipeline, and store it in a file

# Unified = parser + transformers + compiler

All the components of the unified pipeline are plain old javascript function.

Even though the unified API use a common syntax (`use`) to build the pipeline, there are different types of components in the pipeline.

## parser

The parser is unique in the pipeline and its role is to parse text into a syntax tree.

Unified supports out of the box 3 main specifications for syntax trees:

-   [`mdast`](https://github.com/syntax-tree/mdast) : representation of a markdown syntax tree
-   [`hast`](https://github.com/syntax-tree/hast) : representation of an HTML syntax tree, with embedded SVG or MathML
-   [`nlcst`](https://github.com/syntax-tree/nlcst) : representation of natural language syntax tree

All those trees implement the [`unist`](https://github.com/syntax-tree/unist)specification which is a very simple tree description with node and children…

There are a few parsers available but it is pretty easy to write your own. The major constraint is that the parser has to be a synchronous function.

From an API perspective, the way to write a parser can be a bit confusing:

-   this is a javascript function for which `this` is set to the unified pipeline instance
-   when this function is called, you set the value of `this.Parser` to another function which is the actual parser
-   the prototype of that parser is: `(text: string, file: VFile): Node` where
    -   text is the text to parse and
    -   file is a data structure describing the input to be processed.
    -   The function returns a `Node` which is the tree representing the content and that has to be compliant with the `unist` specification.

## compiler

At the other end of the pipeline is the compiler which is in charge of converting back the tree into a text representation. There are few cases where you would want to write your own compiler as you have implementation to compiler mdast (Markdown) or hast (HTML) back to text.

## transformers

That’s where the magic of unified happens.

From an API perspective, a transformer method is a method which returns a function which follows the `Transformer` type:

```typescript
type Transformer = (
    node: Node,
    file: VFile,
    next?: (
      error: Error | null,
      tree: Node,
      file: VFile
    ) => Record<string, unknown>
  ) => Error | Node | Promise<Node> | void | Promise<void>
```

At its core, this function can transform the tree provides as the `node` parameter: you can add, remove or change nodes in that tree.

The `next` option parameter allows you to implement asynchronous transformation: you call that method when your processing is over.

## Unified ecosystem

Unified comes with a _huge_ [ecosystem](https://github.com/unifiedjs/awesome-unified) of plugins. You can easily assemble or build your own set of transformers to parse your markdown content and generate the associated HTML files for your static site.

# Unified usage example

The site that you are reading ([https://pcarion.com](https://pcarion.com/)) uses a custom made static site generator which relies heavily on unified.

The content is written in [notion.so](https://www.notion.so/) which acts as a headless CMS and a couple of github actions process that content to generate the website.

The generation of this site is a 2 steps process.

## step 1: content retrieval

A custom parser parses the notion pages into a markdown tree

Another custom transformer retrieves the images from [notion.so](http://notion.so/) to store them along side the generated markdown

The result of this first step is to have all the page contents retrieved from [notion.so](http://notion.so/) and stored into markdown files and archived in github

## step 2: site generator

Another unified pipeline parses the markdown files from github and generate the HTML pages which will be served by [github pages](https://pages.github.com/).

There are also a coupe of transformers used in that process:

-   a transformer to add a header and footer to each blog article page
-   a transformer to process the code blocks in order to provide syntax highlighting
-   a transformer to generate the home page

```json
  "dependencies": {
    "node-fetch": "^2.6.1",
    "rehype-document": "^5.1.0",
    "rehype-format": "^3.1.0",
    "rehype-stringify": "^8.0.0",
    "remark-parse": "^9.0.0",
    "remark-rehype": "^8.0.0",
    "remark-stringify": "^9.0.1",
    "ts-mdast": "^1.0.0",
    "unified": "^9.2.0",
    "unist-util-visit": "^2.0.3",
    "unist-util-visit-parents": "^3.1.1",
    "vfile-reporter": "^6.0.2"
  },
  "devDependencies": {
    "@ava/typescript": "^1.1.1",
    "@istanbuljs/nyc-config-typescript": "^1.0.1",
    "@types/mdast": "^3.0.3",
    "@types/node-fetch": "^2.5.7",
    "@types/unist": "^2.0.3",
    "@typescript-eslint/eslint-plugin": "^4.0.1",
    "@typescript-eslint/parser": "^4.0.1",
    "ava": "^3.12.1",
    "codecov": "^3.5.0",
    "cspell": "^4.1.0",
    "cz-conventional-changelog": "^3.3.0",
    "eslint": "^7.8.0",
    "eslint-config-prettier": "^6.11.0",
    "eslint-plugin-eslint-comments": "^3.2.0",
    "eslint-plugin-functional": "^3.0.2",
    "eslint-plugin-import": "^2.22.0",
    "gh-pages": "^3.1.0",
    "npm-run-all": "^4.1.5",
    "nyc": "^15.1.0",
    "open-cli": "^6.0.1",
    "prettier": "^2.1.1",
    "standard-version": "^9.0.0",
    "ts-node": "^9.0.0",
    "typedoc": "^0.19.0",
    "typescript": "^4.0.2"
  },
```