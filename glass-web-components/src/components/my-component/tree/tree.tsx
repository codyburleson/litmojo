import { Component, Prop, h } from '@stencil/core';

// Some details element styling tips
// https://stackoverflow.com/questions/10813581/can-i-replace-the-expand-icon-of-the-details-element


@Component({
  tag: 'glass-tree',
})
export class Tree {

  // Indicate that name should be a public property on the component
  @Prop() name: string;

  render() {
    return (
      <p>
        My name is {this.name}
      </p>
    );
  }
}
