// src/pages/Knowledgebase.tsx
import React, { useState } from "react";
import { Table, Button, Pagination, Spinner } from "react-bootstrap";
import UploadDocumentModal from "../dialogs/uploadDocumentModal";

const Knowledgebase: React.FC = () => {
  const [loading] = useState(false);
  const [documents] = useState([
    { id: 1, name: "Sample Document.pdf", type: "PDF", size: "1.2 MB", uploadedAt: "2025-09-30" },
    { id: 2, name: "Notes.docx", type: "Word", size: "540 KB", uploadedAt: "2025-09-28" },
    { id: 3, name: "Report.txt", type: "Text", size: "120 KB", uploadedAt: "2025-09-25" },
    { id: 4, name: "Presentation.pptx", type: "PowerPoint", size: "2.4 MB", uploadedAt: "2025-09-24" },
    { id: 5, name: "Budget.xlsx", type: "Excel", size: "890 KB", uploadedAt: "2025-09-23" },
    { id: 6, name: "MeetingNotes.docx", type: "Word", size: "310 KB", uploadedAt: "2025-09-22" },
    { id: 7, name: "ProjectPlan.pdf", type: "PDF", size: "1.8 MB", uploadedAt: "2025-09-21" },
    { id: 8, name: "Diagram.vsdx", type: "Visio", size: "2.1 MB", uploadedAt: "2025-09-20" },
    { id: 9, name: "Invoice.pdf", type: "PDF", size: "450 KB", uploadedAt: "2025-09-19" },
    { id: 10, name: "Research.docx", type: "Word", size: "1.1 MB", uploadedAt: "2025-09-18" },
    { id: 11, name: "Summary.txt", type: "Text", size: "90 KB", uploadedAt: "2025-09-17" },
    { id: 12, name: "Plan.xlsx", type: "Excel", size: "670 KB", uploadedAt: "2025-09-16" },
    { id: 13, name: "Agenda.docx", type: "Word", size: "220 KB", uploadedAt: "2025-09-15" },
    { id: 14, name: "Notes2.txt", type: "Text", size: "150 KB", uploadedAt: "2025-09-14" },
    { id: 15, name: "Contract.pdf", type: "PDF", size: "2.2 MB", uploadedAt: "2025-09-13" },
    { id: 16, name: "Strategy.pptx", type: "PowerPoint", size: "3.1 MB", uploadedAt: "2025-09-12" },
    { id: 17, name: "Overview.docx", type: "Word", size: "430 KB", uploadedAt: "2025-09-11" },
    { id: 18, name: "Checklist.xlsx", type: "Excel", size: "320 KB", uploadedAt: "2025-09-10" },
    { id: 19, name: "Draft.txt", type: "Text", size: "200 KB", uploadedAt: "2025-09-09" },
    { id: 20, name: "Invoice2.pdf", type: "PDF", size: "510 KB", uploadedAt: "2025-09-08" },
    { id: 21, name: "Presentation2.pptx", type: "PowerPoint", size: "2.7 MB", uploadedAt: "2025-09-07" },
    { id: 22, name: "Report2.docx", type: "Word", size: "780 KB", uploadedAt: "2025-09-06" },
    { id: 23, name: "Data.xlsx", type: "Excel", size: "1.5 MB", uploadedAt: "2025-09-05" },
    { id: 24, name: "Notes3.txt", type: "Text", size: "135 KB", uploadedAt: "2025-09-04" },
    { id: 25, name: "Proposal.pdf", type: "PDF", size: "1.9 MB", uploadedAt: "2025-09-03" },
  ]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDocs = documents.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(documents.length / itemsPerPage);

  const handlePageChange = (page: number) => setCurrentPage(page);

  // Upload modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const openUploadModal = () => setShowUploadModal(true);
  const closeUploadModal = () => setShowUploadModal(false);

  return (
    <div className="ps-5 pe-5 pt-3" style={{ width: "100%", padding: 0 }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center pt-3 pb-5">
        <div>
          <h4 className="fw-bold mb-1">Knowledge Base Documents</h4>
          <p className="text-muted small mb-0">
            Browse and manage your uploaded documents
          </p>
        </div>
        <Button variant="primary" className="fw-semibold px-4" onClick={openUploadModal}>
          + Add Document
        </Button>
      </div>

      <hr />

      {/* Loading / Empty / Table */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Loading documents...</p>
        </div>
      ) : documents.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No documents found. Upload one to get started.</p>
          <Button variant="outline-primary" onClick={openUploadModal}>Add Document</Button>
        </div>
      ) : (
        <>
          <Table
            hover
            responsive
            className="align-middle text-nowrap mb-0"
          >
            <thead className="table-light">
              <tr>
                <th>S No.</th>
                <th>File Name</th>
                <th>Type</th>
                <th>Size</th>
                <th>Uploaded At</th>
              </tr>
            </thead>
            <tbody>
              {paginatedDocs.map((doc, index) => (
                <tr key={doc.id}>
                  <td className="fw-medium">{startIndex + index + 1}</td>
                  <td>{doc.name}</td>
                  <td>{doc.type}</td>
                  <td>{doc.size}</td>
                  <td>{doc.uploadedAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-end mt-2">
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
      {/* Upload Document Modal */}
      <UploadDocumentModal show={showUploadModal} onHide={closeUploadModal} />
    </div>
  );
};

export default Knowledgebase;
