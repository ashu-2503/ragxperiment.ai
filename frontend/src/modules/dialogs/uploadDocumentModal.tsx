import React, { useState, useCallback } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { X, CheckCircle, AlertCircle, Loader2, Upload } from "lucide-react";
import "./uploadDocumentModal.css"

interface FileStatus {
  file: File;
  status: "pending" | "uploading" | "completed" | "error";
  error?: string;
}

interface UploadDocumentModalProps {
  show: boolean;
  onHide: () => void;
}

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({ show, onHide }) => {
  const [files, setFiles] = useState<FileStatus[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({ file, status: "pending" as const }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
      "text/markdown": [".md"],
    },
  });

  const startUpload = () => {
    // Simulate upload
    setFiles((prev) => prev.map((f) => ({ ...f, status: "uploading" })));

    setTimeout(() => {
      setFiles((prev) =>
        prev.map((f) => ({
          ...f,
          status: Math.random() > 0.1 ? "completed" : "error",
          error: Math.random() > 0.9 ? "Failed" : undefined,
        }))
      );
    }, 1500);
  };

  const removeFile = (file: File) => setFiles((prev) => prev.filter((f) => f.file !== file));

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Body>
        <div className="card">
          {/* Title & subtitle */}
          <h1 className="title">Upload Documents</h1>
          <p className="subtitle">Drag and drop files here or select to upload.</p>

          {/* Drag & drop area */}
          <div
            {...getRootProps()}
            className={`upload-area ${isDragActive ? "active" : ""}`}
          >
            <input {...getInputProps()} />
            <Upload size={32} className="mb-2" />
            <h3 className="upload-title">Drag & drop files here</h3>
            <p className="upload-subtitle">Supported: PDF, DOCX, TXT, MD</p>
            <button className="select-button">Select Files</button>
          </div>

          {/* File list table */}
          {files.length > 0 && (
            <Table hover responsive className="mb-0 file-table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Size (KB)</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {files.map((f) => (
                  <tr key={f.file.name}>
                    <td>{f.file.name}</td>
                    <td>{(f.file.size / 1024).toFixed(1)}</td>
                    <td>
                      {f.status === "pending" && <span className="text-secondary">Pending</span>}
                      {f.status === "uploading" && (
                        <span className="text-primary">
                          <Loader2 size={16} className="me-1 animate-spin" /> Uploading
                        </span>
                      )}
                      {f.status === "completed" && (
                        <span className="text-success">
                          <CheckCircle size={16} className="me-1" /> Completed
                        </span>
                      )}
                      {f.status === "error" && (
                        <span className="text-danger">
                          <AlertCircle size={16} className="me-1" /> {f.error || "Error"}
                        </span>
                      )}
                    </td>
                    <td>
                      <Button variant="outline-danger" size="sm" onClick={() => removeFile(f.file)}>
                        <X size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}

          {/* Footer actions */}
          <div className="actions mt-4">
            <button className="cancel-button" onClick={onHide}>Cancel</button>
            <button
              className="upload-button"
              onClick={startUpload}
              disabled={files.length === 0 || files.every((f) => f.status !== "pending")}
            >
              Upload
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UploadDocumentModal;
