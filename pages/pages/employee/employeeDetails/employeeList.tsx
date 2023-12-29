import React, { ReactElement, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import { Card, Col, Button, Row, Container } from "react-bootstrap";
import TableContainer from "@common/TableContainer";

import { useRouter } from "next/router";
import axiosInstance from "lib/api";

const EmployeeList = () => {
  const router = useRouter();
  const [employeeList, setEmployeeList] = useState<any[]>([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const handleAddButtonClick = () => {
    router.push("/pages/employee/employeeDetails/employeeForm/employeeForm");
  };

  // Table Headers and populating cells

  const columns = useMemo(
    () => [
      {
        id: "#",
        Header: "",
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
        Header: "Full Name",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.employeeName;
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

  const getEmployees = async () => {
    try {
      await axiosInstance
        .get("/employee/employeedetails/list_of_employees")
        .then((res: any) => {
          if (res.status === 200) {
            setEmployeeList(res.data.data);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head>
        <title>Employee List</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Employee" />
          <div className="text-end m-2">
            <Button
              type="button"
              className="btn-sm"
              onClick={handleAddButtonClick}
            >
              <i className="ri-add-line align-bottom me-1"></i>Add New Employee
            </Button>
          </div>

          {/* ______________________Table_____________________ */}
          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">Employee List</h5>
                </Card.Header>
                <Card.Body>
                  <TableContainer
                    columns={columns || []}
                    data={employeeList || []}
                    isPagination={true}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={5}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Search Employee..."
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

EmployeeList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EmployeeList;
