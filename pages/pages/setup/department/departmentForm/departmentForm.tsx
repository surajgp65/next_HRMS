import React, { ReactElement, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import { useRouter } from "next/router";
import Select from "react-select";
import SimpleBar from "simplebar-react";
import axiosInstance from "lib/api";
import { AnyListenerPredicate } from "@reduxjs/toolkit";
import { ToastSuccess } from "@common/toast";

const initialState = {
  hrms_company_id: "" ?? null,
  department: "" ?? null,
  parent_department: "" ?? null,
  hrms_company_cost_center_id: "" ?? null,
  hrms_company_block_leave_id: "" ?? null,
};

const DepartmentForm = () => {
  const router = useRouter();
  const [departmentData, setDepartmentData] = useState(initialState);
  const [companyDetailsList, setCompanyDetailsList] = useState([]);
  const [payRollList, setPayRollList] = useState([]);
  const [leaveBlockList, setLeaveBlockList] = useState([]);
  const [validated, setValidated] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedCompanyData, setSelectedCompanyData] = useState<any>({});
  const [selectedPayRoll, setSelectedPayRoll] = useState<any>({});
  const [selectedLeaveBlock, setSelectedLeaveBlock] = useState<any>({});

  useEffect(() => {
    getCompanyDetails();
  }, []);

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    const bodyData = departmentData;

    console.log(bodyData);
    try {
      await axiosInstance
        .post("/setup/department/add_department", bodyData)
        .then((res: any) => {
          if (res.status === 200) {
            router.push("/pages/setup/department/departmentList");
            ToastSuccess(res.data.message);
          }
        })
        .catch((error) => {});
    } catch (error) {}

    setValidated(true);
  };

  // Change in the Option
  const handleCreateNewPayrollClick = () => {
    router.push("/pages/setup/department/departmentForm/payrollForm");
  };
  const handleCreateNewBlockListClick = () => {
    router.push("/pages/setup/department/departmentForm/leaveBlockForm");
  };
  const handleCreateNewCompany = () => {
    router.push("/pages/setup/company/companyForm/companyForm");
  };

  const handelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: any = event.target;

    setDepartmentData((data) => ({ ...data, [name]: value }));
  };

  const selectedPayRollDropDown = (value_name: any, value: any) => {
    let name = value_name;
    setSelectedPayRoll(value);
    setDepartmentData((data) => ({
      ...data,
      [name]: value.hrms_company_cost_center_id,
    }));
  };
  const selectedLeaveBlockDropDown = (value_name: any, value: any) => {
    let name = value_name;
    setSelectedLeaveBlock(value);
    setDepartmentData((data) => ({
      ...data,
      [name]: value.hrms_company_block_leave_id,
    }));
  };

  const selectCompanyData = (name: any, value: any) => {
    console.log(value);
    setSelectedCompanyData(value);
    setDepartmentData((data) => ({ ...data, [name]: value.hrms_company_id }));
    getPayRollList(value.hrms_company_id);
    getLeaveBlock(value.hrms_company_id);
  };

  const getCompanyDetails = async () => {
    try {
      await axiosInstance
        .get("setup/company/list_of_companies")
        .then((response: any) => {
          if (response.status == 200) {
            setCompanyDetailsList(response?.data?.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
  };

  const getPayRollList = async (id: any) => {
    try {
      await axiosInstance
        .get("setup/department/list_payroll_cost_center/" + id)
        .then((res: any) => {
          if (res.status === 200) setPayRollList(res.data.data);
        })
        .catch((error: any) => {});
    } catch (error) {}
  };

  const getLeaveBlock = async (id: any) => {
    try {
      await axiosInstance
        .get("/setup/department/list_of_block_leave/" + id)
        .then((res: any) => {
          if (res.status === 200) setLeaveBlockList(res.data.data);
        })
        .catch((error) => {});
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head>
        <title>Department Form</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="New Department" />

          {/* Form */}

          <Form
            noValidate
            validated={validated}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="validationCustom03">
                  <Form.Label>
                    Department <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    onChange={handelInputChange}
                    placeholder=""
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid value.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Company
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder="Select Company"
                    value={selectedCompanyData?.company_name}
                    name="hrms_company_id"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {(companyDetailsList || []).map((x: any, index: any) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
                            selectCompanyData("hrms_company_id", x);
                          }}
                          name={"hrms_company_id" + index}
                        >
                          {x.company_name}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Divider></Dropdown.Divider>

                      <Dropdown.Item onClick={handleCreateNewCompany}>
                        <div className="d-flex justify-content-center align-items-center text-primary">
                          <span
                            className="bx bx-plus-medical"
                            style={{ padding: 3 }}
                          ></span>
                          Create New Company
                        </div>
                      </Dropdown.Item>
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Parent Department</Form.Label>
                <Form.Control
                  type="text"
                  name="parent_department"
                  onChange={handelInputChange}
                  placeholder=""
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
              </Form.Group>

              {/* <Col md={4}>
                <div className="mb-3">
                  <InputGroup>
                    <Form.Check
                      type="checkbox"
                      className="col-xs-2"
                      id="isGroup"
                    />
                    <span style={{ height: "5px", width: "5px" }}></span>
                    <Form.Label htmlFor="isGroup" className="form-label">
                      Is Group
                    </Form.Label>
                  </InputGroup>
                </div>
                <div className="mb-3">
                  <InputGroup>
                    <Form.Check
                      type="checkbox"
                      className="col-xs-2"
                      id="isGroup"
                    />
                    <span style={{ height: "5px", width: "5px" }}></span>
                    <Form.Label htmlFor="isGroup" className="form-label">
                      Disable
                    </Form.Label>
                  </InputGroup>
                </div>
              </Col> */}
            </Row>

            {/* Divider */}
            <hr className="hr-blurry" />

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Payroll Cost Center
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder="Select Payroll"
                    name="hrms_company_cost_center_id"
                    value={selectedPayRoll.cost_center_name}
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {payRollList.length > 0 ? (
                        payRollList.map((x: any, index: any) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => {
                              selectedPayRollDropDown(
                                "hrms_company_cost_center_id",
                                x
                              );
                            }}
                          >
                            {x.cost_center_name}
                          </Dropdown.Item>
                        ))
                      ) : (
                        <Dropdown.Item disabled>Select company</Dropdown.Item>
                      )}

                      <Dropdown.Divider></Dropdown.Divider>

                      <Dropdown.Item onClick={handleCreateNewPayrollClick}>
                        <div className="d-flex justify-content-center align-items-center text-primary">
                          <span
                            className="bx bx-plus-medical"
                            style={{ padding: 3 }}
                          ></span>
                          Create New Payroll
                        </div>
                      </Dropdown.Item>
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Leave Block List
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder="Select Leave Block List"
                    name="hrms_company_block_leave_id"
                    value={selectedLeaveBlock.leave_block_list_name}
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {leaveBlockList.length > 0 ? (
                        (leaveBlockList || []).map((x: any, index: any) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => {
                              selectedLeaveBlockDropDown(
                                "hrms_company_block_leave_id",
                                x
                              );
                            }}
                          >
                            {x.leave_block_list_name}
                          </Dropdown.Item>
                        ))
                      ) : (
                        <Dropdown.Item disabled>Select company</Dropdown.Item>
                      )}
                      <Dropdown.Divider></Dropdown.Divider>

                      <Dropdown.Item onClick={handleCreateNewBlockListClick}>
                        <div className="d-flex justify-content-center align-items-center text-primary">
                          <span
                            className="bx bx-plus-medical"
                            style={{ padding: 3 }}
                          ></span>
                          Create a new Leave Block List
                        </div>
                      </Dropdown.Item>
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>

            {/* Divider scdsadada*/}
            <hr className="hr-blurry" />

            <Button className="btn-sm" type="submit">
              Save
            </Button>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

DepartmentForm.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default DepartmentForm;
