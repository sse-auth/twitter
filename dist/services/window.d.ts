interface OpenWindow {
    url: string;
    name?: string;
}
export declare const openWindow: ({ url, name }: OpenWindow) => Window | null;
interface ObserveWindow {
    popup: Window;
    interval?: number;
    onClose: () => void;
}
export declare const observeWindow: ({ popup, interval, onClose }: ObserveWindow) => void;
export {};
