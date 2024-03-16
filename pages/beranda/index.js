import AddStory from "@/components/addStory";
import Content from "@/components/content";
import Story from "@/components/story";
import React, { useState } from "react";

export default function Beranda() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen bg-gray-200 grid grid-cols-12 gap-2 ">
      <div className="col-span-3 border border-red-500"></div>
      <div className="col-span-6  mt-4">
        <Story onClick={openModal} />
        <div className="mt-4">
          <Content />
        </div>
      </div>
      <div className="col-span-3 border border-red-500"></div>

      <AddStory
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        content={"Whats your mind"}
        onclickclose={closeModal}
      />
    </div>
  );
}
