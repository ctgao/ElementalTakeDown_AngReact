import './footer.scss';

import React from 'react';

import { Col, Row } from 'reactstrap';

const Footer = () => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p>This is your footer</p>
        <a href="https://www.linkedin.com/in/ctgao2/" target="_blank" rel="noopener noreferrer">
        Christine Gao
        </a>
      </Col>
    </Row>
  </div>
);

export default Footer;
