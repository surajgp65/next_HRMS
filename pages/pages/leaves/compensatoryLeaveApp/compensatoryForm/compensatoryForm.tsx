import React, { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Dropdown,
} from "react-bootstrap";
import SimpleBar from "simplebar-react";
import { useRouter } from "next/router";
import Flatpickr from "react-flatpickr";
import axiosInstance from "lib/api";
import { changeDateFormat, keyNullManipulation } from "@common/commonFunction";
import { ToastSuccess } from "@common/toast";

const initialState = {
  hrms_company_id: "",
  hrms_company_employee_id: "",
  hrms_company_leave_type_id: "",
  work_from_date: "",
  work_end_date: "",
  reason: "",
};

const selectedInitial = {
  hrms_company_employee_id: {},
};

const CompensatoryForm = () => {
  const router = useRouter();

  // State for form vaidation
  const [validated, setValidated] = useState<boolean>(false);
  const [employeeList, setEmployeeList] = useState<any[]>([]);
  const [compLeaveData, setCompLeaveData] = useState<any>(initialState);
  const [selectedData, setSelectedData] = useState<any>(selectedInitial);
  const [leaveTypeList, setLeaveTypeList] = useState<any[]>([]);
  const [companyList, setCompanyList] = useState<any[]>([]);

  useEffect(() => {
    getEmployees();
    getCompanyDetails();
  }, []);

  // Submit Handler
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  // Handle navigating to new
  const handleCreateNewEmployeeClick = () => {
    router.push("/pages/setup/company/companyForm/newHoliday");
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

  const setAllData = (name: any, value: any, data?: any, isDate?: boolean) => {
    if (data) {
      setSelectedData((prev: any) => ({ ...prev, [name]: data }));
    }
    if (isDate) {
      value = changeDateFormat(value);
    }
    setCompLeaveData((prev: any) => ({ ...prev, [name]: value }));
  };

  const getCompanyDetails = async () => {
    try {
      await axiosInstance
        .get("setup/company/list_of_companies")
        .then((response: any) => {
          if (response.status == 200) {
            let data = response.data.data;
            console.log(data);
            setCompanyList(data);
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

  const addCompLeave = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      let bodyData = keyNullManipulation(compLeaveData);

      console.log(bodyData);
      // return;

      await axiosInstance
        .post(
          "/leave/leave application/add_compensatory_leave_request",
          bodyData
        )
        .then((res: any) => {
          if (res.status === 200) {
            ToastSuccess(res.data.message);
            router.push(
              "/pages/leaves/compensatoryLeaveApp/compensatoryLeaveList"
            );
          }
        });
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head>
        <title>Compensatory Leave Request</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            breadcrumb="Pages"
            breadcrumbItem="Compensatory Leave Request"
          />

          <Row>
            <Card>
              <Card.Header>
                <h4 className="card-title mb-0">
                  New Compensatory Leave Request
                </h4>
              </Card.Header>

              <Card.Body>
                <Form autoComplete="off" onSubmit={addCompLeave}>
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
                          defaultValue={
                            selectedData?.hrms_company_id?.company_name
                          }
                          name="hrms_company_id"
                          required
                        ></Dropdown.Toggle>
                        <Dropdown.Menu
                          as="ul"
                          className="list-unstyled w-100 dropdown-menu-list mb-0"
                        >
                          <SimpleBar
                            style={{ maxHeight: "220px" }}
                            className="px-3"
                          >
                            {(companyList || []).map((x: any, index: any) => (
                              <Dropdown.Item
                                key={index}
                                onClick={() => {
                                  setAllData(
                                    "hrms_company_id",
                                    x.hrms_company_id,
                                    x
                                  );
                                  getLeaveType(x.hrms_company_id);
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
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Label>Employee</Form.Label>
                      <Dropdown aria-required>
                        <Dropdown.Toggle
                          as="input"
                          className="form-control rounded-end flag-input form-select"
                          placeholder=""
                          name=""
                          value={
                            selectedData.hrms_company_employee_id.first_name
                          }
                          defaultValue={
                            selectedData.hrms_company_employee_id.first_name
                          }
                        ></Dropdown.Toggle>
                        <Dropdown.Menu
                          as="ul"
                          className="list-unstyled w-100 dropdown-menu-list mb-0"
                        >
                          <SimpleBar
                            style={{ maxHeight: "220px" }}
                            className="px-3"
                          >
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
                                name={"hrms_company_employee_id" + index}
                              >
                                {x.first_name + " " + x.last_name}
                              </Dropdown.Item>
                            ))}
                          </SimpleBar>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>

                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                      <Form.Label>Leave Type</Form.Label>
                      <Dropdown>
                        <Dropdown.Toggle
                          as="input"
                          className="form-control rounded-end flag-input form-select"
                          placeholder=""
                          name="hrms_company_leave_type_id"
                          value={
                            selectedData?.hrms_company_leave_type_id
                              ?.leave_type_name
                          }
                          defaultValue={
                            selectedData?.hrms_company_leave_type_id
                              ?.leave_type_name
                          }
                          required
                        ></Dropdown.Toggle>
                        <Dropdown.Menu
                          as="ul"
                          className="list-unstyled w-100 dropdown-menu-list mb-0"
                        >
                          <SimpleBar
                            style={{ maxHeight: "220px" }}
                            className="px-3"
                          >
                            {leaveTypeList.length > 0 ? (
                              leaveTypeList.map((x: any, index: any) => (
                                <Dropdown.Item
                                  key={index}
                                  name={"hrms_company_leave_type_id" + index}
                                  onClick={() => {
                                    setAllData(
                                      "hrms_company_leave_type_id",
                                      x.id,
                                      x
                                    );
                                  }}
                                >
                                  {x.leave_type_name}
                                </Dropdown.Item>
                              ))
                            ) : (
                              <Dropdown.Item disabled>
                                Select Company
                              </Dropdown.Item>
                            )}
                          </SimpleBar>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <br />
                  <Card.Subtitle>Worked On Holiday</Card.Subtitle>
                  <br />

                  <Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                      <Form.Label>Work From Date</Form.Label>
                      <Flatpickr
                        className="form-control"
                        options={{
                          dateFormat: "d-m-Y",
                          maxDate: "today",
                        }}
                        name="work_from_date"
                        value={compLeaveData.work_from_date}
                        onChange={(e: any) => {
                          setAllData("work_from_date", e[0], null, true);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Date.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                      <Form.Label>Work End Date</Form.Label>
                      <Flatpickr
                        className="form-control"
                        options={{
                          dateFormat: "d-m-Y",
                          maxDate: "today",
                        }}
                        name="work_end_date"
                        value={compLeaveData.work_end_date}
                        onChange={(e: any) => {
                          setAllData("work_end_date", e[0], null, true);
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Date.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                      <Form.Label>Reason</Form.Label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea5"
                        rows={4}
                        name="reason"
                        value={compLeaveData.reason}
                        onChange={(e: any) => {
                          setAllData("reason", e.target.value, null);
                        }}
                      ></textarea>
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Reason.
                      </Form.Control.Feedback>
                    </Form.Group>
                    {/* <Form.Group className="mb-3">
                      <Form.Check
                        label="Half Day"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                      />
                    </Form.Group> */}
                  </Row>
                  <Button
                    variant="primary"
                    className="btn-sm mt-3"
                    type="submit"
                  >
                    Submit form
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

CompensatoryForm.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default CompensatoryForm;
