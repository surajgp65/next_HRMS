import React, { ReactElement, useState, useMemo, useCallback } from 'react';
import TableContainer from '@common/TableContainer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { Row, Col, Form, Button, Card, Dropdown, Modal, Container } from 'react-bootstrap';
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from 'moment';
import styles from './newHoliday.module.css'
import SimpleBar from 'simplebar-react';
import Flatpickr from "react-flatpickr";

const newPage = () => {

    const router = useRouter();
    const [validated, setValidated] = useState(false);


    // API data
    const staticData = [
        {
            id: 1,
            name: "1",
            createdBy: "John Doe",
            apiKey: "abc123",
            status: "Active",
            createDate: "12-10-2023",
            description: "Monday"
        },
        {
            id: 2,
            name: "2",
            createdBy: "John Doe2",
            apiKey: "abc12",
            status: "Active",
            createDate: "2023-10-09",
            description: "Tuesday"
        },
        {
            id: 3,
            name: "3",
            createdBy: "John Doe2",
            apiKey: "abc12",
            status: "Active",
            createDate: "2023-10-09",
            description: "Wednesday"
        },
        {
            id: 4,
            name: "4",
            createdBy: "John Doe2",
            apiKey: "abc12",
            status: "Active",
            createDate: "2023-10-09",
            description: "Thursday"
        },
        {
            id: 5,
            name: "5",
            createdBy: "John Doe2",
            apiKey: "abc12",
            status: "Active",
            createDate: "2023-10-09",
            description: "Thursday"
        },
        {
            id: 6,
            name: "6",
            createdBy: "John Doe2",
            apiKey: "abc12",
            status: "Active",
            createDate: "2023-10-09",
            description: "Thursday"
        },

        // Add more objects as needed
    ];



    // Table constants
    const [apikey, setApiKey] = useState<any>();
    const [apiKeyList, setApiKeyList] = useState<any[]>(staticData); // Use staticData here
    // const [apiKeyList, setApiKeyList] = useState<any>("");
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [issubmitBtn, setsubmitBtn] = useState<boolean>(false)
    const [isRegenerateAPI, setIsRegenerateAPI] = useState<boolean>(false)
    const [isGenerateAPIKey, setIisGenerateAPIKey] = useState<any>()

    const [apiKeyName, setApiKeyName] = useState<any>();
    const [deleteModal, setDeleteModal] = useState<boolean>(false);


    // Date
    const date: any = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const todaysDate = date.getDate();
    const currentDate = todaysDate + "-" + month + "-" + year;




    const toggle = useCallback(() => {
        if (modalShow) {
            setModalShow(false)
            setIsEdit(false);
            setsubmitBtn(false)
            setIsRegenerateAPI(false)
            setApiKey(null)
            setIisGenerateAPIKey(null)
            setApiKeyName(null)
        } else {
            setModalShow(true)
            // setApiKey(null)
        }
    }, [modalShow]);

    const toggleDelete = () => {
        setDeleteModal(false);
        setApiKey(null)
    }

    const handleDeleteAPIKey = () => {
        if (apikey) {
            // dispatch(onDeleteAPIKey(apikey.id));
            setDeleteModal(false);
            setApiKey(null)
        }
    };


    // 
    const generateApiID = () => {
        var d = new Date().getTime();

        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now();
        }

        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
        });

        return uuid;
    }



    // Validation Form
    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: (apikey && apikey.name) || apiKeyName || '',
            apiKey: isGenerateAPIKey || (apikey && apikey.apiKey),
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please enter a name.")
        }),
        onSubmit: (values) => {
            if (isEdit) {
                const updateAPIKey = {
                    id: apikey ? apikey.id : 0,
                    name: values.name,
                    apiKey: isGenerateAPIKey || values.apiKey,
                };
                // update API Key
                // dispatch(onUpdateAPIKey(updateAPIKey));
                validation.resetForm();
            } else {
                const newAPIKey = {
                    id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
                    name: values.name,
                    apiKey: isGenerateAPIKey,
                    createdBy: "Edward Diana",
                    status: "Active",
                    createDate: moment(new Date()).format("D MMM YYYY"),
                    expirydate: moment(new Date(new Date().setMonth(new Date().getMonth() + 6))).format("D MMM YYYY")
                };
                // save new API Key
                // dispatch(onAddNewAPIKey(newAPIKey));
                validation.resetForm();
            }
            toggle();
        },
    });





    // Functions
    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };




    const createApibutton = (e: any) => {
        e.preventDefault();
        let inputValue = (document.getElementById("api-key-name") as HTMLInputElement).value
        setApiKeyName(inputValue)
        if (inputValue) {
            setsubmitBtn(true)
            setIisGenerateAPIKey(generateApiID())
        } else {
            document.getElementById("api-key-error-msg")?.classList.remove("d-none")
            document.getElementById("api-key-error-msg")?.classList.add("d-block")
            setTimeout(() => {
                document.getElementById("api-key-error-msg")?.classList.remove("d-block")
                document.getElementById("api-key-error-msg")?.classList.add("d-none")
            }, 1000);
        }
    }


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
                Header: "No.",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return (cellProps.name)
                },
            },
            {
                Header: "Date",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return cellProps.createDate;
                },
            },
            {
                Header: "Description",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return cellProps.description;
                },
            },
            // {
            //     Header: "API Key",
            //     disableFilters: true,
            //     filterable: true,
            //     accessor: (cellProps: any) => {
            //         return (
            //             <input type="text" className="form-control apikey-value user-select-all" readOnly value={cellProps.apiKey} />
            //         );
            //     },
            // },
            // {
            //     Header: "Status",
            //     disableFilters: true,
            //     filterable: true,
            //     accessor: (cellProps: any) => {
            //         switch (cellProps.status) {
            //             case "Active":
            //                 return (<span className="badge text-success bg-success-subtle"> {cellProps.status}</span>)
            //             case "Disable":
            //                 return (<span className="badge badge-soft-danger"> {cellProps.status}</span>)
            //             default:
            //                 return (<span className="badge text-success bg-success-subtle"> {cellProps.status}</span>)
            //         }
            //     },
            // },
            {
                Header: "Action",
                disableFilters: true,
                accessor: (cellProps: any) => {
                    return (
                        <Dropdown>
                            <Dropdown.Toggle as="a" className="btn btn-soft-secondary btn-sm arrow-none">
                                <i className="ri-more-fill align-middle"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu as="ul" className="dropdown-menu-end" style={{ position: "absolute", inset: "0px 0px auto auto", margin: "0px", transform: "translate(-73px, 33px)" }}>
                                <li><Dropdown.Item className="edit-item-btn" href="#" >Edit</Dropdown.Item></li>
                                {/* <li><Dropdown.Item className="regenerate-api-btn" href="#" >Regenerate Key</Dropdown.Item></li> */}
                                <li><Dropdown.Item className="remove-item-btn" href="#">Delete</Dropdown.Item></li>
                                <li><Dropdown.Item className="disable-btn" href="#">{cellProps.status === "Active" ? "Disable" : "Enable"}</Dropdown.Item></li>
                            </Dropdown.Menu>
                        </Dropdown>
                    )
                },
            },
        ],
        []
    );





    return (
        <React.Fragment>
            <Head>
                <title>Add New Holiday</title>
            </Head>
            <div className="page-content">
                <Container h-100 fluid={true}>
                    <Breadcrumb breadcrumb="Pages" breadcrumbItem="New Holiday List" />



                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Holiday List Name</Form.Label>
                                <Form.Control type="text" placeholder="" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid value.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Total Holidays</Form.Label>
                                <Form.Control type="text" placeholder="0" disabled />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid leave type
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Row>
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





                        {/* conditional */}
                        <h5 style={{ paddingTop: "1rem" }}>Add Weekly Holidays</h5>
                        <Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label htmlFor="isGroup" className="form-label">Weekly Holidays</Form.Label>
                                <Dropdown>
                                    <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select Day" >
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                        <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                            <Dropdown.Item>Monday</Dropdown.Item>
                                            <Dropdown.Item>Tuesday</Dropdown.Item>
                                            <Dropdown.Item>Wednesday</Dropdown.Item>
                                            <Dropdown.Item>Thursday</Dropdown.Item>
                                            <Dropdown.Item>Friday</Dropdown.Item>
                                            <Dropdown.Item>Saturday</Dropdown.Item>
                                        </SimpleBar>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Form.Control.Feedback type="invalid">
                                    Please choose an option.
                                </Form.Control.Feedback>
                            </Form.Group>



                        </Row>
                        <br />
                        <Button className='btn-sm'>Add to holidays</Button>


                        <br />
                        <br />

                        {/* ______________________Table_____________________ */}
                        <Row>
                            <Col lg={12}>
                                <Card id="apiKeyList">
                                    <Card.Header className="d-flex align-items-center">
                                        <h5 className="card-title flex-grow-1 mb-0">Holiday List</h5>
                                        <div className="d-flex gap-1 flex-wrap">
                                            <Button type="button" className="btn-sm" onClick={toggle}><i className="ri-add-line align-bottom me-1"></i>Add New Row</Button>
                                        </div>
                                    </Card.Header>
                                    <Card.Body>
                                        <TableContainer
                                            columns={(columns || [])}
                                            data={(apiKeyList || [])}
                                            isPagination={true}
                                            isGlobalFilter={true}
                                            iscustomPageSize={false}
                                            isBordered={false}
                                            customPageSize={5}
                                            className="custom-header-css table align-middle table-nowrap"
                                            tableClassName="table-centered align-middle table-nowrap mb-0"
                                            theadClassName="text-muted table-light"
                                            SearchPlaceholder='Search Dates...'
                                            
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


                    </Form>
                    <footer className={styles.footer}>
                        <div className={styles.footerContent}>
                            {/* Your other footer content */}
                            <Button variant="success" className="btn-sm mx-4">Submit</Button>
                            <button type="button" className="btn btn-sm btn-light">Reset</button>
                        </div>
                    </footer>

                </Container>
            </div>

            {/*__________________ The POP UP Modal Code __________________ */}

            <Modal id="api-key-modal" className="fade" show={modalShow} onHide={toggle} contentClassName="border-0" centered>
                <Modal.Header className="p-4 pb-0" closeButton>
                    <Modal.Title id="exampleModalLabel" className="fs-5 fw-bold">
                        {!!isEdit ? isRegenerateAPI ? "Regenerate API" : "Rename API name" : "Add New Holiday"}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }}>
                    <Modal.Body>
                        <div id="api-key-error-msg" className="alert alert-danger py-2 d-none">Please enter all fields</div>
                        <input type="hidden" id="apikeyId" />
                        <div className="mb-3">
                            <Form.Label htmlFor="api-key-name" className="form-label">Description<span className="text-danger">*</span></Form.Label>
                            <Form.Control name="name" type="text" className="form-control" id="api-key-name" placeholder="Enter Description" onChange={validation.handleChange}
                                onBlur={validation.handleBlur} value={validation.values.name || ""}
                                isInvalid={validation.touched.name && validation.errors.name ? true : false} />
                            {validation.touched.name && validation.errors.name ? (<Form.Control.Feedback type="invalid">{validation.errors.name}</Form.Control.Feedback>) : null}

                            <Form.Label htmlFor="api-key-name" className="form-label">Date<span className="text-danger">*</span></Form.Label>
                            <Form.Control name="name" type="date" className="form-control" id="api-key-name" placeholder="Enter Date" onChange={validation.handleChange}
                                onBlur={validation.handleBlur} value={validation.values.name || ""}
                                isInvalid={validation.touched.name && validation.errors.name ? true : false} />
                            {validation.touched.name && validation.errors.name ? (<Form.Control.Feedback type="invalid">{validation.errors.name}</Form.Control.Feedback>) : null}
                        </div>
                        {/* {issubmitBtn && <div className="mb-3" id="apikey-element">
                            <Form.Label htmlFor="api-key" className="form-label">API Key</Form.Label>
                            <Form.Control name="apikey" type="text" className="form-control" id="api-key" defaultValue={validation.values.apiKey} disabled />
                        </div>} */}

                    </Modal.Body>
                    <Modal.Footer>
                        <div className="hstack gap-2 justify-content-end">
                            <Button variant='secondary' type="button" onClick={toggle}>Close</Button>
                            {/* {issubmitBtn ?
                                <Button variant='primary' type="submit" id="add-btn">{!!isEdit ? "Save Changes" : "Add"}</Button> :
                                <Button variant='primary' type="button" onClick={(e) => createApibutton(e)}>Add row</Button>
                            } */}
                            <Button variant='primary' type="button" onClick={(e) => createApibutton(e)}>Add row</Button>

                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal id="deleteApiKeyModal" className="fade zoomIn" show={deleteModal} onHide={toggleDelete} centered>
                <Modal.Header className="p-4 pb-0 m-2" closeButton />
                <Modal.Body>
                    <div className="mt-2 text-center">
                        {/* <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> */}
                        <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                            <h4>Are you sure ?</h4>
                            <p className="text-muted mx-4 mb-0">Are you sure you want to remove this API Key ?</p>
                        </div>
                    </div>
                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                        <Button variant='danger' type="button" className="btn w-sm" id="delete-record" onClick={handleDeleteAPIKey}>Yes, Delete It!</Button>
                        <Button variant='light' type="button" className="btn w-sm" onClick={toggleDelete}>Close</Button>
                    </div>
                </Modal.Body>
            </Modal>



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

export default newPage;