import React, { useState } from "react";
import { IoChevronBack, IoChevronDown } from "react-icons/io5";

const FilterModal = ({ isOpen, onClose, onApply, defaultFilters }) => {
  const [filters, setFilters] = useState(
    defaultFilters || {
      businessType: [],
      country: [],
      state: [],
      industry: [],
      amount: [500000, 1900000],
    }
  );

  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleSelection = (key, value) => {
    setFilters((prev) => {
      const list = prev[key];
      const updatedList = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return { ...prev, [key]: updatedList };
    });
  };

  const isChecked = (key, value) => filters[key]?.includes(value);

  const formatAmount = (num) => {
    if (num >= 1000000) return `NGN ${(num / 1000000).toFixed(1)}M`;
    return `NGN ${num.toLocaleString()}`;
  };

  const dropdowns = {
    businessType: [
      "All",
      "Business for Sale",
      "Business Investment",
      "Business Loan",
      "Asset for Sale",
    ],
    country: ["Nigeria", "Russia", "China", "United States"],
    state: ["Oyo", "Osun", "Ogun", "Lagos"],
    industry: [
      "Building & Construction",
      "Business Services",
      "Education",
      "Food & Beverages",
    ],
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-white w-full max-w-md h-full md:h-auto rounded-none md:rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex items-center px-4 pt-6 pb-2 border-b border-gray-200">
          <button onClick={onClose} className="text-gray-600">
            <IoChevronBack size={24} />
          </button>
          <h2 className="flex-1 text-center text-xl font-semibold text-gray-900">
            Filter
          </h2>
        </div>

        {/* Subtext */}
        <p className="text-sm text-gray-500 text-center mt-2">
          Buy, Invest and Loan businesses as much as you can
        </p>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {/* Dropdowns */}
          {Object.entries(dropdowns).map(([key, options]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key === "businessType" ? "Business Type" : key}
              </label>

              <div
                className="relative"
                onClick={() =>
                  setOpenDropdown(openDropdown === key ? null : key)
                }
              >
                <div className="flex justify-between items-center w-full bg-gray-50 border border-gray-200 rounded-md px-3 py-3 text-sm text-gray-800 cursor-pointer">
                  <span>
                    {filters[key]?.length
                      ? `${filters[key].length} selected`
                      : "Select"}
                  </span>
                  <IoChevronDown
                    className={`transition-transform ${
                      openDropdown === key ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {openDropdown === key && (
                  <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 p-2">
                    {options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded cursor-pointer text-sm"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked(key, option)}
                          onChange={() => toggleSelection(key, option)}
                          className="w-4 h-4 accent-blue-600"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {filters[key]?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {filters[key].map((val) => (
                    <span
                      key={val}
                      className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm"
                    >
                      {val}
                      <button
                        onClick={() => toggleSelection(key, val)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Amount Range */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-3">
              Amount Range
            </label>

            {/* Range Labels */}
            <div className="flex justify-between items-center mb-4">
              <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
                {formatAmount(filters.amount[0])}
              </span>
              <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
                {formatAmount(filters.amount[1])}
              </span>
            </div>

            {/* Functional Range */}
            <input
              type="range"
              min="500000"
              max="1900000"
              step="10000"
              value={filters.amount[1]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  amount: [prev.amount[0], Number(e.target.value)],
                }))
              }
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between gap-4 p-4 border-t border-gray-200">
          <button
            onClick={() =>
              setFilters({
                businessType: [],
                country: [],
                state: [],
                industry: [],
                amount: [500000, 1900000],
              })
            }
            className="w-full bg-blue-100 text-blue-600 py-3 rounded-md font-medium"
          >
            Restart
          </button>
          <button
            onClick={() => onApply(filters)}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
