const DocumentDownload = async (fileURL: string, filePath: string) => {
  try {
    const response = await fetch(fileURL);
    if (!response.ok) throw new Error("Network response was not ok");

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = filePath;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(blobUrl);

    console.log("PDF downloaded successfully");

    console.log("File downloaded successfully");
  } catch (error) {
    console.log("error in document download", error);
  }
};

export default DocumentDownload;
