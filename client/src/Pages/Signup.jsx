import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { createAccount } from "../Redux/Slices/AuthSlice";
import InputBox from "../Components/InputBox/InputBox";
import { gsap } from "gsap";


export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const [isLoading, setIsLoading] = useState(false);
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const formRef = useRef(null);
  const headingRef = useRef(null);
  const inputBoxRefs = useRef([]);
  const submitBtnRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const form = formRef.current;
    const heading = headingRef.current;
    const inputBoxes = inputBoxRefs.current;
    const submitBtn = submitBtnRef.current;
    const link = linkRef.current;

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

    gsap.fromTo(
      link,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.2,
        delay: 2,
        ease: "power2.out",
      }
    );
  }, []);


  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  
  async function createNewAccount(event) {
    event.preventDefault();
    if (!signupData.email || !signupData.password || !signupData.fullName) {
      toast.error("Please fill all the details");
      return;
    }


    if (signupData.fullName.length < 3) {
      toast.error("Name should be atleast of 3 characters");
      return;
    }

    if (!signupData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      toast.error("Invalid email id");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);

    // dispatch create account action
    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) {
      setSignupData({
        fullName: "",
        email: "",
        password: "",
      });

      navigate("/");
    }
  }

  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
        <form
          onSubmit={createNewAccount}
          autoComplete="off"
          noValidate
          className="flex flex-col dark:bg-base-100 gap-4 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[500px]
           w-full shadow-2xl dark:shadow-xl  "
           ref={formRef}
        >
          <h1 className="text-center dark:text-purple-500 text-4xl font-bold font-inter"
          ref={headingRef}
          >
            Registration Page
          </h1>
          {/* name */}
          <InputBox
            label={"Name"}
            name={"fullName"}
            type={"text"}
            placeholder={"Enter your name..."}
            onChange={handleUserInput}
            value={signupData.fullName}
            ref={(el) => (inputBoxRefs.current[0] = el)}
          />
          {/* email */}
          <InputBox
            label={"Email"}
            name={"email"}
            type={"email"}
            placeholder={"Enter your email..."}
            onChange={handleUserInput}
            value={signupData.email}
            ref={(el) => (inputBoxRefs.current[1] = el)}
          />
          {/* password */}
          <InputBox
            label={"Password"}
            name={"password"}
            type={"password"}
            placeholder={"Enter your password..."}
            onChange={handleUserInput}
            value={signupData.password}
            ref={(el) => (inputBoxRefs.current[2] = el)}
          />
          {/* avatar */}
         
          {/* submit btn */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 bg-yellow-500 text-white dark:text-base-200 hover:bg-yellow-300 transition-all
             ease-in-out duration-300 rounded-md py-2 font-nunito-sans font-[500]  text-lg cursor-pointer"
             ref={submitBtnRef}
          >
            {isLoading ? "Creating account" : "Create account"}
          </button>

          {/* link */}
          <p className="text-center font-inter text-gray-500 dark:text-slate-300"
          ref={linkRef}
          >
            Already have an account ?{" "}
            <Link
              to="/login"
              className="link text-blue-600 font-lato cursor-pointer"
            >
              {" "}
              Login
            </Link>
          </p>
        </form>
      </section>
    </Layout>
  );
}
