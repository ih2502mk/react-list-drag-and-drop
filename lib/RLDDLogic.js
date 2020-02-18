"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Signal_1 = require("./Signal");
var Geom = require("./Geometry");
var RLDDLogic = (function () {
    function RLDDLogic(threshold, dragDelay) {
        this.threshold = threshold;
        this.dragDelay = dragDelay;
        this.onDragBeginSignal = new Signal_1.default();
        this.onDragHoverSignal = new Signal_1.default();
        this.onDragMoveSignal = new Signal_1.default();
        this.onDragEndSignal = new Signal_1.default();
        this.lastHoveredId = -1;
        this.itemBoxRects = new Map();
    }
    RLDDLogic.prototype.getThreshold = function () {
        return this.threshold;
    };
    RLDDLogic.prototype.getDragDelay = function () {
        return this.dragDelay;
    };
    RLDDLogic.prototype.setItemIdBoxRect = function (itemId, boxRect) {
        this.itemBoxRects.set(itemId, boxRect);
    };
    RLDDLogic.prototype.setFloatingItemBoxRect = function (boxRect) {
        this.floatingItemBoxRect = boxRect;
    };
    RLDDLogic.prototype.handleDragBegin = function (draggedId) {
        var draggedItemRect = this.itemBoxRects.get(draggedId);
        if (draggedItemRect) {
            this.onDragBeginSignal.dispatch(draggedId, draggedItemRect.width, draggedItemRect.height);
        }
    };
    RLDDLogic.prototype.handleDragMove = function (id, offset) {
        this.onDragMoveSignal.dispatch(id, offset);
        this.updateHoveredItem();
    };
    RLDDLogic.prototype.handleDragEnd = function () {
        this.onDragEndSignal.dispatch();
    };
    RLDDLogic.prototype.arrangeItems = function (items, index0, index1) {
        var newItems = items.slice();
        if (index0 !== index1) {
            var item0 = newItems[index0];
            var item1 = newItems[index1];
            var index2 = -1;
            if (index1 > index0) {
                newItems.splice(index0, 1);
                index2 = newItems.indexOf(item1) + 1;
                newItems.splice(index2, 0, item0);
            }
            else if (index1 < index0) {
                newItems.splice(index0, 1);
                index2 = newItems.indexOf(item1) + 0;
                newItems.splice(index2, 0, item0);
            }
        }
        return newItems;
    };
    RLDDLogic.prototype.updateHoveredItem = function () {
        var hoveredId = this.findHoveredItemId();
        if (hoveredId >= 0 && hoveredId !== this.lastHoveredId) {
            this.lastHoveredId = hoveredId;
            this.onDragHoverSignal.dispatch(hoveredId);
        }
    };
    RLDDLogic.prototype.findHoveredItemId = function () {
        if (Geom.isRectValid(this.floatingItemBoxRect)) {
            var areas = this.calculateOverlappingAreas().sort(function (a, b) { return b.area - a.area; });
            if (areas.length > 0 && areas[0].area > 0) {
                return areas[0].id;
            }
        }
        return -1;
    };
    RLDDLogic.prototype.calculateOverlappingAreas = function () {
        var _this = this;
        var areas = new Array();
        this.itemBoxRects.forEach(function (rect, itemId) {
            var area = Geom.getAreaOfIntersection(rect, _this.floatingItemBoxRect) / Geom.getRectArea(rect);
            areas.push({ id: itemId, area: area });
        });
        return areas;
    };
    return RLDDLogic;
}());
exports.default = RLDDLogic;
//# sourceMappingURL=RLDDLogic.js.map