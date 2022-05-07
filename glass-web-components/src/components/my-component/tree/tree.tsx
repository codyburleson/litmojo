import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'glass-tree',
  styleUrl: 'tree.css'
})
export class Tree {

  // Indicate that name should be a public property on the component
  @Prop() name: string;

  render() {
    return (
        <div class="treeContainer">
            <glass-tree-node name="Root">
                <glass-tree-node name="Node 1">
                    <glass-tree-node name="Node 1.1"/>
                    <glass-tree-node name="Node 1.2"/>
                    <glass-tree-Node name="Node 1.3"/>
                </glass-tree-node>
                <glass-tree-node name="Node 2">
                    <glass-tree-node name="Node 2.1">
                        <glass-tree-node name="Node 2.1.1"/>
                        <glass-tree-node name="Node 2.1.2"/>
                        <glass-tree-node name="Node 2.1.3"/>
                    </glass-tree-node>
                    <glass-tree-node name="Node 2.2"/>
                    <glass-tree-node name="Node 2.3"/>
                </glass-tree-node>
            </glass-tree-node>
        </div>
    );
  }
  
}


