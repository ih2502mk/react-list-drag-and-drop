"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var RLDDItemComponent_1 = require("./RLDDItemComponent");
var RLDDLogic_1 = require("./RLDDLogic");
var RLDDFloatingItemComponent_1 = require("./RLDDFloatingItemComponent");
var RLDD = (function (_super) {
    __extends(RLDD, _super);
    function RLDD(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { draggedId: -1, hoveredId: -1, draggedItemDimensions: { width: 0, height: 0 } };
        _this.createItemComponent = function (item, i) {
            _this.assertValidItem(item);
            var draggedItemId = _this.state.draggedId;
            return (React.createElement(RLDDItemComponent_1.default, { key: item.id, logic: _this.logic, itemId: item.id, activity: draggedItemId >= 0, dragged: draggedItemId === item.id, hovered: draggedItemId === item.id }, _this.props.itemRenderer(item, i)));
        };
        _this.createFloatingComponent = function () {
            var draggedItemId = _this.state.draggedId;
            var draggedItemIndex = _this.findItemIndexById(draggedItemId);
            var item = _this.props.items[draggedItemIndex];
            _this.assertValidItem(item);
            return (React.createElement(RLDDFloatingItemComponent_1.default, { logic: _this.logic, draggedId: draggedItemId, width: _this.state.draggedItemDimensions.width, height: _this.state.draggedItemDimensions.height }, draggedItemIndex >= 0 && _this.props.itemRenderer(item, draggedItemIndex)));
        };
        _this.handleDragBegin = function (draggedId, width, height) {
            var draggedItemDimensions = { width: width, height: height };
            _this.setState({ draggedId: draggedId, draggedItemDimensions: draggedItemDimensions });
        };
        _this.handleMouseOver = function (hoveredId) {
            if (_this.state.draggedId >= 0) {
                _this.setState({ hoveredId: hoveredId }, function () {
                    var newItems = _this.getNewItems();
                    if (newItems) {
                        _this.props.onChange(newItems);
                    }
                });
            }
        };
        _this.handleDragEnd = function () {
            _this.setState({ draggedId: -1, hoveredId: -1 });
            _this.props.onDragEnd();
        };
        _this.assertValidItem = function (item) {
            if (item) {
                if (typeof item !== 'object') {
                    throw "RLDD Error. item must be of type 'object', but it's of type '" + typeof item + "'.";
                }
                if (typeof item.id !== 'number') {
                    throw "RLDD Error. item must have an 'id' property of type 'number'. " + JSON.stringify(item);
                }
            }
        };
        _this.logic = new RLDDLogic_1.default(props.threshold, props.dragDelay);
        return _this;
    }
    RLDD.prototype.componentDidMount = function () {
        this.logic.onDragBeginSignal.addListener(this.handleDragBegin);
        this.logic.onDragHoverSignal.addListener(this.handleMouseOver);
        this.logic.onDragEndSignal.addListener(this.handleDragEnd);
    };
    RLDD.prototype.componentWillUnmount = function () {
        this.logic.onDragBeginSignal.removeListener(this.handleDragBegin);
        this.logic.onDragHoverSignal.removeListener(this.handleMouseOver);
        this.logic.onDragEndSignal.removeListener(this.handleDragEnd);
    };
    RLDD.prototype.getStateString = function (props, state) {
        return "draggedId: " + state.draggedId + "\nhoveredId: " + state.hoveredId + "\nitems: " + props.items.map(function (item) { return item.id; }).toString();
    };
    RLDD.prototype.render = function () {
        var cssClasses = this.props.cssClasses + ' dl-list';
        var style = this.computeStyle();
        var items = this.props.items;
        return (React.createElement("div", { className: cssClasses, style: style },
            items.map(this.createItemComponent),
            this.createFloatingComponent()));
    };
    RLDD.prototype.computeStyle = function () {
        var display = this.props.layout === 'vertical' ? 'block' : 'flex';
        return Object.assign({ display: display }, this.props.inlineStyle || {});
    };
    RLDD.prototype.getNewItems = function () {
        var index0 = this.findItemIndexById(this.state.draggedId);
        var index1 = this.findItemIndexById(this.state.hoveredId);
        if (index0 >= 0 && index1 >= 0 && index0 !== index1) {
            var newItems = this.logic.arrangeItems(this.props.items, index0, index1);
            return newItems;
        }
        return;
    };
    RLDD.prototype.findItemIndexById = function (id) {
        var item = this.props.items.find(function (it) { return it.id === id; });
        return item ? this.props.items.indexOf(item) : -1;
    };
    RLDD.defaultProps = {
        cssClasses: '',
        inlineStyle: {},
        layout: 'vertical',
        threshold: 15,
        dragDelay: 250
    };
    return RLDD;
}(React.Component));
exports.default = RLDD;
//# sourceMappingURL=RLDD.js.map