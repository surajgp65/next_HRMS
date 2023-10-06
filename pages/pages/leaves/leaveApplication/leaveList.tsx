import React, { ReactElement } from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { Form, Table, Col, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';



const newPage = () => {

    const router = useRouter();

    const handleAddButtonClick = () => {
        router.push('/pages/leaves/leaveApplication/leaveForm/leaveForm');
      };


    return (
        <React.Fragment>
            <Head>
                <title>newPage | Hybrix - Admin & Dashboard Template</title>
            </Head>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb breadcrumb="Pages" breadcrumbItem="Company List" />
                    <div className="text-end m-2">
                        <Button type="submit" variant="primary" onClick={handleAddButtonClick}>Add Leave Application</Button>
                    </div>

                    {/* Table */}
                    <div className="table-responsive table-card">
                        <Table className="align-middle table-nowrap m-3">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col" style={{ width: "46px" }}>
                                        <div className="form-check">
                                            <Form.Check type="checkbox" value="" id="cardtableCheck" />
                                            <Form.Label htmlFor="cardtableCheck"></Form.Label>
                                        </div>
                                    </th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Company Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Country</th>
                                    <th scope="col">Parent Company</th>
                                    {/* <th scope="col" style={{ width: "150px" }}>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="form-check">
                                            <Form.Check type="checkbox" value="" id="cardtableCheck01" />
                                            <Form.Label htmlFor="cardtableCheck01"></Form.Label>
                                        </div>
                                    </td>
                                    <td><a href="#" className="fw-medium">#VL2110</a></td>
                                    <td>William Elmore</td>
                                    <td>07 Oct, 2021</td>
                                    <td>India</td>
                                    <td></td>
                                    <td>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="form-check">
                                            <Form.Check type="checkbox" value="" id="cardtableCheck02" />
                                            <Form.Label htmlFor="cardtableCheck02"></Form.Label>
                                        </div>
                                    </td>
                                    <td><a href="#" className="fw-medium">#VL2109</a></td>
                                    <td>Georgie Winters</td>
                                    <td>07 Oct, 2021</td>
                                    <td>India</td>
                                    <td></td>
                                    <td>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="form-check">
                                            <Form.Check type="checkbox" value="" id="cardtableCheck03" />
                                            <Form.Label htmlFor="cardtableCheck03"></Form.Label>
                                        </div>
                                    </td>
                                    <td><a href="#" className="fw-medium">#VL2108</a></td>
                                    <td>Whitney Meier</td>
                                    <td>06 Oct, 2021</td>
                                    <td>India</td>
                                    <td></td>
                                    <td>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="form-check">
                                            <Form.Check type="checkbox" value="" id="cardtableCheck04" />
                                            <Form.Label htmlFor="cardtableCheck04"></Form.Label>
                                        </div>
                                    </td>
                                    <td><a href="#" className="fw-medium">#VL2107</a></td>
                                    <td>Justin Maier</td>
                                    <td>05 Oct, 2021</td>
                                    <td>India</td>
                                    <td></td>
                                    <td>
                                        
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

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