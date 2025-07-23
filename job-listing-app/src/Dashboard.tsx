"use client";

import { useEffect, useState } from "react";
import JobCard from "./components/JobCard";
import SortDropdown from "./components/SortDropdown";
import { fetchOpportunities } from "./api/opportunityApi";

interface Opportunity {
  id: string;
  title: string;
  description: string;
  location: string[];
  categories: string[];
  orgName: string;
  logoUrl?: string;
  opType: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Opportunity[];
}

const Dashboard = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data: ApiResponse = await fetchOpportunities();
        setOpportunities(data.data);
      } catch (err: any) {
        setError(err.message || "Failed to load opportunities");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row flex-wrap items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black mb-2 sm:mb-0">
              Opportunities
            </h1>
            <p className="text-gray-400">
              Showing {opportunities.length} results
            </p>
          </div>
          <SortDropdown />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {opportunities.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              name={job.orgName}
              title={job.title}
              description={job.description}
              avatarUrl={job.logoUrl || "https://via.placeholder.com/150"}
              location={job.location.join(", ")}
              categories={job.categories}
              jobType={job.opType === "inPerson" ? "In Person" : job.opType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
