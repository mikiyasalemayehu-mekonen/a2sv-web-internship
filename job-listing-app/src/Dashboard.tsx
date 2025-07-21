import React from "react";
import JobCard from "./components/JobCard";
import SortDropdown from "./components/SortDropdown"; // reusable component
import jobs from "./data/jobs.json";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row flex-wrap items-center justify-between mb-6 gap-4  ">
          {/* Left side: title & results */}
          <div>
            <h1 className="text-3xl font-bold text-black mb-2 sm:mb-0">
              Opportunities
            </h1>
            <p className="text-gray-400">Showing 73 results</p>
          </div>

          <SortDropdown />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {jobs.job_postings.map((job, index) => (
            <JobCard
              key={index}
              name={job.company}
              title={job.title}
              description={job.description}
              avatarUrl={job.image}
              location={job.about.location} // ⬅️ new
              categories={job.about.categories} // ⬅️ new
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
