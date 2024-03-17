import Modal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import { useState } from "react";

export default function EditStory({
  isOpen,
  onRequestClose,
  content,
  onclickclose,
  value,
  onChange,
  onClick,
}) {
  const { mutate } = useMutation();
  const router = useRouter();
  const [story, setStory] = useState({
    description: "",
  });

  return (
    <div className=" relative">
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
        style={{
          content: {
            width: "40%",
            height: "40%",
            margin: "auto",
          },
        }}
      >
        <div className=" ">
          <p className="font-bold text-center">{content}</p>
          <IoCloseSharp
            style={{
              position: "absolute",
              top: "2",
              right: "2",
              width: "30px",
              height: "30px",
              color: "red",
            }}
            onClick={onclickclose}
          />
        </div>
        <div className="mt-8 ">
          <div className="  grid grid-cols-12 items-center">
            <div className="col-span-1">
              <IoPerson style={{ height: "30px", width: "30px" }} />
            </div>
            <div className="col-span-10">
              <p className="font-bold">Ayu Widya Inggit</p>
            </div>
            <div className="col-span-12 mt-4">
              <input
                type="text"
                placeholder="Apa yang anda pikirkan  "
                className="outline-none  w-full "
                onChange={onChange}
                value={value}
              />
            </div>
            <div className="absolute bottom-2 w-[100px]">
              <button
                className="w-full bg-blue opacity-90 hover:opacity-100 py-2 rounded-md text-white"
                onClick={onClick}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
