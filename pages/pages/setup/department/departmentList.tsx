import React, { ReactElement } from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { Card, Col, Dropdown, Button, Modal, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';




const newPage = () => {

    const router = useRouter();

    const handleAddButtonClick = () => {
        router.push('/pages/setup/department/departmentForm/departmentForm');
    };


    return (
        <React.Fragment>
            <Head>
                <title>Department List</title>
            </Head>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb breadcrumb="Pages" breadcrumbItem="Department List" />
                    <div className="text-end m-2">
                        <Button type="submit" variant="primary" onClick={handleAddButtonClick}>Add Department</Button>
                    </div>

                    {/* Table */}
                    <Col xxl={4}>
                        <Card className="card-height-100">
                            <Card.Header className="d-flex">
                                <h5 className="card-title flex-grow-1 mb-0">List</h5>
                                <div className="flex-shrink-0">
                                    <Dropdown drop="start">
                                        <Dropdown.Toggle as="a" className="arrow-none">
                                            <i className="ri-more-2-fill fs-14"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu as="ul" className="dropdown-menu-end">
                                            <li> <Dropdown.Item href="#">View</Dropdown.Item> </li>
                                            <li> <Dropdown.Item href="#">Edit</Dropdown.Item> </li>
                                            <li> <Dropdown.Item href="#">Delete</Dropdown.Item> </li>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <div className="table-responsive table-card">
                                    <table className="table table-borderless align-middle mb-0">
                                        <thead className="table-active">
                                            <tr>
                                                <th scope="col">ID<i className="ri-arrow-up-down-line align-middle ms-2"></i></th>
                                                <th scope="col">Status<i className="ri-arrow-up-down-line align-middle ms-2"></i></th>
                                                <th scope="col">Department<i className="ri-arrow-up-down-line align-middle ms-2"></i></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>jordan.martino@hybrix.com</td>
                                                <td><Link href="#" scroll={false} className="badge text-success bg-success-subtle">Enable</Link></td>
                                                <td>Legal</td>
                                            </tr>
                                            <tr>
                                                <td>jordan.martino@hybrix.com</td>
                                                <td><Link href="#" scroll={false} className="badge text-success bg-success-subtle">Enable</Link></td>
                                                <td>Research</td>
                                            </tr>
                                            <tr>
                                                <td>jordan.martino@hybrix.com</td>
                                                <td><Link href="#" scroll={false} className="badge text-success bg-success-subtle">Enable</Link></td>
                                                <td>Management</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <ul className="pagination pagination-separated mb-0 mt-4 pt-1 justify-content-end">
                                    <li className="page-item disabled">
                                        <Link href="#" scroll={false} className="page-link">Previous</Link>
                                    </li>
                                    <li className="page-item active">
                                        <Link href="#" scroll={false} className="page-link">1</Link>
                                    </li>
                                    <li className="page-item ">
                                        <Link href="#" scroll={false} className="page-link">2</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link href="#" scroll={false} className="page-link">3</Link>
                                    </li>
                                    <li className="page-item">
                                        <Link href="#" scroll={false} className="page-link">Next</Link>
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>

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