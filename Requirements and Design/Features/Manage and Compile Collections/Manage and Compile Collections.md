Writers must have the ability to organize multiple vault documents into named collections, order the documents within each given collection, and then quickly, easily, and repeatedly compile a collection into one single aggregate result (e.g. one markdown or HTML document).

The process of compiling multiple documents implies the possibility for automatic modifications as well as transformations from one format to another, though those are probably best described more specifically as unique, but related features. For the purposes of adhering to the concept of the Minimum Marketable Feature (MMF), the first phase of Document Assembly will be limited to ordering and aggregating multiple markdown documents into one combined markdown or HTML result.

## Benefit Hypothesis

Improved ability to create longform markdown and HTML content. 

## Acceptance Criteria
- **Manage Collections**
	- Create named document "collections" by identifying specific documents in a vault that should belong to each named collection
	- Read the independent documents in a collection by choosing one named collection from all that are available
	- Update a named collection by adding and removing vault documents to and from it
	- Delete the collection: this should delete the collection name and collection-specific metadata, but not any of the vault's markdown files
	- View collection files by file name or by each file's metadata title
		- It might be nice to allow a file icon (metadata field holding an emoji value); this could be a separate field so that you could toggle the icons on and off and choose whether or not to include the icon in compile results
- **Order Documents in a Collection**
	- Ability to specify the intended order of the documents in a collection. Since documents may be part of more than one collection, ordering must be unique to a specified collection
- **Compile a Collection**
	- Ability to generate one single markdown document from multiple markdown documents in a collection
	- Ability to generate one single HTML document from multiple markdown documents in a collection
	- **Synopsis Outline**: Ability to generate an outline from only the title and synopsis (metadata) of each document (or, perhaps, you can choose to compile including any given matadata fields for more flexibility).
