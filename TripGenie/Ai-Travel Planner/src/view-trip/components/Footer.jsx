import React from 'react';
import { FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <div className="mt-16 border-t pt-6 pb-4">

      <div className="flex flex-col items-center gap-2 text-sm text-gray-500">

        <p>
          Made with <FaHeart className="inline text-red-500 mx-1" /> by
          <span className="font-semibold text-gray-700 ml-1">
            AI Travel Planner
          </span>
        </p>

        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} All rights reserved
        </p>

      </div>

    </div>
  );
}

export default Footer;