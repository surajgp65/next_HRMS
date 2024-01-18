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
  hrms_company_id: "",
  leave_block_list_name: "",
  hrms_company_leave_type_id: "",
};

const LeaveBlockForm = () => {
  const router = useRouter();

  const [validated, setValidated] = useState(false);
  const [companyDetailsList, setCompanyDetailsList] = useState([]);
  const [leaveTypeList, setLeaveTypeList] = useState([]);
  const [leaveBlock, setLeaveBlock] = useState(initialState);
  const [selectedCompanyData, setSelectedCompanyData] = useState<any>({});
  const [selectedLeaveType, setSelectedLeaveType] = useState<any>({});

  useEffect(() => {
    getCompanyDetails();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    try {
      const bodyData = leaveBlock;

      await axiosInstance
        .post("/setup/department/new_blockleave", bodyData)
        .then((res: any) => {
          if (res.status === 200) {
            ToastSuccess(res.data.message);
            router.push(
              "/pages/setup/department/departmentForm/departmentForm"
            );
          }
        })
        .catch((error) => {});
    } catch (error) {}
    setValidated(true);
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
        .catch((error) => {});
    } catch (error) {}
  };

  const handleCreateNewCompany = () => {
    router.push("/pages/setup/company/companyForm/companyForm");
  };
  const handleCreateNewLeaveType = () => {
    router.push("/pages/setup/department/departmentForm/leaveType");
  };

  const selectCompanyData = (name: any, value: any) => {
    setSelectedCompanyData(value);
    getLeaveType(value.hrms_company_id);
    setLeaveBlock((prev: any) => ({ ...prev, [name]: value.hrms_company_id }));
  };

  const selectLeaveType = (name: any, value: any) => {
    setSelectedLeaveType(value);
    setLeaveBlock((prev: any) => ({ ...prev, [name]: value.id }));
  };

  const handelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: any = event.target;
    setLeaveBlock((data) => ({ ...data, [name]: value }));
  };

  const getLeaveType = async (id: any) => {
    await axiosInstance
      .get("/setup/department/list_of_leave_type/" + id)
      .then((res: any) => {
        if (res.status === 200) {
          setLeaveTypeList(res.data.data);
        }
      })
      .catch((error) => {});
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
                <Form.Group controlId="validationCustom03">
                  <Form.Label>
                    Leave Block List Name <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="leave_block_list_name"
                    value={leaveBlock.leave_block_list_name}
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
                    name="hrms_company_id"
                    value={selectedCompanyData.company_name}
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
                <Form.Label htmlFor="isGroup" className="form-label">
                  Leave Type
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder="Select Leave Type"
                    name="hrms_company_leave_type_id"
                    value={selectedLeaveType.leave_type_name}
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
                              selectLeaveType("hrms_company_leave_type_id", x);
                            }}
                          >
                            {x.leave_type_name}
                          </Dropdown.Item>
                        ))
                      ) : (
                        <Dropdown.Item disabled>Select Company</Dropdown.Item>
                      )}
                      <Dropdown.Divider></Dropdown.Divider>

                      <Dropdown.Item onClick={handleCreateNewLeaveType}>
                        <div className="d-flex justify-content-center align-items-center text-primary">
                          <span
                            className="bx bx-plus-medical"
                            style={{ padding: 3 }}
                          ></span>
                          Create New Leave type
                        </div>
                      </Dropdown.Item>
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
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

LeaveBlockForm.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default LeaveBlockForm;
