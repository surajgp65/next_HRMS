import React, { ReactElement, useState, useMemo } from "react";
import Head from "next/head";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import {
  Card,
  Col,
  Button,
  Row,
  Container,
  Modal,
  Form,
} from "react-bootstrap";
import TableContainer from "@common/TableContainer";

import { useRouter } from "next/router";

const EmployeeGradeList = () => {
  const router = useRouter();
  const [modal_grid, setmodal_grid] = useState(false);
  function tog_grid() {
    setmodal_grid(!modal_grid);
  }

  const handleAddButtonClick = () => {
    router.push(
      "/pages/leaves/compensatoryLeaveApp/compensatoryForm/compensatoryForm"
    );
  };

  // Data for the Table
  const staticData = [
    {
      id: 1,
      gradeName: "Front-end",
    },
    {
      id: 2,
      gradeName: "Back-end",
    },
    {
      id: 3,
      gradeName: "Front-end",
    },
    {
      id: 4,
      gradeName: "Back-end",
    },

    // Add more objects as needed
  ];

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
        Header: "Group Name",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.gradeName;
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Head>
        <title>Employee Grade List</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Employee Grade" />
          <div className="text-end m-2">
            <Button type="button" className="btn-sm" onClick={() => tog_grid()}>
              <i className="ri-add-line align-bottom me-1"></i>Add Employee
              Grade
            </Button>
          </div>

          {/* Modal pop up */}
          <Modal
            show={modal_grid}
            onHide={() => {
              tog_grid();
            }}
          >
            <Modal.Header className="modal-title fw-bold">
              New Employee Group
            </Modal.Header>
            <Modal.Body>
              <form action="#">
                <div className="row g-3">
                  <Col xxl={6}>
                    <div>
                      <Form.Label htmlFor="lastName" className="form-label">
                        Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="branchInput"
                        placeholder="Name"
                      />
                    </div>
                  </Col>
                  <Col xxl={6}>
                    <div>
                      <Form.Label htmlFor="lastName" className="form-label">
                        Default Salary Structure
                      </Form.Label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        id="branchInput"
                        placeholder=""
                      />
                    </div>
                  </Col>
                  <Col lg={12}>
                    <div className="hstack gap-2 justify-content-end">
                      <Button
                        variant="light"
                        onClick={() => setmodal_grid(false)}
                      >
                        Close
                      </Button>
                      <Button variant="primary">Add</Button>
                    </div>
                  </Col>
                </div>
              </form>
            </Modal.Body>
          </Modal>

          {/* ______________________Table_____________________ */}

          <Row>
            <Col lg={8}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Employee Grade List
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

EmployeeGradeList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EmployeeGradeList;
