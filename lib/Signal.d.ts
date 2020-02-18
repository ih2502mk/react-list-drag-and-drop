export default class Signal {
    private listeners;
    constructor();
    addListener(listener: any): void;
    removeListener(listener: any): void;
    dispatch(...args: any[]): void;
}
