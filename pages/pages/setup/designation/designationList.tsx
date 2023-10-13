import React, { ReactElement, useState, useMemo } from 'react';
import Head from 'next/head';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Card, Col, Row, Button, Modal, Form, Container } from 'react-bootstrap';
import TableContainer from '@common/TableContainer';



const newPage = () => {

    const router = useRouter();
    const [modal_grid, setmodal_grid] = useState(false);

    function tog_grid() {
        setmodal_grid(!modal_grid);
    }


    // Data for the Table 
    const staticData = [
        {
            id: 1,
            designation: "Sales Manager"
        },
        {
            id: 2,
            designation: "Senior Business Development"
        },
        {
            id: 3,
            designation: "Head Vertical"
        },
        {
            id: 4,
            designation: "Telesales Executive"
        },
        {
            id: 5,
            designation: "Telesales Executive"
        },
        {
            id: 6,
            designation: "Tele Marketing"
        },
        {
            id: 7,
            designation: "Vice President"
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
                Header: "Designation",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return cellProps.designation;
                },
            },
            
        ],
        []
      );






    return (
        <React.Fragment>
            <Head>
                <title>Designation List</title>
            </Head>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb breadcrumb="Pages" breadcrumbItem="" />
                    <div className="text-end m-2">
                        <Button className='btn-sm' variant="primary" onClick={() => tog_grid()}>
                        <div className='d-flex justify-content-center align-items-center'>
                                <i className="ri-add-line align-bottom me-1"></i>Add new Designation
                            </div>
                        </Button>
                    </div>
                    {/* <Button variant="primary" onClick={() => tog_grid()}>
                        Add Branch
                    </Button> */}
                    <Modal
                        show={modal_grid}
                        onHide={() => {
                            tog_grid();
                        }}
                    >
                        <Modal.Header className="modal-title fw-bold">
                            New Designation
                        </Modal.Header>
                        <Modal.Body>
                            <form action="#">
                                <div className="row g-3">
                                    <Col xxl={6}>
                                        <div>
                                            <Form.Label htmlFor="lastName" className="form-label">Designation </Form.Label>
                                            <Form.Control type="text" className="form-control" id="branchInput" placeholder="Enter Designation" />
                                        </div>
                                    </Col>
                                    <Col lg={12}>
                                        <div className="hstack gap-2 justify-content-end">
                                            <Button variant="light" onClick={() => setmodal_grid(false)}>Close</Button>
                                            <Button variant="primary" >Add</Button>
                                        </div>
                                    </Col>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>


                    {/* ______________________Table_____________________ */}
                    <Row>
                            <Col lg={10}>
                                <Card id="apiKeyList">
                                    <Card.Header className="d-flex align-items-center">
                                        <h5 className="card-title flex-grow-1 mb-0">Designation List</h5>
                                        
                                    </Card.Header>
                                    <Card.Body>
                                        <TableContainer
                                            columns={(columns || [])}
                                            data={(staticData || [])}
                                            isPagination={true}
                                            isGlobalFilter={true}
                                            iscustomPageSize={false}
                                            isBordered={false}
                                            customPageSize={5}
                                            className="custom-header-css table align-middle table-nowrap"
                                            tableClassName="table-centered align-middle table-nowrap mb-0"
                                            theadClassName="text-muted table-light"
                                            SearchPlaceholder='Search Designation...'
                                            
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