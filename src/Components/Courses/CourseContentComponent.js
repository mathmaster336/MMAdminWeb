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
import { useParams } from "react-router-dom";
import { useAppContext } from "../../ContextApi/AppContenxt";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import { addCourseContent, getDocumentById } from "../../FBAdapters/dbMethods";
import { serverTimestamp } from "firebase/firestore";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getVideoDuration } from "../../Services/getVideoDuration ";

function CourseContentComponent() {
  // const { courseData } = useAppContext(); // ✅ Access context
  const { courseId, folderID } = useParams();
  const [courseData, setCourseData] = useState({});

  console.log(courseData + "CourseDAta");

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

  // CourseData
  useEffect(() => {
    fetchCourseData();
  }, [courseData]);

  const fetchCourseData = async () => {
    const courseData = await getDocumentById("courses", courseId);
    setCourseData(courseData);
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
      parentId: courseId,
      folderName: folderName,
      createdBy: "admin",
      type: "folder",
      isDeleted: false,
    };

    const folderID = addCourseContent(
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
  const handleUpload = async () => {
    debugger;
    if (!fileTitle || !contentType || !file) {
      alert("Please complete all fields.");
      return;
    }

    const contentRef = ref(
      storage,
      `courses/${courseData.courseName}/Content/${contentType}`
    );
    const ContentSnap = await uploadBytes(contentRef, file);
    const contentUrl = await getDownloadURL(ContentSnap.ref);

    const contentData = {
      title: fileTitle,
      url: contentUrl,
      isFreePreview: false,
      order: 0,
      createdAt: serverTimestamp(),
      contentType: "storage",
    };

    // ✅ Add duration only if content type is 'video'
    if (contentType === "video") {
      const duration = await getVideoDuration(file); // assuming it's an async function
      contentData.duration = duration;
    }

    const contentID = await addCourseContent(
      "courses",
      courseId,
      contentType,
      contentData
    );

    console.log(contentID);

    alert("Mock: File ready to upload!");
    handleUploadClose();
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
            </div>
          </Popover>
        </div>
      </div>

      {/* 📂 Folder Info */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Current Folder ID:</h2>
        <p className="text-gray-600">{currentFolderId}</p>
      </div>
    </div>
  );
}

export default CourseContentComponent;
