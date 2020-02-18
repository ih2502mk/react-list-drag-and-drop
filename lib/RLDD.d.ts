import * as React from 'react';
export interface RLDDItem {
    id: number;
}
export interface RLDDProps {
    cssClasses?: string;
    inlineStyle?: {};
    layout?: 'vertical' | 'horizontal' | 'grid';
    threshold?: number;
    dragDelay?: number;
    items: Array<RLDDItem>;
    itemRenderer(item: RLDDItem, index: number): JSX.Element;
    onChange(items: Array<RLDDItem>): void;
    onDragEnd(): void;
}
export interface RLDDState {
    draggedId: number;
    hoveredId: number;
    draggedItemDimensions: {
        width: number;
        height: number;
    };
}
export default class RLDD extends React.Component<RLDDProps, RLDDState> {
    static defaultProps: Partial<RLDDProps>;
    readonly state: RLDDState;
    private logic;
    constructor(props: RLDDProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    getStateString(props: RLDDProps, state: RLDDState): string;
    render(): JSX.Element;
    private createItemComponent;
    private createFloatingComponent;
    private computeStyle;
    private handleDragBegin;
    private handleMouseOver;
    private handleDragEnd;
    private getNewItems;
    private findItemIndexById;
    private assertValidItem;
}
