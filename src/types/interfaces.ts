export interface Note {
  id: string;
  username: string;
  title: string;
  note: string;
}

export interface ApiResponse<T> {
  data: T[];
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
}
