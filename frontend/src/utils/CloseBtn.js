import React from "react";

export default function CloseBtn({ closeBanner }) {
  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          closeBanner();
        }}
        className="absolute top-0 right-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className="h-6 w-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </>
  );
}
