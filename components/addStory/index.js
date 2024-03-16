import Modal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";

export default function AddStory({
  closeModal,
  isOpen,
  onRequestClose,
  content,
  onclickclose,
}) {
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
              />
            </div>
            <div className="absolute bottom-2 w-[93%]">
              <button className="w-full bg-blue py-2 rounded-md text-white">
                Send
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
