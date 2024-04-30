import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import CourseCard from "../../Components/CourseCard";
import Layout from "../../Layout/Layout";
import { gsap } from "gsap";

const AnimatedCourseCard = React.forwardRef((props, ref) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }, []);

  return <CourseCard ref={cardRef} {...props} />;
});

export default function CourseList() {
  const dispatch = useDispatch();
  const { coursesData } = useSelector((state) => state.course);
  const coursesContainerRef = useRef(null);
  const headingRef = useRef(null);

  async function fetchCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    fetchCourses();

    const coursesContainer = coursesContainerRef.current;
    const heading = headingRef.current;

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
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      coursesContainer.children,
      {
        opacity: 0,
        y: 50,
        stagger: 0.2,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.5,
        ease: "power2.out",
        stagger: 0.2,
      }
    );
  }, []);

  return (
    <Layout>
      <section className="flex flex-col gap-14 md:py-6 py-5 md:px-20 px-3 min-h-screen">
        <h1
          className="md:text-4xl text-2xl w-fit text-blue-600 dark:text-white font-inter font-[500] after:content-[' '] relative after:absolute after:-bottom-3.5 after:left-0 after:h-1.5 after:w-[60%] after:rounded-full after:bg-yellow-400 dark:after:bg-yellow-600"
          ref={headingRef}
        >
          Explore the courses made by{" "}
          <span className="font-[600] font-lato text-yellow-500">
            {" "}
            Industry experts
          </span>
        </h1>
        {/* course container */}
        <div
          className="flex gap-12 md:justify-start justify-center flex-wrap"
          ref={coursesContainerRef}
        >
          {coursesData?.map((element) => {
            return <AnimatedCourseCard key={element._id} data={element} />;
          })}
        </div>
      </section>
    </Layout>
  );
}