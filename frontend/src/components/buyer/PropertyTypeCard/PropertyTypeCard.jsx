import React from "react";
import "./PropertyTypeCard.css";

const PropertyTypeCard = ({ title, count, icon }) => {
  return (
    <div className="col-span-1">
      <a
        href="#"
        className="group block text-center rounded-lg p-4 transition-all duration-500 card-bg cursor-pointer transform hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="rounded-lg p-6 border border-dashed bg-white border-[#26277169] transition-all duration-500 group-hover:bg-[#262771c4] group-hover:border-transparent">
          <div className="icon mb-4 flex justify-center items-center mx-auto w-20 h-20 rounded-full border border-dashed transition-all duration-500 group-hover:bg-white transform group-hover:scale-110">
            <img
              src={icon}
              alt={title}
              className="w-12 h-12 transition-all duration-500 group-hover:scale-110"
            />
          </div>

          <h6 className="text-lg font-bold mb-1 transition-all duration-500 text-[#262771] group-hover:text-white">
            {title}
          </h6>
          <span className="text-sm transition-all duration-500 font-semibold text-[#F3703A] group-hover:text-white">
            {count}
          </span>
        </div>
      </a>
    </div>
  );
};

export default PropertyTypeCard;
