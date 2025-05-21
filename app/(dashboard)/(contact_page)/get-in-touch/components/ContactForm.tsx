"use client";
import { useForm } from "@mantine/form";
import axios from "axios";
import React, { useState } from "react";

type Props = {};

const initailstate={
  name: "",
  email: "",
  tel: "",
  questions: "",
}
export default function ContactForm({}: Props) {
  const form = useForm({
    initialValues: initailstate,
    validate: {
      name: (value) =>
        value.trim().length > 0 ? null : "Full Name is Required",
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email is Required"),
      tel: (value) =>
        /^[0-9]{10}$/.test(value) ? null : "Mobile Number is Required",
      questions: (value) =>
        value.trim().length > 0 ? null : "Please Enter Your Query",
    },
  });



const [status, setStatus] =useState("normal")

const baseUrl = "https://info.getrightproperty.com/send_email";
  
const onSubmit = async (values: any) => {


    let message =`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #333; background-color: #f6f9fc;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <tr>
            <td style="padding: 40px 0; text-align: center; background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%);">
                <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 600; letter-spacing: 1px;">New ContactUs Message</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 30px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="padding-bottom: 30px;">
                            <h2 style="margin: 0 0 10px; color: #4F46E5; font-size: 22px; font-weight: 600;">Sender Details</h2>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F3F4F6; border-radius: 6px; overflow: hidden;">
                                <tr>
                                    <td style="padding: 15px; width: 30%; font-weight: 600; color: #4B5563;">Name:</td>
                                    <td style="padding: 15px; color: #1F2937;">${values.name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px; width: 30%; font-weight: 600; color: #4B5563; background-color: #E5E7EB;">Email:</td>
                                    <td style="padding: 15px; background-color: #E5E7EB;">
                                        <Link rel="noopener noreferrer" prefetch={false} href="mailto:${values.email}" style="color: #4F46E5; text-decoration: none;">${values.email}</Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px; width: 30%; font-weight: 600; color: #4B5563;">Phone:</td>
                                    <td style="padding: 15px; color: #1F2937;">${values.tel}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 30px;">
                            <h2 style="margin: 0 0 15px; color: #4F46E5; font-size: 22px; font-weight: 600;">Message</h2>
                            <div style="background-color: #F3F4F6; border-left: 4px solid #4F46E5; padding: 20px; border-radius: 6px;">
                                <p style="margin: 0; color: #1F2937; line-height: 1.8;">${values.name}</p>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Link rel="noopener noreferrer" prefetch={false} href="mailto:${values.email}" style="display: inline-block; padding: 14px 30px; background-color: #4F46E5; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 50px; text-align: center; transition: background-color 0.3s ease;">Reply to manish</Link>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
        </tr>
    </table>
</body>
</html>

`
    // do api there
    try {

      // Prepare the email data
      const emailData = {
          from: "info@getrightproperty.com",  
          to_address: "rahulrpclan@gmail.com",   
          subject: `Query From ${values.name}`,     
          message: message,  
          src: "Proper Sending" 
      };
      
      // eslint-disable-next-line no-unused-vars
      const dataResult = await axios.post(baseUrl, emailData, {
          headers: {
              'Content-Type': 'application/json',  
          },
      });
      setStatus("Done")

      setTimeout(()=>{
        setStatus("normal")
        form.reset()
      }, 3000)

  } catch (error) {
      console.error("Error sending email:", error);
  }
  };
  return (
    <form
    onSubmit={form.onSubmit((values) => {
      setStatus("pending"); 
      onSubmit(values);
    })}
      className="flex flex-col items-end gap-2.5 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)] p-4 sm:p-8 rounded-[10px] border-2 border-solid border-[#CAE3FF] bg-[#FAFAFA] w-full sm:w-auto sm:min-w-[500px]"
    >
      <label htmlFor="name" className="w-full">
        <p className=" textsm:-[#333] text-[12px] sm:text-base not-italic font-semibold text-left">
          Full Name<span className="text-[#F00] ">*</span>
        </p>
        <input
          id="name"
          placeholder="Enter your Full Name Here"
          type="text"
          className="rounded-[5px] border-[0.5px] border-solid border-[#666] bg-white text-[12px] sm:text-[16px] placeholder:text-[#767270] px-2 py-1 w-full"
          {...form.getInputProps("name")}
        />
        {form.errors.name && (
          <div className="text-red-500 text-sm">{form.errors.name}</div>
        )}
      </label>

      <label htmlFor="email" className="w-full">
        <p className="text-[#333] text-[12px] sm:text-base not-italic font-semibold text-left">
          Email<span className="text-[#F00] ">*</span>
        </p>
        <input
          id="email"
          placeholder="Enter your Email Here"
          type="email"
          className="rounded-[5px] border-[0.5px] border-solid border-[#666] bg-white text-[12px] sm:text-[16px] placeholder:text-[#767270] px-2 py-1 w-full"
          {...form.getInputProps("email")}
        />
        {form.errors.email && (
          <div className="text-red-500 text-sm">{form.errors.email}</div>
        )}
      </label>

      <label htmlFor="tel" className="w-full">
        <p className="text-[#333] text-[12px] sm:text-base not-italic font-semibold text-left">
          Mobile Number<span className="text-[#F00] ">*</span>
        </p>
        <input
          id="tel"
          placeholder="Enter your Mobile Number Here"
          type="tel"
          className="rounded-[5px] border-[0.5px] border-solid border-[#666] bg-white text-[12px] sm:text-[16px] placeholder:text-[#767270] px-2 py-1 w-full"
          {...form.getInputProps("tel")}
        />
        {form.errors.tel && (
          <div className="text-red-500 text-sm">{form.errors.tel}</div>
        )}
      </label>

      <label htmlFor="questions" className="w-full">
        <p className="text-[#333] text-[12px] sm:text-base not-italic font-semibold text-left">
          What can we help you with?<span className="text-[#F00] ">*</span>
        </p>
        <textarea
          id="questions"
          placeholder="Enter your query Here"
          className="rounded-[5px] border-[0.5px] border-solid border-[#666] bg-white text-[12px] sm:text-[16px] placeholder:text-[#767270] px-2 py-1 w-full"
          rows={4}
          {...form.getInputProps("questions")}
        />
        {form.errors.questions && (
          <div className="text-red-500 text-sm">{form.errors.questions}</div>
        )}
      </label>

      <button
         disabled={status == "Done" ? true :status == "Sumbiting" ? true :false}
        type="submit"
        className={`justify-center items-center gap-2 text-white text-[12px] sm:text-base not-italic font-semibold leading-[normal] p-1.5 sm:p-2 rounded-[5px]
          ${status == "Done" ? "bg-[#04AA6D]" : "bg-[#0073c6]"} `}
      >
       {status == "normal"? "Sumbit" : status == "normal" ? "Sumbiting" : "Submitted" } 
      </button>
    </form>
  );
}
