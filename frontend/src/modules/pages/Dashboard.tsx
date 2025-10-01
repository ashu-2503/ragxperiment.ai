// src/modules/pages/Dashboard.tsx
import React, { type JSX } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FaBookOpen, FaComments } from "react-icons/fa";
import "./dashboard.css"

const StatCard: React.FC<{ icon: JSX.Element; count: number; label: string }> = ({ icon, count, label }) => (
  <Card className="mb-3 shadow-sm">
    <Card.Body>
      <Row className="align-items-center">
        <Col xs="auto">{icon}</Col>
        <Col>
          <h3>{count}</h3>
          <div className="text-muted">{label}</div>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

const QuickActionCard: React.FC<{ icon: JSX.Element; title: string; description: string }> = ({
  icon,
  title,
  description,
}) => (
  <Card className="p-4 text-center mb-3">
    <div className="mb-3">{icon}</div>
    <h6>{title}</h6>
    <p className="text-muted">{description}</p>
  </Card>
);

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Hero */}
      <Card className="mb-4 rounded-3 p-4" style={{ background: "#f3f7ff" }}>
        <Row className="align-items-center">
          <Col>
            <h2 style={{ color: "#2f5bd3" }}>Knowledge Assistant</h2>
            <p className="text-muted">
              Your personal AI-powered knowledge hub. Upload documents, create knowledge bases and get instant answers.
            </p>
          </Col>
          <Col xs="auto">
            <Button variant="primary">+ New Knowledge Base</Button>
          </Col>
        </Row>
      </Card>

      {/* Stats */}
      <Row className="mb-4">
        <Col md={6}>
          <StatCard icon={<FaBookOpen size={36} color="#6c8cf9" />} count={3} label="Knowledge Bases" />
        </Col>
        <Col md={6}>
          <StatCard icon={<FaComments size={36} color="#c9b4fb" />} count={2} label="Chat Sessions" />
        </Col>
      </Row>

      {/* Quick actions */}
      <h5 className="mb-3">Quick Actions</h5>
      <Row className="mb-4">
        <Col md={4}>
          <QuickActionCard
            icon={<FaBookOpen size={36} />}
            title="Create Knowledge Base"
            description="Build a new AI-powered knowledge repository."
          />
        </Col>
        <Col md={4}>
          <QuickActionCard
            icon={<FaBookOpen size={36} />}
            title="Upload Documents"
            description="Add PDF, DOCX, MD or TXT files to your knowledge bases."
          />
        </Col>
        <Col md={4}>
          <QuickActionCard
            icon={<FaComments size={36} />}
            title="Start Chatting"
            description="Get instant answers from your knowledge with AI"
          />
        </Col>
      </Row>

      {/* How it works */}
      <Card className="p-4 shadow-sm">
        <h5>How It Works</h5>
        <ol className="mt-3">
          <li>Create a Knowledge Base</li>
          <li>Upload documents</li>
          <li>Start chatting Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
        </ol>
      </Card>
    </div>
  );
};

export default Dashboard;
