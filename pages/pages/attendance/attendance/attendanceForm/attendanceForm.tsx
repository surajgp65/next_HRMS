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
  Modal,
} from "react-bootstrap";
import SimpleBar from "simplebar-react";
import { useRouter } from "next/router";
import Flatpickr from "react-flatpickr";
import { changeDateFormat, keyNullManipulation } from "@common/commonFunction";
import axiosInstance from "lib/api";
import { ToastSuccess } from "@common/toast";
import { useSelector } from "react-redux";

const initialState = {
  hrms_company_employee_id: "",
  hrms_company_id: "",
  hrms_company_shift_type_id: "",
  series: "",
  attendance_date: "",
  status: "",
  hrms_company_employee_attendance_id: "",
};

const initialShift = {
  hrms_company_id: "",
  shift_type_name: "",
  start_time: "",
  end_time: "",
};

const initialSelected = {
  hrms_company_employee_id: {},
  hrms_company_id: {},
  hrms_company_shift_type_id: {},
};

const status = ["present", "absent", "half day", "on leave", "work from home"];

const AttendanceForm = () => {
  const router = useRouter();

  // State for form vaidation
  const [modal_grid, setmodal_grid] = useState(false);
  const [validated, setValidated] = useState<boolean>(false);
  const [attendanceData, setAttendanceData] = useState(initialState);
  const [employeeList, setEmployeeList] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any>(initialSelected);
  const [companyList, setCompanyList] = useState<any[]>([]);
  const [shiftList, setShiftList] = useState<any[]>([]);
  const [shiftData, setShiftData] = useState<any>(initialShift);
  const [selectedCompany, setSelectedCompany] = useState<any>({});

  const { Attendance } = useSelector((state: any) => ({
    Attendance: state?.Attendance?.attendance,
  }));

  useEffect(() => {
    getCompanyDetails();
    getEmployees();
    getAllShifts();
    setReducerData();
  }, []);

  const setReducerData = () => {
    if (Attendance) {
      let attendanceData = Attendance;
      for (const key in attendanceData) {
        if (
          typeof attendanceData[key] === "object" &&
          attendanceData[key] !== null
        ) {
          setSelectedData((prev: any) => ({
            ...prev,
            [key]: attendanceData[key],
          }));
          setAttendanceData((prev: any) => ({
            ...prev,
            [key]: attendanceData[key][key],
          }));
        } else {
          setAttendanceData((prev: any) => ({
            ...prev,
            [key]: attendanceData[key],
          }));
        }
      }
    }
  };

  const tog_grid = () => {
    setmodal_grid(!modal_grid);
  };

  // Submit Handler
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    // setValidated(true);

    try {
      let bodyData = keyNullManipulation(attendanceData);

      await axiosInstance
        .post("/attendance/attendance/add_employee_attendance", bodyData)
        .then((res: any) => {
          if (res.status === 200) {
            router.push("/pages/attendance/attendance/attendanceList");
            ToastSuccess(res.data.message);
          }
        });
    } catch (error) {}
  };

  // Handle navigating to new
  const handleCreateNewEmployeeClick = () => {
    router.push("/pages/attendance/attendanceForm/attendanceForm");
  };

  const setAllData = (name: any, value: any, data?: any, isDate?: boolean) => {
    if (data) {
      setSelectedData((prev: any) => ({ ...prev, [name]: data }));
    }
    if (isDate) {
      value = changeDateFormat(value);
    }
    setAttendanceData((prev: any) => ({ ...prev, [name]: value }));
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

  const getAllShifts = async () => {
    try {
      await axiosInstance
        .get("/attendance/attendance/list_shift_type")
        .then((res: any) => {
          if (res.status === 200) {
            setShiftList(res.data.data);
          }
        });
    } catch (error) {}
  };

  const addShift = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      let bodyData = keyNullManipulation(shiftData);
      await axiosInstance
        .post("/attendance/attendance/add_shift_type", bodyData)
        .then((res: any) => {
          if (res.status === 200) {
            let data = res.data.data;
            setShiftData(initialShift);
            setShiftList((prev: any) => [...prev, data]);
            ToastSuccess(res.data.message);
            tog_grid();
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const shiftInput = (name: any, value: any, data?: any) => {
    if (data) {
      setSelectedCompany(data);
    }
    setShiftData((prev: any) => ({ ...prev, [name]: value }));
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

  const updateAttendance = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      let bodyData: any = keyNullManipulation(attendanceData);

      delete bodyData.isEdit;

      await axiosInstance
        .put(
          "/attendance/attendance/update_emp_attendance/" +
            attendanceData.hrms_company_employee_attendance_id,
          bodyData
        )
        .then((res: any) => {
          if (res.status === 200) {
            router.push("/pages/attendance/attendance/attendanceList");
            ToastSuccess(res.data.message);
          }
        });
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head>
        <title>New Attendance</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="" />

          <Row>
            <Card>
              <Card.Header>
                <h4 className="card-title mb-0">New Attendance</h4>
              </Card.Header>

              <Card.Body>
                <Form
                  autoComplete="off"
                  onSubmit={Attendance.isEdit ? updateAttendance : handleSubmit}
                >
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Label>Series</Form.Label>

                      <Form.Control
                        type="text"
                        name="series"
                        onChange={(e) => {
                          setAllData("series", e.target.value);
                        }}
                        value={attendanceData.series}
                        placeholder=""
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid series.
                      </Form.Control.Feedback>

                      {/* <Dropdown aria-required>
                        <Dropdown.Toggle
                          as="input"
                          className="form-control rounded-end flag-input form-select"
                          placeholder=""
                        ></Dropdown.Toggle>
                        <Dropdown.Menu
                          as="ul"
                          className="list-unstyled w-100 dropdown-menu-list mb-0"
                        >
                          <SimpleBar
                            style={{ maxHeight: "220px" }}
                            className="px-3"
                          >
                            <Dropdown.Item>HR-ATT-.YYYY.-</Dropdown.Item>
                            <Dropdown.Item>Option 2</Dropdown.Item>
                            <Dropdown.Divider></Dropdown.Divider>

                            <Dropdown.Item
                              onClick={handleCreateNewEmployeeClick}
                            >
                              <div className="d-flex justify-content-center align-items-center text-primary">
                                <span
                                  className="bx bx-plus-medical"
                                  style={{ padding: 3 }}
                                ></span>
                                Create new Series
                              </div>
                            </Dropdown.Item>
                          </SimpleBar>
                        </Dropdown.Menu>
                      </Dropdown> */}
                    </Col>

                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                      <Form.Label>Attendance Date</Form.Label>
                      <Flatpickr
                        className="form-control"
                        options={{
                          dateFormat: "d-m-Y",
                        }}
                        name="attendance_date"
                        onChange={(e: any) => {
                          setAllData("attendance_date", e[0], null, true);
                        }}
                        value={attendanceData.attendance_date}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Date.
                      </Form.Control.Feedback>
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
                          value={
                            selectedData?.hrms_company_employee_id?.first_name
                          }
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
                                // name={"hrms_company_employee_id" + index}
                              >
                                {x.first_name + " " + x.last_name}
                              </Dropdown.Item>
                            ))}
                          </SimpleBar>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Form.Control.Feedback type="invalid">
                        Please provide Employee
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                      <Form.Label>Company</Form.Label>
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
                                }}
                                // name={"hrms_company_id" + index}
                              >
                                {x.company_name}
                              </Dropdown.Item>
                            ))}
                          </SimpleBar>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Form.Control.Feedback type="invalid">
                        Please select company
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                      <Form.Label>Status</Form.Label>
                      <Dropdown aria-required>
                        <Dropdown.Toggle
                          as="input"
                          className="form-control rounded-end flag-input form-select"
                          placeholder=""
                          name="status"
                          value={attendanceData.status}
                          defaultValue={attendanceData.status}
                        ></Dropdown.Toggle>
                        <Dropdown.Menu
                          as="ul"
                          className="list-unstyled w-100 dropdown-menu-list mb-0"
                        >
                          <SimpleBar
                            style={{ maxHeight: "220px" }}
                            className="px-3"
                          >
                            {status.map((x: any, index: any) => (
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
                      <Form.Control.Feedback type="invalid">
                        Please select status.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <br />
                  <Card.Subtitle>Details</Card.Subtitle>
                  <br />

                  <Row>
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                      <Form.Label>Shift</Form.Label>
                      <Dropdown aria-required>
                        <Dropdown.Toggle
                          as="input"
                          className="form-control rounded-end flag-input form-select"
                          placeholder=""
                          value={
                            selectedData.hrms_company_shift_type_id
                              .shift_type_name
                          }
                          defaultValue={
                            selectedData.hrms_company_shift_type_id
                              .shift_type_name
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
                            {shiftList.map((x: any, index: any) => (
                              <Dropdown.Item
                                key={index}
                                onClick={() => {
                                  setAllData(
                                    "hrms_company_shift_type_id",
                                    x.id,
                                    x
                                  );
                                }}
                              >
                                {x.shift_type_name}
                              </Dropdown.Item>
                            ))}

                            <Dropdown.Divider></Dropdown.Divider>

                            <Dropdown.Item onClick={tog_grid}>
                              <div className="d-flex justify-content-center align-items-center text-primary">
                                <span
                                  className="bx bx-plus-medical"
                                  style={{ padding: 3 }}
                                ></span>
                                Create new Shift
                              </div>
                            </Dropdown.Item>
                          </SimpleBar>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid Date.
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* <Form.Group
                      as={Col}
                      md="6"
                      controlId="validationCustom03"
                      className="mt-4"
                    >
                      <Form.Check
                        label="Late entry"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                      />
                      <Form.Check
                        label="Early Exit"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                      />
                    </Form.Group> */}
                  </Row>

                  <br />
                  <Button variant="success" className="btn-sm" type="submit">
                    {Attendance.isEdit ? "Update" : "Submit"}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </div>

      <Modal
        show={modal_grid}
        onHide={() => {
          tog_grid();
        }}
      >
        <Modal.Header className="modal-title fw-bold">New Shift</Modal.Header>
        <Modal.Body>
          <form action="#" autoComplete="off" onSubmit={addShift}>
            <Row className="">
              <Col md={6}>
                <div>
                  <Form.Label htmlFor="shiftname" className="form-label">
                    Shift name<span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="shiftname"
                    name="shift_type_name"
                    placeholder="Enter shift Name"
                    required
                    onChange={(e) => {
                      shiftInput("shift_type_name", e.target.value);
                    }}
                  />
                </div>
              </Col>

              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Company<span className="text-danger">*</span>
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
                            shiftInput("hrms_company_id", x.hrms_company_id, x);
                          }}
                          // name={"hrms_company_id" + index}
                        >
                          {x.company_name}
                        </Dropdown.Item>
                      ))}
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
            <Row className="my-3">
              <Col md={6}>
                <Form.Label htmlFor="start_time" className="form-label">
                  Start time<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="time"
                  className="form-control"
                  id="start_time"
                  name="start_time"
                  placeholder=""
                  required
                  onChange={(e) => {
                    shiftInput("start_time", e.target.value);
                  }}
                />
              </Col>
              <Col md={6}>
                <Form.Label htmlFor="end_time" className="form-label">
                  End time<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="time"
                  className="form-control"
                  id="end_time"
                  name="end_time"
                  placeholder=""
                  required
                  onChange={(e) => {
                    shiftInput("end_time", e.target.value);
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    variant="light"
                    onClick={() => {
                      setmodal_grid(false);
                    }}
                  >
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

AttendanceForm.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AttendanceForm;
