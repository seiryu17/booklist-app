import React from "react";
import { useForm } from "react-hook-form";
import { Book } from "../../types/Book";
import "./AddBookForm.scss";

interface AddBookFormProps {
  onAddBook: (book: Book) => void;
  onClose: () => void;
}

const AddBookForm: React.FC<AddBookFormProps> = ({ onAddBook, onClose }) => {
  const { register, handleSubmit, reset } = useForm<Book>();

  const onSubmit = (data: Book) => {
    const currentDate = new Date().toISOString();
    onAddBook({
      ...data,
      id: Math.floor(Math.random() * 10000),
      publicationDate: currentDate,
    });
    reset();
    onClose();
  };

  return (
    <form className="add-book-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Add New Book</h2>
      <input {...register("title", { required: true })} placeholder="Title" />
      <input {...register("author", { required: true })} placeholder="Author" />
      <textarea
        {...register("description", { required: true })}
        placeholder="Description"
      />
      <input
        {...register("cover", { required: true })}
        placeholder="Cover URL"
      />
      <input
        type="date"
        {...register("publicationDate", { required: true })}
        className="publication-date-input"
      />

      <button type="submit" className="btn">
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
