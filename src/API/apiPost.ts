import axios from "axios";
import baseUrl from "./apiConfig";
import { Note } from "../types/interfaces";
import { getNotes } from "./apiGet";

export async function postNote() {
    const btnShowNote = document.querySelector(".form__btnShowNote") as HTMLElement; 
    const inputNoteTitle = document.querySelector('.form__title') as HTMLInputElement;
    const inputNoteBody = document.querySelector('.form__note') as HTMLInputElement;
    const inputUserName = document.querySelector('.form__user') as HTMLInputElement;
    const formBtn = document.querySelector('.form__btn') as HTMLElement;
  
    formBtn.addEventListener("click", async (e) => {
      e.preventDefault();
  
      const note = {
        username: inputUserName.value,
        title: inputNoteTitle.value,
        note: inputNoteBody.value,
      } as Note;
  
      try {
        await axios.post(`${baseUrl}/api/notes`, note);
  
        getNotes(note.username);
      } catch (error) {
        console.error("Failed to post note:", error);
      }
    });
  
    btnShowNote.addEventListener("click", (e) => {
      e.preventDefault();
      getNotes(inputUserName.value);
    });
  }


