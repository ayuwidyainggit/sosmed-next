import AddStory from "@/components/addStory";
import Content from "@/components/content";
import Story from "@/components/story";
import Layout from "@/layout";
import React, { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout metaTitle="home">
      <div className=" relative bg-gray-200 min-h-screen grid grid-cols-12 gap-2 ">
        <div className="col-span-12 md:col-span-3 "></div>
        <div className="col-span-12 px-4 md:px-0 md:col-span-6 mt-1">
          <Story onClick={openModal} />
          <div className="mt-4">
            <Content />
          </div>
        </div>
        <div className="col-span-12 md:col-span-3 "></div>

        <AddStory
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          content={"Whats your mind"}
          onclickclose={closeModal}
        />
      </div>
    </Layout>
  );
}
