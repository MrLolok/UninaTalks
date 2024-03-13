const ID: string = "seminar-creation-modal";
const modal: HTMLElement | null = document.getElementById(ID);

export const setModalDisplay = (show: boolean): void => {
    if (!modal) {
        console.warn(`Unable to find modal with ID ${ID}`);
        return;
    }
    if (show)
        modal.style.display = "flex";
    else
        modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == modal)
        setModalDisplay(false);
}