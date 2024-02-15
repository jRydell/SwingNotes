// Interface for a Note object
export interface Note {
  id: string;
  username: string;
  title: string;
  note: string;
}

// Interface for a response containing an array of notes and a status code
export interface ApiResponse { 
  notes: Note[];
  status: number;
}

// Interface for an error response with a message and status code
export interface ApiError <T, D> {
  message: T;
  status: D;
}
