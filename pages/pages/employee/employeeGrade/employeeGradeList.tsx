import React, { ReactElement, useState, useMemo, useEffect } from "react";
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
import axiosInstance from "lib/api";
import { ToastSuccess } from "@common/toast";
import { keyNullManipulation } from "@common/commonFunction";

const initialState = {
  hrms_company_employee_id: "",
  name: "",
  default_salary_structure: "",
};

const EmployeeGradeList = () => {
  const router = useRouter();
  const [modal_grid, setmodal_grid] = useState(false);
  function tog_grid() {
    setmodal_grid(!modal_grid);
  }

  const [employeeListGrade, setEmployeeListGrade] = useState<any[]>([]);
  const [employeeGrade, setEmployeeGrade] = useState<any>(initialState);
  const [employeeList, setEmployeeList] = useState<any[]>([]);

  useEffect(() => {
    getGradeList();
    getEmployees();
  }, []);

  const handleAddButtonClick = () => {
    router.push(
      "/pages/leaves/compensatoryLeaveApp/compensatoryForm/compensatoryForm"
    );
  };

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
          return cellProps.name;
        },
      },
      {
        Header: "Grade",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.name;
        },
      },
    ],
    []
  );

  const getGradeList = async () => {
    try {
      await axiosInstance
        .get("/employee/employeedetails/list_of_employee_grade")
        .then((res: any) => {
          if (res.status === 200) {
            setEmployeeListGrade(res.data.data);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const handelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEmployeeGrade((data: any) => ({ ...data, [name]: value }));
  };

  const submitGrade = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      let bodyData = keyNullManipulation(employeeGrade);
      await axiosInstance
        .post("/employee/employeedetails/add_employee_grade", bodyData)
        .then((res: any) => {
          if (res.status === 200) {
            let data = res.data.data;
            setEmployeeListGrade((prev) => [...prev, data]);
            ToastSuccess(res.data.message);
            setEmployeeGrade(initialState);
            setmodal_grid(!modal_grid);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

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

          {/* ______________________Table_____________________ */}

          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Employee Grade List
                  </h5>
                </Card.Header>
                <Card.Body>
                  <TableContainer
                    columns={columns || []}
                    data={employeeListGrade || []}
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
          <form action="#" onSubmit={submitGrade} autoComplete="off">
            <div className="row g-3">
              <Col xxl={6}>
                <div>
                  <Form.Label htmlFor="name" className="form-label">
                    Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="branchInput"
                    name="name"
                    onChange={handelInputChange}
                    value={employeeGrade.name}
                    placeholder=""
                  />
                </div>
              </Col>
              <Col xxl={6}>
                <div>
                  <Form.Label
                    htmlFor="default_salary_structure"
                    className="form-label"
                  >
                    Default Salary Structure
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="default_salary_structure"
                    name="default_salary_structure"
                    onChange={handelInputChange}
                    value={employeeGrade.default_salary_structure}
                    placeholder=""
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button variant="light" onClick={() => setmodal_grid(false)}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </div>
              </Col>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

EmployeeGradeList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EmployeeGradeList;
