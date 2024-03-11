const ID: string = "seminar-modal";
const modal: HTMLElement | null = document.getElementById(ID);

export const setModalDisplay = (show: boolean): void => {
    if (!modal) {
        console.warn(`Unable to find modal with ID ${ID}`);
        return;
    }
    if (show)
        modal.style.display = "block";
    else
        modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == modal)
        setModalDisplay(false);
}