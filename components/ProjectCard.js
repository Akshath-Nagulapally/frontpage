import React from "react";
import ExternalLink from "./icons/ExternalLink";
import GitHub from "./icons/GitHub";
import Button from "./Button";

const ProjectCard = ({ testimonialData }) => {
  const { name, image, testimonial } = testimonialData;

  return (
    <div className="flex flex-col w-full rounded-md bg-white dark:bg-mid px-7 py-7 shadow-md shadow-light/10 dark:shadow-dark">
  
      {/* Testimonial Text */}
      <p className="text-center italic mb-4">"{testimonial}"</p>

      {/* Name */}
      <p className="text-center font-bold">{name}</p>
    </div>
  );
};


export default ProjectCard;
