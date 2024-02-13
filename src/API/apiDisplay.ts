import { Note } from "../types/interfaces";
import { deleteNote } from "./apiDelete";
import { updateNote } from "./apiPut";

export function displayNotes(notes: Note[]) {
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