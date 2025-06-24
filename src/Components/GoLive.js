import React from "react";
import { motion } from "framer-motion";

function GoLive() {
  return (
    <>
      <div className="relative h-screen mt-20">
        <motion.button
          className="fixed top-4 right-4 border mt-20 border-black p-2 rounded"
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Go To Live
        </motion.button>

        <div className="flex items-center px-1 py-2 bg-gray-100 mt-20">
          <button className="border border-black p-2 rounded-md">
            Go To Live
          </button>
          <p className="text-sm ml-2">Make a Class . . .</p>
        </div>
      </div>
    </>
  );
}

export default GoLive;
