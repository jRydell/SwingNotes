// Import necessary interfaces and functions
import { Note, ApiError, ApiResponse } from "../types/interfaces";
import baseUrl from "./apiConfig";
import axios from "axios";
import { displayNotes } from "./apiDisplay";

// Function to fetch notes from the API based on a given username
export async function getNotes(username: string) {
    // Construct the URL for the get request
    const url = `${baseUrl}/api/notes/${username}`;

    try {
        // Send a GET request to the API to retrieve notes
        const response = await axios.get<ApiResponse | ApiError<string, number>>(url);

        // Check if the response contains notes
        if ('notes' in response.data) {
            // Extract notes from the response data
            const notes: Note[] = response.data.notes;
            console.log(response);
            // Call the displayNotes function to render notes on the webpage
            displayNotes(notes);
        } else {
            // Log an error if failed to get notes
            console.error('Failed to get notes:', response.data.message);
        }
    } catch (error) {
        // Log any errors that may occur during the request
        console.log(error);
    }
}
