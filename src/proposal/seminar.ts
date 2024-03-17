import { setModalDisplay } from "../modal";
import { notify } from "../notifier";
const ID = "seminar-creation-form";
export async function sendSeminarProposal(): Promise<void> {
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
    if (!content.has("fullname")) {
        notify("Inserisci il tuo nome completo.", 5000, true);
        return;
    }
    if (!content.has("phone")) {
        notify("Inserisci il tuo numero di telefono.", 5000, true);
        return;
    }
    if (!content.has("email")) {
        notify("Inserisci la tua email.", 5000, true);
        return;
    }
    if (!content.has("title")) {
        notify("Inserisci un titolo.", 5000, true);
        return;
    }
    if (!content.has("arguments")) {
        notify("Inserisci gli argomenti.", 5000, true);
        return;
    }
    if (!content.has("description")) {
        notify("Inserisci una descrizione.", 5000, true);
        return;
    }
    form.reset();
    setModalDisplay('seminar-proposal-modal', false);
    fetch('seminars.php', {
        method: 'POST',
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        },
        body: content
    }).then((response) => {
        if (response.ok)
            notify("Proposta inviata! Ti ricontatteremo il prima possibile.", 5000, false);
    })
}