import React, { ReactElement, useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Row, Col, Form, Button, InputGroup, Dropdown } from 'react-bootstrap';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { useRouter } from 'next/router';
import Select from 'react-select';




const newPage = () => {
    const router = useRouter();

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]

    const [validated, setValidated] = useState(false);

    const [selectedOption, setSelectedOption] = useState(null);

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };


    // Change in the Option
    const handleSelectChange = (selectedOption: any) => {
        // Log the clicked option's value
        console.log('Clicked option:', selectedOption?.value);
        setSelectedOption(selectedOption);
    };

    return (
        <React.Fragment>
            <Head>
                <title>Department Form</title>
            </Head>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb breadcrumb="Pages" breadcrumbItem="New Department" />


                    {/* Form */}

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Department</Form.Label>
                                <Form.Control type="text" placeholder="" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid value.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Company</Form.Label>
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



                        {/* Divider */}
                        <hr className="hr-blurry" />

                        <Row className="mb-3">    

                            <Col md={6}>
                            <Form.Label htmlFor="isGroup" className="form-label">Payroll Cost Center</Form.Label>
                                <Select 
                                    options={options} 
                                    onChange={handleSelectChange}
                                />
                            </Col>
                            
                            <Col md={6}>
                            <Form.Label htmlFor="isGroup" className="form-label">Payroll Cost Center</Form.Label>
                                <Select options={options} />
                            </Col>
                            
                        </Row>


                        {/* Divider scdsadada*/}
                        <hr className="hr-blurry" />






                        <Button type="submit">Submit form</Button>
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
