// Import necessary interfaces and functions
import { Note } from "../types/interfaces";
import { deleteNote } from "./apiDelete";
import { updateNote } from "./apiPut";

// Function to display notes on the webpage
export function displayNotes(notes: Note[]) {
    // Find the HTML element with the class "notes-article"
    const notesArticle = document.querySelector(".notes-article") as HTMLElement;

    // Clear the inner HTML of the notesArticle element
    notesArticle.innerHTML = "";

    // Loop through each note in the provided array
    notes.forEach((note) => {
        // Create a new article element for each note
        const newNotes = document.createElement("article");

        // Set attributes for the newNotes element based on note properties
        newNotes.setAttribute("note-id", note.id);
        newNotes.setAttribute("note-tile", note.title);
        newNotes.setAttribute("note-note", note.note);
        newNotes.setAttribute("note-username", note.username);

        // Set inner HTML for the newNotes element with note details and buttons
        newNotes.innerHTML = `
            <h2 class="name">${note.username}</h2>
            <h3 class="title">${note.title}</h3>
            <p class="text">${note.note}</p>            
            <button class="deleteBtn Btn">Delete Note</button>
            <button class="updateBtn Btn">Update Note</button>
        `;

        // Append the newNotes element to the notesArticle
        notesArticle.appendChild(newNotes);
    });

    // Add event listeners for each delete button
    document.querySelectorAll(".deleteBtn").forEach((deleteButton) => {
        deleteButton.addEventListener("click", () => {
            // Find the parent node of the delete button
            const parentNode = deleteButton.parentNode as HTMLElement;
            
            // Get the note ID attribute from the parent node
            const noteID = parentNode?.getAttribute("note-id");

            // Call the deleteNote function with the note ID
            deleteNote(noteID);

            // Remove the parent node (article) from the DOM
            parentNode?.remove();
        });
    });

    // Add event listeners for each update button
    document.querySelectorAll(".updateBtn").forEach((updateButton) => {
        updateButton.addEventListener("click", () => {
            // Find the parent node of the update button
            const parentNode = updateButton.parentNode as HTMLElement;

            // Get various attributes from the parent node
            const noteID = parentNode?.getAttribute("note-id");
            const noteTitle = parentNode?.getAttribute("note-tile");
            const noteNewNote = parentNode?.getAttribute("note-note");
            const noteUsername = parentNode?.getAttribute("note-username");

            // Create an updatedNote object with the extracted information
            const updatedNote = {
                username: noteUsername,
                title: noteTitle,
                note: noteNewNote,
                id: noteID,
            } as Note;

            // Call the updateNote function with the updatedNote object
            updateNote(updatedNote);
        });
    });
}
