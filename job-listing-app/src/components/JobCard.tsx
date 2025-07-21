import React from "react";


type JobCardProps = {
  name: string; 
  title: string;
  description: string;
  avatarUrl: string;
  location: string; 
  categories: string[]; 
};

const JobCard: React.FC<JobCardProps> = ({
  name,
  title,
  description,
  avatarUrl,
  location,
  categories,
}) => {
  return (
    <div className="bg-white shadow-md  px-24 py-4 rounded-xl flex gap-4 items-start w-full">
      <img
        src={avatarUrl}
        alt={name}
        className="w-16 h-16 rounded-full mt-1 pl-0 "
      />
      <div className="flex-1">
        {/* Title */}
        <h2 className="text-xl text-gray-700 font-semibold">{title}</h2>

        {/* Company + Location */}
        <p className="text-sm text-gray-400 mb-1">
          {name} • {location}
        </p>

        {/* Description */}
        <p className="text-gray-600 mb-2">{description}</p>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
            In Person
          </span>
          <span className="text-gray-400 text-sm">|</span>
          {categories.map((cat, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
