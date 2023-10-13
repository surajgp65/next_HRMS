import React, { ReactElement, useState } from 'react';
import Head from 'next/head';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { Button, Card, Col, Container, Form, Row, Dropdown } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { useRouter } from 'next/router';
import Flatpickr from "react-flatpickr";





const newPage = () => {

    const router = useRouter();


    // State for form vaidation
    const [validated, setValidated] = useState<boolean>(false);


    // Submit Handler
    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

        // Handle navigating to new 
        const handleCreateNewEmployeeClick = () => {
            router.push("/pages/setup/company/companyForm/newHoliday");
    };



    return (
        <React.Fragment>
            <Head>
                <title>Compensatory Leave</title>
            </Head>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb breadcrumb="Pages" breadcrumbItem="" />

                    <Row>
                        
                            <Card>
                                <Card.Header>
                                    <h4 className="card-title mb-0">New Compensatory Leave Request</h4>
                                </Card.Header>

                                <Card.Body>

                                <Form>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Label>Employee</Form.Label>
                                            <Dropdown aria-required>
                                                <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="" >
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                        <Dropdown.Item>Option 1</Dropdown.Item>
                                                        <Dropdown.Item>Option 2</Dropdown.Item>
                                                        <Dropdown.Divider></Dropdown.Divider>

                                                        <Dropdown.Item onClick={handleCreateNewEmployeeClick}><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create new Employee</div></Dropdown.Item>
                                                    </SimpleBar>
                                                </Dropdown.Menu>
                                            </Dropdown>                                        
                                            </Col>
                                        
                                            <Form.Group as={Col} md="6" controlId="validationCustom02">
                                                <Form.Label>Last name</Form.Label>
                                                <Dropdown>
                                                    <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="" >
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                        <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                            <Dropdown.Item>Option 1</Dropdown.Item>
                                                            <Dropdown.Item>Employee</Dropdown.Item>
                                                            <Dropdown.Divider></Dropdown.Divider>

                                                            <Dropdown.Item onClick={handleCreateNewEmployeeClick}><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create new Leave Type</div></Dropdown.Item>
                                                        </SimpleBar>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                    </Row>
                                    <br />
                                    <Card.Subtitle>Worked On Holiday</Card.Subtitle>
                                    <br />

                                    <Row>
                                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                <Form.Label>Work From Date</Form.Label>
                                                <Flatpickr
                                                    className="form-control"
                                                    options={{
                                                        dateFormat: "d-m-Y"
                                                    }}
                                                    
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid Date.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                <Form.Label>Work End Date</Form.Label>
                                                <Flatpickr
                                                    className="form-control"
                                                    options={{
                                                        dateFormat: "d-m-Y"
                                                    }}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid Date.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                                <Form.Label>Reason</Form.Label>
                                                <textarea className="form-control" id="exampleFormControlTextarea5" rows={4}></textarea>
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide a valid Reason.
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Check
                                                    
                                                    label="Half Day"
                                                    feedback="You must agree before submitting."
                                                    feedbackType="invalid"
                                                />
                                            </Form.Group>
                                        </Row>
                                        <Button variant='success' className='btn-sm' type="submit">Submit form</Button>


                                </Form>
                                </Card.Body>
                                
                            </Card>
                        
                    </Row>

                   
                </Container>
            </div>
        </React.Fragment >
    );
}

newPage.getLayout = (page: ReactElement) => {
    return (
      <Layout>
        {page}
      </Layout>
    )
};

export default newPage;;