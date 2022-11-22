---
publish: false
litmojo:
  order: 5
  compile: true
---

# About (Chapter 1)

Sections can be excluded from a manuscript during the compilation when the `exclude` property is used in the yaml frontmatter like so:

```
---
litmojo:
  path: Compiled Manuscripts/Exclude Sections.md
  exclude:
    - "Manuscript Staging"
    - "Exclude Me"
    - "Do Not Compile"
---
```

# Manuscript Staging

Manuscript Staging 1. This section ==SHOULD NOT== be included in the compiled manuscript.

# Do Not Compile

Do Not Compile 1. This section ==SHOULD NOT== be included in the compiled result.

# Do Not Compile

Do Not Compile 2. This section ==SHOULD NOT== be included in the compiled result.

# Compile Me

This section ==SHOULD== be included in the compiled result.

## Exclude Me

However, this section ==SHOULD NOT== be included in the compiled result.

## Include Me
This section ==SHOULD== be included in the compiled result.

## Include Me Too

This section ==SHOULD== be included in the compiled result.