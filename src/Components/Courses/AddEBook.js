import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button, MenuItem, Card, CardContent } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { db } from "../../firebase"
import { collection, doc, addDoc } from "firebase/firestore";



const classes = Array.from({ length: 12 }, (_, i) => i + 1); // Class 1–12
const boards = ["CBSE", "ICSE", "Maharashtra State Board"];

export default function AddEbook({ fetureStep, setfetureStep }) {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        description: "",
        coverImage: "",
        pdfUrl: "",
        class: "",
        subject: "",
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

            // Reference to EBooks/Class-{n}/Books
            const classRef = doc(db, "EBooks", `Class-${formData.class}`);
            const booksRef = collection(classRef, "Books");

            // Add document inside the Books subcollection
            await addDoc(booksRef, {
                ...formData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                downloads: 0,
                isFree: true,
            });

            alert("✅ Book saved successfully!");
            setFormData({
                title: "",
                author: "",
                description: "",
                coverImage: "",
                pdfUrl: "",
                class: "",
                subject: "",
                board: "",
                language: "",
            });
        } catch (error) {
            console.error("Error saving book:", error);
            alert("❌ Failed to save book, check console for error.");
        }
        // if (onSubmit) onSubmit(formData);
        // console.log("📘 Book Data Submitted:", formData);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center  bg-gray-100 p-2 w-1/2 relative"
        >

            <div className="absolute top-1 right-4 cursor-pointer">
                <ClearIcon
                    className="text-red-600 hover:text-red-800 hover:shadow-lg hover:shadow-red-400 hover:scale-101 transition duration-300 cursor-pointer"
                    onClick={() => setfetureStep(0)}
                />
            </div>
            <Card className="w-full shadow-xl rounded-2xl">
                <CardContent>
                    <h2 className="text-2xl font-bold mb-6 text-center text-orange-400">
                        📚 Add / Update Academic Book
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">

                        {/* Title */}
                        <TextField
                            label="Book Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        {/* Author */}
                        <TextField
                            label="Author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            fullWidth
                        />

                        {/* Description (full width) */}
                        <TextField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                            className="col-span-2"
                        />

                        {/* Cover Image URL */}
                        <TextField
                            label="Cover Image URL"
                            name="coverImage"
                            value={formData.coverImage}
                            onChange={handleChange}
                            fullWidth
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

                        {/* Subject (edit box now) */}
                        <TextField
                            label="Subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

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




                        {/* Submit (full width) */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="col-span-2"
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    backgroundColor: "orange",
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "darkorange",
                                    },
                                }}
                                className="w-full mt-4 rounded-xl bg-orange-400 "
                            >
                                Save Book
                            </Button>
                        </motion.div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
}
