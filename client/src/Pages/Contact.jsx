import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import InputBox from "../Components/InputBox/InputBox";
import TextArea from "../Components/InputBox/TextArea";
import Layout from "../Layout/Layout";
import gsap from "gsap";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const formRef = useRef(null);
  const headingRef = useRef(null);
  const inputBoxRefs = useRef([]);
  const submitBtnRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    const heading = headingRef.current;
    const inputBoxes = inputBoxRefs.current;
    const submitBtn = submitBtnRef.current;

    gsap.fromTo(
      form,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      heading,
      {
        opacity: 0,
        y: -50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      inputBoxes,
      {
        opacity: 0,
        y: 50,
        stagger: 0.2,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 1,
        ease: "power2.out",
        stagger: 0.2,
      }
    );

    gsap.fromTo(
      submitBtn,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 1.5,
        ease: "power2.out",
      }
    );

  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid email");
      return;
    }

    setIsLoading(true);
    const loadingMessage = toast.loading("sending message...");
    try {
      const res = await axiosInstance.post("/contact", userInput);
      toast.success(res?.data?.message, { id: loadingMessage });
      setUserInput({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error("message sending failed! try again", { id: loadingMessage });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
        <form
          onSubmit={onFormSubmit}
          autoComplete="off"
          noValidate
          className="flex flex-col dark:bg-base-100 gap-4 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[500px]
           w-full shadow-2xl dark:shadow-xl  "
           ref={formRef}
        >
          <h1 className="text-center dark:text-purple-500 text-4xl font-bold font-inter"
          ref={headingRef}
          >
            Contact Form
          </h1>
          {/* name */}
          <InputBox
            label={"Name"}
            name={"name"}
            type={"name"}
            placeholder={"Enter your name..."}
            onChange={handleInputChange}
            value={userInput.name}
            ref={(el) => (inputBoxRefs.current[0] = el)}
          />
          {/* email */}
          <InputBox
            label={"Email"}
            name={"email"}
            type={"email"}
            placeholder={"Enter your email..."}
            onChange={handleInputChange}
            value={userInput.email}
            ref={(el) => (inputBoxRefs.current[1] = el)}
          />
          {/* message */}
          <TextArea
            label={"Message"}
            name={"message"}
            rows={4}
            placeholder={"Enter here message..."}
            onChange={handleInputChange}
            value={userInput.message}
            ref={(el) => (inputBoxRefs.current[2] = el)}
          />
          {/* submit btn */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 bg-yellow-500 text-white dark:text-base-200  transition-all ease-in-out 
            duration-300 rounded-md py-2 font-nunito-sans font-[500]  text-lg cursor-pointer"
            ref={submitBtnRef}
          >
            {isLoading ? "Submiting Form..." : "Submit Form"}
          </button>
        </form>
      </section>
    </Layout>
  );
}
