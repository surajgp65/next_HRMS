import React, { ReactElement, useState, useEffect } from "react";
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
import Flatpickr from "react-flatpickr";
import { changeDateFormat, keyNullManipulation } from "@common/commonFunction";
import axiosInstance from "lib/api";
import SimpleBar from "simplebar-react";
import { ToastSuccess } from "@common/toast";
import { useSelector } from "react-redux";

const today = changeDateFormat(Date.now());

const initialState = {
  hrms_company_leave_type_id: "",
  hrms_company_employee_id: "",
  hrms_company_letter_head_id: "",
  hrms_company_id: "",
  leave_approver_id: "",
  series: "",
  from_date: today,
  to_date: today,
  reason: "",
  status: "",
  approved_on: "",
};

const leaveStatus = ["open", "approved", "rejected", "cancelled"];

const initialSelected = {
  hrms_company_employee_id: {},
  hrms_company_leave_type_id: {},
  hrms_company_id: {},
};

const LeaveForm = () => {
  const router = useRouter();

  const [validated, setValidated] = useState(false);
  const [leaveApplicationData, setLeaveApplicationData] =
    useState(initialState);
  const [leaveTypeList, setLeaveTypeList] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>({});
  const [companyList, setCompanyList] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any>(initialSelected);
  const [employeeList, setEmployeeList] = useState<any[]>([]);

  const { leave } = useSelector((state: any) => ({
    leave: state?.Leave?.leave,
  }));

  useEffect(() => {
    getCompanyDetails();
    getEmployees();
    getReducerData();
  }, []);

  const getReducerData = () => {
    let leaveData: any = {};
    leaveData = leave;

    for (const key in leaveData) {
      if (typeof leaveData[key] === "object" && leaveData[key] !== null) {
        setSelectedData((prev: any) => ({ ...prev, [key]: leaveData[key] }));
        setLeaveApplicationData((prev: any) => ({
          ...prev,
          [key]: leaveData[key][key],
        }));
      } else {
        setLeaveApplicationData((prev: any) => ({
          ...prev,
          [key]: leaveData[key],
        }));
      }
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      let bodyData = keyNullManipulation(leaveApplicationData);

      if (
        !bodyData.hrms_company_id ||
        !bodyData.hrms_company_leave_type_id ||
        !bodyData.leave_approver_id ||
        !bodyData.from_date ||
        !bodyData.to_date
      ) {
        setValidated(true);
      }

      await axiosInstance
        .post("/leave/leave application/add_leave_application", bodyData)
        .then((res: any) => {
          if (res.status === 200) {
            ToastSuccess(res.data.message);
            setLeaveApplicationData(initialState);
            setSelectedData(initialSelected);
            router.push("/pages/leaves/leaveApplication/leaveList");
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const getLeaveType = async (id: any) => {
    try {
      await axiosInstance
        .get("/setup/department/list_of_leave_type/" + id)
        .then((res: any) => {
          if (res.status === 200) {
            setLeaveTypeList(res.data.data);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const getCompanyDetails = async () => {
    try {
      await axiosInstance
        .get("setup/company/list_of_companies")
        .then((response: any) => {
          if (response.status == 200) {
            let data = response.data.data;
            setCompanyList(data);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const setAllData = (name: any, value: any, data?: any, isDate?: boolean) => {
    if (data) {
      setSelectedData((prev: any) => ({ ...prev, [name]: data }));
    }
    if (isDate) {
      value = changeDateFormat(value);
    }
    setLeaveApplicationData((prev: any) => ({ ...prev, [name]: value }));
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

  const updateLeaveApplication = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      let bodyData = leaveApplicationData;

      console.log("update -->", bodyData);
      // return;
      if (
        !bodyData.hrms_company_id ||
        !bodyData.hrms_company_leave_type_id ||
        !bodyData.leave_approver_id ||
        !bodyData.from_date ||
        !bodyData.to_date
      ) {
        setValidated(true);
      }

      await axiosInstance
        .put("/leave/leave application/update_leave_application", bodyData)
        .then((res: any) => {
          if (res.status === 200) {
            ToastSuccess(res.data.message);
            setLeaveApplicationData(initialState);
            setSelectedData(initialSelected);
            router.push("/pages/leaves/leaveApplication/leaveList");
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head>
        <title>Leave Application</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Leave Application" />
          <Form
            noValidate
            validated={validated}
            autoComplete="off"
            onSubmit={leave.isEdit ? updateLeaveApplication : handleSubmit}
          >
            <Row className="mb-2">
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Company<span className="text-danger">*</span>
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder="Select Company"
                    value={selectedData?.hrms_company_id?.company_name}
                    defaultValue={selectedData?.hrms_company_id?.company_name}
                    name="hrms_company_id"
                    required
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
                            setAllData("hrms_company_id", x.hrms_company_id, x);
                            getLeaveType(x.hrms_company_id);
                          }}
                        >
                          {x.company_name}
                        </Dropdown.Item>
                      ))}
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>
                  Series<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="series"
                  onChange={(e) => {
                    setAllData("series", e.target.value);
                  }}
                  value={leaveApplicationData.series}
                  placeholder=""
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid series.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>
                  Leave Type <span className="text-danger">*</span>
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder=""
                    name="hrms_company_leave_type_id"
                    value={
                      selectedData?.hrms_company_leave_type_id?.leave_type_name
                    }
                    defaultValue={
                      selectedData?.hrms_company_leave_type_id?.leave_type_name
                    }
                    required
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {leaveTypeList.length > 0 ? (
                        leaveTypeList.map((x: any, index: any) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => {
                              setAllData("hrms_company_leave_type_id", x.id, x);
                            }}
                          >
                            {x.leave_type_name}
                          </Dropdown.Item>
                        ))
                      ) : (
                        <Dropdown.Item disabled>Select Company</Dropdown.Item>
                      )}
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Employee</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder="Select Employee"
                    value={selectedData?.hrms_company_employee_id?.first_name}
                    defaultValue={
                      selectedData?.hrms_company_employee_id?.first_name
                    }
                    name="hrms_company_employee_id"
                    required
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
                            setAllData(
                              "hrms_company_employee_id",
                              x.hrms_company_employee_id,
                              x
                            );
                          }}
                        >
                          {x.first_name + " " + x.last_name}
                        </Dropdown.Item>
                      ))}
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <hr className="hr-blurry" />
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>From Date</Form.Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: "d-m-Y",
                    defaultDate: "today",
                    minDate: "today",
                  }}
                  name="from_date"
                  value={leaveApplicationData.from_date}
                  onChange={(e: any) => {
                    setAllData("from_date", e[0], null, true);
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Date.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>To Date</Form.Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: "d-m-Y",
                    minDate: "today",
                  }}
                  name="to_date"
                  value={leaveApplicationData.to_date}
                  onChange={(e: any) => {
                    setAllData("to_date", e[0], null, true);
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Date.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Reason</Form.Label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea5"
                  rows={4}
                  name="reason"
                  value={leaveApplicationData.reason}
                  onChange={(e) => {
                    setAllData("reason", e.target.value);
                  }}
                ></textarea>
              </Form.Group>
            </Col>
            <Form.Group className="mt-3">
              <Form.Check label="Halfday" />
            </Form.Group>

            {/* Divider */}
            <hr className="hr-blurry" />

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Leave Approver</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder="Select Employee"
                    value={selectedData?.leave_approver_id?.first_name}
                    defaultValue={selectedData?.leave_approver_id?.first_name}
                    name="hrms_company_employee_id"
                    required
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
                            setAllData(
                              "leave_approver_id",
                              x.hrms_company_employee_id,
                              x
                            );
                          }}
                        >
                          {x.first_name + " " + x.last_name}
                        </Dropdown.Item>
                      ))}
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Name.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Status</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder=""
                    name="status"
                    value={leaveApplicationData?.status}
                    defaultValue={leaveApplicationData.status}
                    required
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {leaveStatus.map((x: any, index: any) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
                            setAllData("status", x);
                          }}
                        >
                          {x}
                        </Dropdown.Item>
                      ))}
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Row>
            {/* <Row className="mb-3">
              <Col></Col>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Salary slip</Form.Label>
                <Form.Control type="text" placeholder="" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid salary slip
                </Form.Control.Feedback>
              </Form.Group>
            </Row> */}

            {/* Divider scdsadada*/}
            <hr className="hr-blurry" />

            <Button type="submit" className="btn-sm" variant="primary">
              {leave.isEdit ? "Update" : " Submit "}
            </Button>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

LeaveForm.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default LeaveForm;
