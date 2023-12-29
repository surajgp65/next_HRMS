import React, { ReactElement, useState, useEffect } from "react";
import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import { useRouter } from "next/router";

const BranchForm = () => {
  const router = useRouter();

  const handleDropdownChange = (eventKey: string | null) => {
    if (eventKey === "createNew") {
      // Check if the "Create New" option is selected
      router.push("/pages/setup/company/companyForm/newHoliday");
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Company Form</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="New Company" />
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <Form.Label htmlFor="companyName" className="form-label">
                  Company Name
                </Form.Label>
                <Form.Control type="text" placeholder="" id="companyName" />
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <Form.Label htmlFor="defaultLetterHead" className="form-label">
                  Default Letter Head
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Salt Tech"
                  id="defaultLetterHead"
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="mb-3">
                <Form.Label htmlFor="abbr" className="form-label">
                  Abbr.
                </Form.Label>
                <Form.Control type="text" placeholder="" id="abbr" />
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <Form.Label htmlFor="taxId" className="form-label">
                  Tax ID
                </Form.Label>
                <Form.Control type="tel" placeholder="" id="taxId" />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="mb-3">
                <Form.Label htmlFor="defaultCurrency" className="form-label">
                  Default Currency
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder=""
                  id="defaultCurrency"
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <Form.Label htmlFor="domainInput" className="form-label">
                  Domain
                </Form.Label>
                <Form.Control type="text" placeholder="" id="domainInput" />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="mb-3">
                <Form.Label htmlFor="countryNameInput" className="form-label">
                  Country
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder=""
                  id="countryNameInput"
                />
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <Form.Label htmlFor="ForminputState" className="form-label">
                  Default Holiday List
                </Form.Label>
                <Dropdown onSelect={handleDropdownChange}>
                  <Dropdown.Toggle variant="light">Holiday</Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#" active>
                      {" "}
                      Option 1
                    </Dropdown.Item>
                    <Dropdown.Item href="#">Option 2</Dropdown.Item>
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="createNew">
                      Create New
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <Form.Label
                  htmlFor="dateOfEstablishment"
                  className="form-label"
                >
                  Date of Establishment
                </Form.Label>
                <Form.Control
                  type="date"
                  placeholder=""
                  id="dateOfEstablishment"
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <div className="mb-3">
                <InputGroup>
                  <Form.Check
                    type="checkbox"
                    className="col-xs-2"
                    id="isGroup"
                  />
                  <span style={{ height: "5px", width: "5px" }}></span>
                  <Form.Label htmlFor="isGroup" className="form-label">
                    Is Group
                  </Form.Label>
                </InputGroup>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="mb-3">
                <Form.Label htmlFor="parentCompany" className="form-label">
                  Parent Company
                </Form.Label>
                <Form.Control type="email" placeholder="" id="parentCompany" />
              </div>
            </Col>

            {/* <Col md={6}>
                            <div className="mb-3">
                                <Form.Label htmlFor="defaultHolidayList" className="form-label">Default Holiday List</Form.Label>
                                <Form.Control type="text" placeholder="" id="defaultHolidayList" />
                            </div>
                        </Col> */}
          </Row>

          <Row>
            <Col md={12}>
              <div className="text-end">
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

BranchForm.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default BranchForm;
