import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload as UploadIcon } from "lucide-react";
import "./Upload.scss";

const Upload = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessing(false);
    }
  };

  const handleSubmit = () => {
    if (!uploadedFile) return;

    setIsProcessing(true);

    // Simulate file processing
    setTimeout(() => {
      navigate("/review", {
        state: {
          fileName: uploadedFile.name,
          uploadDate: new Date().toLocaleDateString(),
          fileSize: uploadedFile.size,
          status: "processing",
        },
      });
    }, 1000);
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
          <div className="upload__dropzone">
            <UploadIcon size={48} className="upload__icon" />
            <h2 className="upload__title">Drop your file here</h2>
            <p className="upload__subtitle">or click to browse</p>

            <div className="upload__file-types">
              <span className="upload__file-type">PDF</span>
              <span className="upload__file-type">JPG</span>
              <span className="upload__file-type">PNG</span>
            </div>

            <p className="upload__file-limit">Maximum file size: 10MB</p>

            <input
              type="file"
              className="upload__input"
              onChange={handleFileUpload}
              accept=".pdf,.jpg,.jpeg,.png"
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
          disabled={!uploadedFile || isProcessing}
          onClick={handleSubmit}
        >
          {isProcessing ? "Processing..." : "Begin Upload"}
        </button>
      </div>
    </div>
  );
};

export default Upload;
