import React, { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {
  collection,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

function Folder({ folders, videolist, handleParentId }) {
  const [videourl, setvideourl] = useState("");

  const handlevideo = (data) => {
    setvideourl(data.url);
  };

  const handleVideoEnd = () => {
    setvideourl("");
  };

  const handleDelete = async (data, coll) => {
    try {
      console.log(data, "data to delete");
  
      // Step 1: Delete the selected document itself
      await deleteDoc(doc(db, coll, data.id));
  
      // Step 2: Define collections that might use this document as a parent
      const collectionsToCheck = ["folders", "Videos"];
  
      // Step 3: Loop through each collection and delete related docs by parentId === data.id
      for (const col of collectionsToCheck) {
        const q = query(
          collection(db, col),
          where("parentId", "==", data.id) // use data.id instead of data.parentId
        );
        const snapshot = await getDocs(q);
        const deletePromises = snapshot.docs.map((document) => {
          return deleteDoc(doc(db, col, document.id));
        });
        await Promise.all(deletePromises);
      }
  
      alert("Deleted successfully");
    } catch (e) {
      console.error("Error deleting data:", e);
    }
  };
  

  return (
    <div className="w-full h-full p-4 flex flex-col-reverse md:flex-row gap-4 bg-white rounded-md shadow-sm">
      {/* Folder & Video List */}
      <div className="w-full  space-y-4">
        {/* Folders */}
        <div className="space-y-2">
          {/* <h2 className="text-xl font-bold text-gray-700 mb-2">📁 Folders</h2> */}
          {folders?.map((item) => (
            <div
              key={item.id}
              className="flex  items-center justify-between gap-3 p-3 border rounded-md hover:bg-gray-300 transition cursor-pointer"
            >
              <div onClick={() => handleParentId(item.id)} className="w-[100%]">
                <FolderIcon style={{ color: "goldenrod" }} />
                <span className="text-lg font-semibold text-gray-800 ml-10">
                  {item.flname}
                </span>
              </div>

              <DeleteIcon
                onClick={() => handleDelete(item, "folders")}
                className="hover:text-red-600 hover:text-3xl"
              />
            </div>
          ))}
        </div>

        {/* Videos */}
        <div className="space-y-2">
          {/* <h2 className="text-xl font-bold text-gray-700 mb-2">🎬 Videos</h2> */}
          {videolist?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center gap-3 p-3 border rounded-md hover:bg-gray-300 transition cursor-pointer"
            >
              <div className="  w-[100%]" onClick={() => handlevideo(item)}>
                <PlayCircleIcon style={{ color: "#e8360e" }} />
                <span className="text-lg font-semibold text-gray-800 ml-10">
                  {item.flname}
                </span>
              </div>
              <div className="flex flex-row ">
                <span className="text-sm font-medium text-gray-600 mr-10">
                  {item.duration}
                </span>
                <DeleteIcon onClick={() => handleDelete(item, "videos")} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player */}
      {videourl && (
        <div className="w-full p-4 h-full flex justify-center items-center bg-black rounded-md shadow-lg">
          <video
            src={videourl}
            controls
            autoPlay
            controlsList="nodownload"
            onEnded={handleVideoEnd}
            className="w-full max-w-lg h-60 rounded-md"
          />
        </div>
      )}
    </div>
  );
}

export default Folder;
