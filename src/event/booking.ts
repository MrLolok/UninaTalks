import { setModalDisplay } from "../modal";
import { notify } from "../notifier";
const ID = "event-booking-form";

export async function sendEventBooking(): Promise<void> {
    const params = new URLSearchParams(window.location.search);
    const event = params.get("id");
    if (!event) {
        notify("Evento non trovato.", 5000, true);
        return;
    }

    const form: HTMLFormElement = document.getElementById(ID) as HTMLFormElement;
    if (!form) {
        console.warn(`Unable to find form with ID ${ID}`);
        return;
    }
    const content = new URLSearchParams(new FormData(form) as any);
    content.append("event", event);
    let del: Array<string> = [];
    content.forEach((value: string, key: string) => {
        if (value == '')
            del.push(key);
    });
    del.forEach((key: string) => content.delete(key));
    if (!content.has("fullname")) {
        notify("Inserisci il tuo nome completo.", 5000, true);
        return;
    }
    if (!content.has("email")) {
        notify("Inserisci la tua email.", 5000, true);
        return;
    }
    form.reset();
    setModalDisplay('event-booking-modal', false);
    fetch('booking.php', {
        method: 'POST',
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        },
        body: content
    }).then((response) => {
        if (response.ok)
            notify("Prenotazione inviata! Riceverai una conferma via email entro 48h.", 5000, false);
    })
}