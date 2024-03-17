import Image from "next/image";
import { BsPersonCircle } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdNotifications } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";
import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function Navbar() {
  const { mutate } = useMutation();
  const router = useRouter();
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const openModalProfile = () => {
    setIsOpenProfile(!isOpenProfile);
  };

  const HandleLogout = async () => {
    const response = await mutate({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    console.log("response", response);
    if (!response?.success) {
      alert("gagal logout");
    } else {
      Cookies.remove("user_token");
      router.push("/login");
    }
  };
  return (
    <div className=" bg-gray-200 grid grid-cols-12 gap-2 ">
      <div className="col-span-12 md:col-span-3 "></div>
      <div className="col-span-12  md:col-span-6 bg-white rounded-sm p-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center ">
            <Image alt="logo" src="/chat.png" width={30} height={30} />
            <p className="font-bold text-lg ml-2">CAT</p>
          </div>
        </Link>
        <div className="relative flex items-center">
          <div className="w-[30px] h-[30px] border border-red-500 rounded-full mr-2 flex justify-center items-center">
            <Link href="/notification">
              <IoMdNotifications
                style={{ width: "25px", height: "25px", color: "red" }}
              />
            </Link>
          </div>
          <div className="relative ">
            <BsPersonCircle
              style={{ width: "30px", height: "30px" }}
              onClick={openModalProfile}
            />
          </div>
          {isOpenProfile && (
            <div className="bg-white absolute  right-4 top-10 shadow-md w-[180px] h-[80px] p-3 z-10">
              <Link href="/profile">
                <div className="flex items-center cursor-pointer">
                  <CgProfile />
                  <p className="ml-2">Profile</p>
                </div>
              </Link>
              <div
                className="flex items-center  cursor-pointer"
                onClick={() => HandleLogout()}
              >
                <IoMdLogOut />
                <p className="ml-2">Logout</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-12 md:col-span-3 "></div>
    </div>
  );
}
