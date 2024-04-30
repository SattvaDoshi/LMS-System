import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { login } from "../Redux/Slices/AuthSlice";
import InputBox from "../Components/InputBox/InputBox";
import { gsap } from "gsap";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
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
        y: 50,
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
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 2,
        ease: "power2.out",
      }
    );
  }, []);

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  }

  async function onLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }
    setIsLoading(true);
    const Data = {
      email: loginData.email,
      password: loginData.password,
    };

    // dispatch create account action
    const response = await dispatch(login(Data));
    if (response?.payload?.success) {
      setLoginData({ email: "", password: "" });
      navigate("/");
    }
    setIsLoading(false);
  }

  return (
    <Layout>
      <section className="flex flex-col gap-6 items-center py-8 px-3 min-h-[100vh]">
        <form
          onSubmit={onLogin}
          autoComplete="off"
          noValidate
          className="flex flex-col dark:bg-base-100 gap-4 rounded-lg md:py-5 py-7 md:px-7 px-3 md:w-[500px]
           w-full shadow-2xl dark:shadow-xl"
          ref={formRef}
        >
          <h1
            className="text-center dark:text-purple-500 text-4xl font-bold font-inter"
            ref={headingRef}
          >
            Login Page
          </h1>
          {/* email */}
          <InputBox
            label={"Email"}
            name={"email"}
            type={"email"}
            placeholder={"Enter your email..."}
            onChange={handleUserInput}
            value={loginData.email}
            ref={(el) => (inputBoxRefs.current[0] = el)}
          />
          {/* password */}
          <InputBox
            label={"Password"}
            name={"password"}
            type={"password"}
            placeholder={"Enter your password..."}
            onChange={handleUserInput}
            value={loginData.password}
            ref={(el) => (inputBoxRefs.current[1] = el)}
          />
          {/* submit btn */}
          <button
            type="submit"
            className="mt-2 bg-yellow-500 text-white dark:text-base-200 hover:bg-yellow-300 transition-all
            ease-in-out duration-300 rounded-md py-2 font-nunito-sans font-[500]  text-lg cursor-pointer"
            disabled={isLoading}
            ref={submitBtnRef}
          >
            {isLoading ? "Logging..." : "Login"}
          </button>
          {/* link */}
          <p
            className="text-center font-inter text-gray-500 dark:text-slate-300"
            ref={linkRef}
          >
            Do not have an account ?{" "}
            <Link
              to="/signup"
              className="link text-blue-600 font-lato cursor-pointer"
            >
              {" "}
              signup
            </Link>
          </p>
        </form>
      </section>
    </Layout>
  );
}