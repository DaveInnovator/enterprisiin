import React, { useState } from "react";

const ConnectionModal = ({ isOpen, onClose, onRequestSent }) => {
  const [businessType, setBusinessType] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!businessType || !agreed) return alert("Please complete all fields.");

    setSubmitted(true);
    setTimeout(() => {
      onRequestSent?.(); // ✅ tells the parent that request is sent
      onClose(); // ✅ closes modal
    }, 1200);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-sm p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg font-semibold"
        >
          ×
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="mx-auto w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Successfully Sent!</h3>
            <p className="text-sm text-gray-500 mt-1">
              Buy, Invest and Loan businesses as much as you can afford.
            </p>
            <button
              onClick={onClose}
              className="mt-5 bg-[#3399FF] text-white px-5 py-2 rounded-md hover:bg-blue-600 text-sm"
            >
              Okay, thanks
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-1">Connection Request</h2>
            <p className="text-sm text-gray-500 mb-4">
              Buy, Invest and Loan businesses as much as you can
            </p>

            {/* Business Type */}
            <label className="block text-sm font-medium mb-1">
              Business Type
            </label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full border rounded-md px-3 py-2 mb-4 text-sm focus:ring-1 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Select</option>
              <option>Buy</option>
              <option>Invest</option>
              <option>Loan</option>
            </select>

            {/* Message */}
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a short note..."
              className="w-full border rounded-md px-3 py-2 text-sm h-20 resize-none focus:ring-1 focus:ring-blue-400 focus:outline-none mb-3"
            ></textarea>

            {/* Checkbox */}
            <label className="flex items-center space-x-2 mb-4 text-sm">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="accent-blue-500"
              />
              <span>I agree to the Terms & Conditions of this proposal</span>
            </label>

            {/* Connect Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#3399FF] hover:bg-blue-700 text-white py-2.5 rounded-md text-sm font-medium transition"
            >
              Connect
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConnectionModal;
