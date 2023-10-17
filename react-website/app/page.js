"use client";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiOutlineDownload,
} from "react-icons/ai";
import { BsFillMoonStarsFill } from "react-icons/bs";
import React from "react";
import { useEffect, useRef } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";

function Loader() {
  const [showElement, setShowElement] = React.useState(true);
  useEffect(() => {
    setTimeout(function () {
      setShowElement(false);
    }, 5000);
  }, []);

  return (
    <div id="fadeOut">
      {showElement && (
        <div className="justify-center flex h-screen min-w-full bg-white dark:bg-gray-900 absolute py-5">
          <svg
            className="justify-center flex"
            viewBox="-225 -225 1000 1000"
            version="1.1"
          >
            <path
              id="j_path"
              d="M184.976 212.481C184.576 362.881 185.243 351.681 174.709 373.548C166.443 390.614 154.043 401.681 136.176 407.814C128.709 410.348 124.709 410.881 110.043 410.881C94.5759 410.881 91.3759 410.348 80.8426 407.014C66.9759 402.481 52.0426 393.014 44.3092 384.081L39.1092 377.948L27.6426 390.348C21.2426 397.148 16.0426 403.148 16.0426 403.681C16.0426 405.814 29.1092 418.748 36.7092 424.348C59.5092 440.614 85.6426 447.014 119.376 444.614C170.309 441.014 203.376 413.548 217.243 363.548L220.709 350.881L221.109 214.481L221.509 78.2142H203.509H185.509L184.976 212.481Z"
              fill="white"
              stroke="#000000"
              strokeWidth="4"
            />
            <path
              id="diag_path"
              d="M232.043 83.1475C233.776 85.9475 240.576 98.0809 247.376 110.214C254.043 122.348 261.243 135.148 263.376 138.881C266.576 144.748 286.976 176.214 324.709 233.814C346.843 267.681 361.643 290.214 376.709 313.548C385.376 326.748 396.176 343.281 400.709 350.214C405.376 357.148 419.376 378.748 432.043 398.214C444.576 417.681 456.309 435.548 457.776 437.814L460.709 442.214H477.776C487.109 442.214 494.709 441.814 494.709 441.281C494.709 440.881 487.109 427.548 477.909 411.681C463.109 386.348 448.576 363.148 411.643 306.214C392.576 276.881 381.776 260.081 366.576 236.481C358.176 223.548 348.709 208.614 345.376 203.548C331.109 181.548 285.109 110.214 275.376 94.8809L264.709 78.3475L246.976 78.2142H229.109L232.043 83.1475Z"
              fill="white"
              stroke="#000000"
              strokeWidth="4"
            />
            <path
              id="down_path"
              d="M461.376 221.014C461.376 356.881 461.509 363.948 463.776 367.281C465.109 369.281 472.709 382.214 480.709 396.214C488.576 410.081 495.643 422.081 496.309 422.748C496.843 423.548 497.376 346.214 497.376 251.148V78.2142H479.376H461.376V221.014Z"
              fill="white"
              stroke="#000000"
              strokeWidth="4"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

function TypeWriter(props) {
  const [text] = useTypewriter({
    words: [
      "",
      "Software Engineer",
      "CS Student at The University of Texas at Dallas",
      "Looking for an Entry Level position",
    ],
    typeSpeed: 100,
    deleteSpeed: 75,
    delaySpeed: 4750,
    loop: 0,
  });

  const [showElement, setShowElement] = React.useState(false);
  useEffect(() => {
    setTimeout(function () {
      setShowElement(true);
    }, 5000);
  }, []);

  function color() {
    if (props.mode && showElement) {
      return "white";
    } else if (!props.mode && showElement) {
      return "black";
    } else if (props.mode && !showElement) {
      return "black";
    } else {
      return "white";
    }
  }

  return (
    <div className="text-xl py-2 lg:text-2xl">
      <span className="dark:text-white">{text}</span>
      <Cursor cursorStyle="_" cursorColor={color()} cursorBlinking="true" />
    </div>
  );
}

function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_yttegid",
        "template_bo96owo",
        form.current,
        "pRxodouFiz39ztjQy"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="h-full w-full">
      <h1 className="text-xl grid pb-4">Contact Me</h1>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="h-5/6 w-full grid grid-rows-6 grid-cols-2 grid-flow-row gap-1 lg:grid-cols-4 lg:gap-4"
      >
        <input
          placeholder="Name"
          type="text"
          name="user_name"
          className="w-full border-2 border-gray-600 rounded row-start-1 row-span-1 col-start-1 col-span-1 lg:col-span-2 dark:bg-gray-900 dark:border-white indent-4"
        />
        <input
          placeholder="Email"
          type="email"
          name="user_email"
          className="w-full border-2 border-gray-600 rounded row-start-1 row-span-1 col-start-2 col-span-1 lg:col-start-3 lg:col-span-2 dark:bg-gray-900 dark:border-white indent-4"
        />
        <textarea
          placeholder="Message"
          name="message"
          className="w-full border-2 border-gray-600 rounded row-start-2 row-span-4 col-start-1 col-span-2 lg:col-span-4 dark:bg-gray-900 dark:border-white indent-4 pt-4"
        />
        <input
          type="submit"
          value="Send"
          className="row-start-6 col-span-2 col-start-1 lg:col-span-1 lg:col-start-4 bg-gradient-to-r from-violet-300 to-blue-400 text-xl text-white rounded"
        />
      </form>
    </div>
  );
}

function Slider() {
  const [showAbout, setShowAbout] = React.useState(true);
  const [showProjects, setShowProjects] = React.useState(false);
  const [showContact, setShowContact] = React.useState(false);

  return (
    <div className="w-full h-5/6 col-span-3 row-span-3 row-start-2 col-start-1 lg:row-span-6 lg:row-start-1 lg:col-start-3 lg:col-span-4 bg-gradient-to-r from-blue-400 to-violet-300 rounded-2xl p-2 mt-36 lg:mt-0">
      <div className="flex-col h-full w-full lg:items-center lg:justify-center bg-white dark:bg-gray-900 rounded-xl dark:text-white">
        <nav className="py-4 mb-5 flex-row max-h-10 lg:px-8">
          <ul className="flex flex-row-reverse text-lg px-8 justify-between lg:justify-start lg:gap-10 lg:px-0">
            <li>
              <a
                className={showContact && "border-b-2 border-blue-400"}
                id={!showContact && "fromLeft"}
                onClick={() => {
                  setShowAbout(false);
                  setShowProjects(false);
                  setTimeout(() => setShowContact(true), 400);
                }}
              >
                Contact
              </a>
            </li>
            <li>
              <a
                className={showProjects && "border-b-2 border-blue-400"}
                id={!showProjects && "fromLeft"}
                onClick={() => {
                  setShowAbout(false);
                  setShowContact(false);
                  setTimeout(() => setShowProjects(true), 400);
                }}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                className={showAbout && "border-b-2 border-blue-400"}
                id={!showAbout && "fromLeft"}
                onClick={() => {
                  setShowContact(false);
                  setShowProjects(false);
                  setTimeout(() => setShowAbout(true), 400);
                }}
              >
                About
              </a>
            </li>
          </ul>
        </nav>

        <div className="flex w-full h-5/6 lg:h-full px-8 lg:py-3 justify-center">
          <AnimatePresence>
            {showAbout && (
              <motion.div
                key="box"
                initial={{ opacity: 1 }}
                exit={{
                  x: "5%",
                  width: "85%",
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{ duration: 0.1, delay: 0.2 }}
                className="lg:overflow-hidden"
              >
                <h1 className="text-2xl pb-6 lg:text-5xl">Hey there!</h1>
                <p className="text-xl pb-4 lg:text-3xl">
                  My name is Jimmy Nguyen and I am a third year student at The
                  University of Texas at Dallas. I am currently studying
                  Computer Science and am on track to graduate Spring 2024.
                  Currently looking for an entry level position.
                </p>
                <p className="text-xl pb-4 lg:text-3xl">
                  I discovered coding back in 2017 in my sophomore coding class
                  and instantly fell in love. If you want to check out what I've
                  coded so far check out my Projects tab!
                </p>
                <p className="text-xl lg:text-3xl">
                  I recently finished up a summer internship at Tokio Marine HCC.
                  I worked on a team that mainly focused on certifying and looking up
                  insurance certificates. I was able to learn new languages such as C#
                  and work on databases using SQL Server. Check my LinkedIn for more info!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showProjects && (
              <motion.div
                key="box"
                initial={{ opacity: 1 }}
                exit={{
                  x: "5%",
                  width: "85%",
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{ duration: 0.1, delay: 0.2 }}
                className="h-full lg:w-full lg:overflow-hidden"
              >
                <div className="grid grid-cols-1 grid-rows-3 w-full h-full text-center gap-2 lg:grid-rows-1 lg:grid-cols-3 lg:pt-10 lg:gap-4">
                  <div className="row-start-1 row-span-1 col-start-1 col-span-1 w-full h-full">
                    <div className="grid grid-rows-3 grid-flow-row h-full border-2 lg:h-2/3 lg:border-4 rounded-2xl border-gray-600 dark:border-white">
                      <h1 className="text-2xl my-auto lg:text-4xl">editify</h1>
                      <img
                        src="/editify.png"
                        className="w-1/4 h-3/4 mx-auto lg:w-1/3 lg:h-full"
                      ></img>
                      <h2 className="text-xs mx-2 my-auto lg:text-base">
                        all in one playlist builder and editor
                      </h2>
                    </div>
                  </div>
                  <div className="row-start-2 row-span-1 col-start-1 col-span-1 w-full h-full lg:row-start-1 lg:row-span-1 lg:col-start-2">
                    <div className="grid grid-rows-3 grid-flow-row h-full border-2 lg:h-2/3 lg:border-4 rounded-2xl border-gray-600 dark:border-white">
                      <h1 className="text-2xl my-auto lg:text-4xl">myFan</h1>
                      <img
                        src="/fan.png"
                        className="w-1/4 h-3/4 mx-auto lg:w-1/3 lg:h-full"
                      ></img>
                      <h2 className="text-xs my-auto px-2 lg:text-base">
                        turned a standing fan into a smart one
                      </h2>
                    </div>
                  </div>
                  <div className="row-start-3 row-span-1 col-start-1 col-span-1 w-full h-full lg:row-start-1 lg:row-span-1 lg:col-start-3">
                    <div className="grid grid-rows-3 grid-flow-row h-full border-2 lg:h-2/3 lg:border-4 rounded-2xl border-gray-600 dark:border-white">
                      <h1 className="text-2xl my-auto lg:text-4xl">
                        Attendance Tracker
                      </h1>
                      <img
                        src="/band.png"
                        className="w-1/4 h-3/4 mx-auto lg:w-1/3 lg:h-full"
                      ></img>
                      <h2 className="text-xs my-auto px-2 lg:text-base">
                        track attendance of a marching band
                      </h2>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showContact && (
              <motion.div
                key="box"
                initial={{ opacity: 1 }}
                exit={{
                  x: "5%",
                  width: "85%",
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{ duration: 0.1, delay: 0.2 }}
                className="lg:overflow-hidden w-full"
              >
                <Contact />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [showImage, setShowImage] = React.useState(false);
  setTimeout(function () {
    setShowImage(true);
  }, 2700);

  return (
    <div className={darkMode ? "dark" : ""}>
      <main className=" bg-white dark:bg-gray-900">
        <Loader />
        <section className="min-h-screen px-5 lg:px-10">
          <nav className="py-10 mb-5 flex justify-between">
            <svg
              className="ml-5 lg:ml-0"
              width="50"
              height="50"
              viewBox="0 0 500 500"
            >
              <g id="group">
                <path
                  id="j"
                  d="M184.976 212.481C184.576 362.881 185.243 351.681 174.709 373.548C166.443 390.614 154.043 401.681 136.176 407.814C128.709 410.348 124.709 410.881 110.043 410.881C94.5759 410.881 91.3759 410.348 80.8426 407.014C66.9759 402.481 52.0426 393.014 44.3092 384.081L39.1092 377.948L27.6426 390.348C21.2426 397.148 16.0426 403.148 16.0426 403.681C16.0426 405.814 29.1092 418.748 36.7092 424.348C59.5092 440.614 85.6426 447.014 119.376 444.614C170.309 441.014 203.376 413.548 217.243 363.548L220.709 350.881L221.109 214.481L221.509 78.2142H203.509H185.509L184.976 212.481Z"
                  className="fill-black dark:fill-white"
                />
                <path
                  id="diag"
                  d="M232.043 83.1475C233.776 85.9475 240.576 98.0809 247.376 110.214C254.043 122.348 261.243 135.148 263.376 138.881C266.576 144.748 286.976 176.214 324.709 233.814C346.843 267.681 361.643 290.214 376.709 313.548C385.376 326.748 396.176 343.281 400.709 350.214C405.376 357.148 419.376 378.748 432.043 398.214C444.576 417.681 456.309 435.548 457.776 437.814L460.709 442.214H477.776C487.109 442.214 494.709 441.814 494.709 441.281C494.709 440.881 487.109 427.548 477.909 411.681C463.109 386.348 448.576 363.148 411.643 306.214C392.576 276.881 381.776 260.081 366.576 236.481C358.176 223.548 348.709 208.614 345.376 203.548C331.109 181.548 285.109 110.214 275.376 94.8809L264.709 78.3475L246.976 78.2142H229.109L232.043 83.1475Z"
                  className="fill-black dark:fill-white"
                />
                <path
                  id="down"
                  d="M461.376 221.014C461.376 356.881 461.509 363.948 463.776 367.281C465.109 369.281 472.709 382.214 480.709 396.214C488.576 410.081 495.643 422.081 496.309 422.748C496.843 423.548 497.376 346.214 497.376 251.148V78.2142H479.376H461.376V221.014Z"
                  className="fill-black dark:fill-white"
                />
              </g>
            </svg>
            <ul className="flex items-center gap-2">
              <li
                className="text-3xl flex justify-center gap-16 py-2 px-1
         text-black dark:text-yellow-500"
              >
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className="cursor-pointer"
                />
              </li>
              <li
                className="text-4xl flex justify-center gap-16 py-2
         text-gray-800 dark:text-white"
              >
                <a href="https://github.com/justjdnguyen" target={"_blank"}>
                  <AiFillGithub />
                </a>
              </li>
              <li
                className="text-4xl flex justify-center gap-16 py-2
         text-blue-500"
              >
                <a
                  href="https://www.linkedin.com/in/jimmypdnguyen/"
                  target={"_blank"}
                >
                  <AiFillLinkedin />
                </a>
              </li>
              <li className="bg-gradient-to-r from-violet-300 to-blue-400 text-xl text-white px-3 py-2 rounded flex justify-center gap-2">
                <AiOutlineDownload className="mt-1" />
                <a
                  href="https://drive.google.com/uc?export=download&id=1jUhwLrlYeLKTsoYD7rKyW99PgpkYymlj"
                  target={"_blank"}
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
          <div className="grid grid-rows-4 grid-cols-3 grid-flow-col lg:grid-rows-6 lg:grid-cols-6">
            <>
              {showImage && (
                <img
                  src="/profile.JPG"
                  alt="Profile Picture"
                  className="max-w-xs mx-auto rounded-full shadow-2xl row-span-1 col-span-3 row-start-1 col-start-1 lg:max-w-sm lg:mx-10 lg:row-span-3 lg:col-span-2 lg:row-start-1 lg:col-start-1"
                />
              )}
            </>

            <div className="text-center row-span-1 col-span-3 row-start-2 col-start-1 lg:text-left lg:p-10 lg-ml-8 lg:row-span-3 lg:col-span-2 lg:row-start-4 lg:col-start-1  lg:ml-8">
              <h1 className="text-4xl lg:text-5xl font-medium dark:text-white">
                Jimmy Nguyen
              </h1>
              <TypeWriter mode={darkMode} />
            </div>
            <Slider />
          </div>
        </section>
      </main>
    </div>
  );
}
