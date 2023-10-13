import React, { ReactElement, useState, useMemo } from 'react';
import Head from 'next/head';
import { Container, Row, Col, Form, Button, InputGroup, Dropdown } from 'react-bootstrap';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { useRouter } from 'next/router';
import Select from 'react-select';
import SimpleBar from 'simplebar-react';






const newPage = () => {
    const router = useRouter();



    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option 2', label: 'Option 2' },
        { value: 'CreateNewCostCenter', label: 'Create a new Cost Center' }
      ]

      const options2 = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option 2', label: 'Option 2' },
        { value: 'CreateNewCostCenter', label: 'Create a new Cost Center' }
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
    const handleCreateNewPayrollClick = () => {
        router.push("/pages/setup/department/departmentForm/payrollForm");
};
    const handleCreateNewBlockListClick = () => {
        router.push("/pages/setup/company/companyForm/newHoliday");
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
                            <Dropdown>
                                    <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select Payroll" readOnly >
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                        <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                            <Dropdown.Item>Option 1</Dropdown.Item>
                                            <Dropdown.Item>Option 2</Dropdown.Item>
                                            <Dropdown.Divider></Dropdown.Divider>
                                            
                                            <Dropdown.Item onClick={handleCreateNewPayrollClick}><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create New Payroll</div></Dropdown.Item>
                                        </SimpleBar>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            
                            <Col md={6}>
                            <Form.Label htmlFor="isGroup" className="form-label">Leave Block List</Form.Label>
                            <Dropdown>
                                    <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select Leave Block List" readOnly >
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                        <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                            <Dropdown.Item>Option 1</Dropdown.Item>
                                            <Dropdown.Item>Option 2</Dropdown.Item>
                                            <Dropdown.Divider></Dropdown.Divider>
                                            
                                            <Dropdown.Item onClick={handleCreateNewBlockListClick}><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create a new Leave Block List</div></Dropdown.Item>
                                        </SimpleBar>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            
                        </Row>


                        {/* Divider scdsadada*/}
                        <hr className="hr-blurry" />






                        <Button className='btn-sm' type="submit">Submit form</Button>
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
