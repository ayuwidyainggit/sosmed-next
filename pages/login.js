import Image from "next/image";
import { useMutation } from "@/hooks/useMutation";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";
import { useToast } from "@chakra-ui/react";

export default function Login() {
  const toast = useToast();
  const router = useRouter();
  const { mutate } = useMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isDisabled = !payload.email || !payload.password;

  const HandleSubmit = async () => {
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/login/`,
      payload,
    });
    if (!response?.success) {
      toast({
        title: "Login Failure.",
        description: "please input your email and password correctly",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      Cookies.set("user_token", response?.data?.token, {
        expires: new Date(response?.data?.expires_at),
        path: "/",
      });

      router.push("/");
    }

    // console.log("login", response);
  };
  return (
    <div className="  flex justify-center items-center h-screen">
      <div className="w-[400px] h-[500px]  md:border md:border-gray-400 ">
        <div className="flex justify-center mb-10 mt-10">
          <Image alt="logo" src="/chat.png" width={50} height={50} />
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
            onClick={() => HandleSubmit()}
          >
            Log in
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
          <p>Don&#39;t have an account?</p>
          <Link href="/register">
            <p className=" text-blue cursor-pointer">Sign in </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
