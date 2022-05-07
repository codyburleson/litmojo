import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'glass-tree-node',
    styleUrl: 'tree-node.css',
    shadow: false
})
export class TreeNode {

    // Indicate that name should be a public property on the component
    @Prop() name: string;

    @Prop() iconChecked: string = '✅';
    @Prop() iconUnchecked: string = '⬜';
    @Prop() mouseOverColor: string = '#00ff00';
    @Prop() mouseOutColor: string = '#ffffff';

    // @Prop({ mutable: true }) open: boolean = false;

    // @State() currentTime: number = Date.now();

    toggleOpenClosed = () => console.log('toggleOpenClosed');

    render() {
        return (
            <details>
                <summary>
                    <span class="twisty" onClick={() => this.toggleOpenClosed()}></span>
                    <span class="unchecked"></span>
                    {this.name}
                </summary>
                <slot />
            </details>
        );
    }

}

