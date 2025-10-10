import React, { useState, useRef } from "react";
import { FiHeart } from "react-icons/fi";

export default function Card({ item, view = "grid", onConnect, onClick }) {
  const [liked, setLiked] = useState(false);
  const [showBigHeart, setShowBigHeart] = useState(false);
  const dblTimeout = useRef(null);

  const isList = view === "list";

  function handleImageDoubleClick() {
    setLiked(true);
    setShowBigHeart(true);
    clearTimeout(dblTimeout.current);
    dblTimeout.current = setTimeout(() => setShowBigHeart(false), 700);
  }

  const badges = item.badges ?? (item.badge ? [item.badge] : []);

  const badgeClasses = (b) => "bg-[#FBF2E0] text-[#C39E53]";

  return (
    <article
      onClick={() => onClick?.(item)} // ✅ make card clickable
      className={`cursor-pointer bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm transition hover:shadow-md ${
        isList ? "flex items-center gap-4 p-3" : "flex flex-col h-full"
      }`}
    >
      {/* IMAGE AREA */}
      <div
        className={`${isList ? "flex-shrink-0" : "relative"}`}
        onDoubleClick={(e) => {
          e.stopPropagation(); // ✅ prevent it from triggering card click
          handleImageDoubleClick();
        }}
        role="button"
        aria-label={`Open ${item.title}`}
      >
        <div className={`${isList ? "w-28 h-20" : "w-full h-40"} relative`}>
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full hidden md:block h-full object-cover rounded"
          />
          <img
            src={item.mobileImage}
            alt={item.title}
            loading="lazy"
            className="w-full block md:hidden h-full object-cover rounded"
          />

          {/* Dark overlay when heart shows */}
          <div
            className={`absolute inset-0 transition-opacity duration-300 ${
              showBigHeart ? "bg-black/40" : "bg-transparent"
            }`}
          />

          {/* Centered big heart */}
          {showBigHeart && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-500 ease-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ff0000"
                viewBox="0 0 24 24"
                className="w-16 h-16 drop-shadow-lg"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 
                          2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 
                          3.41.81 4.5 2.09C13.09 3.81 14.76 3 
                          16.5 3 19.58 3 22 5.42 22 8.5c0 
                          3.78-3.4 6.86-8.55 11.54L12 
                          21.35z" />
              </svg>
            </div>
          )}

          {/* BADGE — visible top-right on mobile only */}
          {badges.length > 0 && (
            <div className="absolute top-2 right-2 flex flex-wrap gap-2 md:hidden">
              {badges.map((b, i) => (
                <span
                  key={i}
                  className={`inline-block text-xs ${badgeClasses(
                    b
                  )} px-2 py-[3px] rounded-full`}
                >
                  {b}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className={`p-3 ${isList ? "flex-1" : "flex-1 flex flex-col"}`}>
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-semibold text-sm text-gray-800">{item.title}</h3>

          {/* Like button on mobile beside title */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // ✅ prevent triggering card click
              setLiked((s) => !s);
            }}
            className="md:hidden text-lg"
          >
            <FiHeart
              className={`${
                liked ? "text-red-500" : "text-gray-400"
              } transition-colors duration-200`}
            />
          </button>
        </div>

        <div className="text-xs text-gray-500 mt-1">
          {item.location} · {item.category}
        </div>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {item.excerpt ??
            "Pool Academy Aquatics is an international aquatics club..."}
        </p>

        <div
          className={`mt-4 ${
            isList
              ? "flex items-center justify-between gap-4"
              : "mt-auto flex flex-col gap-3"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-baseline gap-1 text-green-600 font-bold text-md hidden md:block">
              <span className="text-base font-bold">NGN</span>
              <span className="text-xl font-semibold">
                {item.price.replace("NGN ", "")}
              </span>
            </p>
            <p className="flex items-baseline gap-1 text-green-600 font-bold text-md block md:hidden">
              <span className="text-base font-bold">NGN</span>
              <span className="text-xl font-semibold">
                {item.mobileprice.replace("NGN ", "")}
              </span>
            </p>
          </div>

          <button
  onClick={(e) => {
    e.stopPropagation(); // ✅ prevent accidental card click
    onConnect?.(item); // ✅ opens BusinessDetail from Marketplace
  }}
  className="w-full px-4 py-2 rounded-md bg-[#D6EBFF] hover:bg-blue-600 text-[#3399FF] hover:text-white text-sm"
>
  Connect
</button>
        </div>
      </div>
    </article>
  );
}
