export interface Point {
    x: number;
    y: number;
}
export interface Rect {
    left: number;
    top: number;
    width: number;
    height: number;
}
export interface RectPoints {
    topLeft: Point;
    topRight: Point;
    bottomLeft: Point;
    bottomRight: Point;
}
export interface RectBounds {
    top: number;
    left: number;
    right: number;
    bottom: number;
}
export declare function isRectValid(r: Rect): boolean;
export declare function areRectsOverlapping(r0: Rect, r1: Rect): boolean;
export declare function getAreaOfIntersection(r0: Rect, r1: Rect): number;
export declare function getIntersectionRect(r0: Rect, r1: Rect): Rect;
export declare function getRectArea(r: Rect): number;
export declare function getRectBounds(r: Rect): RectBounds;
export declare function getRectPoints(r: Rect): RectPoints;
export declare function pointToString(p: Point): string;
export declare function rectToString(r: Rect): string;
