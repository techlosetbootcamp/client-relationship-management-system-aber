import React from "react";
import cloudinary from "./cloudinary";

export const ImageUpload = async (file: File) => {
  try {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);
    const data = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "crm-techloset",
          },
          (error, uploadResult) => {
            if (error) {
              return reject(error);
            }

            return resolve(uploadResult);
          }
        )
        .end(bytes);
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
