"use client";
import React, { useState } from "react";
import { addTodo } from "../../api";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

interface ModelProps {
  modalOpen: boolean;
  closeModal: () => void;
}

const Model: React.FC<ModelProps> = ({ modalOpen, closeModal }) => {
  const [bioText, setBioText] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addTodo({
        id: uuidv4(),
        task: bioText,
        date: new Date().toLocaleDateString(),
      });

      // Clear the textarea and close the modal
      setBioText("");
      closeModal();
    } catch (error) {
      console.error("Error adding todo:", error);
      // Handle error scenario if needed
    }
  };

  const handleButtonClick = () => {
    // Example of handling button click, can be customized as per your logic
    router.refresh(); // Navigate to home page or any other route after form submission
  };

  if (!modalOpen) {
    return null; // Return null if modalOpen is false to prevent rendering
  }

  return (
    <dialog
      id="my_modal_5"
      className={`modal ${modalOpen ? "modal-open" : ""} sm:modal-middle`}
      open={modalOpen}
    >
      <div className="modal-box">
        <h3 className="font-bold text-lg">Add New Task!</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="textarea textarea-info w-full"
            placeholder="Enter task description"
            value={bioText}
            onChange={(e) => setBioText(e.target.value)}
          ></textarea>
          <div className="modal-action">
            <button className="btn" onClick={closeModal}>
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleButtonClick}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Model;
