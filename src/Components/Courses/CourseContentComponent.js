import React, { useEffect, useState } from "react";
import {
  Button,
  Popover,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../../ContextApi/AppContenxt";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import { addCourseContent, getDocumentById } from "../../FBAdapters/dbMethods";
import { serverTimestamp } from "firebase/firestore";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { getVideoDuration } from "../../Services/getVideoDuration ";
import { ContentApi, MMapi } from "../../Services/MMapi";

import Folder from "./Folder";

function CourseContentComponent() {
  // const { courseData } = useAppContext(); // ✅ Access context
  const { courseId, folderId } = useParams();
  const [courseData, setCourseData] = useState({});

  //navigate
  const navigate = useNavigate();

  // console.log(courseId + " Check and Folder ID "+folderId);

  const [currentFolderId, setCurrentFolderId] = useState(courseId);

  // 👉 Create Folder states
  const [createAnchorEl, setCreateAnchorEl] = useState(null);
  const [folderName, setFolderName] = useState("");

  // 👉 Upload states
  const [uploadAnchorEl, setUploadAnchorEl] = useState(null);
  const [contentType, setContentType] = useState("");
  const [fileTitle, setFileTitle] = useState("");
  const [file, setFile] = useState(null);

  const createOpen = Boolean(createAnchorEl);
  const uploadOpen = Boolean(uploadAnchorEl);

  // get Data from Api
  const [ContentRes, SetContentRes] = useState({});
  // store a progess
  const [progress, setProgress] = useState(0); // State to store upload progress


  // CourseData
  useEffect(() => {
    fetchCourseData();
    getContentList();
  }, [courseData]);

  const fetchCourseData = async () => {
    const courseData = await getDocumentById("courses", courseId);
    setCourseData(courseData);
  };

  const getContentList = async () => {
    const req = {
      parentID: folderId || courseId,
      courseID: courseId,
    };

    const res = await ContentApi.post("/courses/courseContent", req);
    SetContentRes(res);
  };

  // 🔹 Folder actions
  const handleCreateClick = (event) => {
    setCreateAnchorEl(event.currentTarget);
  };
  const handleCreateClose = () => {
    setCreateAnchorEl(null);
    setFolderName("");
  };
  const handleCreateFolder = () => {
    debugger;
    if (!folderName.trim()) {
      alert("Enter a valid folder name");
      return;
    }
    const folderdata = {
      parentId: folderId || courseId,
      folderName: folderName,
      createdBy: "admin",
      type: "folder",
      isDeleted: false,
    };

    const folderFirestoreID = addCourseContent(
      "courses",
      courseData.id,
      "folder",
      folderdata
    );

    // console.log("📁 Creating folder:", folderName, "in", currentFolderId);
    alert(`Mock: Folder "${folderName}" created`);
    handleCreateClose();
  };

  // 🔹 Upload actions
  const handleUploadClick = (event) => setUploadAnchorEl(event.currentTarget);
  const handleUploadClose = () => {
    setUploadAnchorEl(null);
    setContentType("");
    setFileTitle("");
    setFile(null);
  };

  // Handle Upload 
  const handleUpload = async () => {
    debugger
    if (!fileTitle || !contentType || !file) {
      alert("Please complete all fields.");
      return;
    }

    const contentRef = ref(
      storage,
      `courses/${courseData.courseName}/Content/${contentType}/${file.name}`
    );

    // ✅ Start resumable upload
    const uploadTask = uploadBytesResumable(contentRef, file);

    // 🟡 Track upload progress
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(percent + "Percent Test")
        setProgress(percent);
      },
      (error) => {
        console.error("Upload failed:", error);
        alert("Upload failed.");
      },
      async () => {
        // ✅ Upload complete
        const contentUrl = await getDownloadURL(uploadTask.snapshot.ref);

        const contentData = {
          title: fileTitle,
          url: contentUrl,
          parentId: folderId || courseId,
          isFreePreview: false,
          order: 0,
          type: contentType.toLowerCase(),
          createdAt: serverTimestamp(),
          contentType: "storage",
        };

        if (contentType === "video") {
          const duration = await getVideoDuration(file); // Ensure this exists
          contentData.duration = duration;
        }

        const contentID = await addCourseContent(
          "courses",
          courseId,
          contentType,
          contentData
        );

        console.log("Uploaded content ID:", contentID);
        alert("File uploaded successfully!");
        setProgress(0); // Reset bar
        handleUploadClose();
      }
    );
  };

  // Handling Folder Click and redirecting on page
  const handleParentId = (id) => {
    navigate(`/courses/coursecontent/${courseId}/${id}`);
  };

  return (
    <div className="p-5">
      {/* 👉 Course Info */}
      <div className="flex flex-row justify-between">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Course Name:</h2>
          <p className="text-blue-600 text-2xl font-bold underline flex items-center gap-2">
            <GolfCourseIcon className="text-green-500" />
            {courseData?.courseName || "No Course Loaded"}
          </p>
        </div>

        {/* 👉 Header Actions */}
        <div className="flex flex-wrap justify-end gap-4 h-10">
          {/* 📁 Create Folder */}
          <Button
            variant="outlined"
            startIcon={<CreateIcon />}
            onClick={handleCreateClick}
          >
            Create Folder
          </Button>

          <Popover
            open={createOpen}
            anchorEl={createAnchorEl}
            onClose={handleCreateClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <div className="p-5 w-72 space-y-3">
              <TextField
                label="Folder Name"
                fullWidth
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleCreateFolder}
              >
                Create
              </Button>
            </div>
          </Popover>

          {/* 📤 Upload File */}
          <Button
            variant="outlined"
            startIcon={<UploadFileIcon />}
            onClick={handleUploadClick}
          >
            Upload Content
          </Button>

          <Popover
            open={uploadOpen}
            anchorEl={uploadAnchorEl}
            onClose={handleUploadClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <div className="p-5 w-80 space-y-4">
              <FormControl fullWidth>
                <InputLabel id="type-label">Content Type</InputLabel>
                <Select
                  labelId="type-label"
                  value={contentType}
                  label="Content Type"
                  onChange={(e) => setContentType(e.target.value)}
                >
                  <MenuItem value="video">Video</MenuItem>
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="image">Image</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Title"
                fullWidth
                value={fileTitle}
                onChange={(e) => setFileTitle(e.target.value)}
              />

              <input
                type="file"
                accept={
                  contentType === "video"
                    ? "video/*"
                    : contentType === "pdf"
                      ? "application/pdf"
                      : contentType === "image"
                        ? "image/*"
                        : "*"
                }
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-500"
              />

              <Button variant="contained" fullWidth onClick={handleUpload}>
                Upload
              </Button>

              {/* ✅ Progress Bar Section */}
              {progress > 0 && (
                <div className="space-y-1">
                  <div className="w-full bg-gray-200 rounded h-3">
                    <div
                      className="bg-green-500 h-3 rounded transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-center text-gray-700">{progress}%</p>
                </div>
              )}
            </div>
          </Popover>

        </div>
      </div>

      {/* 📂 Folder Info */}
      <div className="">
        {ContentRes && (
          <Folder
            folders={ContentRes.folder}
            videolist={ContentRes.video}
            pdflist={ContentRes.pdf}
            imagelist={ContentRes.image}
            handleParentId={handleParentId}
            courseId={courseId}
          />
        )}
        {/* <h2 className="text-lg font-semibold">Current Folder ID:</h2>
        <p className="text-gray-600">{currentFolderId}</p> */}
      </div>
    </div>
  );
}

export default CourseContentComponent;
