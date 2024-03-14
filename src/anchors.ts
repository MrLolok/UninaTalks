export const setAnchorsLink = (): void => {
    const anchors: HTMLCollectionOf<Element> = document.getElementsByTagName("a");
    Array.from(anchors).forEach(anchor => {
        const element: HTMLAnchorElement = anchor as HTMLAnchorElement;
        element.onclick = event => {
            console.log(element.href);
            if (element.href.indexOf("#") >= 0) {
                event.preventDefault();
                element.href = `${location.protocol}//${location.host}${element.href.substring(element.href.indexOf("#"))}`
                location.href = element.href;
            }
        }
    });
}