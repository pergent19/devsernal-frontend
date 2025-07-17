import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const heading = "LET AI GUIDE YOU TO YOUR NEXT DEVELOPMENT TECHSTACK:";
  const subheading = "The Dev Stack You Didn’t Know You Needed";
  const description =
    "Explore top frameworks, libraries, and utilities to supercharge your workflow and boost your productivity.";

  return (
    <section className="py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white geologica-font-bold">
          <span className="text-[#33691E]">{heading}</span> {subheading.toUpperCase()}
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 mb-10 geologica-font-regular">
          {description.toUpperCase()}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/tools"
            className="bg-[#33691E] hover:bg-[#1B5E20] transition px-4 py-2 rounded text-white text-center mt-4"
          >
            EXPLORE TOOLS
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
