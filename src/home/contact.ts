import { notify } from "../notifier";
const ID = "contact-form";
export async function sendContactMessage(): Promise<void> {
    const form: HTMLFormElement = document.getElementById(ID) as HTMLFormElement;
    if (!form) {
        console.warn(`Unable to find form with ID ${ID}`);
        return;
    }
    const content = new URLSearchParams(new FormData(form) as any);
    let del: Array<string> = [];
    content.forEach((value: string, key: string) => {
        if (value == '')
            del.push(key);
    });
    del.forEach((key: string) => content.delete(key));
    if (!content.has("name") || !content.has("surname")) {
        notify("Inserisci il tuo nome completo.", 5000, true);
        return;
    }
    if (!content.has("email")) {
        notify("Inserisci la tua email.", 5000, true);
        return;
    }
    if (!content.has("message")) {
        notify("Inserisci un messaggio.", 5000, true);
        return;
    }
    form.reset();
    fetch('contacts.php', {
        method: 'POST',
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        },
        body: content
    }).then((response) => {
        if (response.ok)
            notify("Messaggio inviato! Risponderemo entro 48h.", 5000, false);
    })
}