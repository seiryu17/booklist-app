import React from "react";
import { Book } from "../../types/Book";
import "./BookDetails.scss";

interface BookDetailsProps {
  book: Book;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  return (
    <div className="book-details-container">
      <div className="wrapper">
        <h1>Book Detail</h1>
        <div className="book-details">
          <img src={book.cover} alt={book.title} className="book-cover" />
          <div className="book-info">
            <h2>{book.title}</h2>
            <p className="author">by {book.author}</p>
            <p className="description">{book.description}</p>
            <p className="publication-date">
              Published on:{" "}
              {new Date(book.publicationDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
