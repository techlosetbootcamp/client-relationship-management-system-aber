import React from "react";

const DocumentDownload = async (fileURL:string,filePath:string) => {
    console.log("before try",fileURL, filePath);
    try {
        const response = await fetch(fileURL);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        
        // Create a download link and trigger a download
        const link = document.createElement("a");

    link.href = blobUrl;
    link.download = filePath; // Use the filename from the path
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up the Blob URL
    URL.revokeObjectURL(blobUrl);

    console.log("PDF downloaded successfully");

    console.log("File downloaded successfully");
  } catch (error) {
    console.log("error in document download", error)
  }
};

export default DocumentDownload;
