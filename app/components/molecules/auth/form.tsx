"use client";
import data from "@/app/data/auth";
import Image from "next/image";
import Logo from "../../atoms/Logo";

const Form = () => {
  return (
    <main className="w-full flex">
      <div className="relative flex-1 hidden items-center justify-center bg-[#65BB671A] lg:flex h-full">
        <div className="relative z-10 w-full max-w-md">
          <div className=" mt-16 space-y-3">
            <h3 className=" text-2xl font-semibold tracking-[2.04px] capitalize self-stretch grow whitespace-nowrap text-center mb-10">
              A name you can{" "}
              <span className="font-bold text-emerald-600">trust</span>
            </h3>

            <Image
              width={500}
              height={500}
              src="/auth/sideCoverImage.svg"
              alt=""
              className="!my-12"
            />
            <ul className="flex flex-col justify-center items-center space-y-1 text-neutral-600 text-base font-semibold">
              {data.map((item) => (
                <li key={item.text} className="w-full max-w-[16rem]">
                  {/* <img
                    src={item.icon}
                    alt="building"
                    width={150}
                    height={150}
                  /> */}
                  <p className="!text-left ">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0 justify-center items-center">
          <Logo />
          <FormTabs />
        </div>
      </div>
    </main>
  );
};

export default Form;

import { Tabs } from "@mantine/core";
import Login from "./login";

function FormTabs() {
  return (
    <Tabs color="#148B16" defaultValue="gallery">
      <Tabs.List
        variant=""
        className="w-[100%] !flex !justify-center !items-center"
      >
        <Tabs.Tab
          value="login"
          className="!text-[#666666] !text-[26px] !mr-[20px]"
        >
          Login
        </Tabs.Tab>
        <Tabs.Tab value="signup" className="!text-[26px]">
          Signup
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="login">
        <Login />
      </Tabs.Panel>

      <Tabs.Panel value="signup">Messages tab content</Tabs.Panel>
    </Tabs>
  );
}
