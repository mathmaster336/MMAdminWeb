import React, { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ImageIcon from "@mui/icons-material/Image";
import {
  collection,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";

function Folder({
  folders,
  videolist,
  pdflist,
  imagelist,
  handleParentId,
  courseId,
}) {
  const [preview, setPreview] = useState({ type: "", url: "" });

  const handlePreview = (type, url) => {
    setPreview({ type, url });
  };

  const handleDelete = async (data) => {
    try {
      const docRef = doc(db, "courses", courseId, data.type, data.id);
      await deleteDoc(docRef);
      alert("Deleted successfully");
    } catch (e) {
      console.error("Error deleting data:", e);
    }
  };

  return (
    <div className="w-full md:h-screen h-full p-4 flex flex-col-reverse  lg:flex-row gap-4 md:bg-white rounded-md md:shadow-sm">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 space-y-6 overflow-y-auto max-h-[80vh] pr-1">
        {/* Folder List */}
        <div className="space-y-2">
          {folders?.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 p-3 border rounded-md hover:bg-gray-200 transition cursor-pointer"
            >
              <div
                onClick={() => handleParentId(item.id)}
                className="flex items-center gap-2 w-full"
              >
                <FolderIcon style={{ color: "goldenrod" }} />
                <span className="text-base md:text-lg font-semibold text-gray-800">
                  {item.folderName}
                </span>
              </div>
              <DeleteIcon
                onClick={() => handleDelete(item)}
                className="hover:text-red-600"
              />
            </div>
          ))}
        </div>

        {/* Video List */}
      
        <div className="space-y-2">
          {videolist?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center gap-3 p-3 border rounded-md hover:bg-gray-200 transition cursor-pointer"
            >
              <div
                className="flex items-center gap-2 w-full"
                onClick={() => handlePreview("video", item.url)}
              >
                <PlayCircleIcon style={{ color: "#e8360e" }} />
                <span className="text-base md:text-lg font-semibold text-gray-800">
                  {item.title}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{item.duration}</span>
                <DeleteIcon
                  onClick={() => handleDelete(item)}
                  className="hover:text-red-600"
                />
              </div>
            </div>
          ))}
        </div>

        {/* PDF List */}
        <div className="space-y-2">
          {pdflist?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center gap-3 p-3 border rounded-md hover:bg-gray-200 transition cursor-pointer"
            >
              <div
                className="flex items-center gap-2 w-full"
                onClick={() => handlePreview("pdf", item.url)}
              >
                <PictureAsPdfIcon className="text-red-500" />
                <span className="text-base md:text-lg font-semibold text-gray-800">
                  {item.title}
                </span>
              </div>
              <DeleteIcon
                onClick={() => handleDelete(item)}
                className="hover:text-red-600"
              />
            </div>
          ))}
        </div>

        {/* Image List */}
        <div className="space-y-2">
          {imagelist?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center gap-3 p-3 border rounded-md hover:bg-gray-200 transition cursor-pointer"
            >
              <div
                className="flex items-center gap-2 w-full"
                onClick={() => handlePreview("image", item.url)}
              >
                <ImageIcon className="text-blue-500" />
                <span className="text-base md:text-lg font-semibold text-gray-800">
                  {item.title}
                </span>
              </div>
              <DeleteIcon
                onClick={() => handleDelete(item)}
                className="hover:text-red-600"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Preview Section */}
      <div className="w-full lg:w-1/2 bg-gray-100 rounded-md shadow-md p-3 flex justify-center items-center min-h-[250px] max-h-[80vh] overflow-hidden">
        {preview.url ? (
          preview.type === "video" ? (
            <video
              src={preview.url}
              controls
              autoPlay
              onEnded={() => setPreview({ type: "", url: "" })}
              className="w-full max-w-full h-[250px] md:h-[350px] lg:h-[400px] object-contain rounded-md"
              controlsList="nodownload"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
            />
          ) : preview.type === "pdf" ? (
            <iframe
              src={preview.url}
              title="PDF Preview"
              className="w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-md"
            />
          ) : preview.type === "image" ? (
            <img
              src={preview.url}
              alt="Preview"
              className="w-full max-h-[400px] md:max-h-[500px] object-contain rounded-md"
            />
          ) : null
        ) : (
          <p className="text-gray-500 text-center text-sm md:text-base">
            Select a video, PDF, or image to preview
          </p>
        )}
      </div>
    </div>
  );
}

export default Folder;
