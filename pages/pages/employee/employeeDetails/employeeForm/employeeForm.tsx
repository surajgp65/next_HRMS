import React, { ReactElement, useState, useMemo } from 'react';
import Head from 'next/head';
import { Container, Row, Col, Form, Button, Tab, Card, Nav, Dropdown } from 'react-bootstrap';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { useRouter } from 'next/router';
import Flatpickr from "react-flatpickr";
import SimpleBar from 'simplebar-react';







const newPage = () => {
    const router = useRouter();





    // Change in the Option
    const handleCreateNewPayrollClick = () => {
        router.push("/pages/setup/department/departmentForm/payrollForm");
    };
    const handleCreateNewBlockListClick = () => {
        router.push("/pages/setup/company/companyForm/newHoliday");
    };
    const handleDropDownCreateNew = () => {
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

                    <form className="row g-3">
                        <Col xxl={6}>
                            <Card>
                                <Card.Body>
                                    <Tab.Container defaultActiveKey="overview">

                                        <Nav as="ul" variant='tabs' className="mb-3">
                                            <Nav.Item as="li"> <Nav.Link eventKey="overview"> Overview </Nav.Link> </Nav.Item>
                                            <Nav.Item as="li"> <Nav.Link eventKey="joining"> Joining </Nav.Link> </Nav.Item>
                                            <Nav.Item as="li"> <Nav.Link eventKey="Address"> Address & Contacts </Nav.Link> </Nav.Item>
                                            <Nav.Item as="li"> <Nav.Link eventKey="Attendance"> Attendance & Leaves </Nav.Link> </Nav.Item>
                                            <Nav.Item as="li"> <Nav.Link eventKey="salary"> Salary </Nav.Link> </Nav.Item>
                                            <Nav.Item as="li"> <Nav.Link eventKey="personal"> Personal </Nav.Link> </Nav.Item>
                                            <Nav.Item as="li"> <Nav.Link eventKey="profile"> Profile </Nav.Link> </Nav.Item>
                                            <Nav.Item as="li"> <Nav.Link eventKey="exit"> Exit </Nav.Link> </Nav.Item>
                                        </Nav>

                                        <Tab.Content className="text-muted">
                                            <Tab.Pane eventKey="overview" id="overview">
                                                <Row className="mb-3">
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Series</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Status</Form.Label>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select " readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item active>Male</Dropdown.Item>
                                                                    <Dropdown.Item>Female</Dropdown.Item>
                                                                    <Dropdown.Item>Other</Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Date of joining</Form.Label>
                                                        <Flatpickr
                                                            className="form-control"
                                                            options={{
                                                                dateFormat: "d-m-Y",

                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">First Name</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Date of Birth</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Status</Form.Label>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select " readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item active>Active</Dropdown.Item>
                                                                    <Dropdown.Item>Inactive</Dropdown.Item>
                                                                    <Dropdown.Item>Suspended</Dropdown.Item>
                                                                    <Dropdown.Item>Left</Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-5">
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Middle Name</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Salution</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                </Row>

                                                {/* Divider */}

                                                <div className="border-top my-3"></div>

                                                <Row className='mb-3'>
                                                    <Card.Subtitle>User Details</Card.Subtitle>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label m-1">User Id</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                        <Form.Label htmlFor="validationDefault01" className="form-label m-1">System User (login) ID. If set, it will become default for all HR forms.</Form.Label>
                                                        <Button className='btn-sm'>Create user</Button>
                                                    </Col>
                                                </Row>

                                                {/* Divider */}

                                                <div className="border-top my-3"></div>

                                                <Row className='mb-3'>
                                                    <Card.Subtitle>Company Details</Card.Subtitle>
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Company</Form.Label>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select " readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item>Option 1</Dropdown.Item>
                                                                    <Dropdown.Item>Option 2</Dropdown.Item>
                                                                    <Dropdown.Divider></Dropdown.Divider>

                                                                    <Dropdown.Item onClick={handleDropDownCreateNew}><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create new Company</div></Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>

                                                    <Col md={4}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Designation</Form.Label>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select " readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item>Option 1</Dropdown.Item>
                                                                    <Dropdown.Item>Option 2</Dropdown.Item>
                                                                    <Dropdown.Divider></Dropdown.Divider>

                                                                    <Dropdown.Item onClick={handleDropDownCreateNew}><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create new Designation</div></Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Branch</Form.Label>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select " readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item>Option 1</Dropdown.Item>
                                                                    <Dropdown.Item>Option 2</Dropdown.Item>
                                                                    <Dropdown.Divider></Dropdown.Divider>

                                                                    <Dropdown.Item onClick={handleDropDownCreateNew}><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create new Designation</div></Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-3'>
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Department</Form.Label>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select " readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item>Option 1</Dropdown.Item>
                                                                    <Dropdown.Item>Option 2</Dropdown.Item>
                                                                    <Dropdown.Divider></Dropdown.Divider>

                                                                    <Dropdown.Item onClick={handleDropDownCreateNew}><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create new Company</div></Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>

                                                    <Col md={4}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Report</Form.Label>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select " readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item>Option 1</Dropdown.Item>
                                                                    <Dropdown.Item>Option 2</Dropdown.Item>
                                                                    <Dropdown.Item>Option 2</Dropdown.Item>
                                                                    <Dropdown.Item>Option 2</Dropdown.Item>
                                                                    <Dropdown.Item>Option 2</Dropdown.Item>
                                                                    <Dropdown.Item>Option 2</Dropdown.Item>
                                                                    <Dropdown.Item>Option 2</Dropdown.Item>
                                                                    <Dropdown.Divider></Dropdown.Divider>

                                                                    <Dropdown.Item onClick={handleDropDownCreateNew}><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create a new Employee</div></Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Grade</Form.Label>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select " readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item>Option 1</Dropdown.Item>
                                                                    <Dropdown.Item>Option 2</Dropdown.Item>
                                                                    <Dropdown.Divider></Dropdown.Divider>

                                                                    <Dropdown.Item onClick={handleDropDownCreateNew}><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create new Grade</div></Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-3'>
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Employement Type</Form.Label>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select " readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item>Option 1</Dropdown.Item>
                                                                    <Dropdown.Item>Option 2</Dropdown.Item>
                                                                    <Dropdown.Divider></Dropdown.Divider>

                                                                    <Dropdown.Item onClick={handleDropDownCreateNew}><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create new Employement Type</div></Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                </Row>
                                            </Tab.Pane>




                                            <Tab.Pane eventKey="joining" id="joining">
                                                <Row className="mb-3">
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Job Applicant</Form.Label>
                                                        <Flatpickr
                                                            className="form-control"
                                                            options={{
                                                                dateFormat: "d-m-Y",

                                                            }}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Confirmation Date</Form.Label>
                                                        <Flatpickr
                                                            className="form-control"
                                                            options={{
                                                                dateFormat: "d-m-Y",

                                                            }}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Notice (days)</Form.Label>
                                                        <Flatpickr
                                                            className="form-control"
                                                            options={{
                                                                dateFormat: "d-m-Y",

                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3">
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Offer Date</Form.Label>
                                                        <Flatpickr
                                                            className="form-control"
                                                            options={{
                                                                dateFormat: "d-m-Y",

                                                            }}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Contract End Date</Form.Label>
                                                        <Flatpickr
                                                            className="form-control"
                                                            options={{
                                                                dateFormat: "d-m-Y",

                                                            }}
                                                        />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Date Of Retirement</Form.Label>
                                                        <Flatpickr
                                                            className="form-control"
                                                            options={{
                                                                dateFormat: "d-m-Y",

                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Tab.Pane>

                                            <Tab.Pane eventKey="Address" id="Address">
                                                <Row className='mb-3'>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Mobile</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Personal Email</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-3'>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Company Email</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Provide Email Address registered in company</Form.Label>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Prefered Contact Email</Form.Label>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select " readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item>Company Email</Dropdown.Item>
                                                                    <Dropdown.Item>Personal Email</Dropdown.Item>
                                                                    <Dropdown.Item>User ID</Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    <Col className="col-12">
                                                        <div className="form-check">
                                                            <Form.Check type="checkbox" value="" id="invalidCheck2" />
                                                            <Form.Label className="form-check-label" htmlFor="invalidCheck2">
                                                                Unsubscribed
                                                            </Form.Label>
                                                        </div>
                                                    </Col>

                                                </Row>
                                                {/* Divider */}

                                                <div className="border-top my-3"></div>
                                                <Card.Subtitle>Address</Card.Subtitle>
                                                <Row className='mb-3 mt-3'>
                                                    <Col md={6}>
                                                        <Form.Label>Current Address</Form.Label>
                                                        <textarea className="form-control" id="exampleFormControlTextarea5" rows={4}></textarea>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid Reason.
                                                        </Form.Control.Feedback>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label>Permanent Address</Form.Label>
                                                        <textarea className="form-control" id="exampleFormControlTextarea5" rows={4}></textarea>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid Reason.
                                                        </Form.Control.Feedback>
                                                    </Col>
                                                </Row>
                                                <Row className='mb-3'>
                                                <Col md={6}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Current Address Is</Form.Label>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select " readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item>Rented</Dropdown.Item>
                                                                    <Dropdown.Item>Owned</Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Prefered Contact Email</Form.Label>
                                                        <Dropdown>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select " readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item>Company Email</Dropdown.Item>
                                                                    <Dropdown.Item>Personal Email</Dropdown.Item>
                                                                    <Dropdown.Item>User ID</Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                </Row>



                                                
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="Attendance" id="Attendance">
                                                <h6>Settings</h6>
                                                <p className="mb-0">
                                                    Trust fund seitan letterpress, keytar raw denim keffiyeh etsy
                                                    art party before they sold out master cleanse gluten-free squid
                                                    scenester freegan cosby sweater. Fanny pack portland seitan DIY,
                                                    art party locavore wolf cliche high life echo park Austin. Cred
                                                    vinyl keffiyeh DIY salvia PBR, banh mi before they sold out
                                                    farm-to-table VHS.
                                                </p>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </Card.Body>
                            </Card>
                        </Col>




                        <Col className="col-12">
                            <div className="form-check">
                                <Form.Check type="checkbox" value="" id="invalidCheck2" required />
                                <Form.Label className="form-check-label" htmlFor="invalidCheck2">
                                    Agree to terms and conditions
                                </Form.Label>
                            </div>
                        </Col>
                        <Col className="col-12">
                            <Button variant='primary' className='btn-sm' type="submit">Submit form</Button>
                        </Col>
                    </form>
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
