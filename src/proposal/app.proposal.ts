/** STYLES **/
import "../style/style.scss";

/** IMPORTS **/
import { setAnchorsLink } from "../anchors"
import { setModalDisplay, addModalCloseListener } from "../modal"
import { sendSeminarProposal } from "./seminar"

const setRoadmap = (): void => {
    if (screen.width <= 480) {
        const image: HTMLImageElement = document.getElementById("roadmap") as HTMLImageElement;
        image.src = "assets/images/roadmap-mobile.svg";
    }
}

/** INITIALIZE AND REGISTER FUNCTIONS */
const MODAL_ID = "seminar-proposal-modal";
addModalCloseListener(MODAL_ID);
// Navigation anchors
setAnchorsLink();

declare global {
    interface Window {
        setModalDisplay: any
        sendSeminarProposal: any
    }
}

window.onload = () => {
    window.setModalDisplay = setModalDisplay;
    window.sendSeminarProposal = sendSeminarProposal;
    setRoadmap();
};

window.onresize = () => setRoadmap();