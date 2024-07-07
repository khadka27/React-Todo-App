// src/components/AddTask.tsx

"use client"; // Marking this as a client component

import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import AddTaskModel from "./Model";

const AddTask: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button
        id="my_modal_5"
        className="btn btn-primary w-full m-3"
        onClick={openModal}
      >
        Add new task <IoIosAdd />
      </button>
      {modalOpen && (
        <AddTaskModel modalOpen={modalOpen} closeModal={closeModal} />
      )}
    </>
  );
};

export default AddTask;
