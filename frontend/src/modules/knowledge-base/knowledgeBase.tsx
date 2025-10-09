// src/pages/Knowledgebase.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Pagination, Spinner, ProgressBar } from "react-bootstrap";
import { fileService } from "../../api/file.service";
import { ToasterService } from "../../components/common/Toastr";
import UploadDocumentModal from "../dialogs/uploadDocumentModal";
import "./knowledgebase.css";

interface Document {
  id: number;
  file_name: string;
  file_type: string;
  file_size: string;
  status: "uploaded" | "ready" | "processing" | "failed";
  progress?: number;
  created_at: string;
}

const Knowledgebase: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(documents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDocs = documents.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  // Modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const openUploadModal = () => setShowUploadModal(true);
  const closeUploadModal = () => setShowUploadModal(false);

  // ---------------- Fetch documents ----------------
  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fileService.getAllFiles(0, 100);
      setDocuments(
        res.files.map((f: any) => ({
          ...f,
          progress: f.status === "processing" ? 0 : 100,
        }))
      );
    } catch (err: any) {
      ToasterService.typeError("Failed to fetch documents");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  // ---------------- Polling for processing files ----------------
  useEffect(() => {
    const interval = setInterval(async () => {
      const processingDocs = documents.filter((d) => d.status === "processing");
      if (processingDocs.length === 0) return;

      try {
        const updates = await Promise.all(
          processingDocs.map(async (d) => {
            const statusRes = await fileService.getFileStatus(d.id);
            return {
              id: d.id,
              status: statusRes.status,
              progress: statusRes.progress,
            };
          })
        );

        setDocuments((prev) =>
          prev.map((d) => {
            const updated = updates.find((u) => u.id === d.id);
            return updated ? { ...d, status: updated.status, progress: updated.progress } : d;
          })
        );
      } catch (err) {
        console.error("Polling error", err);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [documents]);

  // ---------------- Upload complete callback ----------------
  const handleUploadComplete = () => {
    fetchDocuments();
  };

  return (
    <div className="kb-container">
      {/* Header */}
      <div className="kb-header">
        <div>
          <h1>Knowledge Base Documents</h1>
          <p>Browse and manage your uploaded documents</p>
        </div>
        <Button className="btn-global" onClick={openUploadModal}>
          + Add Document
        </Button>
      </div>

      <hr />

      {/* Loading / Empty States */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Loading documents...</p>
        </div>
      ) : documents.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No documents found. Upload one to get started.</p>
          <Button className="btn-primary-global" onClick={openUploadModal}>
            Add Document
          </Button>
        </div>
      ) : (
        <>
          {/* Table */}
          <Table hover responsive className="align-middle text-nowrap mb-0 kb-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Uploaded At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDocs.map((doc, index) => (
                <tr key={doc.id}>
                  <td>{doc.file_name}</td>
                  <td>{doc.file_type}</td>
                  <td>{doc.file_size}</td>
                  <td>{doc.created_at}</td>
                  <td style={{ minWidth: 120 }}>
                    {doc.status === "processing" && (
                      <ProgressBar
                        now={doc.progress || 0}
                        label={`${doc.progress || 0}%`}
                        striped
                        animated
                      />
                    )}
                    {doc.status === "uploaded" && (
                      <span className="text-success">Uploaded</span>
                    )}
                    {doc.status === "ready" && (
                      <span className="text-success">Ready</span>
                    )}
                    {doc.status === "failed" && (
                      <span className="text-danger">Failed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="d-flex justify-content-end mt-3">
            <Pagination>
              {Array.from({ length: totalPages }).map((_, idx) => (
                <Pagination.Item
                  key={idx + 1}
                  active={idx + 1 === currentPage}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </>
      )}

      {/* Upload Modal */}
      <UploadDocumentModal
        show={showUploadModal}
        onHide={closeUploadModal}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
};

export default Knowledgebase;
