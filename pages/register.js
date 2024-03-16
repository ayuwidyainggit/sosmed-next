import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    hobby: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isDisabled =
    !payload.name ||
    !payload.email ||
    !payload.dob ||
    !payload.phone ||
    !payload.hobby ||
    !payload.password;

  return (
    <div className="  flex justify-center items-center h-screen">
      <div className="w-[400px] h-[650px]  md:border md:border-gray-400 ">
        <div className="flex justify-center mb-10 mt-10">
          <Image alt="logo" src="/chat.png" width={50} height={50} />
        </div>
        <div className="flex justify-center px-8 py-1">
          <input
            type="text"
            className="border border-gray-300 h-[40px] w-full pl-2 text-sm"
            placeholder="name"
            value={payload?.name}
            onChange={(event) =>
              setPayload({ ...payload, name: event.target.value })
            }
          />
        </div>
        <div className="flex justify-center px-8 py-1">
          <input
            type="text"
            className="border border-gray-300 h-[40px] w-full pl-2 text-sm"
            placeholder="username"
            value={payload?.email}
            onChange={(event) =>
              setPayload({ ...payload, email: event.target.value })
            }
          />
        </div>
        <div className="flex justify-center px-8 py-1">
          <input
            type="date"
            className="border border-gray-300 h-[40px] w-full pl-2 text-sm"
            placeholder="dob"
            value={payload?.dob}
            onChange={(event) =>
              setPayload({ ...payload, dob: event.target.value })
            }
          />
        </div>
        <div className="flex justify-center px-8 py-1">
          <input
            type="text"
            className="border border-gray-300 h-[40px] w-full pl-2 text-sm"
            placeholder="phone"
            value={payload?.phone}
            onChange={(event) =>
              setPayload({ ...payload, phone: event.target.value })
            }
          />
        </div>
        <div className="flex justify-center px-8 py-1">
          <input
            type="text"
            className="border border-gray-300 h-[40px] w-full pl-2 text-sm"
            placeholder="hobby"
            value={payload?.hobby}
            onChange={(event) =>
              setPayload({ ...payload, hobby: event.target.value })
            }
          />
        </div>
        <div className="relative justify-center px-8 py-1">
          <input
            type={showPassword ? "text" : "password"}
            className="border border-gray-300 h-[40px] w-full pl-2 pr-[40px]"
            placeholder="password"
            value={payload?.password}
            onChange={(event) =>
              setPayload({ ...payload, password: event.target.value })
            }
          />
          <button
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-sm"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex justify-center mt-8 px-8 ">
          <button
            className={`${
              isDisabled
                ? "bg-blue text-white opacity-75 cursor-not-allowed"
                : "bg-blue text-white"
            } w-full py-2 rounded-md`}
            disabled={isDisabled}
          >
            Register
          </button>
        </div>

        <div className="grid grid-cols-12 mt-8 px-8 h-[40px]  ">
          <div className="col-span-5 border-b border-gray-300 h-[50%]"></div>
          <div className="col-span-2 text-center h-[100%] flex items-center justify-center">
            <p>or</p>
          </div>
          <div className="col-span-5 col-span-5 border-b border-gray-300 h-[50%]"></div>
        </div>

        <div className="flex justify-center mt-8 px-8">
          <p>Have an account?</p>
          <Link href="/login">
            <p className=" text-blue cursor-pointer">Log in </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
