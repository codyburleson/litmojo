import { Component, Prop, h } from '@stencil/core';

@Component({
    tag: 'glass-tree-node',
    styleUrl: 'tree-node.css',
    shadow: false
})
export class TreeNode {

    // Indicate that name should be a public property on the component
    @Prop() name: string;

    // Move these to style sheet; make them custom vars and use the content attribute in a css class
    // content: '▶️'; This is too colpicated in the jsx. we need just css class toggling
    @Prop() iconOpen: string = '🔽';
    @Prop() iconClosed: string = '▶️';
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
                    <span onClick={() => this.toggleOpenClosed()}>{this.iconClosed}</span>
                    <span>{this.iconUnchecked}</span>
                    <span>{this.name}</span>
                </summary>
                <slot />
            </details>
        );
    }

}

