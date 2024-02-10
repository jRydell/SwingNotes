import axios from "axios";
import baseUrl from "./API/apiConfig";
import { Note, ApiResponse } from "./types/interfaces";

// Select the button used to show notes
const btnShowNote = document.querySelector(".form__btnShowNote") as HTMLElement;
let user: string = "";

// Function to handle posting a note
async function postNote() {
  const formTitle = document.querySelector(".form__title") as HTMLInputElement;
  const formNote = document.querySelector(".form__note") as HTMLInputElement;
  const formUser = document.querySelector(".form__user") as HTMLInputElement;
  const formBtn = document.querySelector(".form__btn") as HTMLElement;

  formBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const note = {
      username: formUser.value,
      title: formTitle.value,
      note: formNote.value,
    } as Note;

    try {
      await axios.post(`${baseUrl}/api/notes`, note, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Immediately fetch and display notes after adding a new note
      getNotes(note.username);
    } catch (error) {
      console.error("Failed to post note:", error);
    }
  });

  // Event listener to show notes
  btnShowNote.addEventListener("click", (e) => {
    e.preventDefault();
    // Fetch and display notes immediately when the button is clicked
    getNotes(formUser.value);
  });
}

// Function to fetch notes from the API
async function getNotes(username: string) {
  const url = `${baseUrl}/api/notes/${username}`;
// Rätta till generic o ta borta gammal json skit
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const notes: Note[] = response.data.notes;
// Rätta till generic o ta borta gammal json skit
    displayNotes(notes);

    user = username;
  } catch (error) {
    console.log(error);
  }
}

// Function to display notes on the page
function displayNotes(notes: Note[]) {
  const notesArticle = document.querySelector(".notes-article") as HTMLElement;

  // Clear existing notes
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

      const note = {
        username: noteUsername,
        title: noteTitle,
        note: noteNewNote,
        id: noteID,
      } as Note;

      // Call the updateNote function with the note ID
      updateNote(note);
    });
  });
}
// RÃ¤tta till axios o ta borta gammal json skit
// Function to update a note
async function updateNote(data: Note | null) {
  if (!data) {
    console.error("Missing parameters for updating note.");
    return;
  }

  try {
    // Fetch the current note based on the id
    // const response = await axios.get(`${baseUrl}/api/notes/${data.username}`, {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    // });
    // console.log(data.id);
    // const originalNoteData = response.data.notes;
    // const username = originalNoteData.username;
    // const currentNote = originalNoteData.note;

    // Prompt the user to enter the updated note
    const updatedNote = prompt("Enter updated note:", data.note);

    if (updatedNote !== null) {
      // Send PUT request with the updated content
      await axios.put(
        `${baseUrl}/api/notes/${data.id}`,
        { note: updatedNote },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Fetch and display updated notes after changes in the API
      // console.log(note.username);
      getNotes(data.username);
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to delete a note
async function deleteNote(id: string | null) {
  const URL = `${baseUrl}/api/notes/${id}`;
  try {
    await axios.delete(URL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
}

// Call postNote to start application
postNote();