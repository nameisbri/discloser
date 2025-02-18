import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload as UploadIcon } from "lucide-react";
import axios from "axios";
import "./Upload.scss";

const Upload = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const baseUrl = import.meta.env.VITE_APP_URL;

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = {
    "application/pdf": "PDF",
    "image/jpeg": "JPG",
    "image/png": "PNG",
  };

  const validateFile = (file) => {
    if (!ALLOWED_TYPES[file.type]) {
      return "File type not supported. Please upload PDF, JPG, or PNG files.";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size exceeds 10MB limit.";
    }
    return null;
  };

  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    const validFiles = [];
    let hasError = false;

    newFiles.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        setError(error);
        hasError = true;
        return;
      }
      validFiles.push(file);
    });

    if (!hasError) {
      setError("");
      setUploadedFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const handleFileUpload = (event) => {
    handleFiles(event.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) return;
    setIsProcessing(true);
    setError("");

    try {
      const formData = new FormData();

      // Add each file to formData
      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });

      // Add other required fields
      formData.append("user_id", "54"); // Hardcoded for MVP - should come from auth context
      formData.append("test_date", new Date().toISOString());

      // Log formData contents for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await axios.post(`${baseUrl}/records/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload Response:", response.data);

      // Check if there were any errors
      const successfulUploads = response.data.results.filter(
        (result) => result.record
      );
      const errors = response.data.results.filter((result) => result.error);

      if (errors.length > 0) {
        const errorMessages = errors
          .map((error) => `${error.originalName}: ${error.error}`)
          .join("\n");
        setError(`Some files failed to upload:\n${errorMessages}`);
      }

      if (successfulUploads.length > 0) {
        // Navigate to review page with the successful results
        navigate("/review", {
          state: {
            files: uploadedFiles.map((file) => ({
              fileName: file.name,
              fileSize: file.size,
            })),
            uploadDate: new Date().toLocaleDateString(),
            status: "processing",
            results: successfulUploads.map((upload) => upload.record),
            message: response.data.message,
          },
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError(
        error.response?.data?.error ||
          "An error occurred while uploading your files. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="upload">
      <div className="upload__container">
        <header className="upload__header">
          <button className="upload__back-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
            <span>Upload Test Results</span>
          </button>
        </header>

        <div className="upload__content">
          <div
            className={`upload__dropzone ${
              isDragging ? "upload__dropzone--dragging" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadIcon size={48} className="upload__icon" />
            <h2 className="upload__title">Drop your files here</h2>
            <p className="upload__subtitle">or click to browse</p>

            <div className="upload__file-types">
              <span className="upload__file-type">PDF</span>
              <span className="upload__file-type">JPG</span>
              <span className="upload__file-type">PNG</span>
            </div>

            {error && <p className="upload__error">{error}</p>}

            {uploadedFiles.length > 0 && (
              <div className="upload__file-list">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="upload__file-item">
                    <span className="upload__file-name">{file.name}</span>
                    <span className="upload__file-size">
                      {formatFileSize(file.size)}
                    </span>
                    <button
                      className="upload__file-remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="upload__file-limit">
              Maximum file size: 10MB per file
            </p>

            <input
              ref={fileInputRef}
              type="file"
              className="upload__input"
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              disabled={isProcessing}
            />
          </div>

          <div className="upload__supported-tests">
            <h3 className="upload__supported-title">Supported Tests</h3>
            <ul className="upload__test-list">
              <li className="upload__test-item">
                <span className="upload__test-check">✓</span>
                Lifelabs
              </li>
              <li className="upload__test-item">
                <span className="upload__test-check">✓</span>
                Public Health
              </li>
              <li className="upload__test-item">
                <span className="upload__test-check">✓</span>
                Other labs
              </li>
            </ul>
          </div>
        </div>

        <button
          className="upload__submit-button"
          disabled={uploadedFiles.length === 0 || isProcessing}
          onClick={handleSubmit}
        >
          {isProcessing ? "Processing..." : "Begin Upload"}
        </button>
      </div>
    </div>
  );
};

export default Upload;
