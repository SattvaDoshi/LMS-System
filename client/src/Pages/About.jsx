import React, { useEffect, useRef } from "react";
import aboutMainImage from "../assets/images/about.png";
import Layout from "../Layout/Layout";
import { gsap } from "gsap";

function AboutUs() {
  const heroImageRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const heroImage = heroImageRef.current;
    const heading = headingRef.current;
    const text = textRef.current;

    gsap.fromTo(
      heroImage,
      {
        opacity: 0,
        x: 100,
      },
      {
        opacity: 1,
        x: 0,
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
      text,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 1,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <Layout>
      <section className="md:py-10 py-7 mb-10 text-white overflow-x-hidden md:px-16 px-6 min-h-[100vh]">
        {/* hero */}
        <div className="flex md:flex-row flex-col-reverse items-center justify-center md:gap-10 gap-7 w-full space-y-7">
          <div className="md:w-1/2 w-full space-y-7">
            <h1
              className="text-5xl text-yellow-500 font-semibold font-inter"
              ref={headingRef}
            >
              Affordable and <span className="font-nunito-sans">quality education</span>
            </h1>
            <p
              className="text-xl text-gray-600 dark:text-gray-200 font-nunito-sans"
              ref={textRef}
            >
              Our goal is to provide the afoordable and quality education to the world. We
              are providing the platform for the aspiring teachers and students to share
              their skills, creativity and knowledge to each other to empower and
              contribute in the growth and wellness of mankind.
            </p>
          </div>
          <div className="md:w-1/2 w-1/7 flex items-center justify-center">
            <img
              style={{ filter: "drop-shadow(0px 15px 10px rgb(0,0,0));", }}
              alt="about main image"
              className="drop-shadow-2xl"
              src={aboutMainImage}
              ref={heroImageRef}
            />
          </div>
        </div>
        {/* slider */}
      </section>
    </Layout>
  );
}

export default AboutUs;