import axios from "axios";
import { Note } from "../types/interfaces";
import baseUrl from "./apiConfig";
import { getNotes } from "./apiGet";

export async function updateNote(data: Note | null) {
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