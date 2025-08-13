import React from "react";

const SortDropdown = () => {
  return (
    <div>
      <label htmlFor="sort" className="mr-2 font-medium text-gray-500">
        Sort by:
      </label>
      <select
        id="sort"
        name="sort"
        className="border border-gray-300 rounded px-3 py-1 text-gray-900"
      >
        <option value="date">Most relevant</option>
        <option value="company">Company</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default SortDropdown;
