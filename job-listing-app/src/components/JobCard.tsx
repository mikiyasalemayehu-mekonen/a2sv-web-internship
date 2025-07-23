"use client";

import Link from "next/link";

interface JobCardProps {
  id: string;
  name: string;
  title: string;
  description: string;
  avatarUrl: string;
  location: string;
  categories: string[];
  jobType: string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  name,
  title,
  description,
  avatarUrl,
  location,
  categories,
  jobType,
}) => {
  return (
    <Link href={`/opportunities/${id}`}>
      <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer  flex gap-4">
        <img
          src={avatarUrl}
          alt={`${name} logo`}
          className="w-16 h-16 rounded-full mt-1 pl-0"
        />
        <div className="flex-1">
          <h2 className="text-xl text-gray-700 font-semibold">{title}</h2>
          <p className="text-sm text-gray-400 mb-1">
            {name} • {location}
          </p>
          <p className="text-gray-600 mb-2">{description}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
              {jobType}
            </span>
            <span className="text-gray-400 text-sm">|</span>
            {categories.map((category, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;