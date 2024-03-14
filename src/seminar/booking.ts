import { notify } from "../notifier";
const ID = "seminar-booking-form";

export async function sendSeminarBooking(): Promise<void> {
    const params = new URLSearchParams(window.location.search);
    const seminar = params.get("id");
    if (!seminar) {
        notify("Seminario non trovato.", 5000, true);
        return;
    }

    const form: HTMLFormElement = document.getElementById(ID) as HTMLFormElement;
    if (!form) {
        console.warn(`Unable to find form with ID ${ID}`);
        return;
    }
    const content = new URLSearchParams(new FormData(form) as any);
    content.append("seminar", seminar);
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
    if (!content.has("phone")) {
        notify("Inserisci il tuo numero di telefono.", 5000, true);
        return;
    }
    form.reset();
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