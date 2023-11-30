import React, { ReactElement, useState, useMemo, useRef, useEffect } from 'react';
import Head from 'next/head';
import { Container, Row, Col, Form, Button, Tab, Card, Nav, Dropdown } from 'react-bootstrap';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { useRouter } from 'next/router';
import Flatpickr from "react-flatpickr";
import SimpleBar from 'simplebar-react';
import TableContainer from '@common/TableContainer';








const newPage = () => {
    const router = useRouter();
    const editorRef = useRef<any>();
    const [editor, setEditor] = useState(false);
    const { CKEditor, ClassicEditor }: any = editorRef.current || {};
    const [data, setData] = useState('');
    const [activeTab, setActiveTab] = useState<any>('overview');


    // Overview Data
    const [overviewData, setOverviewData] = useState<any>({
        series: '',
        firstName: '',
        dateOfBirth: '',
        status: '',
      });

    // Handle Input change
    const handleInputChange = (event:any) => {
        const { name, value } = event.target;
        setOverviewData({ ...overviewData, [name]: value });
        console.log( event.target.value);
      };


    const handleSubmit = () => {
        // Access overviewData to save or submit the data
        console.log('Form Data:', overviewData);
        // Perform your data saving or submission logic here.
    };








    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
        };
        setEditor(true);
    }, []);

    const changeActiveTab = (eventKey:any) => {
        setActiveTab("joining");
      };


    // Change in the Option
    const handleDropDownCreateNew = (selectedValue: any) => {
        if (selectedValue === 'holiday') {
            router.push('/pages/setup/company/companyForm/newHoliday');
        } else if (selectedValue === 'user') {
            console.log(selectedValue);
        }
        else {
            console.log(selectedValue);
        }
    };


    // Education Table
    const staticData = [
        {
            id: "Salt-Tech Software Services LLP",
            country: "India",
            createDate: "2023-10-09",
            parentCompany: ""
        },
        {
            id: "Salt-Tech Software Services LLP",
            country: "India",
            createDate: "2023-10-09",
            parentCompany: ""
        },
        {
            id: "Salt-Tech Software Services LLP",
            country: "India",
            createDate: "2023-10-09",
            parentCompany: ""
        },
        {
            id: "Salt-Tech Software Services LLP",
            country: "India",
            createDate: "2023-10-09",
            parentCompany: ""
        },

        // Add more objects as needed
    ];


    const columns = useMemo(
        () => [
            {
                id: "#",
                Header: "#",
                disableFilters: true,
                filterable: false,
                accessor: (cellProps: any) => {
                    return (
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                        </div>)
                },
            },
            {
                Header: "ID",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return (cellProps.id)
                },
            },
            {
                Header: "School/University",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return cellProps.country;
                },
            },
            {
                Header: "Qualification",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return cellProps.parentCompany;
                },
            },
            {
                Header: "Level",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return cellProps.parentCompany;
                },
            },
            {
                Header: "Year of Passing",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return cellProps.parentCompany;
                },
            },
        ],
        []
      );


        // Work Experience column
        const workExpColumns = useMemo(
            () => [
                {
                    id: "#",
                    Header: "#",
                    disableFilters: true,
                    filterable: false,
                    accessor: (cellProps: any) => {
                        return (
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                            </div>)
                    },
                },
                {
                    Header: "No.",
                    disableFilters: true,
                    filterable: true,
                    accessor: (cellProps: any) => {
                        return (cellProps.id)
                    },
                },
                {
                    Header: "Company",
                    disableFilters: true,
                    filterable: true,
                    accessor: (cellProps: any) => {
                        return cellProps.country;
                    },
                },
                {
                    Header: "Designation",
                    disableFilters: true,
                    filterable: true,
                    accessor: (cellProps: any) => {
                        return cellProps.parentCompany;
                    },
                },
                {
                    Header: "Salary",
                    disableFilters: true,
                    filterable: true,
                    accessor: (cellProps: any) => {
                        return cellProps.parentCompany;
                    },
                },
                {
                    Header: "Address",
                    disableFilters: true,
                    filterable: true,
                    accessor: (cellProps: any) => {
                        return cellProps.parentCompany;
                    },
                },
            ],
            []
          );


        //   History in Company Table column
        const historyColumns = useMemo(
            () => [
                {
                    id: "#",
                    Header: "#",
                    disableFilters: true,
                    filterable: false,
                    accessor: (cellProps: any) => {
                        return (
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                            </div>)
                    },
                },
                {
                    Header: "No.",
                    disableFilters: true,
                    filterable: true,
                    accessor: (cellProps: any) => {
                        return (cellProps.id)
                    },
                },
                {
                    Header: "Branch",
                    disableFilters: true,
                    filterable: true,
                    accessor: (cellProps: any) => {
                        return cellProps.country;
                    },
                },
                {
                    Header: "Department",
                    disableFilters: true,
                    filterable: true,
                    accessor: (cellProps: any) => {
                        return cellProps.parentCompany;
                    },
                },
                {
                    Header: "Designation",
                    disableFilters: true,
                    filterable: true,
                    accessor: (cellProps: any) => {
                        return cellProps.parentCompany;
                    },
                },
                {
                    Header: "From Date",
                    disableFilters: true,
                    filterable: true,
                    accessor: (cellProps: any) => {
                        return cellProps.parentCompany;
                    },
                },
                {
                    Header: "To Date",
                    disableFilters: true,
                    filterable: true,
                    accessor: (cellProps: any) => {
                        return cellProps.parentCompany;
                    },
                },
            ],
            []
          );


    return (
        <React.Fragment>
            <Head>
                <title>Employee Form</title>
            </Head>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb breadcrumb="Pages" breadcrumbItem="New Employee" />


                    {/* Form */}

                    <Form className="row g-3">
                        <Col xxl={6}>
                            <Card>
                                <Card.Body>
                                    <Tab.Container defaultActiveKey="overview" activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>

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
                                                {/* <Button className='btn-sm' onClick={changeActiveTab}>Change Tab</Button> */}
                                                <Row className="mb-3">
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Series<span className='text-danger'>*</span></Form.Label>
                                                        <Form.Control 
                                                        type="text" 
                                                        id="validationDefault01" 
                                                        name="series" value={overviewData.series} onChange={handleInputChange}  required />
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
                                                        <Form.Control 
                                                            type="text" 
                                                            id="validationDefault01" 
                                                            required 
                                                            name="firstName"
                                                            value={overviewData.firstName} 
                                                            onChange={handleInputChange} 
                                                            />
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
                                                    <Col md={4}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Last Name</Form.Label>
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
                                                                allowInput: true
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

                                            {/* Address Tab */}

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
                                                            Please provide a valid response.
                                                        </Form.Control.Feedback>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label>Permanent Address</Form.Label>
                                                        <textarea className="form-control" id="exampleFormControlTextarea5" rows={4}></textarea>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid response.
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
                                                <div className="border-top my-3"></div>
                                                <Card.Subtitle>Emergency Contact</Card.Subtitle>
                                                <Row className='mt-3 mb-3'>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Emergency Contact Name</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Personal Email</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Relation</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                </Row>




                                            </Tab.Pane>
                                            <Tab.Pane eventKey="Attendance" id="Attendance">
                                                <Row className='mb-3'>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Attendance Device ID (Biometric/RF tag ID)</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Holiday List</Form.Label>
                                                        <Dropdown onSelect={handleDropDownCreateNew}>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="" readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item eventKey="abc">Option 1</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">Option 2</Dropdown.Item>
                                                                    <Dropdown.Divider></Dropdown.Divider>

                                                                    <Dropdown.Item eventKey="holiday"><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create new Holiday</div></Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Default Shift</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                </Row>

                                                {/* Divider */}
                                                <div className="border-top my-3"></div>
                                                <Card.Subtitle>Approvers</Card.Subtitle>

                                                <Row className='mb-3 mt-3'>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Expense Approver</Form.Label>
                                                        <Dropdown onSelect={handleDropDownCreateNew}>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="" readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item eventKey="abc">Employee 1</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">Employee 2</Dropdown.Item>
                                                                    <Dropdown.Divider></Dropdown.Divider>

                                                                    <Dropdown.Item eventKey="user"><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create a new user</div></Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Shift Request Approver</Form.Label>
                                                        <Dropdown onSelect={handleDropDownCreateNew}>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="" readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item eventKey="abc">Employee 1</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">Employee 2</Dropdown.Item>
                                                                    <Dropdown.Divider></Dropdown.Divider>

                                                                    <Dropdown.Item eventKey="user"><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create a new user</div></Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Leave Approver</Form.Label>
                                                        <Dropdown onSelect={handleDropDownCreateNew}>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select Holiday List" readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item eventKey="abc">Employee 1</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">Employee 2</Dropdown.Item>
                                                                    <Dropdown.Divider></Dropdown.Divider>

                                                                    <Dropdown.Item eventKey="user"><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create a new user</div></Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                </Row>
                                            </Tab.Pane>


                                            {/* Salary Tab */}
                                            <Tab.Pane eventKey="salary" id="salary">
                                                <Row className='mb-3'>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Cost to Company (CTC)</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Payroll Cost Center</Form.Label>
                                                        <Dropdown onSelect={handleDropDownCreateNew}>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="" readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item eventKey="abc">Option 1</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">Option 2</Dropdown.Item>
                                                                    <Dropdown.Divider></Dropdown.Divider>

                                                                    <Dropdown.Item eventKey="costCenter"><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create a new Cost Center</div></Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Salary Currency</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">PAN Number</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Payroll Cost Center</Form.Label>
                                                        <Dropdown onSelect={handleDropDownCreateNew}>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="" readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item eventKey="abc">Bank</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">Cash</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">Check</Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Provident Fund Account</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                </Row>
                                            </Tab.Pane>

                                            {/* Personal Tab */}
                                            <Tab.Pane eventKey="personal" id="personal">
                                                <Row className='mb-3'>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Marital Status</Form.Label>
                                                        <Dropdown onSelect={handleDropDownCreateNew}>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="" readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item eventKey="abc">Single</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">Married</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">Divorced</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">Widowed</Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>

                                                    <Col md={6}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Blood Group</Form.Label>
                                                        <Dropdown onSelect={handleDropDownCreateNew}>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="" readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item eventKey="abc">A+</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">A-</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">B+</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">B-</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">AB+</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">AB-</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">O+</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">O-</Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        <Form.Label>Family Background</Form.Label>
                                                        <Form.Control as="textarea" rows={3} required />
                                                        <Form.Label>Here you can maintain family details like name and occupation of parent, spouse and children</Form.Label>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid response.
                                                        </Form.Control.Feedback>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label>Health Details</Form.Label>
                                                        <Form.Control as="textarea" rows={3} required />
                                                        <Form.Label>Here you can maintain height, weight, allergies, medical concerns etc</Form.Label>
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid response.
                                                        </Form.Control.Feedback>
                                                    </Col>
                                                </Row>

                                                {/* Divider */}

                                                <div className="border-top my-3"></div>
                                                <Card.Subtitle>Health Insurance</Card.Subtitle>

                                                <Row className='mb-3 mt-3'>
                                                <Col md={6}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Health Insurance Provider</Form.Label>
                                                        <Dropdown onSelect={handleDropDownCreateNew}>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="" readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item eventKey="abc">Option 1</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">Option 2</Dropdown.Item>
                                                                    <Dropdown.Divider></Dropdown.Divider>

                                                                    <Dropdown.Item eventKey="healthInsurance"><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create a new Employee Health Insurance</div></Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>
                                                </Row>

                                                 {/* Divider */}

                                                 <div className="border-top my-3"></div>
                                                <Card.Subtitle>Passport Details</Card.Subtitle>

                                                <Row className='mb-3 mt-3'>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Passport Number</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Date of Issue</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                </Row>
                                                <Row className='mb-3 mt-3'>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Valid Upto</Form.Label>
                                                        <Flatpickr
                                                            className="form-control"
                                                            options={{
                                                                dateFormat: "d-m-Y",

                                                            }}
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Place of Issue</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />
                                                    </Col>
                                                </Row>
                                            </Tab.Pane>

                                            <Tab.Pane eventKey="profile" id="profile">
                                                <Row>
                                                    <Col lg={12}>
                                                        <Card>
                                                            
                                                            <Card.Body>
                                                                <p className="text-muted">Bio / Cover Letter</p>
                                                                {editor ? <CKEditor
                                                                    editor={ClassicEditor}
                                                                    data={data}
                                                                    onReady={(editor: any) => {
                                                                        // You can store the "editor" and use when it is needed.
                                                                    }}
                                                                    onChange={(event: any, editor: any) => {
                                                                        const data = editor.getData();
                                                                        setData(data);
                                                                    }}
                                                                /> : <p>ckeditor5</p>}

                                                            </Card.Body>
                                                        </Card>
                                                    </Col>

                                                    {/* Education Table */}
                                                    <Col lg={12}>
                                                        <Card id="apiKeyList">
                                                            <Card.Header className="d-flex align-items-center">
                                                                <h5 className="card-title flex-grow-1 mb-0">Education Qualification</h5>
                                                                <div className="d-flex gap-1 flex-wrap">
                                                                    <Button variant='soft-danger' id="remove-actions"><i className="ri-delete-bin-2-line"></i></Button>
                                                                    <Button type="button" className="btn-sm"><i className="ri-add-line align-bottom me-1"></i>Add Row</Button>
                                                                </div>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <TableContainer
                                                                    columns={(columns || [])}
                                                                    data={(staticData || [])}
                                                                    isPagination={true}
                                                                    // isGlobalFilter={true}
                                                                    iscustomPageSize={false}
                                                                    isBordered={false}
                                                                    customPageSize={5}
                                                                    className="custom-header-css table align-middle table-nowrap"
                                                                    tableClassName="table-centered align-middle table-nowrap mb-0"
                                                                    theadClassName="text-muted table-light"
                                                                    SearchPlaceholder='Search Company...'

                                                                />
                                                                <div className="noresult" style={{ display: "none" }}>
                                                                    <div className="text-center">
                                                                        {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px"></lord-icon> */}
                                                                        <h5 className="mt-2">Sorry! No Result Found</h5>
                                                                        <p className="text-muted mb-0">We've searched more than 150+ API Keys We did not find any API for you search.</p>
                                                                    </div>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>


                                                {/* Experience table */}
                                                    <Col lg={12}>
                                                        <Card id="apiKeyList">
                                                            <Card.Header className="d-flex align-items-center">
                                                                <h5 className="card-title flex-grow-1 mb-0">Previous Work Experience</h5>
                                                                <div className="d-flex gap-1 flex-wrap">
                                                                    <Button variant='soft-danger' id="remove-actions"><i className="ri-delete-bin-2-line"></i></Button>
                                                                    <Button type="button" className="btn-sm"><i className="ri-add-line align-bottom me-1"></i>Add Row</Button>
                                                                </div>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <TableContainer
                                                                    columns={(workExpColumns || [])}
                                                                    data={(staticData || [])}
                                                                    isPagination={true}
                                                                    // isGlobalFilter={true}
                                                                    iscustomPageSize={false}
                                                                    isBordered={false}
                                                                    customPageSize={5}
                                                                    className="custom-header-css table align-middle table-nowrap"
                                                                    tableClassName="table-centered align-middle table-nowrap mb-0"
                                                                    theadClassName="text-muted table-light"
                                                                    SearchPlaceholder='Search Company...'

                                                                />
                                                                <div className="noresult" style={{ display: "none" }}>
                                                                    <div className="text-center">
                                                                        {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px"></lord-icon> */}
                                                                        <h5 className="mt-2">Sorry! No Result Found</h5>
                                                                        <p className="text-muted mb-0">We've searched more than 150+ API Keys We did not find any API for you search.</p>
                                                                    </div>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>

                                                    {/* History Table */}
                                                    <Col lg={12}>
                                                        <Card id="apiKeyList">
                                                            <Card.Header className="d-flex align-items-center">
                                                                <h5 className="card-title flex-grow-1 mb-0">History In Company </h5>
                                                                <div className="d-flex gap-1 flex-wrap">
                                                                    <Button variant='soft-danger' id="remove-actions"><i className="ri-delete-bin-2-line"></i></Button>
                                                                    <Button type="button" className="btn-sm"><i className="ri-add-line align-bottom me-1"></i>Add Row</Button>
                                                                </div>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <TableContainer
                                                                    columns={(historyColumns || [])}
                                                                    data={(staticData || [])}
                                                                    isPagination={true}
                                                                    // isGlobalFilter={true}
                                                                    iscustomPageSize={false}
                                                                    isBordered={false}
                                                                    customPageSize={5}
                                                                    className="custom-header-css table align-middle table-nowrap"
                                                                    tableClassName="table-centered align-middle table-nowrap mb-0"
                                                                    theadClassName="text-muted table-light"
                                                                    SearchPlaceholder='Search Company...'

                                                                />
                                                                <div className="noresult" style={{ display: "none" }}>
                                                                    <div className="text-center">
                                                                        {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px"></lord-icon> */}
                                                                        <h5 className="mt-2">Sorry! No Result Found</h5>
                                                                        <p className="text-muted mb-0">We've searched more than 150+ API Keys We did not find any API for you search.</p>
                                                                    </div>
                                                                </div>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>

                                                </Row>



                                            </Tab.Pane>

                                            <Tab.Pane eventKey="exit" id="exit">
                                                <Row className='mb-3 mt-3'>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Resignation Letter Date</Form.Label>
                                                        <Flatpickr
                                                            className="form-control"
                                                            options={{
                                                                dateFormat: "d-m-Y",

                                                            }}
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Exit Interview Held On</Form.Label>
                                                        <Flatpickr
                                                            className="form-control"
                                                            options={{
                                                                dateFormat: "d-m-Y",

                                                            }}
                                                        />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="isGroup" className="form-label">Leave Encashed?</Form.Label>
                                                        <Dropdown onSelect={handleDropDownCreateNew}>
                                                            <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="" readOnly>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                                                <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                                                    <Dropdown.Item eventKey="abc">Yes</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="option2">No</Dropdown.Item>
                                                                </SimpleBar>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </Col>

                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">Relieving Date</Form.Label>
                                                        <Flatpickr
                                                            className="form-control"
                                                            options={{
                                                                dateFormat: "d-m-Y",

                                                            }}
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label htmlFor="validationDefault01" className="form-label">New Workplace</Form.Label>
                                                        <Form.Control type="text" id="validationDefault01" required />

                                                    </Col>
                                                </Row>

                                                {/* Divider */}

                                                <div className="border-top my-3"></div>
                                                <Card.Subtitle>Feedback</Card.Subtitle>

                                                <Row>
                                                <Col md={6}>
                                                        <Form.Label>Reason for Leaving</Form.Label>
                                                        <Form.Control as="textarea" rows={3} required />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid response.
                                                        </Form.Control.Feedback>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label>Feedback</Form.Label>
                                                        <Form.Control as="textarea" rows={3} required />
                                                        <Form.Control.Feedback type="invalid">
                                                            Please provide a valid response.
                                                        </Form.Control.Feedback>
                                                    </Col>
                                                </Row>
                                            </Tab.Pane>

                                        </Tab.Content>
                                    </Tab.Container>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col className="col-12">
                            <Button onClick={handleSubmit} variant='primary' className='btn-sm' type="submit">Submit form</Button>
                        </Col>
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
