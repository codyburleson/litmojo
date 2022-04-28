import { ItemView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactView } from "./ReactView";

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

  /*
  async onOpen() {
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("h4", { text: "Collection Manager" });
  }
  */

  async onOpen() {
    ReactDOM.render(
      <ReactView />,
      this.containerEl.children[1]
    );
  }

  async onClose() {
    ReactDOM.unmountComponentAtNode(this.containerEl.children[1]);
  }

}