import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button, MenuItem, Card, CardContent } from "@mui/material";
import { db } from "../../firebase"; // adjust path
import { collection, doc, addDoc } from "firebase/firestore";
import ClearIcon from "@mui/icons-material/Clear";


const classes = Array.from({ length: 12 }, (_, i) => i + 1); // 1–12
const boards = ["CBSE", "ICSE", "State Board"];
const paperTypes = ["Previous Year", "This Year", "Sample Paper", "Model Paper"];

export default function AddQuestionPapers({setfetureStep,fetureStep}) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    year: "",
    subject: "",
    pdfUrl: "",
    class: "",
    board: "",
    language: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.class) {
        alert("Please select a Class");
        return;
      }

      // Firestore Path: QuestionPapers/Class-X/Papers
      const classRef = doc(db, "QuestionPapers", `Class-${formData.class}`);
      const papersRef = collection(classRef, "Papers");

      await addDoc(papersRef, {
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      alert("✅ Question Paper added successfully!");
      setFormData({
        title: "",
        type: "",
        year: "",
        subject: "",
        pdfUrl: "",
        class: "",
        board: "",
        language: "",
      });
    } catch (error) {
      console.error("Error saving question paper:", error);
      alert("❌ Failed to save question paper.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center w-1/2  bg-gray-100 p-2 relative"
    >
        <div className="absolute top-1 right-4 cursor-pointer">
                        <ClearIcon
                            className="text-red-600 hover:text-red-800 hover:shadow-lg hover:shadow-red-400 hover:scale-101 transition duration-300 cursor-pointer"
                            onClick={() => setfetureStep(0)}
                        />
                    </div>
      <Card className=" w-full shadow-xl rounded-2xl">
        <CardContent>
          <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
            📄 Add / Update Question Paper
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            
            {/* Title */}
            <TextField
              label="Paper Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
            />

            {/* Paper Type */}
            <TextField
              select
              label="Paper Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
              required
            >
              {paperTypes.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>

            {/* Year */}
            <TextField
              type="number"
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              fullWidth
              required
            />

            {/* Subject */}
            <TextField
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              fullWidth
              required
            />

            {/* PDF URL */}
            <TextField
              label="PDF URL (Google Drive / Firebase)"
              name="pdfUrl"
              value={formData.pdfUrl}
              onChange={handleChange}
              fullWidth
              required
            />

            {/* Class */}
            <TextField
              select
              label="Class"
              name="class"
              value={formData.class}
              onChange={handleChange}
              fullWidth
              required
            >
              {classes.map((cls) => (
                <MenuItem key={cls} value={cls}>
                  Class {cls}
                </MenuItem>
              ))}
            </TextField>

            {/* Board */}
            <TextField
              select
              label="Board"
              name="board"
              value={formData.board}
              onChange={handleChange}
              fullWidth
            >
              {boards.map((board) => (
                <MenuItem key={board} value={board}>
                  {board}
                </MenuItem>
              ))}
            </TextField>

            {/* Language */}
            <TextField
              label="Language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              fullWidth
            />

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.05 }} className="col-span-2">
              <Button
                type="submit"
                variant="contained"
                color="success"
                className="w-full mt-4 rounded-xl"
              >
                Save Question Paper
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
