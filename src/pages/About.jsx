import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const About = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="bg-gradient-to-r from-blue-500 to-teal-400 text-white rounded-lg shadow-lg p-8 sm:p-12"
      >
        <h2 className="text-4xl font-bold mb-6 text-center">About Us</h2>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-600">
              To empower individuals and teams to achieve their goals by
              providing a simple, intuitive, and efficient task management
              solution.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-lg text-gray-600">
              To be the leading provider of task management solutions that
              promote productivity, collaboration, and success.
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h3>
          <ul className="list-disc list-inside text-lg text-gray-600">
            <li>Simplicity</li>
            <li>Efficiency</li>
            <li>Collaboration</li>
            <li>Innovation</li>
            <li>Customer Focus</li>
          </ul>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h3>
          <p className="text-lg text-gray-600">
            We started as a small team with a passion for productivity and a
            vision to create a task management tool that was both powerful and
            easy to use. We believe that everyone deserves to have the tools
            they need to succeed, and we're committed to providing our users
            with the best possible task management experience.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
