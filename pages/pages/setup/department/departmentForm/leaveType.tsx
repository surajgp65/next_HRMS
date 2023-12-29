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
import SimpleBar from "simplebar-react";
import axiosInstance from "lib/api";
import { Prev } from "react-bootstrap/esm/PageItem";
import { ToastSuccess } from "@common/toast";

const initialState = {
  hrms_company_id: null,
  leave_type_name: "",
  maximum_leave_allocation_allowed: "",
  applicable_after: 0,
  maximum_consecutive_leaves_allowed: "",
};

const LeaveTypeForm = () => {
  const router = useRouter();

  const [validated, setValidated] = useState(false);
  const [leaveTypeData, setLeaveTypeData] = useState(initialState);
  const [companyDetailsList, setCompanyDetailsList] = useState([]);
  const [selectedCompanyData, setSelectedCompanyData] = useState<any>({});

  useEffect(() => {
    getCompanyDetails();
  }, []);

  useEffect(() => {}, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    try {
      let bodyData = leaveTypeData;

      if (bodyData.hrms_company_id == "" || bodyData.hrms_company_id == null) {
        setValidated(true);
        return;
      }

      console.log(bodyData);
      return;

      await axiosInstance
        .post("/setup/department/new_leave_type", bodyData)
        .then((res: any) => {
          if (res.status === 200) {
            ToastSuccess(res.data.message);
            router.push(
              "/pages/setup/department/departmentForm/leaveBlockForm"
            );
          }
        })
        .catch((error) => {});
    } catch (error) {}
    setValidated(true);
  };

  const handleCreateNewCompany = () => {
    router.push("/pages/setup/company/companyForm/companyForm");
  };

  const handelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: any = event.target;
    setLeaveTypeData((data) => ({ ...data, [name]: value }));
  };

  const selectCompanyData = (name: any, value: any) => {
    console.log(value);
    setSelectedCompanyData(value);
    setLeaveTypeData((prev: any) => ({
      ...prev,
      [name]: value.hrms_company_id,
    }));
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

  return (
    <React.Fragment>
      <Head>
        <title>New Leave Block List</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            breadcrumb="Pages"
            breadcrumbItem="New Leave Block List"
          />

          {/* Form */}

          <Form
            noValidate
            validated={validated}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Company<span className="text-danger">*</span>
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder="Select Company"
                    value={selectedCompanyData.company_name}
                    name="hrms_company_id"
                    required
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
              <Col md={6}>
                <Form.Group controlId="validationCustom03">
                  <Form.Label>
                    Leave Type Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="leave_type_name"
                    value={leaveTypeData.leave_type_name}
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
                <Form.Group controlId="validationCustom03">
                  <Form.Label>Maximum Leave Allocation Allowed</Form.Label>
                  <Form.Control
                    type="text"
                    name="maximum_leave_allocation_allowed"
                    value={leaveTypeData.maximum_leave_allocation_allowed}
                    onChange={handelInputChange}
                    placeholder=""
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid value.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="validationCustom03">
                  <Form.Label>Applicable After (Working Days)</Form.Label>
                  <Form.Control
                    type="text"
                    name="applicable_after"
                    value={leaveTypeData.applicable_after}
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
                <Form.Group controlId="validationCustom03">
                  <Form.Label>Maximum Consecutive Leaves Allowed</Form.Label>
                  <Form.Control
                    type="text"
                    name="maximum_consecutive_leaves_allowed"
                    value={leaveTypeData.maximum_consecutive_leaves_allowed}
                    onChange={handelInputChange}
                    placeholder=""
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid value.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button className="btn-sm mt-3" type="submit">
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

LeaveTypeForm.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default LeaveTypeForm;
