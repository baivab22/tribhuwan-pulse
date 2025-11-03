import React from "react";

const WelcomeDirectorate = () => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Section - Image */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl transform translate-x-4 translate-y-4"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://portal.tu.edu.np/medias/Picture1_2025_01_26_10_50_11.jpg"
                  alt="Director"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Message From Director
              </h2>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Welcome to the Planning Directorate of Tribhuvan University
              </h1>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                It is my honor to welcome you to the Planning Directorate of
                Tribhuvan University, the guiding arm of Nepal's largest and
                most prestigious academic institution. At the heart of our
                mission lies a commitment to strategic growth, innovation, and
                excellence, as we steer the university toward achieving its{" "}
                <span className="font-semibold text-blue-600">Vision 2030</span>.
              </p>

              <p>
                Our role is pivotal in shaping TU's future—driving academic reforms,
                advancing digital transformation, enhancing infrastructure, and
                ensuring quality education that meets global standards. By fostering
                collaboration and embracing innovation, we are committed to creating
                a resilient and dynamic academic environment that empowers students,
                faculty, and researchers alike.
              </p>

              <p>
                Together, let us take this transformative journey to shape a globally
                renowned institution that upholds the values of knowledge, inclusivity,
                and progress.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-600 mt-8">
              <h3 className="text-2xl font-bold text-gray-900">
                Laxmi Kanta Sharma, PhD
              </h3>
              <p className="text-gray-600 font-medium mt-1">
                Director, Planning Directorate
              </p>
              <p className="text-gray-500">
                Tribhuvan University
              </p>
            </div>

            {/* <button className="mt-6 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
              Learn More
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeDirectorate;