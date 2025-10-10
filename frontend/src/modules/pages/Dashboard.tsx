// src/modules/pages/Dashboard.tsx
import React, { useState, type JSX } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FaBook, FaBookOpen, FaComments, FaRobot, FaUpload } from "react-icons/fa";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import UploadDocumentModal from "../dialogs/uploadDocumentModal";

interface StatCardProps {
  icon: JSX.Element;
  count: number;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, count, label }) => (
  <Card className="stat-card mb-3">
    <Row className="align-items-center">
      <Col xs="auto">{icon}</Col>
      <Col>
        <h3>{count}</h3>
        <div className="text-muted">{label}</div>
      </Col>
    </Row>
  </Card>
);

interface QuickActionCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  onClick?: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ icon, title, description, onClick }) => (
  <Card
    className={`quick-action-card ${onClick ? "clickable" : ""}`}
    onClick={onClick}
  >
    <div className="icon">{icon}</div>
    <h6>{title}</h6>
    <p className="text-muted">{description}</p>
  </Card>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const openUploadModal = () => setShowUploadModal(true);
  const closeUploadModal = () => setShowUploadModal(false);

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <Card className="card mb-4">
        <Row className="align-items-center">
          <Col>
            <h2>Knowledge Assistant</h2>
            <p>
              Your personal AI-powered knowledge hub. Upload documents, create knowledge bases and get instant answers.
            </p>
          </Col>
          <Col xs="auto">
            <Button className="btn-global" onClick={() => navigate("/knowledge")}>
              + Add Knowledgebase
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Stats */}
      <Row className="mb-4">
        <Col md={6}>
          <StatCard
            icon={<FaBookOpen size={36} color="var(--color-secondary)" />}
            count={3}
            label="Knowledge Bases"
          />
        </Col>
        <Col md={6}>
          <StatCard
            icon={<FaComments size={36} color="var(--color-primary)" />}
            count={2}
            label="Chat Sessions"
          />
        </Col>
      </Row>

      {/* Quick Actions */}
      <h5 className="mb-3">Quick Actions</h5>
      <Row className="mb-4">
        <Col md={4}>
          <QuickActionCard
            icon={<FaBook color="var(--color-secondary)" />}
            title="Create Knowledge Base"
            description="Build a new AI-powered knowledge repository."
            onClick={() => navigate("/knowledge")}
          />
        </Col>
        <Col md={4}>
          <QuickActionCard
            icon={<FaUpload color="var(--color-secondary)" />}
            title="Upload Documents"
            description="Add PDF, DOCX, MD or TXT files to your knowledge bases."
            onClick={openUploadModal}
          />
        </Col>
        <Col md={4}>
          <QuickActionCard
            icon={<FaRobot color="var(--color-accent)" />}
            title="Start Chatting"
            description="Get instant answers from your knowledge with AI."
            onClick={() => navigate("/chat")}
          />
        </Col>
      </Row>

      {/* How It Works */}
      <h5>How It Works</h5>
      <Card className="how-it-works-card">
        <ol>
          <li>Create a Knowledge Base</li>
          <li>Upload documents</li>
          <li>Start chatting</li>
        </ol>
      </Card>

      {/* Upload Modal */}
      <UploadDocumentModal
        show={showUploadModal}
        onHide={closeUploadModal}
        onUploadComplete={() => {
          closeUploadModal();
          navigate("/knowledge");
        }}
      />
    </div>
  );
};

export default Dashboard;
