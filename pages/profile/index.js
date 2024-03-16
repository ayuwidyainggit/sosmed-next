import AddStory from "@/components/addStory";
import ContentMe from "@/components/contentMe";
import Story from "@/components/story";
import { useQueries } from "@/hooks/useQueries";
import Layout from "@/layout";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = Cookies.get("user_token");

  const { data, isLoading, isError } = useQueries({
    prefixUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/me`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("first", data);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout metaTitle="profile">
      <div className=" bg-gray-200 min-h-screen grid grid-cols-12 gap-2 ">
        <div className="col-span-12 md:col-span-3 "></div>
        <div className="col-span-12 px-4 md:px-0 md:col-span-6 mt-1 ">
          <div className="bg-white p-4 rounded-md">
            <div className="flex justify-center">
              <IoPerson style={{ width: "40px", height: "40px" }} />
            </div>
            <div className="flex justify-center">
              <p className="font-bold">ayuwidyainggit</p>
            </div>
            <div className=" p-4">
              <div className="grid grid-cols-12">
                <p className="col-span-2 text-sm text-gray-500">Email </p>
                <p className="col-span-8 text-sm text-gray-500">
                  : {data?.data?.email}
                </p>
              </div>
              <div className="grid grid-cols-12">
                <p className="col-span-2 text-sm text-gray-500">Phone </p>
                <p className="col-span-8 text-sm text-gray-500">
                  : {data?.data?.phone}
                </p>
              </div>
              <div className="grid grid-cols-12">
                <p className="col-span-2 text-sm text-gray-500">Hobby </p>
                <p className="col-span-8 text-sm text-gray-500">
                  : {data?.data?.hobby}
                </p>
              </div>
              <div className="grid grid-cols-12">
                <p className="col-span-2 text-sm text-gray-500">
                  Date of Birth
                </p>
                <p className="col-span-8 text-sm text-gray-500">
                  : {data?.data?.dob}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <Story onClick={openModal} />
          </div>
          <div className="">
            <ContentMe />
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
