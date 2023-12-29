import React, { ReactElement } from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";

const employeeLeaveForm = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Employee Leave Form</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Employee Leave Form" />
          Employee Leave form
        </Container>
      </div>
    </React.Fragment>
  );
};

employeeLeaveForm.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default employeeLeaveForm;
