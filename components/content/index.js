import { IoPerson } from "react-icons/io5";
import { GiWorld } from "react-icons/gi";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useMutation } from "@/hooks/useMutation";
import { AiFillLike } from "react-icons/ai";
import { SlOptionsVertical } from "react-icons/sl";
import EditStory from "../editStory";

export default function Content() {
  const { mutate } = useMutation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isInputClicked, setIsInputClicked] = useState(false);

  const expandTextarea = () => {
    setIsInputClicked(true);
  };

  const token = Cookies.get("user_token"); // Replace with your actual token

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?type=all`,
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

  const handleLike = async (id) => {
    const response = await mutate({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/likes/post/${id}`,
    });

    setLoading(true);
    router.reload();
  };
  const handleUnLike = async (id) => {
    const response = await mutate({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/unlikes/post/${id}`,
    });
    setLoading(true);
    router.reload();
  };

  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const openOptions = () => {
    setIsOpenOptions(!isOpenOptions);
  };
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (result?.success) {
        router.reload();
      }
    } catch (error) {
      alert("data gagal di hapus ");
    }
  };

  //  edit modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [descEdit, setDescEdit] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // end edit modal
  return (
    <div className="">
      {isLoading && <div>Loading...</div>}
      {loading && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-200"></div>
        </div>
      )}
      {error && <div>Error fetching data</div>}
      {data?.data?.map((item) => (
        <div key={item.id} className="bg-white shadow-sm rounded-md p-4 my-2">
          <div className="relative grid grid-cols-12 gap-2 my-1">
            <div
              className="flex items-center justify-center rounded-full h-10 w-10 "
              style={{
                backgroundColor: getRandomColor(),
                color: getContrastColor(getRandomColor()),
              }}
            >
              <p className="text-xs font-bold">{getInitials(item.user.name)}</p>
            </div>
            <div className="px-6 col-span-10">
              <p className="font-bold">{item.user.name}</p>
              <div className="flex ">
                <p className="text-xs text-gray-500">{item.user.email}</p>
                <p className="text-xs text-gray-500 px-1">.</p>
                <p className="text-xs text-gray-500 ">4 jam </p>
                <p className="text-xs text-gray-500 px-1">.</p>
                <GiWorld />
                <p className="text-xs text-gray-500 px-1">Edited </p>
              </div>
              <div className="">
                <p className="text-sm">{item.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex mt-2">
                  <FcLike />
                  <p className="ml-2 text-xs">{item.likes_count} Likes</p>
                </div>
                <div className="">
                  <p className="text-xs text-gray-500">
                    {item.replies_count} Comments
                  </p>
                </div>
              </div>
              <div className="border-y border-gray-200 mt-2 py-2">
                <div className=" flex justify-around">
                  {item.is_like_post === true ? (
                    <AiFillLike
                      style={{ color: "#3797EF" }}
                      onClick={() => handleUnLike(item.id)}
                    />
                  ) : (
                    <AiFillLike onClick={() => handleLike(item.id)} />
                  )}

                  <FaRegComment onClick={expandTextarea} />
                  <IoShareSocialOutline />
                </div>
              </div>
              <div className="">
                <button className="text-sm text-gray-500">
                  Lihat semua komentar
                </button>

                {/* comment */}
                <div className="grid grid-cols-12">
                  <div className="col-span-1">
                    <IoPerson style={{ height: "20px", width: "20px" }} />
                  </div>
                  <div className="col-span-11">
                    <div className="flex items-center ">
                      <p className="font-bold text-xs">User123</p>
                      <p className=" text-xs/5 text-gray-400 ml-4">
                        1 jam yang lalu
                      </p>
                    </div>
                    <p className="text-xs">ini komentar ...</p>
                  </div>
                </div>
                {/* end comment */}

                <div className="grid grid-cols-12 mt-4">
                  <div className="col-span-1">
                    <IoPerson style={{ height: "20px", width: "20px" }} />
                  </div>
                  <div className="relative col-span-11">
                    <input
                      type="text"
                      className={` bg-gray-100 pl-4 text-xs  w-full outline-none ${
                        isInputClicked
                          ? "rounded-lg h-[50px] py-0"
                          : "rounded-full py-2 h-auto"
                      }`}
                      placeholder={isInputClicked ? "" : "Tulis komentar ..."}
                      onClick={expandTextarea}
                    />
                    {isInputClicked && (
                      <div className="absolute right-2 bottom-2">
                        <button className="sendButton">
                          <IoMdSend />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {item.is_own_post && (
              <div className="absolute right-1 hover:bg-sky-100 p-2 hover:rounded-md">
                <SlOptionsVertical onClick={openOptions} />
              </div>
            )}

            {isOpenOptions && (
              <div className="absolute right-4 top-6 bg-white shadow-md py-2 pl-2 pr-6 cursor-pointer">
                <p
                  className="hover:text-red-500"
                  onClick={() => openModal(item?.id)}
                >
                  Edit
                </p>
                <p
                  className="hover:text-red-500"
                  onClick={() => handleDelete(item?.id)}
                >
                  Delete
                </p>
              </div>
            )}
          </div>

          <EditStory
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            content={"Edit post"}
            onclickclose={closeModal}
            id={item.id}
          />
        </div>
      ))}
    </div>
  );
}
