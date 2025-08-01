import {
  Divider,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";
import { convertToBase64 } from "../../Utils/HelperMethods/base64Helper";
import { storage, db } from "../../firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import CircularProgress from "@mui/material/CircularProgress";


const AddCourseForm = ({ fetureStep, setfetureStep }) => {
  const [Substatus, setSubstatus] = useState(false);

  const [img, setimg] = useState("");
  const [formData, setFormData] = useState({
    courseName: "",
    price: "",
    description: "",
    mentorName: "",
    language: "",
    sdescription: "",
    class: "",           // ➕ new field
    medium: "",
  });
  // for Content type state
  const [contentTypes, setContentTypes] = useState({
    video: false,
    pdf: false,
    images: false,
  });
  // for Video and Image state
  const [media, setMedia] = useState({
    introVideo: null,
    introimg: null,
  });

  // validation
  const [errors, setErrors] = useState({});

  // Handle Text input Change
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Content Change
  const handleContentTypeChange = (e) => {
    const { name, checked } = e.target;
    setContentTypes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Handle Media Change
  const handleMediaChange = (e) => {
    const { name, files } = e.target;
    if (!files || files.length === 0) return;

    setMedia((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };


  const handleSubmit = async (e) => {

    debugger
    setSubstatus(true);
    e.preventDefault();

    // 1️⃣ Validate the form first
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    /* ----------  UPLOAD COVER IMAGE  ---------- */
    // Always source the File object from the same place.
    const { introimg, introVideo } = media; // <‑‑ file inputs
    const { courseName } = formData; // <‑‑ text inputs

    // (a) Image
    const imgRef = ref(storage, `courses/${courseName}/${introimg.name}`);
    const imgSnap = await uploadBytes(imgRef, introimg);
    const thumbnailUrl = await getDownloadURL(imgSnap.ref);

    // (b) Intro video (optional)
    const vidRef = ref(storage, `courses/${courseName}/${introVideo.name}`);
    const vidSnap = await uploadBytes(vidRef, introVideo);
    const videoUrl = await getDownloadURL(vidSnap.ref);

    /* ----------  WRITE ONE COURSE DOC  ---------- */
    const courseInfo = {
      courseName,
      price: formData.price,
      desc: formData.description,
      shortdesc: formData.sdescription,
      mentorName: formData.mentorName,
      language: formData.language,
      introimg: thumbnailUrl, // ✅ Real HTTPS link
      introVideo: videoUrl, // ✅ Real HTTPS link
      video: contentTypes.video,
      pdf: contentTypes.pdf,
      images: contentTypes.images,
      createdAt: Date.now(), // helpful for ordering later
      class: formData.class,
      medium: formData.medium,
      isActive: true,
    };

    await addDoc(collection(db, "courses"), courseInfo);
    alert("Course added successfully!");

    // Reset UI state
    setFormData({
      courseName: "",
      price: "",
      description: "",
      sdescription: "",
      mentorName: "",
      language: "",
    });
    setMedia({ introimg: null, introVideo: null });
    setContentTypes({ video: false, pdf: false, images: false });
    setSubstatus(false)
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.courseName?.trim())
      errors.courseName = "Course name is required";
    if (!formData.price?.trim()) errors.price = "Price is required";
    if (!formData.mentorName?.trim())
      errors.mentorName = "Mentor name is required";
    if (!formData.language?.trim()) errors.language = "Language is required";
    if (!formData.sdescription?.trim())
      errors.sdescription = "Short description is required";
    if (!formData.description?.trim())
      errors.description = "Description is required";

    if (!media.introVideo) errors.introVideo = "Intro video is required";
    if (!media.introimg) errors.introimg = "Intro image is required";

    if (!contentTypes.video && !contentTypes.pdf && !contentTypes.images) {
      errors.contentTypes = "Select at least one content type";
    }
    if (!formData.class?.trim()) errors.class = "Class is required";
    if (!formData.medium?.trim()) errors.medium = "Medium is required";


    return errors;
  };

  return (
    <div className="relative bg-gray-100 bg-opacity-90 p-4 md:p-5 rounded-2xl shadow-xl w-[90%] md:h-[85%] h-[90%] md:w-[75%] overflow-y-auto ">
      <div className="absolute top-1 right-4 cursor-pointer">
        <ClearIcon
          className="text-red-600 hover:text-red-800 hover:shadow-lg hover:shadow-red-400 hover:scale-101 transition duration-300 cursor-pointer"
          onClick={() => setfetureStep(fetureStep - 1)}
        />
      </div>
      <div className="text-center mb-4">
        <Divider className="my-4">
          <label className="text-gray-700 font-extrabold text-xl md:text-2xl">
            Add New Course
          </label>
        </Divider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <TextField
          label="Course Name"
          name="courseName"
          value={formData.courseName}
          onChange={handleTextChange}
          error={Boolean(errors.courseName)}
          helperText={errors.courseName}
          fullWidth
        />
        <TextField
          select
          label="Class (Grade)"
          name="class"
          value={formData.class}
          onChange={handleTextChange}
          error={Boolean(errors.class)}
          helperText={errors.class}
          fullWidth
          SelectProps={{ native: true }}
        >
          <option value=""></option>
          {[...Array(8)].map((_, i) => {
            const grade = i + 5;
            return <option key={grade} value={grade}>{grade}</option>;
          })}
        </TextField>

        <TextField
          select
          label="Medium"
          name="medium"
          value={formData.medium}
          onChange={handleTextChange}
          error={Boolean(errors.medium)}
          helperText={errors.medium}
          fullWidth
          SelectProps={{ native: true }}
        >
          <option value=""></option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Marathi">Marathi</option>
          <option value="Other">Other</option>
        </TextField>

        <TextField
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleTextChange}
          error={Boolean(errors.price)}
          helperText={errors.price}
          fullWidth
        />
        <TextField
          label="Mentor Name"
          name="mentorName"
          value={formData.mentorName}
          onChange={handleTextChange}
          error={Boolean(errors.mentorName)}
          helperText={errors.mentorName}
          fullWidth
        />
        <TextField
          label="Language"
          name="language"
          value={formData.language}
          onChange={handleTextChange}
          error={Boolean(errors.language)}
          helperText={errors.language}
          fullWidth
        />
      </div>

      <div className="mt-2 flex md:flex-row flex-col justify-between">
        <div>
          <Typography
            variant="subtitle1"
            className="font-semibold text-gray-700"
          >
            Select Content Types:
          </Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={contentTypes.video}
                  onChange={handleContentTypeChange}
                  name="video"
                />
              }
              label="Video"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={contentTypes.pdf}
                  onChange={handleContentTypeChange}
                  name="pdf"
                />
              }
              label="PDF"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={contentTypes.images}
                  onChange={handleContentTypeChange}
                  name="images"
                />
              }
              label="Images"
            />
          </FormGroup>
        </div>
        <div className="md:w-[49.5%] w-full">
          <TextField
            label="Short description"
            name="sdescription"
            value={formData.sdescription}
            onChange={handleTextChange}
            error={Boolean(errors.sdescription)}
            helperText={errors.sdescription}
            fullWidth
          />
        </div>
      </div>

      <div className="mt-2">
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleTextChange}
          error={Boolean(errors.description)}
          helperText={errors.description}
          fullWidth
          multiline
          rows={3}
        />
      </div>

      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <span className="text-base font-bold text-gray-700 block mb-2">
            Thumbnail Video
          </span>
          {errors.introVideo && (
            <p className="text-red-600 text-sm mt-1   ">{errors.introVideo}</p>
          )}
          <input
            type="file"
            accept="video/*"
            onChange={handleMediaChange}
            name="introVideo"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-6 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-700"
          />
        </div>
        <div>
          <span className="text-base font-bold text-gray-700 block mb-2">
            Thumbnail Image
          </span>
          {errors.introimg && (
            <p className="text-red-600 text-sm mt-1 ">{errors.introimg}</p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleMediaChange}
            name="introimg"
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
          {!Substatus ? "Upload Course" : <CircularProgress />}
        </Button>
      </div>
    </div>
  );
};

export default AddCourseForm;
