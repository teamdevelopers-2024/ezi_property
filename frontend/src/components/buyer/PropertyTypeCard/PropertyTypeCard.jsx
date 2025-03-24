import React from "react";
import "./PropertyTypeCard.css";
import Colors from "../../../styles/Colors";

const PropertyTypeCard = ({ title, count, icon }) => {
  return (
    <div className="col-span-1">
      <a
        href="#"
        className="group block text-center rounded-lg p-4 transition-all duration-500 cursor-pointer transform hover:-translate-y-1 hover:shadow-xl"
        style={{ backgroundColor: `${Colors.primary}10` }}
      >
        <div 
          className="rounded-lg p-6 border border-dashed bg-white transition-all duration-500 group-hover:border-transparent"
          style={{ 
            borderColor: `${Colors.primary}40`,
            ':hover': { backgroundColor: `${Colors.primary}90` }
          }}
        >
          <div 
            className="icon mb-4 flex justify-center items-center mx-auto w-20 h-20 rounded-full border border-dashed transition-all duration-500 group-hover:bg-white transform group-hover:scale-110"
            style={{ borderColor: `${Colors.primary}40` }}
          >
            <img
              src={icon}
              alt={title}
              className="w-12 h-12 transition-all duration-500 group-hover:scale-110"
            />
          </div>

          <h6 
            className="text-lg font-bold mb-1 transition-all duration-500 group-hover:text-white"
            style={{ color: Colors.primary }}
          >
            {title}
          </h6>
          <span 
            className="text-sm transition-all duration-500 font-semibold group-hover:text-white"
            style={{ color: Colors.secondary }}
          >
            {count}
          </span>
        </div>
      </a>
    </div>
  );
};

export default PropertyTypeCard;
