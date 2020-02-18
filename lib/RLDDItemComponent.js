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
var ReactDOM = require("react-dom");
var RLDDItemComponent = (function (_super) {
    __extends(RLDDItemComponent, _super);
    function RLDDItemComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { isDragging: false };
        _this.isDown = false;
        _this.mouseDownTimestamp = 0;
        _this.initialOffset = { x: 0, y: 0 };
        _this.handleMouseDown = _this.handleMouseDown.bind(_this);
        _this.handleMouseMove = _this.handleMouseMove.bind(_this);
        _this.handleMouseUp = _this.handleMouseUp.bind(_this);
        return _this;
    }
    RLDDItemComponent.prototype.componentDidMount = function () {
        this.props.logic.setItemIdBoxRect(this.props.itemId, this.getBox());
    };
    RLDDItemComponent.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (!this.state.isDragging && prevState.isDragging) {
            this.removeDocumentListeners();
        }
        this.props.logic.setItemIdBoxRect(this.props.itemId, this.getBox());
    };
    RLDDItemComponent.prototype.componentWillUnmount = function () {
        this.removeDocumentListeners();
    };
    RLDDItemComponent.prototype.render = function () {
        var dragged = this.props.dragged ? 'dragged' : '';
        var hovered = this.props.hovered ? 'hovered' : '';
        var activity = this.props.activity ? 'activity' : '';
        var cssClasses = 'dl-item ' + activity + ' ' + dragged + ' ' + hovered;
        return (React.createElement("div", { onMouseDown: this.handleMouseDown, className: cssClasses }, this.props.children));
    };
    RLDDItemComponent.prototype.addDocumentListeners = function () {
        document.addEventListener('mouseup', this.handleMouseUp);
        document.addEventListener('mousemove', this.handleMouseMove);
    };
    RLDDItemComponent.prototype.removeDocumentListeners = function () {
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('mousemove', this.handleMouseMove);
    };
    RLDDItemComponent.prototype.handleMouseDown = function (e) {
        this.isDown = true;
        this.mouseDownTimestamp = new Date().getTime();
        this.initialOffset = this.getOffset(e);
        e.preventDefault();
        this.addDocumentListeners();
    };
    RLDDItemComponent.prototype.handleMouseMove = function (e) {
        if (this.isDown === false || this.getTimeSinceMouseDown() < this.props.logic.getDragDelay()) {
            return;
        }
        var offset = {
            x: e.layerX - this.initialOffset.x,
            y: e.layerY - this.initialOffset.y
        };
        if (this.state.isDragging === false && this.isDown) {
            this.props.logic.handleDragBegin(this.props.itemId);
        }
        this.setState(Object.assign(this.state, { isDragging: this.isDown }));
        this.props.logic.handleDragMove(this.props.itemId, offset);
    };
    RLDDItemComponent.prototype.getTimeSinceMouseDown = function () {
        return new Date().getTime() - this.mouseDownTimestamp;
    };
    RLDDItemComponent.prototype.handleMouseUp = function () {
        this.isDown = false;
        if (this.state.isDragging) {
            this.setState(Object.assign(this.state, { isDragging: this.isDown }));
            this.props.logic.handleDragEnd();
        }
    };
    RLDDItemComponent.prototype.getBox = function () {
        var ref = ReactDOM.findDOMNode(this);
        return ref ? ref.getBoundingClientRect() : { top: 0, left: 0, width: 0, height: 0 };
    };
    RLDDItemComponent.prototype.getOffset = function (e) {
        var box = this.getBox();
        var docElement = document.documentElement;
        return {
            x: e.pageX - (box.left + docElement.scrollLeft - docElement.clientLeft),
            y: e.pageY - (box.top + docElement.scrollTop - docElement.clientTop)
        };
    };
    return RLDDItemComponent;
}(React.Component));
exports.default = RLDDItemComponent;
//# sourceMappingURL=RLDDItemComponent.js.map