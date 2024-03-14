/** STYLES **/
import "../style/style.scss";

/** IMPORTS **/
import { setAnchorsLink } from "../anchors"
import { setModalDisplay, addModalCloseListener } from "../modal"
import { sendSeminarBooking } from "./booking"

/** INITIALIZE AND REGISTER FUNCTIONS */
const MODAL_ID = "seminar-booking-modal";
addModalCloseListener(MODAL_ID);
setAnchorsLink();
declare global {
    interface Window {
        setModalDisplay: any,
        sendSeminarBooking: any
    }
}

window.onload = () => {
    window.setModalDisplay = setModalDisplay;
    window.sendSeminarBooking = sendSeminarBooking;
};