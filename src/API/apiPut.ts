// Import necessary modules and interfaces
import axios from "axios";
import { Note } from "../types/interfaces";
import baseUrl from "./apiConfig";
import { getNotes } from "./apiGet";

// Function to update an existing note
export async function updateNote(data: Note | null) {
    // Check if data is missing
    if (!data) {
        console.error("Missing parameters for updating note.");
        return;
    }

    try {
        // Prompt the user to enter the updated note
        const updatedNote = prompt("Enter updated note:", data.note);

        // Check if the user entered a new note
        if (updatedNote !== null) {
            // Send a PUT request to the API to update the note
            await axios.put(
                `${baseUrl}/api/notes/${data.id}`,
                { note: updatedNote }
            );

            // After updating the note, fetch and display all notes for the given username
            getNotes(data.username);
        }
    } catch (error) {
        // Log any errors that may occur during the update process
        console.log(error);
    }
}