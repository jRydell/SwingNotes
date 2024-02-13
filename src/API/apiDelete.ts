import axios from "axios";
import baseUrl from "./apiConfig";

export async function deleteNote(id: string | null) {
    const URL = `${baseUrl}/api/notes/${id}`;
    try {
      await axios.delete(URL);
    } catch (error) {
      console.log(error);
    }
  }