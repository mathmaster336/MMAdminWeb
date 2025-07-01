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
import { db } from "../Firebase"; // 🔁 Replace with your Firebase path

function ContentManager({ folders = [], videos = [], pdfs = [], images = [], handleParentId }) {
  const [activeContent, setActiveContent] = useState({ type: "", url: "" });

  const handlePreview = (url, type) => {
    setActiveContent({ type, url });
  };

  const clearPreview = () => {
    setActiveContent({ type: "", url: "" });
  };

  const handleDelete = async (data, coll) => {
    try {
      await deleteDoc(doc(db, coll, data.id));

      const collectionsToCheck = ["folders", "videos", "pdfs", "images"];
      for (const col of collectionsToCheck) {
        const q = query(collection(db, col), where("parentId", "==", data.id));
        const snap = await getDocs(q);
        const deletePromises = snap.docs.map((d) =>
          deleteDoc(doc(db, col, d.id))
        );
        await Promise.all(deletePromises);
      }

      alert("✅ Deleted successfully");
    } catch (error) {
      console.error("❌ Error deleting:", error);
    }
  };

  return (
    <div className="w-full h-full p-4 flex flex-col-reverse md:flex-row gap-4 bg-white rounded-md shadow-md">
      {/* 📁 Left Panel */}
      <div className="w-full md:w-[40%] space-y-4">
        {/* Folders */}
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <div onClick={() => handleParentId(folder.id)} className="flex items-center gap-3 w-full">
              <FolderIcon className="text-yellow-600" />
              <span className="font-medium text-gray-800">{folder.flname}</span>
            </div>
            <DeleteIcon
              onClick={() => handleDelete(folder, "folders")}
              className="text-gray-600 hover:text-red-500 cursor-pointer"
            />
          </div>
        ))}

        {/* Videos */}
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <div onClick={() => handlePreview(video.url, "video")} className="flex items-center gap-3 w-full">
              <PlayCircleIcon className="text-red-500" />
              <span className="font-medium text-gray-800">{video.flname}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{video.duration}</span>
              <DeleteIcon
                onClick={() => handleDelete(video, "videos")}
                className="text-gray-600 hover:text-red-500 cursor-pointer"
              />
            </div>
          </div>
        ))}

        {/* PDFs */}
        {pdfs.map((pdf) => (
          <div
            key={pdf.id}
            className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <div onClick={() => handlePreview(pdf.url, "pdf")} className="flex items-center gap-3 w-full">
              <PictureAsPdfIcon className="text-red-700" />
              <span className="font-medium text-gray-800">{pdf.flname}</span>
            </div>
            <DeleteIcon
              onClick={() => handleDelete(pdf, "pdfs")}
              className="text-gray-600 hover:text-red-500 cursor-pointer"
            />
          </div>
        ))}

        {/* Images */}
        {images.map((img) => (
          <div
            key={img.id}
            className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-100 cursor-pointer"
          >
            <div onClick={() => handlePreview(img.url, "image")} className="flex items-center gap-3 w-full">
              <ImageIcon className="text-blue-400" />
              <span className="font-medium text-gray-800">{img.flname}</span>
            </div>
            <DeleteIcon
              onClick={() => handleDelete(img, "images")}
              className="text-gray-600 hover:text-red-500 cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* 📽️ Right Panel */}
      {activeContent.url && (
        <div className="w-full md:w-[60%] p-4 flex justify-center items-center bg-gray-100 rounded-md shadow-lg">
          {activeContent.type === "video" && (
            <video
              src={activeContent.url}
              controls
              autoPlay
              onEnded={clearPreview}
              className="w-full max-w-xl h-64 rounded-md"
              controlsList="nodownload"
            />
          )}

          {activeContent.type === "pdf" && (
            <iframe
              src={activeContent.url}
              title="PDF Preview"
              className="w-full max-w-xl h-96 rounded-md"
              frameBorder="0"
            />
          )}

          {activeContent.type === "image" && (
            <img
              src={activeContent.url}
              alt="Image Preview"
              className="w-full max-w-xl rounded-md object-contain"
              onClick={clearPreview}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ContentManager;
