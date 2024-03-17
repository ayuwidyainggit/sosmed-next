import Modal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiSolidCommentEdit } from "react-icons/bi";
import Cookies from "js-cookie";

export default function Comment({
  isOpen,
  onRequestClose,
  content,
  onclickclose,
  commentId,
}) {
  const router = useRouter();
  const { mutate } = useMutation();
  const [commentData, setCommentData] = useState([]);
  const token = Cookies.get("user_token");
  const [story, setStory] = useState({
    description: "",
  });
  const fetchCommentData = async (commentId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/replies/post/${commentId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      setCommentData(result.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (isOpen && commentId) {
      fetchCommentData(commentId); // Fetch comment data when modal is open and commentId is available
    }
  }, [isOpen, commentId]);

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
  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("id-ID", options);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/replies/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      fetchCommentData(commentId);
    } catch (error) {
      alert("data gagal di hapus ");
      console.log("error ", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await mutate({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/replies/post/${commentId}`,
        payload: story,
        method: "POST",
      });
      fetchCommentData(commentId);
    } catch (error) {
      console.log("error submit", error);
    }
  };

  return (
    <div className=" relative">
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
        style={{
          content: {
            width: "40%",
            height: "50%",
            margin: "auto",
          },
        }}
      >
        <div className="relative">
          {/* <IoCloseSharp
            style={{
              position: "fixed",
              top: "200",
              right: "450",
              width: "30px",
              height: "30px",
              color: "red",
              cursor: "pointer",
            }}
            onClick={onclickclose}
          /> */}
        </div>
        <div className="mt-2 ">
          <div className=" relative  grid grid-cols-12 items-center ">
            <div className="fixed w-[37%] top-52 z-10  bg-white">
              <p className=" text-left my-2 ">{content}</p>
              <div className="relative col-span-12 ">
                <textarea
                  type="text"
                  placeholder="Apa yang anda pikirkan  "
                  className="outline-none  bg-sky-50 w-full rounded-md px-3 py-2 "
                  onChange={(event) =>
                    setStory({ ...story, description: event.target.value })
                  }
                />
                <div className="absolute top-20 w-[100%] ">
                  <button
                    className="w-full bg-blue py-2 rounded-md text-white"
                    onClick={() => handleSubmit()}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
            <div className=" mt-40 col-span-12 ">
              {commentData?.map((item) => (
                <div
                  key={item.id}
                  className="relative bg-white p-3 shadow-md rounded-md mb-2"
                >
                  <div className="inline-flex bg-sky-100 py-1 px-4 w-auto rounded-full  ">
                    <div
                      className=" rounded-full w-[30px] h-[30px] flex items-center justify-center mr-2"
                      style={{
                        backgroundColor: getRandomColor(),
                        color: getContrastColor(getRandomColor()),
                      }}
                    >
                      <p>{getInitials(item.user.name)}</p>
                    </div>
                    <p>{item.user.name}</p>
                  </div>
                  <p className=" mt-1 text-xs">{formatDate(item.created_at)}</p>
                  <p className="text-sm my-2">{item.description}</p>
                  {item.is_own_reply && (
                    <div className="absolute right-2 top-2 cursor-pointer">
                      <IoCloseSharp
                        style={{ width: "20px", height: "20px" }}
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
