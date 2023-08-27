import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ReactTypingEffect from "react-typing-effect";

import Icon from "../components/Icon";
// Icons
import Html from "../components/icons/Html";
import Css from "../components/icons/Css";
import Javascript from "../components/icons/Javascript";
import Tailwind from "../components/icons/Tailwind";
import Bootstrap from "../components/icons/Bootstrap";
import Sass from "../components/icons/Sass";
import ReactJs from "../components/icons/ReactJs";
import NextJs from "../components/icons/NextJs";
import NodeJs from "../components/icons/NodeJs";
import Firebase from "../components/icons/Firebase";
import Figma from "../components/icons/Figma";
import Photoshop from "../components/icons/Photoshop";
import Illustrator from "../components/icons/Illustrator";
import AfterEffects from "../components/icons/AfterEffects";
import AdobeXd from "../components/icons/AdobeXd";
import Supabase from "../components/icons/Supabase";
import MongoDb from "../components/icons/MongoDb";
import Express from "../components/icons/Express";
// Project Card
import ProjectCard from "../components/ProjectCard";
import GitHubProfile from "../components/icons/GitHubProfile";
import TwitterProfile from "../components/icons/TwitterProfile";
import LinkedInProfile from "../components/icons/LinkedInProfile";
import FeaturedProjectCard from "../components/FeaturedProjectCard";

// Blog Components
import BlogList from "../components/blog/BlogList";
import BlogItem from "../components/blog/BlogItem";

// Dark Mode
import { useTheme } from "next-themes";

import { projects } from "../utils/constants";

const getDimensions = (ele) => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = (ele) => {
  ele.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};


const handleContactClick = () => {  
  // Open the email client
  window.location.href = 'mailto:akshath@luup.ai';
};


export default function Home({ publications }) {
  const [visibleSection, setVisibleSection] = useState();
  const [scrolling, setScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const handleResize = () => {
    if (window.innerWidth < 1024) {
    } else {
      setNavbarOpen(false);
    }
  };

  const headerRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const myWorkRef = useRef(null);
  const blogRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const sectionRefs = [
      { section: "home", ref: homeRef, id: 1 },
      { section: "about", ref: aboutRef, id: 2 },
      { section: "skills", ref: skillsRef, id: 3 },
      { section: "my-work", ref: myWorkRef, id: 4 },
      { section: "blog", ref: blogRef, id: 5 },
      { section: "contact", ref: contactRef, id: 6 },
    ];

    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition >= offsetTop && scrollPosition <= offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
        // console.log(visibleSection);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);

  // Handle Header Scroll Away
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    let timeoutId;

    const handleScrollBack = () => {
      const currentScrollPos = window.pageYOffset;

      // Delay before the header scrolls back into view
      if (currentScrollPos < scrollPosition - 50 && scrolling) {
        timeoutId = setTimeout(() => {
          setShowHeader(true);
        }, 250);
      }

      // Add an easing effect when the header scrolls into and out of view
      if (currentScrollPos > prevScrollPos + 10 && !scrolling && showHeader) {
        setScrolling(true);
      } else if (currentScrollPos < prevScrollPos - 10 && scrolling) {
        clearTimeout(timeoutId);
        setScrolling(false);
        setTimeout(() => {
          setShowHeader(false);
        }, 250);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScrollBack);
    return () => window.removeEventListener("scroll", handleScrollBack);
  }, [scrollPosition, scrolling, showHeader]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setScrolling(window.pageYOffset > 110)
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    console.log(currentTheme);
  }, [currentTheme]);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    if (currentTheme === "dark") {
      return (
        <svg
          className="w-6 h-6 transition-all duration-150 ease-in-out dark:flex dark:opacity-50 dark:group-hover:opacity-100 dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-6 h-6 transition-all duration-150 ease-in-out flex text-mid/50 group-hover:text-dark"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      );
    }
  };

  return (
    <div className="bg-white dark:bg-darker transition-all duration-150 ease-in-out">
      <div
        className={`relative w-full dark:bg-dark/20 bg-light bg-opacity-10 overflow-auto min-h-screen transition-all duration-150 ease-in-out ${
          navbarOpen ? "overflow-hidden" : "overflow-auto"
        }`}
      >
        <Head>
          <title>Luup.ai | Making AI accessible</title>
          <meta
            name="description"
            content="Luup.ai makes AI accessible"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Full-screen Menu */}
        <div
          className={`fixed w-full z-50 h-screen pt-24 bg-white dark:bg-darker bg-opacity-100 transform delay-100 transition-all duration-150 ${
            navbarOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full"
          }`}
        >
          <div className="container relative mx-auto">
            <nav className="block ml-auto">
              <ul className="z-50 flex flex-col items-start">
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "home"
                        ? "selected delay-200"
                        : "dark:text-light dark:hover:text-white text-mid/50 hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(homeRef.current);
                    }}
                  >
                    Home
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "about"
                        ? "current"
                        : "dark:text-light dark:hover:text-white text-mid/50 hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(aboutRef.current);
                    }}
                  >
                    About
                  </button>
                </li>
               {/*<li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "skills"
                        ? "current"
                        : "dark:text-light dark:hover:text-white text-mid/50 hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(skillsRef.current);
                    }}
                  >
                    Skills
                  </button>
                  </li>*/}
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "my-work"
                        ? "current"
                        : "dark:text-light dark:hover:text-white text-mid/50  hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(myWorkRef.current);
                    }}
                  >
                    My Work
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "blog"
                        ? "current"
                        : "dark:text-light dark:hover:text-white text-mid/50 hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(blogRef.current);
                    }}
                  >
                    Blog
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "contact"
                        ? "current"
                        : "dark:text-light dark:hover:text-white text-mid/50 hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(contactRef.current);
                    }}
                  >
                    Contact
                  </button>
                </li>
                <li className="z-40 block py-2 mt-6 list-none lg:inline-block">
                  <a
                    href={`mailto:akshath@luup.ai`}
                    className="text-lg btn-brand btn-lg group"
                  >
                    Contact us
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Header and Nav */}
        <header
          ref={headerRef}
          className={`header top-0 mx-auto flex items-center z-50 fixed w-full transition-all duration-150 h-20 ease-in-out ${
            scrolling ? "-translate-y-full" : ""
          } ${
            scrolling && !navbarOpen
              ? "dark:bg-darker bg-[#f6f5f6]"
              : "dark:bg-darker bg-[#f6f5f6]"
          }`}
        >
          {/* Logo and Nav container */}
          <div className="container relative flex items-center mx-auto">
            {/* Logo */}
            <div className="z-50 sm:w-8 sm:h-8 w-9 h-9 flex items-center">
            </div>
            {/* Text */}
            <div className="flex items-center ml-4">
              <p className="text-lg font-semibold font-display tracking-tight dark:text-white text-darker mb-0 transition-all duration-150 ease-in-out">
                Luup.ai
              </p>
            </div>
            {/* Nav */}
            <nav className="block ml-auto h-full">
              <ul className="z-50 flex items-center">
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "home" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(homeRef.current);
                    }}
                  >
                    Home
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "about" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(aboutRef.current);
                    }}
                  >
                    About
                  </button>
                </li>
                {/*<li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "skills" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(skillsRef.current);
                    }}
                  >
                    Skills
                  </button>
                  </li>*/}
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "my-work" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(myWorkRef.current);
                    }}
                  >
                    AI builder
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className={`nav-item ${
                      visibleSection === "blog" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(blogRef.current);
                    }}
                  >
                    Training
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "contact" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(contactRef.current);
                    }}
                  >
                    Contact
                  </button>
                </li>
                <li className="z-50 hidden ml-5 list-none lg:inline-block">
                  <a
                    href={`mailto:akshath@luup.ai`}
                    className="btn-brand btn-md group"
                  >
                    Contact us
                  </a>
                </li>
                <li className="z-50 inline-block list-none lg:hidden group">
                  <button
                    className={`relative w-10 h-10 ${
                      navbarOpen
                        ? "dark:text-white text-dark"
                        : "text-mid/50 group-hover:text-mid dark:opacity-50 dark:group-hover:opacity-100 dark:text-white dark:group-hover:text-white"
                    } focus:outline-none`}
                    onClick={() => setNavbarOpen(!navbarOpen)}
                  >
                    <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                          navbarOpen ? "rotate-45" : "-translate-y-1.5"
                        }`}
                      ></span>
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                          navbarOpen ? "opacity-0" : "opacity-100"
                        }`}
                      ></span>
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                          navbarOpen ? "-rotate-45" : "translate-y-1.5"
                        }`}
                      ></span>
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
            <div className="flex mt-auto ml-0 lg:ml-5">
              {/* Dark mode */}
              <button
                className="flex items-center justify-center w-7 h-12 transition-all duration-150 ease-in rounded-sm focus:outline-none group bg-transparent outline-none"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
              >
                {renderThemeChanger()}
              </button>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="container relative z-30 mx-auto">
          {/* Hero Content */}
          <main className={`flex-col flex h-screen`} id="home" ref={homeRef}>
            {/* Main */}
            <div className="container relative flex flex-col items-start justify-center flex-grow px-0 mx-auto md:px-20 lg:px-24 section">
              <div className="w-full">
                <span className="text-2xl font-semibold text-brand">
                👋 Welcome to 
                </span>


                <h1 className="mb-4 text-5xl md:text-7xl dark:text-white text-dark">
                  Luup.ai
                </h1>
                
                <h2 className="mb-4 text-3xl md:text-4xl dark:text-light text-mid">
                  <ReactTypingEffect
                    typingDelay={200}
                    speed={30}
                    eraseSpeed={70}
                    eraseDelay={1500}
                    text={[
                      `We make AI accessible to the world`,
                      `AI Services`,
                      `Online Courses`,
                      `Tools for building LLM applications`,
                      'Customer Support Automations',
                    ]}
                  />
                </h2>
                <p className="w-4/5 text-xl md:w-full">
                  
                </p>
                <a
                  href={`mailto:akshath@luup.ai`}
                    className="mt-4 btn-brand btn-lg group"
                  >
                  Contact Sales: sales@luup.ai 
                  </a>

                <br></br>

                <button
                  className="mt-4 btn-brand btn-lg group"
                  onClick={() => {
                    scrollTo(myWorkRef.current);
                  }}
                >
                  Luup no-code AI builder
                </button>

              </div>
            </div>
          </main>

          {/* About */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="about"
            ref={aboutRef}
          >
            <div className="flex flex-col">
              <h2 className="text-5xl">About</h2>
              <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

              <div className="flex flex-col-reverse items-start w-full md:flex-row">
                <div className="flex flex-col w-full md:pr-8 md:w-3/5">
                  <p className="text-lg">
                  Our mission is to bring AI&apos;s immense potential within everyone&apos;s reach.           
Whether you&apos;re a business seeking smarter solutions, an individual aspiring to master the intricacies of AI, or a visionary aiming to craft applications that transform industries, Luup.ai is your catalyst.
                  </p>
                  <p></p>
                  <p className="text-lg">
                  Services Tailored to Your Needs: Every journey with AI is unique, and our range of services ensures that your specific needs are met. We offer everything from strategy development to full-blown AI integration, providing the exact tools you need to thrive in a data-driven world.
                  </p>
                  <p className="text-lg">
                  Courses to Cultivate Mastery: Education is empowerment. Our comprehensive courses, designed by industry experts, offer deep insights into the world of AI. From beginner tutorials to advanced seminars, we guide enthusiasts and professionals alike on a learning journey that demystifies AI and amplifies skills.
                  </p>
                  <p className="text-lg">
                  Cutting Edge Customer Support Automation: In today&apos;s fast-paced world, efficiency is key. Our state-of-the-art customer support automation solutions not only speed up processes but also ensure accuracy, responsiveness, and personalized service that delights customers and empowers businesses.
                  </p>
                  <p className="text-lg">
                  Educational Tools for Scalable Applications: Dreaming of building your own AI application? Our suite of educational tools is designed to help. These aren&apos;t just theoretical resources, they&apos;re practical platforms that enable creators to build, test, and scale applications to full production, ensuring that ideas are not just conceived but also brought to fruition.
                  </p>
                </div>
                <div className="flex w-full h-full mb-4 md:pl-8 md:w-2/5 md:mb-0">
                  <Image
                    src="/projects/Luup_logo.jpeg"
                    className="overflow-hidden rounded-md"
                    width={880}
                    height={880}
                    alt={"Luup_UI"}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          {/*<section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="skills"
            ref={skillsRef}
                >*/}



           {/* <h2 className="text-5xl">Custom Integrations </h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>
            <div className="w-full mr-auto grid gap-4 grid-cols-4 sm:grid-cols-4 md:grid-cols-8 mt-4">
              <img
                src="/projects/Sids-Farm-Logo-1.png"
                title="HTML"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

            <img
                src="/projects/Engagebay-Logo.png"
                title="HTML"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

            </div>
            </section>*/}
        

          {/* My Work */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="my-work"
            ref={myWorkRef}
          >
            {/* My Work header */}
            <h2 className="text-5xl">No-code AI builder - coming soon...</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            {/* Featured Projects Container */}
            <div className="flex flex-col w-full mb-12">
              {/* Project One */}
              <FeaturedProjectCard
                title={"Luup"}
                status={"Join the Waitlist"}
                description={`Build no-code AI flows that scale to production`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/Luup_demo.jpeg"}
                liveLink={"https://forms.gle/wRKZBj9eR8MpmEeN9"}
                repoLink={null}
              />
              {/* Project Two */}
              <FeaturedProjectCard
                title={"LLM Integrations"}
                status={"Join the waitlist"}
                description={`Offers integration with every major LLM. Unlock the power of every LLM offered by: OpenAI, Cohere, Azure, Replicate and even custom trained LLMs`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row-reverse`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/multi_llm.jpeg"}
                liveLink={"https://forms.gle/wRKZBj9eR8MpmEeN9"}
                repoLink={null}
              />
              {/* Project Three */}
              <FeaturedProjectCard
                title={"VectorDB Integrations"}
                status={"Join the waitlist"}
                description={`Harness the power of limitless customization in vector search through our integrations with : ChromaDB, Pinecone, Qdrant, Vectara, Supabase, Weaviate and more`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/multi_vectordb.jpeg"}
                liveLink={"https://forms.gle/wRKZBj9eR8MpmEeN9"}
                repoLink={null}
              />
            </div>



            
            <h2 className="text-4xl text-center">Testimonials</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 mx-auto border-0"></hr>
            <p className="mb-16 text-lg text-center">
              Satisfied Customers 
            </p>

            <div className="grid grid-flow-row grid-rows-2 gap-4 grid-col-1 lg:grid-cols-3">


           <ProjectCard testimonialData={{ name: "-Sridhar", image: "path_to_image.jpg", testimonial: "Thank you for this. We had been assigned a project at our company for document QnA with LLMs and this is exactly what we wanted. " }} />
           <ProjectCard testimonialData={{ name: "-Hari", image: "path_to_image.jpg", testimonial: "As a growing business, we were looking for AI solutions that wouldn't break the bank. luup.ai not only made AI services affordable but also tailored them to fit our unique needs. Exceptional work" }} />
           <ProjectCard testimonialData={{ name: "-Alex Thompson", image: "path_to_image.jpg", testimonial: "I always thought AI was reserved for tech giants and experts. luup.ai has greatly helped us, making AI accessible for smaller business owners like me." }} />
           <ProjectCard testimonialData={{ name: "-Bob Young", image: "path_to_image.jpg", testimonial: "With the customer support automation that luup.ai provides, my team and I can focus more on building relationships with our clients rather than getting bogged down with repetitive queries. Efficiency has never looked this good!" }} />
           <ProjectCard testimonialData={{ name: "-Linda Petrov", image: "path_to_image.jpg", testimonial: "This is exactly what I was waiting for" }} />
           <ProjectCard testimonialData={{ name: "-Arjun B.", image: "path_to_image.jpg", testimonial: "This is a great service! I highly recommend it." }} />
           <ProjectCard testimonialData={{ name: "-Akash K.", image: "path_to_image.jpg", testimonial: "Their commitment to making AI accessible to all, regardless of technical background, is truly commendable" }} />
           <ProjectCard testimonialData={{ name: "-Vikash Chandran", image: "path_to_image.jpg", testimonial: "The transition to AI-supported customer service was seamless, thanks to luup.ai. Our customer satisfaction rates have soared, and we owe a big part of that success to their efficient automation tools" }} />


            </div>
            </section>

          {/* Blog */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="blog"
            ref={blogRef}
          >
            {/* Blog header */}
            <h2 className="text-5xl">Courses</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>


{/*youtube embeddings*/}

<div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <div style={{ flex: 1, margin: '0 10px' }}>
        <iframe 
            src="https://www.youtube.com/embed/xZDB1naRUlk" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen 
            style={{ width: '100%', height: '300px' }}>
        </iframe>
    </div>
    <div style={{ flex: 1, margin: '0 10px' }}>
        <iframe 
            src="https://www.youtube.com/embed/MD8HgJll_pk" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen 
            style={{ width: '100%', height: '300px' }}>
        </iframe>
    </div>
    <div style={{ flex: 1, margin: '0 10px' }}>
        <iframe 
            src="https://www.youtube.com/embed/i0u6UHGw6xg" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen 
            style={{ width: '100%', height: '300px' }}>
        </iframe>
    </div>
</div>
          </section>

          {/* Contact */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="contact"
            ref={contactRef}
          >
            <h2 className="text-5xl">Contact</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            <div className="flex flex-col-reverse w-full md:flex-row">
              <div className="w-full mb-4 md:pl-0 md:mb-0">
                <p className="text-lg">
                  We are currently focused on empowering companies and institutions with AI services
                  
                </p>
                <p className="text-lg">
                  Email us at{" "}
                  <Link
                    href="mailto:akshath@luup.ai"
                    className="underline-link"
                  >
                    akshath@luup.ai
                  </Link>{" "}

                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-col w-full px-0 py-16 md:px-20 lg:px-24 section">
            <hr className="w-full h-1 mb-16 dark:bg-white bg-dark border-0 opacity-10"></hr>
            <div className="w-8 mb-4">

            </div>

            <div className="flex flex-col items-start md:flex-row">
              

              <div className="flex md:hidden">
                <span className="mr-2">
                  <GitHubProfile marginBottom={"mb-0"} />
                </span>
                <span className="mr-2">
                  <TwitterProfile marginBottom={"mb-0"} />
                </span>
                <span className="mr-2">
                  <LinkedInProfile marginBottom={"mb-0"} />
                </span>
              </div>
            </div>
          </footer>
        </div>

        {/* Fixed Container */}
        <div className="fixed bottom-0 z-30 w-full">
          <div className="container relative flex h-full mx-auto">
            {/* Profile Icons */}
            <div className="absolute bottom-0 items-center hidden mt-auto mr-auto text-white left-8 md:flex md:flex-col">
              <TwitterProfile marginBottom={"mb-4"} />
              <div className="w-0.5 dark:bg-white bg-dark h-24 opacity-20 mt-2"></div>
            </div>

            {/* Pagination */}
            <div className="absolute bottom-0 items-center hidden mt-auto ml-auto text-white right-8 md:flex md:flex-col">
              {/* Hero - Diamond 1 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(homeRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "home"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "home"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "home"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* About - Diamond 2 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(aboutRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "about"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "about"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "about"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* Skills - Diamond 3 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(skillsRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "skills"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "skills"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "skills"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* My Work - Diamond 4 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(myWorkRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "my-work"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "my-work"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "my-work"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* Blog - Diamond 5 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(blogRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "blog"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "blog"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "blog"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* Contact - Diamond 6 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(contactRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "contact"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "contact"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "contact"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>

              {/* Line */}
              <div className="w-0.5 dark:bg-white bg-dark h-24 opacity-20 mt-2 z-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Method used to fetch data from Hashnode.
 * @param {Object} context
 * @returns props
 */
export async function getServerSideProps(context) {
  const res = await fetch("https://api.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "32ab9fe7-0331-4efc-bdb8-5a3e0bfdd9b9",
    },
    body: JSON.stringify({
      query:
        'query {user(username: "danielcranney") {publication {posts(page: 0) {title brief slug coverImage dateAdded}}}}',
    }),
  });
  const publications = await res.json();

  if (!publications) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      publications,
    },
  };
}
