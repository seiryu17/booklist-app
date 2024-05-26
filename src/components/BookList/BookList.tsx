import React from "react";
import BookCard from "../BookCard/BookCard";
import { Book } from "../../types/Book";

interface BookListProps {
  books: Book[];
  localBooks: Book[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
  onEditBook: (updatedBook: Book) => void;
}

const BookList: React.FC<BookListProps> = ({
  books,
  favorites,
  localBooks,
  onToggleFavorite,
  onDelete,
  onEditBook,
}) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isFavorite={favorites.includes(book.id)}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDelete}
          onEditBook={onEditBook}
          localBooks={localBooks}
        />
      ))}
    </div>
  );
};

export default BookList;
