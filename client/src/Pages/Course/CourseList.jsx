import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import CourseCard from "../../Components/CourseCard";
import Layout from "../../Layout/Layout";
import gsap from 'gsap';

export default function CourseList() {
  const dispatch = useDispatch();
  const { coursesData } = useSelector((state) => state.course);
  const containerRef = useRef(null);

  async function fetchCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    fetchCourses();

    const containerElement = containerRef.current;
    const coursesCards = containerElement.querySelectorAll('.course-card');

    gsap.fromTo(
      coursesCards,
      { opacity: 0, y: 50 },
      { opacity: 0, y: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out' }
    );
  }, []);

  return (
    <Layout>
      <div className="min-h-[90vh] pt-12 flex flex-col items-center gap-10 text-white">
        <h1 className="text-center text-3xl font-semibold">
          Explore the courses made by{" "}
          <span className="font-bold text-yellow-500">Industry Experts</span>
        </h1>
        <div
          ref={containerRef}
          className="mb-10 flex flex-wrap justify-center gap-14 md:max-w-[920px] lg:max-w-[1200px]"
        >
          {coursesData?.map((element) => {
            return (
              <CourseCard
                key={element._id}
                data={element}
                className="course-card w-full sm:w-auto"
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}