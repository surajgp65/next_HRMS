import React, { ReactElement, useState, useMemo } from "react";
import Head from "next/head";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import { useRouter } from "next/router";
import {
  Card,
  Col,
  Row,
  Button,
  Modal,
  Form,
  Container,
} from "react-bootstrap";
import TableContainer from "@common/TableContainer";

const EmployeeCheckInList = () => {
  const router = useRouter();

  // Data for the Table
  const staticData = [
    {
      id: "1234567890",
      employeeName: "Anurag",
      time: "12-10-2023 15:43",
      logType: "In",
    },
    {
      id: "1234567890",
      employeeName: "Anurag",
      time: "12-10-2023 15:43",
      logType: "In",
    },
    {
      id: "1234567890",
      employeeName: "Anurag",
      time: "12-10-2023 15:43",
      logType: "In",
    },
    {
      id: "1234567890",
      employeeName: "Anurag",
      time: "12-10-2023 15:43",
      logType: "In",
    },
    {
      id: "1234567890",
      employeeName: "Anurag",
      time: "12-10-2023 15:43",
      logType: "In",
    },
    {
      id: "1234567890",
      employeeName: "Anurag",
      time: "12-10-2023 15:43",
      logType: "In",
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
              <input
                className="form-check-input"
                type="checkbox"
                name="chk_child"
                value="option1"
              />
            </div>
          );
        },
      },
      {
        Header: "Employee Name",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.employeeName;
        },
      },
      {
        Header: "Log Type",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.logType;
        },
      },
      {
        Header: "Time",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.time;
        },
      },
      {
        Header: "ID",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.id;
        },
      },
    ],
    []
  );

  const handleAddButtonClick = () => {
    router.push(
      "/pages/attendance/employeeCheckIn/employeeCheckINForm/employeeCheckInForm"
    );
  };

  return (
    <React.Fragment>
      <Head>
        <title>Employee Check In</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Employee Check In" />
          <div className="text-end m-2">
            <Button
              type="button"
              className="btn-sm"
              onClick={handleAddButtonClick}
            >
              <i className="ri-add-line align-bottom me-1"></i>Add Employee
              Check In
            </Button>
          </div>
          {/* <Button variant="primary" onClick={() => tog_grid()}>
                        Add Branch
                    </Button> */}

          {/* ______________________Table_____________________ */}
          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Employee Check In List
                  </h5>
                </Card.Header>
                <Card.Body>
                  <TableContainer
                    columns={columns || []}
                    data={staticData || []}
                    isPagination={true}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={5}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Search Employee CheckIn..."
                  />
                  <div className="noresult" style={{ display: "none" }}>
                    <div className="text-center">
                      {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px"></lord-icon> */}
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">
                        We've searched more than 150+ API Keys We did not find
                        any API for you search.
                      </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

EmployeeCheckInList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EmployeeCheckInList;
