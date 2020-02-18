import * as React from 'react';
import RLDDLogic from './RLDDLogic';
import { Point } from './Geometry';
import './RLDDFloatingItem.css';
export interface RLDDFloatingItemProps {
    logic: RLDDLogic;
    draggedId: number;
    width: number;
    height: number;
}
export interface RLDDFloatingItemState {
    offsetX: number;
    offsetY: number;
}
declare class RLDDFloatingItemComponent extends React.Component<RLDDFloatingItemProps, RLDDFloatingItemState> {
    readonly state: RLDDFloatingItemState;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    refresh: (id: number, offset: Point) => void;
    render(): JSX.Element;
    private getBox;
}
export default RLDDFloatingItemComponent;
