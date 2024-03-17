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
  id,
}) {
  const { mutate } = useMutation();
  const router = useRouter();
  const [story, setStory] = useState({
    description: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/post/update/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: notes?.title,
            description: notes?.description,
          }),
        }
      );

      const result = await response.json();
      if (result?.success) {
        onclickclose();
        // router.push("/");
      }
      console.log("result ", result);
    } catch (error) {}
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
                onChange={(event) =>
                  setStory({ ...story, description: event.target.value })
                }
              />
            </div>
            <div className="absolute bottom-2 w-[93%]">
              <button
                className="w-full bg-blue py-2 rounded-md text-white"
                onClick={() => handleSubmit()}
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
