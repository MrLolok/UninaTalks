/** STYLES **/
import "../style/style.scss";

/** IMPORTS **/
import { setAnchorsLink } from "../anchors"
import { setModalDisplay, addModalCloseListener } from "../modal"
import { sendContactMessage } from "./contact"
import { sendSeminarProposal } from "./seminar"
import { changeSlideIndex, setSlideIndex, setSlidesCounter, setSlidesRedirect, showSlide } from "./slideshow"

/** INITIALIZE AND REGISTER FUNCTIONS */
const MODAL_ID = "seminar-creation-modal";
addModalCloseListener(MODAL_ID);
setSlidesCounter();
setSlidesRedirect();
setAnchorsLink();
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