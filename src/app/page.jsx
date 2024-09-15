"use client";
import Link from "next/link";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { LiaDonateSolid } from "react-icons/lia";
import { TbWorldCheck } from "react-icons/tb";
import { FaCheckCircle, FaGift, FaStar, FaShareAlt } from "react-icons/fa"; // Importing react-icons

const Card = ({ project }) => {
  const progress = (project.amountReceived / project.amountRequested) * 100;
  return (
    <div className="relative bg-white shadow-lg rounded-xl hover:shadow-2xl transition duration-2000 ease-in-out group">
      <div className="relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="rounded-t-lg w-full h-40 object-cover"
        />
        <div className="absolute bg-white rounded-full p-2 top-3 right-3 flex items-center space-x-2">
          <FaShareAlt className="text-gray-500 hover:text-gray-700 cursor-pointer" />{" "}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {project.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {project.amountReceived} / {project.amountRequested} raised
          </p>
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <FaCheckCircle className="text-green-500" />
          <span className="text-xs text-green-500">VERIFIED</span>
        </div>
        {/* Donate button - visible on hover */}
        <div className="mt-4">
          <Link
            href="#"
            className="hidden group-hover:block bg-pink-500 text-white py-2 px-4 rounded-lg w-full text-center hover:bg-pink-600 transition duration-300 ease-in-out"
          >
            Donate
          </Link>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const staticFeedings = [
    {
      id: 1,
      title: "Feed the Cats",
      imageUrl: "https://d.newsweek.com/en/full/2050102/stray-cats.jpg",
      description: "Help feed the stray cats in the street.",
      amountRequested: 100,
      amountReceived: 50,
    },
    {
      id: 2,
      title: "Feed the Dogs",
      imageUrl:
        "https://www.livelaw.in/h-upload/2022/11/16/750x450_444432-1663071834dog.jpeg",
      description: "Donate to feed the dogs in the shelter.",
      amountRequested: 200,
      amountReceived: 100,
    },
    {
      id: 3,
      title: "Feed the Cows",
      imageUrl:
        "https://cdndailyexcelsior.b-cdn.net/wp-content/uploads/2020/03/page8-1-13.jpg",
      description: "Donate to feed the cows in the street.",
      amountRequested: 150,
      amountReceived: 75,
    },
  ];
  return (
    <section className="container max-w-6xl px-8 mx-auto xl:px-5 h-screen">
      <div>
        <div className="flex flex-wrap items-center sm:-mx-3 py-40">
          <div className="w-full md:w-1/2 md:px-3">
            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                <span className="block text-indigo-600 xl:inline">
                  Animal Welfare App
                </span>
              </h1>
              <h6 className="text-4xl font-extrabold tracking-tight text-gray-900">
                <span className="block xl:inline">
                  From Your Heart to Their Bowl{" "}
                </span>
                <span className="block text-indigo-600 xl:inline">
                  Contribute and Comfort
                </span>
              </h6>
              <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                Connect with feeders and donors to support animal welfare help
                feed and care for animals in need.
              </p>
              <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                <Link
                  href="/donors/dashboard"
                  className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
                >
                  Donor
                </Link>
                <Link
                  href="/feeders/dashboard"
                  className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto"
                >
                  Feeder
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="w-full h-auto overflow-hidden shadow-2xl">
              <img src="https://i.pinimg.com/originals/e5/f9/f7/e5f9f7944a59a873633987222db297c2.jpg" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap -m-4 pb-20">
          <div className="p-4 md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-100 p-4 px-6 flex-col shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                  <AiOutlineSafetyCertificate />
                </div>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  Safe And Secure
                </h2>
              </div>
              <div className="flex-grow">
                <p className="leading-relaxed text-base">
                  All the funds are managed with safe smart contracts on
                  Soroban.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-100 p-4 px-6 flex-col shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                  <LiaDonateSolid />
                </div>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  Lowest Fees
                </h2>
              </div>
              <div className="flex-grow">
                <p className="leading-relaxed text-base">
                  Lowest possible fees without any unnecessary third party
                  commissions.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 md:w-1/3">
            <div className="flex rounded-lg h-full bg-gray-100 p-4 px-6 flex-col shadow-lg">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-indigo-500 text-white flex-shrink-0">
                  <TbWorldCheck />
                </div>
                <h2 className="text-gray-900 text-lg title-font font-medium">
                  International Accessibility
                </h2>
              </div>
              <div className="flex-grow">
                <p className="leading-relaxed text-base">
                  Users can raise funds from anywhere and donate to anyone.
                  Globaly.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <span className="text-blue-500">
                  <FaCheckCircle className="w-6 h-6" />{" "}
                </span>
                <h3 className="text-lg font-bold ml-3">Verified Feeders</h3>
              </div>
              <p className="text-gray-600">
                Trust that your crypto donations will make an impact with our
                verification system.
              </p>
              <Link
                href="#"
                className="text-blue-600 mt-4 inline-block font-medium hover:underline"
              >
                How it works &rarr;
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <span className="text-blue-500">
                  <FaGift className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold ml-3">Donor Rewards</h3>
              </div>
              <p className="text-gray-600">
                Get rewarded for giving to verified Feeders with crypto
                donations.
              </p>
              <Link
                href="#"
                className="text-blue-600 mt-4 inline-block font-medium hover:underline"
              >
                Learn More &rarr;
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <span className="text-blue-500">
                  <FaStar className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold ml-3">Easy Onboarding</h3>
              </div>
              <p className="text-gray-600">
                New to crypto fundraising? It's easy to get started on Giveth.
              </p>
              <Link
                href="#"
                className="text-blue-600 mt-4 inline-block font-medium hover:underline"
              >
                Get Started &rarr;
              </Link>
            </div>
          </div>
        </div>
        <div className="py-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-4 bg-white shadow-lg rounded-xl h-full flex justify-center flex-col">
              <div className="text-5xl font-bold text-gray-900 mb-4">
                Newly Verified Feeder
              </div>
              <Link
                href="#"
                className="text-pink-500 text-lg font-semibold hover:underline text-center"
              >
                Explore &rarr;
              </Link>
            </div>

            {staticFeedings.map((project, index) => (
              <Card key={index} project={project} />
            ))}
          </div>
          <nav
            aria-label="Page navigation example"
            className="flex justify-end space-x-2 mt-8"
          >
            <ul className="flex items-center -space-x-px h-8 text-sm">
              <li>
                <Link
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  &larr;
                </Link>
              </li>
              {[...Array(11).keys()].map((page) => (
                <li key={page}>
                  <Link
                    href="#"
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      page === 0
                        ? "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        : "text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    }`}
                  >
                    {page + 1}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  &rarr;
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Home;
