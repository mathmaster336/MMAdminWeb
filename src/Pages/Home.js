import OPcards from "../Components/Dashboard/OPcards";
import { motion } from "framer-motion";
import { LineChart } from "@mui/x-charts/LineChart";
import { People, Comment, Payment } from "@mui/icons-material";

function Home() {
  return (
    <div className=" bg-gray-100 z-10">
      <div className="flex flex-col md:flex-row gap-6 bg-gradient-to-r from-red-200 to-yellow-100 p-4">
        {/* Cards Section */}
        <div className="flex flex-col gap-1 bg-gradient-to-r from-blue-300 to-purple-300 p-1 rounded-xl w-full md:w-1/2">
          <motion.div
            initial={{ x: -350, opacity: 0 }} // Starts 300px to the right
            animate={{ x: 0, opacity: 1 }} // Moves to center
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <OPcards
              icon={People}
              label="Active Users"
              value="0000"
              color="bg-blue-500"
            />
            <OPcards
              icon={Payment}
              label="Payments"
              value="₹0.00"
              color="bg-green-500"
            />
            <OPcards
              icon={Comment}
              label="Comments"
              value="0"
              color="bg-yellow-500"
            />
          </motion.div>
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ x: 350, opacity: 0 }} // Starts 300px to the right
            animate={{ x: 0, opacity: 1 }} // Moves to center
            transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white rounded-xl p-2 shadow-lg w-full md:w-1/2"
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            User Activity
          </h2>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                label: "Engagement",
                color: "#6366f1",
              },
            ]}
            height={300}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
