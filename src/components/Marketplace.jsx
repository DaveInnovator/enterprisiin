import React, { useState } from "react";
import opps from "../Data/opportunities";
import Card from "./Card";
import { HiOutlineViewGrid, HiOutlineViewList } from "react-icons/hi";
import { FiFilter, FiX } from "react-icons/fi";
import FilterModal from "./FilterModal";
import BusinessDetail from "./BusinessDetail";

export default function Marketplace() {
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    businessType: [],
    country: [],
    state: [],
    industry: [],
    amount: [500000, 1900000],
  });

  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [requestedBusinesses, setRequestedBusinesses] = useState([]); 

  const handleRequestSent = (businessId) => {
    setRequestedBusinesses((prev) => [...new Set([...prev, businessId])]);
  };

  const removeFilter = (key, val) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].filter((v) => v !== val),
    }));
  };

  const filtered = [...opps];

  const activeChips = Object.entries(filters)
    .filter(([key, val]) => Array.isArray(val) && val.length > 0)
    .flatMap(([key, val]) => val.map((v) => ({ key, val: v })));

  return (
    <section className="pt-6 md:pt-8">
      {selectedBusiness ? (
        <BusinessDetail
          business={selectedBusiness}
          onBack={() => setSelectedBusiness(null)}
          onRequestSent={() => handleRequestSent(selectedBusiness.id)} 
        />
      ) : (
        <div className="md:pl-[280px] px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Marketplace</h1>
              <p className="text-sm text-gray-500">
                Buy, Invest and Loan businesses as much as you can afford.
              </p>
            </div>

            <div className="flex items-center gap-3">
             <select
  value={sort}
  onChange={(e) => setSort(e.target.value)}
  className="w-[198px] h-[36px] bg-[#F4F4F4] text-sm text-gray-700 rounded-md border-none px-4 py-2 
             focus:outline-none focus:ring-2 focus:ring-[#3399FF] appearance-none cursor-pointer"
>
  <option className="py-3 px-4 rounded" value="all">Sort by: All</option>
  <option className="py-3 px-4 rounded" value="Alphabetical">Alphabetical</option>
  <option className="py-3 px-4 rounded" value="Date Created">Date Created</option>
  <option className="py-3 px-4 rounded" value="Last Modified">Last Modified</option>
</select>


              <button
                className="flex items-center gap-2 px-4 py-2 rounded bg-[#3399FF] text-white text-sm hover:bg-blue-700"
                onClick={() => setFilterOpen(true)}
              >
                <FiFilter className="w-4 h-4" />
                Filters
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded ${view === "grid" ? "bg-slate-100" : ""}`}
                >
                  <HiOutlineViewGrid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 rounded hidden md:block ${
                    view === "list" ? "bg-[#D6EBFF]" : ""
                  }`}
                >
                  <HiOutlineViewList className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {activeChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {activeChips.map(({ key, val }) => (
                <span
                  key={`${key}-${val}`}
                  className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm"
                >
                  {val}
                  <button
                    onClick={() => removeFilter(key, val)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div
            className={
              view === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filtered.map((item, index) => (
              <Card
                key={index}
                item={item}
                view={view}
                onConnect={() => setSelectedBusiness(item)}
                requestSent={requestedBusinesses.includes(item.id)} // ✅ mark requested cards
              />
            ))}
          </div>
        </div>
      )}

      <FilterModal
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(f) => {
          setFilters(f);
          setFilterOpen(false);
        }}
        defaultFilters={filters}
      />
    </section>
  );
}
