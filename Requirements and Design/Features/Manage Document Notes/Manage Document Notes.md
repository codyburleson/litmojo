Writers must have the ability to keep notes about a given document that, as a kind of metadata about the document, are not considered to be the main content of the document.

*Note that "metadata" in this case, should not imply a technical approach to the implementation. Notes may or may not be in frontmatter YAML. They could, for example, be implemented as a special type of code block, which the plugin reads and renders in its own special way.*

## Benefit Hypothesis

Improved ability to manage (create, read, update, and delete) metadata notes about documents.

## Acceptance Criteria

- Notes can be created and kept inside of each document in some way that distingusihes them from the main content of the document.
- Notes are rendered in a way that is visually distinguished from the main content of a document.
- Notes can be easily excluded from the result of a compilation of multiple documents.

