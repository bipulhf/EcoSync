"use client";

import { useState } from "react";

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("sts_id");
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleColorChange = (e: any) => {
    setSearchOption(e.target.value);
  };

  const getMaxDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());
    const yyyy = tomorrow.getFullYear();
    let mm = tomorrow.getMonth() + 1; // January is 0!
    let dd = tomorrow.getDate();
    if (mm < 10) {
      // @ts-ignore
      mm = "0" + mm;
    }
    if (dd < 10) {
      // @ts-ignore
      dd = "0" + dd;
    }
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <form className="flex items-center space-x-4 mb-5">
      {searchOption == "sts_id" || searchOption == "vehicle_number" ? (
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-admin"
        />
      ) : (
        <input
          type="date"
          onChange={handleDateChange}
          max={getMaxDate()}
          className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      )}
      <select
        value={searchOption}
        onChange={handleColorChange}
        className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-admin"
      >
        <option value="sts_id">STS ID</option>
        <option value="vehicle_number">Vehicle Number</option>
        <option value="date">Date</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
}
