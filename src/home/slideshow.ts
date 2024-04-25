const DELAY = 15_000;
let slide = 1;

const getSlideChangeTask = (): NodeJS.Timeout => {
    return setTimeout(() => showSlide(++slide), DELAY);
}
let runnable: NodeJS.Timeout = getSlideChangeTask();

export const changeSlideIndex = (index: number): void => {
    showSlide(slide += index);
    if (runnable)
        clearTimeout(runnable);
    runnable = getSlideChangeTask();
}

export const setSlideIndex = (index: number): void => {
    showSlide(slide = index);
    if (runnable)
        clearTimeout(runnable);
    runnable = getSlideChangeTask();
}

export const setSlidesCounter = (): void => {
    const slides: HTMLCollectionOf<Element> = document.getElementsByClassName("slide");
    const total: number = slides.length;
    for (let i = 0; i < total; i++) {
        const index: Element = slides[i].getElementsByClassName("index")[0];
        index.innerHTML = `${i + 1} / ${total}`;
    }
}

export const setSlidesRedirect = (): void => {
    const slides: HTMLCollectionOf<Element> = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        const element: HTMLElement = slides[i] as HTMLElement;
        const redirect: string | null = element.getAttribute("data-redirect");
        if (redirect)
            element.onclick = () => window.location.href = redirect;
    }
}

export const setSlidesChangeButtons = (): void => {
    const dots: HTMLElement | null = document.getElementById("slides-dots");
    if (!dots) return;
    const slides: HTMLCollectionOf<Element> = document.getElementsByClassName("slide");
    const total: number = slides.length;
    if (total < 2) return;
    for (let i = 0; i < total; i++) {
        const dot: HTMLSpanElement = document.createElement("span");
        dot.classList.add("dot");
        dot.setAttribute("onclick", `setSlideIndex(${i})`);
        dots.appendChild(dot);
    }
}

export const showSlide = (index: number): void => {
    const slides: HTMLCollectionOf<Element> = document.getElementsByClassName("slide");
    const info: HTMLCollectionOf<Element> = document.getElementsByClassName("slide-info");
    const dots: HTMLCollectionOf<Element> = document.getElementsByClassName("dot");
    if (index >= slides.length)
        slide = 0;
    else if (index < 0)
        slide = slides.length;

    // Reset
    for (let i = 0; i < slides.length; i++) {
        (slides[i] as HTMLElement).style.display = "none";
        const current_info: HTMLElement = info[i] as HTMLElement;
        if (current_info)
            current_info.style.display = "none";
    }
    for (let i = 0; i < dots.length; i++)
        dots[i].classList.remove("active");

    // Show components
    const active_dot: HTMLElement = dots[slide] as HTMLElement;
    if (active_dot)
        active_dot.classList.add("active");
    const active_info: HTMLElement = info[slide] as HTMLElement;
    if (active_info)
        active_info.style.display = "block";

    const active_slide: HTMLElement = slides[slide] as HTMLElement;
    active_slide.style.display = "block";
    const redirect = active_slide.getAttribute("data-redirect");
    if (redirect) {
        const button: HTMLButtonElement = document.getElementById("view-seminar-button") as HTMLButtonElement;
        button.onclick = () => window.location.href = redirect;
    }
}