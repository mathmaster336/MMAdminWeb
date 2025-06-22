import React, { useState } from "react";
import { TextField, Button, Typography, Divider, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { motion } from "framer-motion";

const AddCourses = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    price: "",
    description: "",
    mentorName: "",
    language: "",
    introVideo: null,
    introimg: null,
    sdescription: "",
    contentTypes: {
      video: false,
      pdf: false,
      images: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name in formData.contentTypes) {
      setFormData((prev) => ({
        ...prev,
        contentTypes: { ...prev.contentTypes, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const key in formData) {
      if (
        formData[key] === "" ||
        formData[key] === null ||
        (typeof formData[key] === "string" && formData[key].trim() === "")
      ) {
        if (key !== "contentTypes") {
          alert(`Please fill the "${key}" field`);
          return;
        }
      }
    }
    console.log(formData);
    setFormData({
      courseName: "",
      price: "",
      description: "",
      mentorName: "",
      language: "",
      introVideo: null,
      introimg: null,
      sdescription: "",
      contentTypes: { video: false, pdf: false, images: false },
    });
  };

  return (
    <div className="relative w-full flex justify-center items-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full  object-cover z-0"
      >
        <source src="/mathsbg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

        <motion.div
          initial={{ scale: 0.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-20 w-full flex justify-center items-center mb-10"
        >
              <div className="bg-white bg-opacity-90 p-4 md:p-5 rounded-2xl shadow-xl w-[90%] md:w-[75%] mt-3">
          <div className="text-center mb-4">
            <Divider className="my-4">
              <label className="text-gray-700 font-extrabold text-xl md:text-2xl">
                Add New Course
              </label>
            </Divider>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Course Name"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Mentor Name"
              name="mentorName"
              value={formData.mentorName}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              fullWidth
            />
          </div>

          <div className="mt-5 flex md:flex-row flex-col justify-between">
            <div>
              <Typography variant="subtitle1" className="font-semibold text-gray-700">
                Select Content Types:
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox checked={formData.contentTypes.video} onChange={handleChange} name="video" />}
                  label="Video"
                />
                <FormControlLabel
                  control={<Checkbox checked={formData.contentTypes.pdf} onChange={handleChange} name="pdf" />}
                  label="PDF"
                />
                <FormControlLabel
                  control={<Checkbox checked={formData.contentTypes.images} onChange={handleChange} name="images" />}
                  label="Images"
                />
              </FormGroup>
            </div>
            <div className="md:w-[49.5%] w-full">
              <TextField
                label="Short description"
                name="sdescription"
                value={formData.sdescription}
                onChange={handleChange}
                fullWidth
              />
            </div>
          </div>

          <div className="mt-5">
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
            />
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-base font-bold text-gray-700 block mb-2">
                Thumbnail Video
              </span>
              <input
                type="file"
                accept="video/*"
                onChange={handleChange}
                name="introVideo"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700"
              />
            </div>
            <div>
              <span className="text-base font-bold text-gray-700 block mb-2">
                Thumbnail Image
              </span>
              <input
                type="file"
                accept="image/*"
                name="introimg"
                onChange={handleChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700"
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={handleSubmit}
              variant="contained"
              className="hover:bg-blue-100 hover:text-gray-700 font-bold"
            >
              Upload Course
            </Button>
          </div>
        </div>
        </motion.div>

      {/* <div className="relative z-10 w-full flex justify-center items-center mb-10">
    
      </div> */}
    </div>
  );
};

export default AddCourses;
