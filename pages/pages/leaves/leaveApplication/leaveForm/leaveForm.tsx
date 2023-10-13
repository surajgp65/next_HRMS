import React, { ReactElement, useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Row, Col, Form, Button, InputGroup, Dropdown } from 'react-bootstrap';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { useRouter } from 'next/router';
import Flatpickr from "react-flatpickr";


const newPage = () => {
  const router = useRouter();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  // Date
  const date: any = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const todaysDate = date.getDate();
  const currentDate = todaysDate + "-" + month + "-" + year;


  return (
    <React.Fragment>
      <Head>
        <title>Leave Application</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Leave Application" />


          {/* Form */}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Series</Form.Label>
                <Form.Control type="text" placeholder="Series" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid series.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Leave Type</Form.Label>
                <Form.Control type="text" placeholder="" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid leave type
                </Form.Control.Feedback>
              </Form.Group>

            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Employee</Form.Label>
                <Form.Control type="text" placeholder="" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
              </Form.Group>

            </Row>
            <hr className="hr-blurry" />
            <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>From Date</Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        dateFormat: "d-m-Y",
                                        defaultDate: [currentDate]
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Date.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>To Date</Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        dateFormat: "d-m-Y",

                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Date.
                                </Form.Control.Feedback>
                            </Form.Group>


                        </Row>
            <Col xxl={3} md={6}>
              <Form.Group>
                <Form.Label>Reason</Form.Label>
                <textarea className="form-control" id="exampleFormControlTextarea5" rows={4}></textarea>
              </Form.Group>
            </Col>
            <Form.Group className="mb-3">
              <Form.Check
                label="Halfday"
              />
            </Form.Group>

            {/* Divider */}
            <hr className="hr-blurry" />

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Leave Approver</Form.Label>
                <Form.Control type="text" placeholder="Series" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Status</Form.Label>
                <Form.Select id="datalistOptions">
                  <option value="1">Open</option>
                  <option value="2">Approved</option>
                  <option value="3">Rejected</option>
                  <option value="4">Cancelled</option>
                </Form.Select>
              </Form.Group>

            </Row>
            <Row className="mb-3">
              <Col></Col>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Salary slip</Form.Label>
                <Form.Control type="text" placeholder="" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid salary slip
                </Form.Control.Feedback>
              </Form.Group>

            </Row>

            {/* Divider scdsadada*/}
            <hr className="hr-blurry" />






            <Button type="submit" className="btn-sm" variant="success">Submit form</Button>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
}

newPage.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
};

export default newPage;
