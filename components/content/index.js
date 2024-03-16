import { IoPerson } from "react-icons/io5";
import { GiWorld } from "react-icons/gi";
import { FcLike } from "react-icons/fc";
import { SlLike } from "react-icons/sl";
import { FaRegComment } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
export default function Content() {
  const [isInputClicked, setIsInputClicked] = useState(false);

  const expandTextarea = () => {
    setIsInputClicked(true);
  };
  return (
    <div className="">
      <div className="bg-white shadow-sm rounded-md p-4 my-2">
        <div className="grid grid-cols-12 gap-2 my-1">
          <IoPerson style={{ height: "30px", width: "30px" }} />
          <div className="px-3 col-span-10">
            <p className="font-bold"> Ayu Widya Inggit</p>
            <div className="flex ">
              <p className="text-xs text-gray-500">ayuwidya5601@gmail.com</p>
              <p className="text-xs text-gray-500 px-1">.</p>
              <p className="text-xs text-gray-500 ">4 jam </p>
              <p className="text-xs text-gray-500 px-1">.</p>
              <GiWorld />
              <p className="text-xs text-gray-500 px-1">Edited </p>
            </div>
            <div className="">
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                illo odio eius? Nam veritatis fugiat earum laborum eos cum
                minima quo necessitatibus impedit iusto veniam delectus ullam
                vitae pariatur aspernatur voluptatibus facere numquam vero
                consectetur, autem asperiores. Repellendus laboriosam magnam
                neque est? Aliquid temporibus iste vero numquam cupiditate
                fugiat eum?
              </p>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex mt-2">
                <FcLike />
                <p className="text-xs">2 Likes</p>
              </div>
              <div className="">
                <p className="text-xs text-gray-500">1 komentar</p>
              </div>
            </div>
            <div className="border-y border-gray-200 mt-2 py-2">
              <div className=" flex justify-around">
                <SlLike />
                <FaRegComment onClick={expandTextarea} />
                <IoShareSocialOutline />
              </div>
            </div>
            <div className="">
              <button className="text-sm text-gray-500">
                Lihat semua komentar
              </button>
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
        </div>
      </div>
    </div>
  );
}
