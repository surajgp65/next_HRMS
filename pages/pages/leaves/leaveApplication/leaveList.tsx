import React, { ReactElement, useState, useMemo } from "react";
import Head from "next/head";
import { Container } from "react-bootstrap";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import TableContainer from "@common/TableContainer";

const LeaveList = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState("Hr");

  const handleAddButtonClick = () => {
    if (userRole === "Hr") {
      router.push("/pages/leaves/leaveApplication/leaveForm/leaveForm");
    } else if (userRole === "Employee") {
      router.push("/pages/leaves/leaveApplication/leaveForm/employeeLeaveForm");
    } else {
      // Handle other roles or unauthorized users as needed
      // You can redirect them to a different page or show an error message
    }
  };

  // Data for the Table
  const staticData = [
    {
      id: 1,
      employeeName: "Anaab Raut",
      status: "Approved",
      fromDate: "12-10-2023",
    },
    {
      id: 2,
      employeeName: "Anurag Shetty",
      status: "Rejected",
      fromDate: "12-10-2023",
    },
    {
      id: 1,
      employeeName: "Anaab Raut",
      status: "Approved",
      fromDate: "12-10-2023",
    },
    {
      id: 2,
      employeeName: "Anurag Shetty",
      status: "Rejected",
      fromDate: "12-10-2023",
    },
    {
      id: 1,
      employeeName: "Anaab Raut",
      status: "Approved",
      fromDate: "12-10-2023",
    },
    {
      id: 2,
      employeeName: "Anurag Shetty",
      status: "Rejected",
      fromDate: "12-10-2023",
    },
    {
      id: 1,
      employeeName: "Anaab Raut",
      status: "Approved",
      fromDate: "12-10-2023",
    },
    {
      id: 2,
      employeeName: "Anurag Shetty",
      status: "Rejected",
      fromDate: "12-10-2023",
    },

    // Add more objects as needed
  ];

  // Table Headers and populating cells

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
      {
        Header: "From Date",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.fromDate;
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Head>
        <title>Leave List</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Leave List" />
          <div className="text-end m-2">
            <Button
              type="submit"
              variant="primary"
              className="btn-sm"
              onClick={handleAddButtonClick}
            >
              Add Leave Application
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
                    SearchPlaceholder="Search Employee or Leave..."
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

LeaveList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default LeaveList;
