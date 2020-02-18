"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isRectValid(r) {
    return r && r.width >= 0 && r.height >= 0;
}
exports.isRectValid = isRectValid;
function areRectsOverlapping(r0, r1) {
    var r = getIntersectionRect(r0, r1);
    return r.width > 0 && r.height > 0;
}
exports.areRectsOverlapping = areRectsOverlapping;
function getAreaOfIntersection(r0, r1) {
    var rect = getIntersectionRect(r0, r1);
    return getRectArea(rect);
}
exports.getAreaOfIntersection = getAreaOfIntersection;
function getIntersectionRect(r0, r1) {
    var r0b = getRectBounds(r0);
    var r1b = getRectBounds(r1);
    var x1 = r0b.left;
    var y1 = r0b.top;
    var x2 = r0b.right;
    var y2 = r0b.bottom;
    var x3 = r1b.left;
    var y3 = r1b.top;
    var x4 = r1b.right;
    var y4 = r1b.bottom;
    var x5 = Math.max(x1, x3);
    var y5 = Math.max(y1, y3);
    var x6 = Math.min(x2, x4);
    var y6 = Math.min(y2, y4);
    return { left: x5, width: x6 - x5, top: y5, height: y6 - y5 };
}
exports.getIntersectionRect = getIntersectionRect;
function getRectArea(r) {
    return isRectValid(r) ? r.width * r.height : 0;
}
exports.getRectArea = getRectArea;
function getRectBounds(r) {
    var top = r.top;
    var left = r.left;
    var bottom = r.top + r.height;
    var right = r.left + r.width;
    return { top: top, left: left, bottom: bottom, right: right };
}
exports.getRectBounds = getRectBounds;
function getRectPoints(r) {
    var _a = getRectBounds(r), top = _a.top, left = _a.left, bottom = _a.bottom, right = _a.right;
    var topLeft = { x: left, y: top };
    var topRight = { x: right, y: top };
    var bottomLeft = { x: left, y: bottom };
    var bottomRight = { x: right, y: bottom };
    return { topLeft: topLeft, topRight: topRight, bottomLeft: bottomLeft, bottomRight: bottomRight };
}
exports.getRectPoints = getRectPoints;
function pointToString(p) {
    return "Point{" + p.x + "," + p.y + "}";
}
exports.pointToString = pointToString;
function rectToString(r) {
    var bounds = getRectBounds(r);
    return "Rect{" + JSON.stringify(bounds) + "}";
}
exports.rectToString = rectToString;
//# sourceMappingURL=Geometry.js.map