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

const AttendanceReqList = () => {
  const router = useRouter();

  // Data for the Table
  const staticData = [
    {
      id: "1234567890",
      employee: "HR-EMP-00002",
      employeeName: "Anurag",
      status: "Draft",
    },
    {
      id: 1,
      employee: "HR-EMP-00002",
      employeeName: "Anurag",
      status: "Submitted",
      attendanceDate: "13-10-2023",
    },
    {
      id: 1,
      employee: "HR-EMP-00002",
      employeeName: "Anurag",
      status: "Draft",
    },
    {
      id: 1,
      employeeName: "Anurag",
      employee: "HR-EMP-00002",
      status: "Submitted",
    },
    {
      id: 1,
      employee: "HR-EMP-00002",
      employeeName: "Anurag",
      status: "Submitted",
    },
    {
      id: 1,
      employee: "HR-EMP-00002",
      employeeName: "Anurag",
      status: "Draft",
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
        Header: "ID",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.id;
        },
      },
      {
        Header: "Employee",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.employee;
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
        Header: "Status",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.status;
        },
      },
    ],
    []
  );

  const handleAddButtonClick = () => {
    router.push(
      "/pages/attendance/attendanceRequest/attendanceRequestForm/attendanceRequestForm"
    );
  };

  return (
    <React.Fragment>
      <Head>
        <title>Attendance Request List</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Attendance Request" />
          <div className="text-end m-2">
            <Button
              type="button"
              className="btn-sm"
              onClick={handleAddButtonClick}
            >
              <i className="ri-add-line align-bottom me-1"></i>Add Attendance
              Request
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
                    Attendance Request List
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
                    SearchPlaceholder="Search Attendance Req..."
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

AttendanceReqList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AttendanceReqList;
