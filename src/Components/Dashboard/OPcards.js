import { People, Comment, Payment } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function OPcards({ icon: Icon, label, value, color }) {
  return (
    <motion.div
      initial={{ scale: 0.1, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className=""
    >
      <div className=" p-4 ">
        <div className="rounded-2xl shadow-lg p-2 bg-gray-100 flex items-center  gap-2 transition transform hover:scale-105 hover:shadow-xl duration-300">
          <div className={`p-4 rounded-full ${color} shadow-md`}>
            {Icon && <Icon fontSize="large" className="text-white" />}
          </div>
          <div className="gap-2">
            <p className="text-gray-500 text-sm">{label}</p>
            <h3 className="text-xl font-bold text-gray-800">{value}</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
