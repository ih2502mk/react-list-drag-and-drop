import * as React from 'react';
import RLDDLogic from './RLDDLogic';
export interface RLDDItemProps {
    logic: RLDDLogic;
    itemId: number;
    activity: boolean;
    dragged: boolean;
    hovered: boolean;
}
export interface RLDDItemState {
    isDragging: boolean;
}
export default class RLDDItemComponent extends React.Component<RLDDItemProps, RLDDItemState> {
    readonly state: RLDDItemState;
    private isDown;
    private mouseDownTimestamp;
    private initialOffset;
    constructor(props: RLDDItemProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: RLDDItemProps, prevState: RLDDItemState): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private addDocumentListeners;
    private removeDocumentListeners;
    private handleMouseDown;
    private handleMouseMove;
    private getTimeSinceMouseDown;
    private handleMouseUp;
    private getBox;
    private getOffset;
}
