import AddStory from "@/components/addStory";
import ContentMe from "@/components/contentMe";
import Story from "@/components/story";
import { useQueries } from "@/hooks/useQueries";
import Layout from "@/layout";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { IoPerson } from "react-icons/io5";

export default function Notification() {
  return (
    <Layout metaTitle="notifications">
      <div className=" bg-gray-200 min-h-screen grid grid-cols-12 gap-2 ">
        <div className="col-span-12 md:col-span-3 "></div>
        <div className="col-span-12 px-4 md:px-0 md:col-span-6 mt-1 ">
          <div className="bg-white p-4 rounded-md col-span-12 grid grid-cols-12 items-center mb-1">
            <div className="col-span-3 flex bg-sky-100 p-1 rounded-full mr-2">
              <p>A</p> <p className=" pl-3">ayuwidyainggit</p>
            </div>
            <div className="col-span-9 flex">
              <p>like your post</p> <p className="px-2">.</p>{" "}
              <p className=" italic">1 menit yg lalu</p>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3 "></div>
      </div>
    </Layout>
  );
}
