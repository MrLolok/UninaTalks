export function notify(message: string, duration: number, error: boolean): void {
    // @ts-ignore
    Toastify({
        text: message,
        duration: duration,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: `linear-gradient(to right, rgb(${error ? "255, 95, 109" : "45, 157, 136"}), rgb(${error ? "189, 57, 17" : "122, 207, 122"}))`
        },
    }).showToast();
}