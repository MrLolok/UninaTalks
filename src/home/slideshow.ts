const DELAY = 5000;
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
    for (let i = 0; i < slides.length; i++) {
        const index: Element = slides[i].getElementsByClassName("index")[0];
        index.innerHTML = `${i + 1} / ${total}`;
    }
}

export const showSlide = (index: number): void => {
    const slides: HTMLCollectionOf<Element> = document.getElementsByClassName("slide");
    const dots: HTMLCollectionOf<Element> = document.getElementsByClassName("dot");
    if (index > slides.length)
        slide = 1;
    else if (index < 1)
        slide = slides.length;

    for (let i = 0; i < slides.length; i++)
        (slides[i] as HTMLElement).style.display = "none";
    for (let i = 0; i < dots.length; i++)
        dots[i].classList.remove("active");
    (slides[slide-1] as HTMLElement).style.display = "block";  
    (dots[slide-1] as HTMLElement).classList.add("active");
}