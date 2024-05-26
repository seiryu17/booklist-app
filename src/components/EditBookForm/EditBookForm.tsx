import React from "react";
import { useForm } from "react-hook-form";
import { Book } from "../../types/Book";
import "./EditBookForm.scss";

interface EditBookFormProps {
  book: Book;
  onEditBook: (book: Book) => void;
  onCancel: () => void;
}

const EditBookForm: React.FC<EditBookFormProps> = ({
  book,
  onEditBook,
  onCancel,
}) => {
  const { register, handleSubmit } = useForm<Book>({ defaultValues: book });

  const onSubmit = (data: Book) => {
    onEditBook(data);
  };

  return (
    <form className="edit-book-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit Book</h2>
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
      <button type="submit" className="btn" style={{ marginBottom: "0.5rem" }}>
        Save Changes
      </button>
      <button className="btn delete-btn" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditBookForm;
