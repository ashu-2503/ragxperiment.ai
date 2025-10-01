// src/components/layout/LayoutWrapper.tsx
import React, { useState } from "react";
import { Container, Row, Col, Nav, Button, Offcanvas } from "react-bootstrap";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBook, FaComments, FaSignOutAlt, FaTachometerAlt, FaBars } from "react-icons/fa";
import logoSrc from "../../assets/logos/RAGxperiment_logo.png";
import "./layout.css";

interface LayoutWrapperProps {
  children?: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // offcanvas (mobile) state
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const openOffcanvas = () => setShowOffcanvas(true);
  const closeOffcanvas = () => setShowOffcanvas(false);

  const handleLogout = () => {
    // ensure mobile menu closes when signing out
    closeOffcanvas();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  // reusable sidebar content (used for desktop and mobile offcanvas)
  const SidebarContent = (
    <div className="sidebar-inner d-flex flex-column h-100">
      <div className="sidebar-top border-bottom text-center">
        <img src={logoSrc} alt="logo" className="sidebar-logo" />
      </div>

      {/* Scrollable nav area */}
      <div className="sidebar-nav-wrapper flex-grow-1 overflow-auto">
        <Nav className="flex-column sidebar-nav p-2">
          <Nav.Link
            as={Link}
            to="/dashboard"
            active={location.pathname === "/dashboard"}
            onClick={closeOffcanvas}
          >
            <FaTachometerAlt className="me-2" /> Dashboard
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/knowledge"
            active={location.pathname === "/knowledge"}
            onClick={closeOffcanvas}
          >
            <FaBook className="me-2" /> Knowledge Base
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/chat"
            active={location.pathname === "/chat"}
            onClick={closeOffcanvas}
          >
            <FaComments className="me-2" /> Chat
          </Nav.Link>
        </Nav>
      </div>

      <div className="sidebar-bottom p-3 border-top text-center">
        <Button
          variant="outline-danger"
          size="sm"
          onClick={handleLogout}
          className="logout-btn"
        >
          <FaSignOutAlt /> Sign out
        </Button>
      </div>
    </div>
  );

  return (
    <Container fluid>
      <Row>
        {/* Desktop sidebar: hidden on small screens */}
        <Col
          xs={12}
          md={3}
          lg={2}
          className="sidebar p-0 d-none d-md-flex flex-column"
          aria-hidden={false}
        >
          {SidebarContent}
        </Col>

        {/* Main Content */}
        <Col xs={12} md={9} lg={10} className="main-content">
          {/* Mobile top bar: hamburger + optional title, visible only on small screens */}
          <div className="mobile-topbar d-flex d-md-none align-items-center justify-content-between">
            {/* Keep this empty or show current page title if you want */}
            <div className="mobile-topbar-title">
              <img src={logoSrc} alt="logo" className="sidebar-logo" />
            </div>
            <Button variant="outline-primary" onClick={openOffcanvas} aria-label="Open menu">
              <FaBars /> Menu
            </Button>
          </div>

          {/* Offcanvas for mobile: slides from left and overlays content */}
          <Offcanvas
            show={showOffcanvas}
            onHide={closeOffcanvas}
            placement="start"
            style={{ width: 240, }}
            className="mobile-offcanvas d-md-none"
          >
            <Offcanvas.Body>{SidebarContent}</Offcanvas.Body>
          </Offcanvas>
          {children || <Outlet />}
        </Col>
      </Row>
    </Container>
  );
};

export default LayoutWrapper;
