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
        <details>
            <summary>{this.name}</summary>
            ...child nodes go here...
        </details>
    );
  }
  
}

