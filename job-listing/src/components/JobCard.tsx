"use client";
import {useRouter} from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
// import { useRouter } from "next/router";
import { toggleBookmark } from "@/lib/bookmark";

interface JobCardProps {
  id: string;
  name: string;
  title: string;
  location: string;
  description: string;
  avatarUrl: string;
  jobType: string;
  categories: string[];
  isBookmarked?: boolean; 
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  name,
  title,
  location,
  description,
  avatarUrl,
  jobType,
  categories,
  isBookmarked: initialBookmarked = false, 
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  // Initialize state with initialBookmarked prop
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  // Add this useEffect here to update state if initialBookmarked changes
  useEffect(() => {
    setBookmarked(initialBookmarked);
  }, [initialBookmarked]);
const handleBookmarkClick = async (e: React.MouseEvent) => {
  e.preventDefault();

  if (!session?.accessToken) {
    router.push("/signin");
    return;
  }

  try {
    setLoading(true);
    await toggleBookmark(
      id,
      bookmarked,
      session.accessToken,
      "https://akil-backend.onrender.com"
    );
    setBookmarked((prev) => !prev);
  } catch (error) {
    console.error(error);
    alert("Failed to update bookmark.");
  } finally {
    setLoading(false);
  }
};

  // const handleBookmarkToggle = async (e: React.MouseEvent) => {
  //   e.preventDefault();

  //   if (!session?.accessToken) {
  //     router.push("/signin");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const method = bookmarked ? "DELETE" : "POST";

  //     const res = await fetch(
  //       `https://akil-backend.onrender.com/bookmarks/${id}`,
  //       {
  //         method,
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${session.accessToken}`,
  //         },
  //         body: method === "POST" ? JSON.stringify({}) : undefined, // POST has empty body, DELETE no body
  //       }
  //     );

  //     if (!res.ok) throw new Error("Failed to update bookmark");

  //     setBookmarked((prev) => !prev);
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to update bookmark.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex gap-4">
      <Link href={`/opportunities/${id}`} className="flex gap-4 flex-1">
        <img
          src={avatarUrl}
          alt={`${name} logo`}
          className="w-16 h-16 rounded-full mt-1"
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
      </Link>

      {/* Bookmark button */}
      {/* Bookmark button */}
      <button
        data-testid="bookmark-btn"
        onClick={handleBookmarkClick}
        disabled={loading}
        className="text-xl text-gray-500 hover:text-yellow-500 transition-colors"
      >
        {bookmarked ? (
          <FaBookmark data-testid="bookmark-filled" />
        ) : (
          <FaRegBookmark data-testid="bookmark-empty" />
        )}
      </button>
    </div>
  );
};

export default JobCard;