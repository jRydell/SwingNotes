// Import necessary modules and interfaces
import axios from "axios";
import baseUrl from "./apiConfig";
import { Note } from "../types/interfaces";
import { getNotes } from "./apiGet";

// Function to send a POST request to create a new note
export async function postNote() {
    // Get references to HTML elements
    const btnShowNote = document.querySelector(".form__btnShowNote") as HTMLElement;
    const inputNoteTitle = document.querySelector('.form__title') as HTMLInputElement;
    const inputNoteBody = document.querySelector('.form__note') as HTMLInputElement;
    const inputUserName = document.querySelector('.form__user') as HTMLInputElement;
    const formBtn = document.querySelector('.form__btn') as HTMLElement;

    // Add an event listener for the form submit button
    formBtn.addEventListener("click", async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Create a new Note object based on form inputs
        const note = {
            username: inputUserName.value,
            title: inputNoteTitle.value,
            note: inputNoteBody.value,
        } as Note;

        try {
            // Send a POST request to the API to create a new note
            await axios.post(`${baseUrl}/api/notes`, note);

            // After posting the note, fetch and display all notes for the given username
            getNotes(note.username);
        } catch (error) {
            // Log an error message if the POST request fails
            console.error("Failed to post note:", error);
        }
    });

    // Add an event listener for the "Show Notes" button
    btnShowNote.addEventListener("click", (e) => {
        // Prevent the default button click behavior
        e.preventDefault();

        // Fetch and display all notes for the given username
        getNotes(inputUserName.value);
    });
}