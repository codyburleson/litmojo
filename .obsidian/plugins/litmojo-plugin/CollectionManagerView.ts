import { ItemView, WorkspaceLeaf } from "obsidian";

export const VIEW_TYPE_COLLECTION_MANAGER = "collection-manager";

export class CollectionManagerView extends ItemView {
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_COLLECTION_MANAGER;
  }

  getDisplayText() {
    return "Collection Manager view";
  }

  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h4", { text: "Collection Manager" });
  }

  async onClose() {
    // Nothing to clean up.
  }
}