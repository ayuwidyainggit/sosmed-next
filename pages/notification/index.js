import AddStory from "@/components/addStory";
import ContentMe from "@/components/contentMe";
import Story from "@/components/story";
import { useQueries } from "@/hooks/useQueries";
import Layout from "@/layout";
import Cookies from "js-cookie";
import React, { useState } from "react";
import useSWR from "swr";
import TimeAgo from "react-timeago";
import localeId from "react-timeago/lib/language-strings/id";

export default function Notification() {
  const token = Cookies.get("user_token");
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications`,
    async (url) => {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      return response.json();
    },
    { revalidateOnFocus: true }
  );

  const getInitials = (name) => {
    const names = name.split(" ");
    const initials = names.map((word) => word.charAt(0).toUpperCase()).join("");
    return initials;
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const getContrastColor = (hexColor) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness >= 128 ? "#000000" : "#FFFFFF";
  };

  return (
    <Layout metaTitle="profile">
      <div className=" bg-gray-200 min-h-screen grid grid-cols-12 gap-2 ">
        <div className="hidden md:flex md:col-span-3 "></div>
        <div className="col-span-12 px-4 md:px-0 md:col-span-6 mt-1 ">
          {data?.data?.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-md col-span-12 grid grid-cols-12 items-center mb-1"
            >
              <div className="col-span-6 md:col-span-3 flex bg-sky-100 p-1 rounded-full mr-2">
                <div
                  className="w-[30px] h-[30px] flex items-center justify-center rounded-full"
                  style={{
                    backgroundColor: getRandomColor(),
                    color: getContrastColor(getRandomColor()),
                  }}
                >
                  <p className="text-xs font-bold">
                    {getInitials(item.user.name)}
                  </p>
                </div>

                <p className=" pl-3">{item.user.name}</p>
              </div>
              <div className="col-span-9 flex">
                <p>{item.remark} your post</p> <p className="px-2">.</p>{" "}
                <p className=" italic">
                  <TimeAgo date={new Date(item.created_at)} locale={localeId} />
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-12 md:col-span-3 "></div>
      </div>
    </Layout>
  );
}
