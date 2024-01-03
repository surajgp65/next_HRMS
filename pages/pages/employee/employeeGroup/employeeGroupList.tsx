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
  Dropdown,
} from "react-bootstrap";
import TableContainer from "@common/TableContainer";

import { useRouter } from "next/router";
import axiosInstance from "lib/api";
import SimpleBar from "simplebar-react";
import { ToastSuccess } from "@common/toast";

const initialState = {
  hrms_company_id: "",
  hrms_company_employee_id: "",
  name: "",
};

const EmployeeGroupList = () => {
  const router = useRouter();
  const [modal_grid, setmodal_grid] = useState(false);
  const [groupList, setGroupList] = useState<any[]>([]);
  const [companyList, setCompanyList] = useState<any[]>([]);
  const [employeeList, setEmployeeList] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>({});
  const [selectedEmployee, setSelectedEmployee] = useState<any>({});
  const [groupData, setGroupData] = useState<any>(initialState);

  useEffect(() => {
    getCompanyDetails();
    getEmployees();
    getGroupList();
  }, []);

  function tog_grid() {
    setmodal_grid(!modal_grid);
  }

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
          return cellProps.name;
        },
      },
      {
        Header: "Group Name",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.name;
        },
      },
    ],
    []
  );

  const getGroupList = async () => {
    try {
      await axiosInstance
        .get("/employee/employeegroup/list_of_employee_group")
        .then((res: any) => {
          if (res.status === 200) {
            setGroupList(res.data.data);
          }
        });
    } catch (error) {}
  };

  const getCompanyDetails = async () => {
    try {
      await axiosInstance
        .get("setup/company/list_of_companies")
        .then((response: any) => {
          if (response.status == 200) {
            setCompanyList(response?.data?.data);
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

  const addGroup = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      let bodyData = groupData;

      console.log("Group data", bodyData);
      // return;
      await axiosInstance
        .post("/employee/employeegroup/add_employee_group", bodyData)
        .then((res: any) => {
          if (res.status === 200) {
            let data = res.data.data;
            setGroupList((prev: any) => [...prev, data]);
            ToastSuccess(res.data.message);
            setmodal_grid(!modal_grid);
            setGroupData(initialState);
            setSelectedEmployee({});
            setSelectedCompany({});
          }
        });
    } catch (error) {}
  };

  const selectedSecondNameData = (name: any, value: any, data: any) => {
    setGroupData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <React.Fragment>
      <Head>
        <title>Employee Group List</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Employee Group" />
          <div className="text-end m-2">
            <Button type="button" className="btn-sm" onClick={() => tog_grid()}>
              <i className="ri-add-line align-bottom me-1"></i>Add Employee
              Group
            </Button>
          </div>

          {/* ______________________Table_____________________ */}
          <Row>
            <Col md={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Employee Group List
                  </h5>
                </Card.Header>
                <Card.Body>
                  <TableContainer
                    columns={columns || []}
                    data={groupList || []}
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

      {/* Modal Pop up */}
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
          <form action="#" autoComplete="off" onSubmit={addGroup}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Company
                  {/* <span className="text-danger">*</span> */}
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder="Select Company"
                    value={selectedCompany?.company_name}
                    defaultValue={selectedCompany?.company_name}
                    name="hrms_company_id"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {(companyList || []).map((x: any, index: any) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
                            setSelectedCompany(x);
                            selectedSecondNameData(
                              "hrms_company_id",
                              x.hrms_company_id,
                              null
                            );
                          }}
                          name={"hrms_company_id" + index}
                        >
                          {x.company_name}
                        </Dropdown.Item>
                      ))}
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={6}>
                <Form.Label
                  htmlFor="hrms_company_employee_id"
                  className="form-label"
                >
                  Employee
                  {/* <span className="text-danger">*</span> */}
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder="Select Employee"
                    value={selectedEmployee?.first_name}
                    defaultValue={selectedEmployee?.first_name}
                    name="hrms_company_employee_id"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {(employeeList || []).map((x: any, index: any) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
                            console.log(x);
                            setSelectedEmployee(x);
                            selectedSecondNameData(
                              "hrms_company_employee_id",
                              x.hrms_company_employee_id,
                              null
                            );
                          }}
                          name={"hrms_company_employee_id" + index}
                        >
                          {x.first_name + " " + x.last_name}
                        </Dropdown.Item>
                      ))}
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className="g-3 mt-2">
              <Col md={12}>
                <div>
                  <Form.Label htmlFor="lastName" className="form-label">
                    Group Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="branchInput"
                    placeholder="Group Name"
                    name="name"
                    onChange={(e) => {
                      selectedSecondNameData("name", e.target.value, null);
                    }}
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
            </Row>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

EmployeeGroupList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EmployeeGroupList;
