export const setModalDisplay = (id: string, show: boolean): void => {
    const modal: HTMLElement | null = document.getElementById(id);
    if (!modal) {
        console.warn(`Unable to find modal with ID ${id}`);
        return;
    }
    if (show)
        modal.style.display = "flex";
    else
        modal.style.display = "none";
}

export const addModalCloseListener = (id: string): void => {
    const modal: HTMLElement | null = document.getElementById(id);
    window.onclick = (event) => {
        if (event.target == modal)
            setModalDisplay(id, false);
    }
}