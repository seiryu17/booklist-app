import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../api/books";
import BookList from "../components/BookList/BookList";
import Pagination from "../components/Pagination/Pagination";
import AddBookForm from "../components/AddBookForm/AddBookForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Book } from "../types/Book";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../components/Modal/Modal";
import Header from "../components/Layout/Header";

const Booklist: React.FC = () => {
  const {
    data: books = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  const [favorites, setFavorites] = useLocalStorage<number[]>("favorites", []);
  const [localBooks, setLocalBooks] = useLocalStorage<Book[]>("localBooks", []);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const paginatedBooks = [...localBooks, ...books].slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );
  const totalPages = Math.ceil([...localBooks, ...books].length / booksPerPage);

  const handleToggleFavorite = (id: number) => {
    setFavorites(
      favorites.includes(id)
        ? favorites.filter((favId) => favId !== id)
        : [...favorites, id]
    );
  };

  const handleAddBook = (book: Book) => {
    setLocalBooks([book, ...localBooks]);
  };

  const openDeleteModal = (book: Book) => {
    setBookToDelete(book);
    setDeleteModalOpen(true);
  };

  const handleDeleteBook = () => {
    if (bookToDelete) {
      const updatedBooks = localBooks.filter(
        (book) => book.id !== bookToDelete.id
      );
      setLocalBooks(updatedBooks);
      setDeleteModalOpen(false);
      setBookToDelete(null);
    }
  };

  const handleSaveEdit = (updatedBook: Book) => {
    const updatedBookList = localBooks.map((b: Book) => {
      if (b.id === updatedBook.id) {
        return updatedBook;
      }
      return b;
    });
    setLocalBooks([...updatedBookList]);
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books</div>;

  return (
    <>
      <Modal title="Add New Book" isOpen={isOpen} onClose={onCloseModal}>
        <AddBookForm onAddBook={handleAddBook} onClose={onCloseModal} />
      </Modal>
      <Modal
        title="Confirm Delete"
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <p>Are you sure you want to delete this book?</p>
        <button onClick={handleDeleteBook} className="btn delete-btn">
          Delete
        </button>
        <button
          onClick={() => setDeleteModalOpen(false)}
          className="btn cancel-btn"
        >
          Cancel
        </button>
      </Modal>
      <div className="container booklist-page">
        <Header />
        <div className="sub-header">
          <h1>Book List</h1>
          <button className="btn" onClick={() => setIsOpen(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add New Book
          </button>
        </div>
        <BookList
          books={paginatedBooks}
          localBooks={localBooks}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onDelete={openDeleteModal}
          onEditBook={handleSaveEdit}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Booklist;
