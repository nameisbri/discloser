import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload as UploadIcon, Loader2 } from "lucide-react";
import axios from "axios";
import Modal from "../../components/Modal/Modal";
import "./Upload.scss";

const Upload = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState({
    stage: "idle",
    progress: 0,
    currentFile: null,
    processedFiles: [],
  });
  const fileInputRef = useRef(null);
  const baseUrl = import.meta.env.VITE_APP_URL;

  const MAX_FILE_SIZE = 10 * 1024 * 1024;
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

  const handleDropzoneClick = (e) => {
    const dropzoneEl = e.currentTarget;
    const clickedEl = e.target;

    if (clickedEl.tagName.toLowerCase() === "button") return;

    if (!dropzoneEl.contains(clickedEl)) return;

    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (uploadedFiles.length === 0) return;
    setIsProcessing(true);
    setError("");

    setUploadStatus({
      stage: "uploading",
      progress: 0,
      currentFile: uploadedFiles[0].name,
      processedFiles: [],
    });

    try {
      const formData = new FormData();

      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("user_id", "54");
      formData.append("test_date", new Date().toISOString());

      const response = await axios.post(`${baseUrl}/records/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            const percentCompleted = Math.floor(
              (progressEvent.loaded * 100) / progressEvent.total
            );

            setUploadStatus((prev) => ({
              ...prev,
              stage: "uploading",
              progress: percentCompleted,
            }));
          }
        },
      });

      setUploadStatus((prev) => ({
        ...prev,
        stage: "processing",
        progress: 100,
      }));

      const successfulUploads = response.data.results.filter(
        (result) => result.record
      );
      const errors = response.data.results.filter((result) => result.error);

      if (errors.length > 0) {
        const errorMessages = errors
          .map((error) => `${error.originalName}: ${error.error}`)
          .join("\n");
        setError(`Some files failed to upload:\n${errorMessages}`);
        setUploadStatus((prev) => ({
          ...prev,
          stage: "error",
        }));
      }

      if (successfulUploads.length > 0) {
        setUploadStatus((prev) => ({
          ...prev,
          stage: "complete",
        }));
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
      setUploadStatus((prev) => ({
        ...prev,
        stage: "error",
      }));
    } finally {
      setIsProcessing(false);
    }
  };

  const renderProcessingState = () => {
    if (uploadStatus.stage === "idle") return null;

    return (
      <div className="upload__processing">
        <div className="upload__processing-status">
          <Loader2 className="upload__processing-spinner" />
          <div className="upload__processing-info">
            <div className="upload__processing-stage">
              {(uploadStatus.stage === "uploading" ||
                uploadStatus.stage === "processing") && (
                <>
                  <p>Uploading and processing your files...</p>
                  <p className="upload__processing-details">
                    This may take up to 30 seconds. Please do not close the
                    window.
                  </p>
                </>
              )}
              {uploadStatus.stage === "complete" && "Upload complete!"}
              {uploadStatus.stage === "error" && "Upload failed"}
            </div>
          </div>
        </div>
      </div>
    );
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
            onClick={handleDropzoneClick}
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
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            className="upload__input"
            onChange={handleFileUpload}
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
            disabled={isProcessing}
            style={{
              position: "absolute",
              width: "1px",
              height: "1px",
              padding: "0",
              margin: "-1px",
              overflow: "hidden",
              clip: "rect(0,0,0,0)",
              border: "0",
            }}
          />

          <Modal
            isOpen={uploadStatus.stage !== "idle"}
            onClose={() => setUploadStatus({ ...uploadStatus, stage: "idle" })}
            title={
              uploadStatus.stage === "uploading"
                ? "Uploading and Processing"
                : uploadStatus.stage === "complete"
                ? "Upload Complete"
                : "Upload Failed"
            }
            message={
              uploadStatus.stage === "uploading"
                ? "Please wait while your files are being uploaded and processed. This may take up to 20 seconds."
                : uploadStatus.stage === "complete"
                ? "Your files have been successfully uploaded and processed."
                : "An error occurred while uploading your files. Please try again."
            }
          >
            <Loader2 className="upload__processing-spinner" />
          </Modal>

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
