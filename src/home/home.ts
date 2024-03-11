/** STYLES **/
import "../style/style.scss";

/** IMPORTS **/
import { setModalDisplay } from "./modal"
import { sendContactMessage } from "./contact"
import { changeSlideIndex, setSlideIndex, showSlide } from "./slideshow"

/** INITIALIZE AND REGISTER FUNCTIONS */
declare global {
    interface Window {
        setModalDisplay: any
        sendContactMessage: any
        changeSlideIndex: any;
        setSlideIndex: any;
    }
}

window.onload = () => {
    window.setModalDisplay = setModalDisplay;
    window.sendContactMessage = sendContactMessage;
    window.changeSlideIndex = changeSlideIndex;
    window.setSlideIndex = setSlideIndex;
    showSlide(1);
};