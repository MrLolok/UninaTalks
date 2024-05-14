/** STYLES **/
import "../style/style.scss";

/** IMPORTS **/
import { setAnchorsLink } from "../anchors"
import { setModalDisplay, addModalCloseListener } from "../modal"
import { sendEventBooking } from "./booking"

/** INITIALIZE AND REGISTER FUNCTIONS */
const MODAL_ID = "event-booking-modal";
addModalCloseListener(MODAL_ID);
setAnchorsLink();
declare global {
    interface Window {
        setModalDisplay: any,
        sendEventBooking: any
    }
}

window.onload = () => {
    window.setModalDisplay = setModalDisplay;
    window.sendEventBooking = sendEventBooking;
};