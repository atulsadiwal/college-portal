"use client";
import React, { useEffect, useState, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { FaGraduationCap, FaBook, FaUsers, FaChalkboardTeacher } from "react-icons/fa";
import "../../styles/globals.css";
import CubeSlider from "../../components/CubeSlider.js"
// import Faqs from "@/components/Faqs";
// import TeamComponent from "@/components/TeamComponent";
// import WhyChooseUs from "@/components/WhyChooseUs";



const faqs = [
    { question: 'What services does the hospital offer?', answer: 'We offer a wide range of medical services including emergency care, surgery, and specialized treatments.' },
    { question: 'How can I book an appointment?', answer: 'You can book an appointment through our website or by calling our front desk.' },
    { question: 'What are the visiting hours for patients?', answer: 'Visiting hours are from 9 AM to 8 PM daily, with special hours for critical care units.' },
    { question: 'How can I contact a doctor or specialist?', answer: 'You can contact a doctor via our patient portal or by scheduling an appointment.' },
    { question: 'What insurance plans do you accept?', answer: 'We accept a variety of insurance plans; please check with our billing department for details.' },
    { question: 'What should I bring to my appointment?', answer: 'Please bring your ID, insurance card, and any relevant medical records.' },
    { question: 'Is the hospital equipped with emergency care facilities?', answer: 'Yes, we have a fully equipped emergency department available 24/7.' },
    { question: 'What measures are in place for patient safety and privacy?', answer: 'We follow strict safety protocols and privacy policies to ensure patient confidentiality and care.' },
  ];


gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const heroRef = useRef(null);
    const heroTextRef = useRef(null);
    const heroImageRef = useRef(null);
    const imageRefs = useRef([]);
    const [zIndex, setZIndex] = useState([1, 2]);

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };


    const handleHoverStart = (index) => {
        const updatedZIndex = [...zIndex];
        updatedZIndex[index] = 2;
        updatedZIndex[1 - index] = 1;
        setZIndex(updatedZIndex);
    };

    const handleHoverEnd = () => {
        setZIndex([1, 2]);
    };
    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "+=100%",
                scrub: true,
                pin: true,
                anticipatePin: 1,
            },
        });

        tl.to(heroImageRef.current, {
            scale: 1,
            duration: 2,
            ease: "power3.inOut",
        });

        tl.to(
            heroTextRef.current,
            {
                opacity: 0,
                y: -100,
                duration: 1,
                ease: "power3.inOut",
            },
            "<"
        );

        imageRefs.current.forEach((imageRef) => {
            tl.to(
                imageRef,
                {
                    opacity: 0,
                    y: -50,
                    duration: 1,
                    ease: "power3.inOut",
                },
                "<"
            );
        });
    }, []);

    const visionRef = useRef(null);
    const highlightsRef = useRef(null);
    const testimonialsRef = useRef(null);

    useEffect(() => {
        const sections = [visionRef, highlightsRef, testimonialsRef];

        sections.forEach((sectionRef) => {
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        });
    }, []);


    const slideData = [
        {
            img: "/image/about/college-students1.webp",
            title: "About 1",
        },
        {
            img: "/image/about/college-students2.webp",
            title: "About 2",
        },
        {
            img: "/image/about/college-students3.webp",
            title: "About 3",
        },
        {
            img: "/image/about/college-students4.webp",
            title: "About 4",
        }
    ]


    const items = [
        { title: 'Expert Faculty', desc: 'Learn from industry-leading professors and mentors committed to your success.', image: '/image/about/faculty.jpg' },
        { title: 'Diverse Programs', desc: 'Choose from a wide range of courses designed to prepare you for the future.', image: '/image/about/programs.jpg' },
        { title: 'Global Community', desc: 'Be part of a vibrant, diverse, and inclusive student body from across the globe.', image: '/image/about/community.jpg' },
        { title: 'Career Opportunities', desc: 'Benefit from strong industry connections and personalized career support.', image: '/image/about/career2.jpeg' }
      ];
    
      const quickLinks = [
        "We provide top-tier education with expert faculty and a dynamic curriculum",
        "Our campus is full of energy with events, clubs, and cultural activities.",
        "Smart classrooms, advanced labs, and a digital library enhance learning."
      ];




    return (
        <>
            <Header />
            <main className="bg-gray-100 text-gray-800">
                <section
                    ref={heroRef}
                    className="relative h-screen bg-gradient-to-b from-blue-500 via-blue-300 to-yellow-400 text-yellow-100 overflow-hidden flex items-center"
                >
                    <div
                        ref={heroImageRef}
                        className="absolute inset-0 z-0 scale-0 origin-center"
                    >
                        <Image
                            src="/image/about/collegecampus.webp"
                            alt="College Campus"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            priority
                        />
                    </div>

                    <div className="relative z-10 container mx-auto px-6 flex flex-col md:grid md:grid-cols-2 gap-8 items-center">
                        <div
                            ref={heroTextRef}
                            className="text-center md:text-left order-2 md:order-1"
                        >
                            <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-50">
                                About Our College
                            </h1>
                            <p className="mt-4 text-lg md:text-xl text-yellow-100">
                                Empowering students with excellence in education and innovation.
                            </p>
                        </div>

                        <div className="flex-1 relative flex items-center justify-center h-full order-1 md:order-2">
                            <motion.div
                                ref={(el) => (imageRefs.current[0] = el)}
                                className="absolute top-1/4 left-1/4 md:top-auto md:left-auto md:relative transform hover:scale-105 transition-transform duration-500"
                                whileHover={{ scale: 1.1 }}
                                style={{ zIndex: zIndex[0] }}
                                onHoverStart={() => handleHoverStart(0)}
                                onHoverEnd={handleHoverEnd}
                            >
                                <Image
                                    src="/image/about/hero1.jpg"
                                    alt="Campus View"
                                    width={200}
                                    height={200}
                                    className="rounded-lg shadow-lg"
                                />
                            </motion.div>

                            <motion.div
                                ref={(el) => (imageRefs.current[1] = el)}
                                className="absolute bottom-1/4 right-1/4 md:bottom-auto md:right-auto md:relative transform hover:scale-105 transition-transform duration-500 mt-4"
                                whileHover={{ scale: 1.1 }}
                                style={{ zIndex: zIndex[1] }}
                                onHoverStart={() => handleHoverStart(1)}
                                onHoverEnd={handleHoverEnd}
                            >
                                <Image
                                    src="/image/about/hero2.jpg"
                                    alt="Student Activities"
                                    width={200}
                                    height={200}
                                    className="rounded-lg shadow-lg"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>


                <section className="container mx-auto h-auto md:h-[50vh] flex flex-col md:flex-row items-center my-16 gap-4">
      {/* Left Column */}
      <div className="w-full md:w-4/6 px-6 py-4">
        <h4 className="text-sm text-gray-500 ">About us</h4>
        <h2 className="text-2xl md:text-3xl font-bold mt-2">WELCOME TO College Portal</h2>
        <p className="text-gray-600 mt-4 text-sm">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn&apos;t anything embarrassing hidden in the middle of text.
        </p>
        <p className="text-gray-600 mt-2 text-sm">
          All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
        </p>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-2/6 min-h-[300px] md:h-[50vh] relative">
      <div className="w-full max-w-md mt-4">
 <CubeSlider slides={slideData} width="w-full" />
</div>
        
      </div>
    </section>
             


                <section ref={visionRef} className="py-16 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
                    <div className="container mx-auto px-6">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-12 text-gray-800">
                            Our Vision, Mission, and Values
                        </h2>
                        <div className="relative grid gap-12 md:grid-cols-3">
                            {[
                                {
                                    icon: <FaGraduationCap size={40} className="text-blue-600" />,
                                    title: "Our Vision",
                                    description:
                                        "To be a leading institution recognized globally for academic excellence and innovation.",
                                    bg: "bg-gradient-to-b from-blue-100 to-blue-200",
                                },
                                {
                                    icon: <FaBook size={40} className="text-green-600" />,
                                    title: "Our Mission",
                                    description:
                                        "To provide quality education that fosters innovation and inclusivity.",
                                    bg: "bg-gradient-to-b from-green-100 to-green-200",
                                },
                                {
                                    icon: <FaUsers size={40} className="text-red-600" />,
                                    title: "Our Values",
                                    description:
                                        "Integrity, diversity, and a commitment to lifelong learning.",
                                    bg: "bg-gradient-to-b from-red-100 to-red-200",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`p-10 rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500 ${item.bg}`}
                                    whileHover={{ translateY: -10 }}
                                >
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold mt-6 text-gray-800">
                                            {item.title}
                                        </h3>
                                        <p className="mt-4 text-gray-700 text-center leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* <section ref={highlightsRef} className="py-20 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-2xl md:text-4xl font-extrabold text-center mb-16 text-gray-800">
                            Why Choose Us?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {[
                                {
                                    icon: <FaChalkboardTeacher size={50} className="text-indigo-600" />,
                                    title: "Expert Faculty",
                                    description:
                                        "Learn from industry-leading professors and mentors committed to your success.",
                                    image: "/image/about/faculty.jpg",
                                },
                                {
                                    icon: <FaBook size={40} className="text-purple-600" />,
                                    title: "Diverse Programs",
                                    description:
                                        "Choose from a wide range of courses designed to prepare you for the future.",
                                    image: "/image/about/programs.jpg",
                                },
                                {
                                    icon: <FaUsers size={50} className="text-orange-600" />,
                                    title: "Global Community",
                                    description:
                                        "Be part of a vibrant, diverse, and inclusive student body from across the globe.",
                                    image: "/image/about/community.jpg",
                                },
                                {
                                    icon: <FaGraduationCap size={50} className="text-green-600" />,
                                    title: "Career Opportunities",
                                    description:
                                        "Benefit from strong industry connections and personalized career support.",
                                    image: "/image/about/career.jpg",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="relative overflow-hidden rounded-lg shadow-lg bg-white group transform transition-all duration-500 hover:scale-105"
                                    whileHover={{ translateY: -5 }}
                                >
                                    <div className="absolute inset-0">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="opacity-85 group-hover:opacity-50 transition-opacity duration-500"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 opacity-75 group-hover:opacity-90 transition-opacity duration-500"></div>
                                    <div className="relative p-8 flex flex-col items-center text-center text-yellow-200">
                                        <div className="w-16 h-16 flex items-center justify-center bg-gray-50 opacity-90 rounded-full shadow-md mb-6">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold">{item.title}</h3>
                                        <p className="mt-4 text-sm opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section> */}
                {/* <WhyChooseUs />
                <TeamComponent /> */}

<section className="w-full md:h-[70vh] h-full  my-20">
  <h2 className="text-4xl text-center font-bold text-gray-800 mb-4">Why Choose Us</h2>
      <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="w-full md:w-4/6 ">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {items.map((item, index) => (
      <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden h-full flex flex-col">
        
        <div className="relative h-36"> 
          <Image
            src={item.image} 
            alt="item Image"
            layout="fill"
            objectFit="cover" 
            className="rounded-t-lg" 
          />
        </div>

        
        <div className="p-2 text-center flex-grow">
          <h3 className="text-lg font-bold text-gray-800 leading-tight mb-1">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</div>
      
      {/* Right Column */}
      <div className="w-full md:w-2/6 bg-blue-900 text-white p-4 flex flex-col justify-between">
        <h2 className="text-lg font-semibold -mb-[1rem]">QUICK LINK</h2>
        <div className="space-y-3">
          {quickLinks.map((link, index) => (
            <p key={index} className="text-sm text-gray-300">
              {link}
            </p>
          ))}
        </div>
        <button className="bg-white text-blue-900 px-4 py-1 rounded-lg self-end">View All</button>
      </div>
      </div>
    </section>




                <section ref={testimonialsRef} className="py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-2xl md:text-3xl font-extrabold mb-12">What Our Students Say</h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    name: "Riya Malviya",
                                    feedback:
                                        "The professors here are amazing and the campus is beautiful. I’ve learned so much!",
                                    image: "/image/student/student1.png",
                                },
                                {
                                    name: "Mukund Agrawal",
                                    feedback:
                                        "The best decision of my life was to join this college. It’s an incredible experience.",
                                    image: "/image/student/student2.png",
                                },
                                {
                                    name: "Raj Soni",
                                    feedback:
                                        "I’ve grown both academically and personally thanks to the supportive environment.",
                                    image: "/image/student/student3.png",
                                },
                            ].map((item, index) => (
                                <motion.div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        className="rounded-full mx-auto"
                                        width={80}
                                        height={80}
                                    />
                                    <h4 className="mt-4 text-xl font-semibold">{item.name}</h4>
                                    <p className="mt-2 text-gray-600">{item.feedback}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>


                <div className="container mx-auto px-4 py-12 text-center">
      <h5 className="text-teal-500 font-medium">Frequently Asked Questions</h5>
      <h2 className="text-2xl font-bold mt-1">Frequently Asked Topics</h2>
      <p className="text-gray-600 mt-1 mb-12 text-sm max-w-4xl mx-auto">Explore answers to the most common questions about our services, facilities, and procedures.Explore answers to the most common questions about our services, facilities, and procedures. Explore answers to the most common questions about our services,</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg shadow-sm flex flex-col relative">
            <button
              className="w-full flex justify-between items-center px-4 py-2 text-left font-medium text-gray-800 hover:bg-gray-100"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="transition-transform duration-300  flex items-center justify-center text-green-500  font-bold rounded-md ms-2">
  {openIndex === index ? '✕' : '+'}
</span>



            </button>
            <div className={`absolute left-0 right-0 top-12 bg-white shadow-lg border rounded-lg transition-all duration-300 z-10 ${openIndex === index ? 'opacity-100 visible p-4' : 'opacity-0 invisible'}`}>
              <div className="text-gray-700">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
            </main>
            {/* <Faqs /> */}
            <Footer />
        </>
    );
}

export default About;
