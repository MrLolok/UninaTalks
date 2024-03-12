/** STYLES **/
import "../style/style.scss";

/** IMPORTS **/
import { setModalDisplay } from "./modal"
import { sendContactMessage } from "./contact"
import { sendSeminarProposal } from "./seminar"
import { changeSlideIndex, setSlideIndex, setSlidesCounter, showSlide } from "./slideshow"

/** INITIALIZE AND REGISTER FUNCTIONS */
setSlidesCounter();
declare global {
    interface Window {
        setModalDisplay: any
        sendContactMessage: any
        sendSeminarProposal: any
        changeSlideIndex: any;
        setSlideIndex: any;
    }
}

window.onload = () => {
    window.setModalDisplay = setModalDisplay;
    window.sendContactMessage = sendContactMessage;
    window.sendSeminarProposal = sendSeminarProposal;
    window.changeSlideIndex = changeSlideIndex;
    window.setSlideIndex = setSlideIndex;
    showSlide(1);
};