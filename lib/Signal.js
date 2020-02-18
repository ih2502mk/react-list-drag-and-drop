"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Signal = (function () {
    function Signal() {
        this.listeners = [];
    }
    Signal.prototype.addListener = function (listener) {
        this.listeners.push(listener);
    };
    Signal.prototype.removeListener = function (listener) {
        var index = this.listeners.indexOf(listener);
        if (index >= 0) {
            this.listeners.splice(index, 1);
        }
    };
    Signal.prototype.dispatch = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.listeners.forEach(function (listener) {
            listener.apply(void 0, args);
        });
    };
    return Signal;
}());
exports.default = Signal;
//# sourceMappingURL=Signal.js.map