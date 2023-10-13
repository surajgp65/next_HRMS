import React, { ReactElement, useMemo } from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { Card, Col, Row, Button  } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import TableContainer from '@common/TableContainer';





const newPage = () => {

    const router = useRouter();

    const handleAddButtonClick = () => {
        router.push('/pages/setup/department/departmentForm/departmentForm');
    };


    // Data for the Table 
    const staticData = [
        {
            id: 1,
            status: "Enable",
            dapartment: "Research"
        },
        {
            id: 2,
            status: "Disable",
            dapartment: "Research"
        },
        {
            id: 3,
            status: "Enable",
            dapartment: "Research"
        },
        {
            id: 4,
            status: "Disable",
            dapartment: "Research"
        },
        {
            id: 6,
            status: "Enable",
            dapartment: "Research"
        },
        {
            id: 7,
            status: "Enable",
            dapartment: "Research"
        },
        {
            id: 8,
            status: "Disable",
            dapartment: "Research"
        },

        // Add more objects as needed
    ];

    // Table Headers and populating
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
                Header: "Status",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return cellProps.status;
                },
            },
            {
                Header: "Department",
                disableFilters: true,
                filterable: true,
                accessor: (cellProps: any) => {
                    return cellProps.dapartment;
                },
            },
            
        ],
        []
      );


    return (
        <React.Fragment>
            <Head>
                <title>Department List</title>
            </Head>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb breadcrumb="Pages" breadcrumbItem="Department List" />
                    <div className="text-end m-2">
                        <Button type="submit" className='btn-sm' variant="primary" onClick={handleAddButtonClick}>
                            <div className='d-flex justify-content-center align-items-center'>
                                <i className="ri-add-line align-bottom me-1"></i>Add new Department
                            </div>
                        </Button>
                    </div>

                    {/* ______________________Table_____________________ */}
                    <Row>
                            <Col lg={12}>
                                <Card id="apiKeyList">
                                    <Card.Header className="d-flex align-items-center">
                                        <h5 className="card-title flex-grow-1 mb-0">Company List</h5>
                                        
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
                                            SearchPlaceholder='Search Department...'
                                            
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