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
     
    </Layout>
  );
}