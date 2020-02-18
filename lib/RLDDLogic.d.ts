import Signal from './Signal';
import * as Geom from './Geometry';
export default class RLDDLogic {
    private threshold;
    private dragDelay;
    onDragBeginSignal: Signal;
    onDragHoverSignal: Signal;
    onDragMoveSignal: Signal;
    onDragEndSignal: Signal;
    private lastHoveredId;
    private floatingItemBoxRect;
    private itemBoxRects;
    getThreshold(): number;
    getDragDelay(): number;
    constructor(threshold: number, dragDelay: number);
    setItemIdBoxRect(itemId: number, boxRect: Geom.Rect): void;
    setFloatingItemBoxRect(boxRect: Geom.Rect): void;
    handleDragBegin(draggedId: number): void;
    handleDragMove(id: number, offset: Geom.Point): void;
    handleDragEnd(): void;
    arrangeItems<T>(items: Array<T>, index0: number, index1: number): Array<T>;
    private updateHoveredItem;
    private findHoveredItemId;
    private calculateOverlappingAreas;
}
