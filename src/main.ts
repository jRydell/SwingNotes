import axios from "axios";
import baseUrl from "./API/apiConfig";
import { Note, ApiResponse, ApiError } from "./types/interfaces";

const btnShowNote = document.querySelector(".form__btnShowNote") as HTMLElement; 
// let user = "";

async function postNote() {
  const inputNoteTitle = document.querySelector('.form__title') as HTMLInputElement;
  const inputNoteBody = document.querySelector('.form__note') as HTMLInputElement;
  const inputUserName = document.querySelector('.form__user') as HTMLInputElement;
  const formBtn = document.querySelector('.form__btn') as HTMLElement;

  formBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const note = {
      username: inputUserName.value,
      title: inputNoteTitle.value,
      note: inputNoteBody.value,
    } as Note;

    try {
      await axios.post(`${baseUrl}/api/notes`, note);

      getNotes(note.username);
    } catch (error) {
      console.error("Failed to post note:", error);
    }
  });

  btnShowNote.addEventListener("click", (e) => {
    e.preventDefault();
    getNotes(inputUserName.value);
  });
}

async function getNotes(username: string) {
  const url = `${baseUrl}/api/notes/${username}`;

  try {
    const response = await axios.get<ApiResponse | ApiError>(url);

    if ('notes' in response.data) {
      const notes: Note[] = response.data.notes;
      displayNotes(notes);
    } else {
      console.error('Failed to get notes:', response.data.message);
    }
    
    // user = username;
  } catch (error) {
    console.log(error);
  }
}

function displayNotes(notes: Note[]) {
  const notesArticle = document.querySelector(".notes-article") as HTMLElement;

  notesArticle.innerHTML = "";

  notes.forEach((note) => {
    const newNotes = document.createElement("article");

    newNotes.setAttribute("note-id", note.id);
    newNotes.setAttribute("note-tile", note.title);
    newNotes.setAttribute("note-note", note.note);
    newNotes.setAttribute("note-username", note.username);
    newNotes.innerHTML = `<h2 class="name">${note.username}</h2>
            <h3 class="title">${note.title}</h3>
            <p class="text">${note.note}</p>            
            <button class="deleteBtn Btn">Delete Note</button>
            <button class="updateBtn Btn">Update Note</button>`;

    notesArticle.appendChild(newNotes);
  });

  // console.log(user);

  document.querySelectorAll(".deleteBtn").forEach((deleteButton) => {
    deleteButton.addEventListener("click", () => {
      const parentNode = deleteButton.parentNode as HTMLElement;
      const noteID = parentNode?.getAttribute("note-id");
      deleteNote(noteID);
      parentNode?.remove();
    });
  });

  document.querySelectorAll(".updateBtn").forEach((updateButton) => {
    updateButton.addEventListener("click", () => {
      const parentNode = updateButton.parentNode as HTMLElement;
      const noteID = parentNode?.getAttribute("note-id");
      const noteTitle = parentNode?.getAttribute("note-title");
      const noteNewNote = parentNode?.getAttribute("note-note");
      const noteUsername = parentNode?.getAttribute("note-username");

      const updatedNote = {
        username: noteUsername,
        title: noteTitle,
        note: noteNewNote,
        id: noteID,
      } as Note;

      updateNote(updatedNote);
    });
  });
}

async function updateNote(data: Note | null) {
  if (!data) {
    console.error("Missing parameters for updating note.");
    return;
  }

  try {
    const updatedNote = prompt("Enter updated note:", data.note);

    if (updatedNote !== null) {
      await axios.put(
        `${baseUrl}/api/notes/${data.id}`,
        { note: updatedNote }
      );

      getNotes(data.username);
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteNote(id: string | null) {
  const URL = `${baseUrl}/api/notes/${id}`;
  try {
    await axios.delete(URL);
  } catch (error) {
    console.log(error);
  }
}

postNote();