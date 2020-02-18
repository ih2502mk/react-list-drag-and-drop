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
require("./RLDDFloatingItem.css");
var RLDDFloatingItemComponent = (function (_super) {
    __extends(RLDDFloatingItemComponent, _super);
    function RLDDFloatingItemComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { offsetX: 0, offsetY: 0 };
        _this.refresh = function (id, offset) {
            _this.setState({ offsetX: offset.x, offsetY: offset.y });
        };
        return _this;
    }
    RLDDFloatingItemComponent.prototype.componentDidMount = function () {
        this.props.logic.setFloatingItemBoxRect(this.getBox());
        this.props.logic.onDragMoveSignal.addListener(this.refresh);
    };
    RLDDFloatingItemComponent.prototype.componentDidUpdate = function () {
        this.props.logic.setFloatingItemBoxRect(this.getBox());
    };
    RLDDFloatingItemComponent.prototype.componentWillUnmount = function () {
        this.props.logic.onDragMoveSignal.removeListener(this.refresh);
    };
    RLDDFloatingItemComponent.prototype.render = function () {
        if (this.props.draggedId >= -1) {
            return (React.createElement("div", { className: "dl-item floating", style: {
                    pointerEvents: 'none',
                    position: 'absolute',
                    left: this.state.offsetX,
                    top: this.state.offsetY,
                    width: this.props.width,
                    height: this.props.height
                } }, this.props.children));
        }
        else {
            return undefined;
        }
    };
    RLDDFloatingItemComponent.prototype.getBox = function () {
        var ref = ReactDOM.findDOMNode(this);
        return ref ? ref.getBoundingClientRect() : { top: 0, left: 0, width: 0, height: 0 };
    };
    return RLDDFloatingItemComponent;
}(React.Component));
exports.default = RLDDFloatingItemComponent;
//# sourceMappingURL=RLDDFloatingItemComponent.js.map