import axios from "axios";
import baseUrl from "./apiConfig";

// Function to delete a note by its ID
export async function deleteNote(id: string | null) {
    // Construct the URL for the delete request
    const URL = `${baseUrl}/api/notes/${id}`;
    try {
      // Send a DELETE request to the API to delete a note
      await axios.delete(URL);
    } catch (error) {
      // Log any errors that may occur during the request
      console.log(error);
    }
}