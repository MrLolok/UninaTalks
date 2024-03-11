/** STYLES **/
import "../style/style.scss";

/** SLIDESHOW **/
let slide = 1;

const changeSlideIndex = (index: number): void => {
    showSlide(slide += index);
}

const setSlideIndex = (index: number): void => {
    showSlide(slide = index);
}

const showSlide = (index: number): void => {
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

/** INITIALIZE AND REGISTER FUNCTIONS */
declare global {
    interface Window {
        changeSlideIndex: any;
        setSlideIndex: any;
    }
}

window.onload = () => {
    window.changeSlideIndex = changeSlideIndex;
    window.setSlideIndex = setSlideIndex;
    showSlide(slide);
};