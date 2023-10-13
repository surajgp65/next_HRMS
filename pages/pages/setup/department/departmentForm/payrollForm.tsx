import React, { ReactElement, useState, useMemo } from 'react';
import Head from 'next/head';
import { Container, Row, Col, Form, Button, InputGroup, Dropdown } from 'react-bootstrap';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { useRouter } from 'next/router';
import SimpleBar from 'simplebar-react';






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

    


    // Change in the Option


    return (
        <React.Fragment>
            <Head>
                <title>New Cost Center</title>
            </Head>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb breadcrumb="Pages" breadcrumbItem="New Cost Center" />


                    {/* Form */}

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Cost Center Name</Form.Label>
                                <Form.Control type="text" placeholder="" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid value.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Parent Cost Center</Form.Label>
                                <Form.Control type="text" placeholder="" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid leave type
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Parent Department</Form.Label>
                                <Form.Control type="text" placeholder="" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid field.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Col md={4}>
                                <div className="mb-3">
                                    <InputGroup>
                                        <Form.Check type="checkbox" className='col-xs-2' id="isGroup" />
                                        <span style={{ height: "5px", width: "5px" }}></span>
                                        <Form.Label htmlFor="isGroup" className="form-label">Is Group</Form.Label>
                                    </InputGroup>
                                </div>
                                <div className="mb-3">
                                    <InputGroup>
                                        <Form.Check type="checkbox" className='col-xs-2' id="isGroup" />
                                        <span style={{ height: "5px", width: "5px" }}></span>
                                        <Form.Label htmlFor="isGroup" className="form-label">Disable</Form.Label>
                                    </InputGroup>
                                </div>
                            </Col>
                            

                        </Row>

                        <Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Company</Form.Label>
                                <Form.Control type="text" placeholder="" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid field.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        






                        <Button className='btn-sm mt-2' type="submit">Submit form</Button>
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
