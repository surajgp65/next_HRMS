import React, { ReactElement } from 'react';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import dynamic from 'next/dynamic';

const newPage = () => {
    const Select = dynamic(() => import('react-select'), { ssr: false });
    return (
        <React.Fragment>
            <Head>
                <title>Attendance List | Hybrix - Admin & Dashboard Template</title>
            </Head>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumb breadcrumb="Pages" breadcrumbItem="newPage" />
                    // write Typescript Code Here.

                    <Select></Select>
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