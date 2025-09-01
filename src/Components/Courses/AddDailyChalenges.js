import React, { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button, Card, CardContent, Typography, IconButton, Select, MenuItem } from "@mui/material";
import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Delete, AddCircle } from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";

function AddDailyChalenges({ fetureStep, setfetureStep }) {
  const [testName, setTestName] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: `q${questions.length + 1}`, question: "", questionImage: "", options: [], correctOptionId: "" },
    ]);
  };

  const uploadImage = async (file) => {
    if (!file) return "";
    const storageRef = ref(storage, `tests/${testName}/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const deleteQuestion = (qIndex) => setQuestions(questions.filter((_, i) => i !== qIndex));
  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };
  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push({ id: `o${updated[qIndex].options.length + 1}`, type: "text", value: "", optionImage: "" });
    setQuestions(updated);
  };
  const deleteOption = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].options = updated[qIndex].options.filter((_, i) => i !== oIndex);
    setQuestions(updated);
  };
  const handleOptionChange = (qIndex, oIndex, field, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex][field] = value;
    setQuestions(updated);
  };

  const validateTest = () => {
    if (!testName.trim()) { alert("Test name is required."); return false; }
    if (!description.trim()) { alert("Test description is required."); return false; }
    if (!timeLimit || timeLimit <= 0) { alert("Time limit must be greater than 0."); return false; }
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim() && !q.questionImage) { alert(`Question ${i + 1}: Please add text or image.`); return false; }
      if (q.options.length === 0) { alert(`Question ${i + 1}: Please add at least one option.`); return false; }
      for (let j = 0; j < q.options.length; j++) {
        const opt = q.options[j];
        if (!opt.value.trim() && !opt.optionImage) {
          alert(`Question ${i + 1}, Option ${j + 1}: Please add text or image.`);
          return false;
        }
      }
    }
    return true;
  };

  const saveTest = async () => {
    if (!validateTest()) return;
    try {
      await addDoc(collection(db, "testSeries"), {
        name: testName,
        description,
        timeLimit: Number(timeLimit),
        questions,
        createdAt: new Date(),
      });
      alert("✅ Test Created Successfully!");
      setTestName(""); setDescription(""); setTimeLimit(0); setQuestions([]);
    } catch (error) { console.error("Error saving test:", error); }
  };

  return (
    <div className="p-4 sm:p-6 w-full md:w-3/4 lg:w-1/2 mx-auto bg-gray-100 relative">
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="absolute top-1 right-4 cursor-pointer">
          <ClearIcon
            className="text-red-600 hover:text-red-800 hover:shadow-lg hover:shadow-red-400 hover:scale-101 transition duration-300 cursor-pointer"
            onClick={() => setfetureStep(0)}
          />
        </div>
        <Typography variant="h4" gutterBottom className="text-center font-bold">
          Create New Test
        </Typography>

        {/* Test Info */}
        <Card className="shadow-lg rounded-2xl mb-6">
          <CardContent className="flex flex-col gap-4">
            <TextField label="Test Name" fullWidth variant="outlined" value={testName} onChange={(e) => setTestName(e.target.value)} />
            <TextField label="Description" fullWidth multiline rows={3} variant="outlined" value={description} onChange={(e) => setDescription(e.target.value)} />
            <TextField label="Time Limit (seconds)" type="number" fullWidth variant="outlined" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} />
          </CardContent>
        </Card>

        {/* Questions */}
        {questions.map((q, qIndex) => (
          <motion.div key={q.id} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            <Card className="shadow-md rounded-2xl mb-6">
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                  <Typography variant="h6">Question {qIndex + 1}</Typography>
                  <IconButton color="error" onClick={() => deleteQuestion(qIndex)}><Delete /></IconButton>
                </div>

                <TextField label="Question Text" fullWidth variant="outlined" className="mb-3" value={q.question} onChange={(e) => handleQuestionChange(qIndex, "question", e.target.value)} />

                {/* Question Image */}
                <div className="my-2 w-full">
                  <input type="file" accept="image/*" onChange={async (e) => { const file = e.target.files[0]; if (!file) return; const url = await uploadImage(file); handleQuestionChange(qIndex, "questionImage", url); }} className="w-full text-xs text-gray-500 file:mr-4 file:py-1 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700" />
                  {q.questionImage && <img src={q.questionImage} alt="Question" className="mt-2 w-full sm:w-32 h-32 object-cover rounded-lg" />}
                </div>

                {/* Options */}
                {q.options.map((opt, oIndex) => (
                  <div key={opt.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2 p-2 border rounded-lg w-full">
                    <Select value={opt.type} onChange={(e) => handleOptionChange(qIndex, oIndex, "type", e.target.value)} className="w-full sm:w-32">
                      <MenuItem value="text">Text</MenuItem>
                      <MenuItem value="image">Image</MenuItem>
                    </Select>

                    {opt.type === "text" ? (
                      <TextField label="Option Text" fullWidth variant="outlined" value={opt.value} onChange={(e) => handleOptionChange(qIndex, oIndex, "value", e.target.value)} />
                    ) : (
                      <div className="w-full">
                        <input type="file" accept="image/*" onChange={async (e) => { const file = e.target.files[0]; if (!file) return; const url = await uploadImage(file); handleOptionChange(qIndex, oIndex, "optionImage", url); }} className="w-full text-xs text-gray-500 file:mr-4 file:py-1 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-400 file:text-white hover:file:bg-blue-500" />
                        {opt.optionImage && <img src={opt.optionImage} alt="Option" className="mt-2 w-full sm:w-20 h-20 object-cover rounded-lg" />}
                      </div>
                    )}

                    <input type="radio" name={`correct-${qIndex}`} checked={q.correctOptionId === opt.id} onChange={() => handleQuestionChange(qIndex, "correctOptionId", opt.id)} />
                    <IconButton color="error" onClick={() => deleteOption(qIndex, oIndex)}><Delete /></IconButton>
                  </div>
                ))}

                <div className="mt-3">
                  <Button size="small" variant="outlined" startIcon={<AddCircle />} onClick={() => addOption(qIndex)}>Add Option</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Add Question Button */}
        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
          <Button variant="contained" color="primary" startIcon={<AddCircle />} onClick={addQuestion} className="w-full sm:w-auto">Add Question</Button>
          <Button variant="contained" color="success" size="large" onClick={saveTest} className="w-full sm:w-auto">💾 Save Test</Button>
        </div>
      </motion.div>
    </div>
  );
}

export default AddDailyChalenges;
