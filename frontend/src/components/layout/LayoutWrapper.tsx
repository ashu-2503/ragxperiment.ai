import React, { useState } from "react";
import { Container, Row, Col, Nav, Button, Offcanvas } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBook, FaComments, FaSignOutAlt, FaTachometerAlt, FaBars } from "react-icons/fa";
import logoSrc from "../../assets/logos/RAGxperiment_logo.png";
import "./layout.css";

interface LayoutWrapperProps {
  children?: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const openOffcanvas = () => setShowOffcanvas(true);
  const closeOffcanvas = () => setShowOffcanvas(false);

  const handleLogout = () => {
    closeOffcanvas();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const SidebarContent = (
    <div className="sidebar-inner d-flex flex-column h-100">
      <div className="sidebar-top border-bottom text-center">
        <img src={logoSrc} alt="logo" className="sidebar-logo" />
      </div>

      <div className="sidebar-nav-wrapper flex-grow-1 overflow-auto">
        <Nav className="flex-column sidebar-nav p-2">
          <Nav.Link
            as={Link}
            to="/dashboard"
            className={location.pathname === "/dashboard" ? "active" : ""}
            onClick={closeOffcanvas}
          >
            <FaTachometerAlt className="me-2" /> Dashboard
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/knowledge"
            className={location.pathname === "/knowledge" ? "active" : ""}
            onClick={closeOffcanvas}
          >
            <FaBook className="me-2" /> Knowledge Base
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/chat"
            className={location.pathname === "/chat" ? "active" : ""}
            onClick={closeOffcanvas}
          >
            <FaComments className="me-2" /> Chat
          </Nav.Link>
        </Nav>
      </div>

      <div className="sidebar-bottom text-center">
        <Button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt className="me-1" /> Sign out
        </Button>
      </div>
    </div>
  );

  return (
    <Container fluid className="layout-container">
      <Row className="h-100">
        {/* Desktop Sidebar */}
        <Col xs={12} md={3} lg={2} className="sidebar d-none d-md-flex flex-column">
          {SidebarContent}
        </Col>

        {/* Main Content */}
        <Col xs={12} md={9} lg={10} className="main-content">
          {/* Mobile Topbar */}
          <div className="mobile-topbar d-flex d-md-none align-items-center justify-content-between">
            <div className="mobile-topbar-title">
              <img src={logoSrc} alt="logo" className="sidebar-logo" />
            </div>
            <Button variant="outline-primary" onClick={openOffcanvas}>
              <FaBars /> Menu
            </Button>
          </div>

          {/* Mobile Offcanvas */}
          <Offcanvas
            show={showOffcanvas}
            onHide={closeOffcanvas}
            placement="start"
            style={{ width: 240 }}
            className="mobile-offcanvas d-md-none"
          >
            <Offcanvas.Body>{SidebarContent}</Offcanvas.Body>
          </Offcanvas>

          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default LayoutWrapper;
