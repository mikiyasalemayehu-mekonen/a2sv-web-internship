"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchOpportunityById } from "../../../api/opportunityApi";

interface Opportunity {
  id: string;
  title: string;
  description: string;
  location: string[];
  categories: string[];
  orgName: string;
  logoUrl?: string;
  opType: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  startDate: string;
  endDate: string;
  deadline: string;
  whenAndWhere: string;
  orgPrimaryPhone: string;
  orgEmail: string;
  datePosted: string;
  requiredSkills: string[]; // Added missing property
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Opportunity;
}

const OpportunityDetail = () => {
  const { id } = useParams();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOpportunity = async () => {
      try {
        const data: ApiResponse = await fetchOpportunityById(id as string);
        setOpportunity(data.data);
      } catch (err: any) {
        setError(err.message || "Failed to load opportunity");
      } finally {
        setLoading(false);
      }
    };
    loadOpportunity();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!opportunity) return <p>No opportunity found</p>;

  // Parse responsibilities into an array for bullet points
  const responsibilities = opportunity.responsibilities
    .split("\n")
    .filter((item) => item.trim());

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-blue-900 mb-6">
            {opportunity.title}
          </h1>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-2">
              Description
            </h2>
            <p className="text-gray-700">{opportunity.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-2">
              Responsibilities
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-2">
              Ideal Candidate we want
            </h2>
            <p className="text-gray-700">{opportunity.idealCandidate}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-2">
              When & Where
            </h2>
            <p className="text-gray-700">{opportunity.whenAndWhere}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-64 bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold text-blue-900 mb-4">About</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 flex items-center">
                <span className="mr-2">🕒</span> Posted on:{" "}
                {new Date(
                  opportunity.datePosted || "2023-07-01"
                ).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 flex items-center">
                <span className="mr-2">⏳</span> Deadline:{" "}
                {new Date(opportunity.deadline).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 flex items-center">
                <span className="mr-2">📍</span> Location:{" "}
                {opportunity.location.join(", ")}
              </p>
            </div>
            <div>
              <p className="text-gray-600 flex items-center">
                <span className="mr-2">📅</span> Start Date:{" "}
                {new Date(opportunity.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 flex items-center">
                <span className="mr-2">📅</span> End Date:
                {new Date(opportunity.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold text-blue-900 mb-2">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {opportunity.categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold text-blue-900 mb-2">
              Required Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {opportunity.requiredSkills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetail;