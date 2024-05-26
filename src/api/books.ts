import axios from "axios";
import { Book } from "../types/Book";

const BASE_URL = "https://my-json-server.typicode.com/cutamar/mock/books";

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const fetchBookById = async (id: number): Promise<Book> => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};
