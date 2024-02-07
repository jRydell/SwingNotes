// Define an interface for the note object
interface Note {
    id: string;
    username: string;
    title: string;
    note: string;
}

// Define the base URL for the API
const baseUrl = 'https://o6wl0z7avc.execute-api.eu-north-1.amazonaws.com';

// Select the button used to show notes
const btnShowNote = document.querySelector('.form__btnShowNote') as HTMLElement;

// Function to handle posting a note
function postNote() {
    let formTitle = document.querySelector('.form__title') as HTMLInputElement;
    let formNote = document.querySelector('.form__note') as HTMLInputElement;
    let formUser = document.querySelector('.form__user') as HTMLInputElement;
    let formBtn = document.querySelector('.form__btn') as HTMLElement;

    

    formBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        let note = {
            username: formUser.value,
            title: formTitle.value,
            note: formNote.value
        } as Note;

        let response = await fetch(`${baseUrl}/api/notes`, {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        await response.json();    

        getNotes(note.username);
    });
}
postNote();

// Function to fetch notes from the API
async function getNotes(username: string) {
    const url = `${baseUrl}/api/notes/${username}`;

    try {
        let response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();

        let notes: Note[] = data.notes;
        displayNotes(notes);

    } catch (error) {
        console.log(error);
    }
}

// Function to display notes on the page
function displayNotes(notes: Note[]) {
    let notesArticle = document.querySelector('.notes-article') as HTMLElement;

    // Clear existing notes
    notesArticle.innerHTML = '';

    notes.forEach(note => {
        let newNotes = document.createElement('article');

        newNotes.setAttribute('note-id', note.id);
        newNotes.innerHTML = `<h2 class="name">${note.username}</h2>
            <h3 class="title">${note.title}</h3>
            <p class="text">${note.note}</p>
            <button class="deletebtn" id="deletebtn">Delete Note</button>`;

        notesArticle.appendChild(newNotes);
    });

    document.querySelectorAll('.deletebtn').forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
            const parentNode = deleteButton.parentNode as HTMLElement;
            const noteID = parentNode?.getAttribute('note-id');
            deleteNote(noteID);
            parentNode?.remove();
        });
    });
    
}
// Function to delete a note
async function deleteNote(id: string | null) {
    const URL = `${baseUrl}/api/notes/${id}`;
    try {
        let response = await fetch(URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });

       await response.json();

    } catch (error) {
        console.log(error);
    }
 }