"use client";
import Layout from "../components/Layout";
import { FiFigma } from "react-icons/fi"; // Import Figma icon from react-icons
import Link from "next/link";

const Video = () => {
  return (
    <Layout>
      <h2 className="text-xl mb-3 font-bold">Video</h2>
      <div className="mb-4 flex justify-center">
        <Link
          href="https://www.figma.com/design/vAsMau8vMzmfptgzI6lrOd/Pawpatrons"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
        >
          <FiFigma className="mr-2" size={24} /> Open in Figma
        </Link>
      </div>
      <div className="w-full mx-auto">
        <iframe
          height="500"
          className="w-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/KhvS7cTXd-c?si=bX2X5SHwSX2WDU7D"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </Layout>
  );
};

export default Video;
