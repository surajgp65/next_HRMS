import React, { ReactElement } from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { Card, Col, Form, Button, Dropdown } from 'react-bootstrap';

const newPage = () => {
    return (
        <React.Fragment>
            <Head>
                <title>newPage | Hybrix - Admin & Dashboard Template</title>
            </Head>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb breadcrumb="Pages" breadcrumbItem="New Holiday List" />
                    {/* <Card className='p-3 grid'> */}
                        <Col md={6}>
                            <div className="mb-3">
                                <Form.Label htmlFor="holidayListInput" className="form-label">Holiday List Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter your firstname" id="holidayListInput" />
                            </div>
                        </Col>


                        <Col xxl={3} md={6}>
                            <Form.Group>
                                <Form.Label>From Date</Form.Label>
                                <Form.Control type="date" id="exampleInputdate" />
                            </Form.Group>
                        </Col>

                        <Col xxl={3} md={6}>
                            <Form.Group>
                                <Form.Label>To Date</Form.Label>
                                <Form.Control type="date" id="exampleInputdate" />
                            </Form.Group>
                        </Col>

                        

                        
                    {/* </Card> */}


                    {/* conditional */}
                    <h5 style={{paddingTop: "1rem"}}>Add Weekly Holidays</h5>

                    <div className="mb-3">
                        <Form.Label htmlFor="ForminputState" className="form-label">Default Holiday List</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle variant="light">
                                Holiday
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#" active>True</Dropdown.Item>
                                <Dropdown.Item href="#">False</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Button variant="outline-primary">Add to Holidays</Button>

                    <Col lg={6}>
                            <div className="text-end m-2">
                                <Button type="submit" variant="primary">Submit</Button>
                            </div>
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

export default newPage;