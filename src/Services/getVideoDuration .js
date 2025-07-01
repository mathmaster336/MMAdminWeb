// utils/getVideoDuration.js

/**
 * Calculates the duration of a video file (without uploading it)
 * @param {File} file - The video file selected by the user
 * @returns {Promise<string>} - Duration in "mm:ss" format
 */
export const getVideoDuration = (file) => {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("video/")) {
      return reject(new Error("Invalid video file."));
    }

    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      const duration = video.duration;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      resolve(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    };

    video.onerror = () => {
      reject(new Error("Failed to load video metadata."));
    };

    video.src = URL.createObjectURL(file);
  });
};
