import { Note, ApiError, ApiResponse } from "../types/interfaces";
import baseUrl from "./apiConfig";
import axios from "axios";
import { displayNotes } from "./apiDisplay";


export async function getNotes(username: string) {
    const url = `${baseUrl}/api/notes/${username}`;
  
    try {
      const response = await axios.get<ApiResponse | ApiError<string, number>>(url);
  
      if ('notes' in response.data) {
        const notes: Note[] = response.data.notes;
        displayNotes(notes);
        console.log("Retrieved and displayed notes",response);
      } else {
        console.error('Failed to get notes:', response.data.message);
      }
      
      
    } catch (error) {
      console.log(error);
    }
  }