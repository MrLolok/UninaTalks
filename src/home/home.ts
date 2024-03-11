/** STYLES **/
import "../style/style.scss";

/** IMPORTS **/
import { sendContactMessage } from "./contact"
import { changeSlideIndex, setSlideIndex, showSlide } from "./slideshow"

/** INITIALIZE AND REGISTER FUNCTIONS */
declare global {
    interface Window {
        sendContactMessage: any
        changeSlideIndex: any;
        setSlideIndex: any;
    }
}

window.onload = () => {
    window.sendContactMessage = sendContactMessage;
    window.changeSlideIndex = changeSlideIndex;
    window.setSlideIndex = setSlideIndex;
    showSlide(1);
};