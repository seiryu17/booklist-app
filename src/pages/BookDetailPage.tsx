import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchBookById } from "../api/books";
import BookDetails from "../components/BookDetails/BookDetails";
import { Book } from "../types/Book";
import { useLocalStorage } from "../hooks/useLocalStorage";

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [localBooks = []] = useLocalStorage<Book[]>("localBooks", []);
  const bookId = Number(id);

  const localBook = localBooks.find((book: Book) => book.id === bookId);

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => fetchBookById(bookId),
    enabled: !localBook && !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading book details</div>;

  return book || localBook ? (
    <BookDetails book={book || localBook!} />
  ) : (
    <div>Book not found</div>
  );
};

export default BookDetailPage;
