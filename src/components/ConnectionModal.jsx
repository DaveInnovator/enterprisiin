import React, { useState } from "react";

const ConnectionModal = ({ isOpen, onClose, onRequestSent }) => {
  const [businessType, setBusinessType] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!businessType || !message || !agreed) return;
    setSubmitted(true);

    setTimeout(() => {
      onRequestSent?.();
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div
        className="
          relative w-full 
          max-w-[375px] sm:max-w-[514px] 
          h-[553px] sm:h-[516px] 
          bg-white rounded-[4px] 
          shadow-xl p-5 sm:p-6 
          animate-fadeIn flex flex-col justify-between
        "
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg font-semibold"
        >
          ×
        </button>

        {!submitted ? (
          <>
            {/* Header */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Connection Request
              </h2>
              <p className="text-sm text-gray-500 mb-5">
                Buy, Invest and Loan businesses as much as you can
              </p>
            </div>

            {/* Business Type */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Type
              </label>
              <div className="relative">
                <select
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="
                    w-full appearance-none border border-gray-300 rounded-md
                    px-3 py-2 text-sm bg-white
                    focus:ring-1 focus:ring-[#3399FF] focus:outline-none
                  "
                >
                  <option value="">Select</option>
                  <option>Business For Sale</option>
                  <option>Business Investment</option>
                  <option>Business Loan</option>
                  <option>Asset for Sale</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  ▼
                </span>
              </div>
            </div>

            {/* Message */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write a short note..."
                className="
                  w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                  h-24 resize-none focus:ring-1 focus:ring-[#3399FF] focus:outline-none
                "
              />
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-2 text-sm text-gray-700 mb-5">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 accent-[#3399FF]"
              />
              <span className="leading-tight">
                I agree to the Terms & Conditions of this proposal
              </span>
            </label>

            {/* Connect Button */}
            <button
              onClick={handleSubmit}
              className={`
                w-full bg-[#3399FF] hover:bg-blue-700 text-white py-2.5 
                rounded-md text-sm font-medium transition
                ${
                  !businessType || !message || !agreed
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }
              `}
              disabled={!businessType || !message || !agreed}
            >
              Connect
            </button>
          </>
        ) : (
          // Success Message
          <div className="flex flex-col items-center justify-center flex-1 text-center space-y-4 py-6">
            <div className="bg-blue-100 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#3399FF"
                viewBox="0 0 24 24"
                className="w-10 h-10"
              >
                <path d="M9 16.17l-3.88-3.88L4 13.41l5 5 11-11-1.41-1.41z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Successfully Sent!
            </h3>
            <p className="text-sm text-gray-600 max-w-[260px]">
              Buy, Invest and Loan Businesses as much as you can afford
            </p>
            <button
              onClick={onClose}
              className="bg-[#3399FF] hover:bg-blue-700 text-white py-2.5 px-6 rounded-md text-sm font-medium transition"
            >
              Okay, thanks
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionModal;
