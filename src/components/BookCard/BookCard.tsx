import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Book } from "../../types/Book";
import "./BookCard.scss";
import EditBookForm from "../EditBookForm/EditBookForm";

interface BookCardProps {
  book: Book;
  localBooks: Book[];
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
  onEditBook: (updatedBook: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  localBooks,
  isFavorite,
  onToggleFavorite,
  onDelete,
  onEditBook,
}) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSaveEdit = (book: Book) => {
    onEditBook(book);
    setIsEdit(false);
  };

  const isLocalBook =
    localBooks && localBooks.some((b: Book) => b.id === book.id);

  return (
    <div className="book-card">
      {isEdit ? (
        <EditBookForm
          book={book}
          onEditBook={handleSaveEdit}
          onCancel={() => setIsEdit(false)}
        />
      ) : (
        <>
          <img src={book.cover} alt={book.title} className="book-cover" />
          <div className="book-info">
            <h3>{book.title}</h3>
            <p>by {book.author}</p>
            <p>{book.description}</p>
            <p>
              Published on:{" "}
              {new Date(book.publicationDate).toLocaleDateString()}
            </p>
            <div className="book-actions">
              <FontAwesomeIcon
                icon={faHeart}
                className={`favorite-icon ${isFavorite ? "favorite" : ""}`}
                onClick={() => onToggleFavorite(book.id)}
              />
              <Link to={`/book/${book.id}`} className="btn secondary">
                View Details
              </Link>
              <button
                onClick={() => onDelete(book.id)}
                disabled={!isLocalBook && true}
                className={`btn delete-btn ${!isLocalBook ? "disabled" : ""}`}
              >
                Delete
              </button>
              <button
                onClick={handleEdit}
                disabled={!isLocalBook && true}
                className={`btn edit-btn ${!isLocalBook ? "disabled" : ""}`}
              >
                Edit
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BookCard;
