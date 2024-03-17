/** STYLES **/
import "../style/style.scss";

/** IMPORTS **/
import { setAnchorsLink } from "../anchors"
import { sendContactMessage } from "./contact"
import { sendSeminarProposal } from "../proposal/seminar"
import { changeSlideIndex, setSlideIndex, setSlidesCounter, setSlidesRedirect, showSlide } from "./slideshow"

/** INITIALIZE AND REGISTER FUNCTIONS */
// Slideshow
setSlidesCounter();
setSlidesRedirect();
// Navigation anchors
setAnchorsLink();

declare global {
    interface Window {
        sendContactMessage: any
        sendSeminarProposal: any
        changeSlideIndex: any;
        setSlideIndex: any;
    }
}

window.onload = () => {
    window.sendContactMessage = sendContactMessage;
    window.sendSeminarProposal = sendSeminarProposal;
    window.changeSlideIndex = changeSlideIndex;
    window.setSlideIndex = setSlideIndex;
    showSlide(1);
};