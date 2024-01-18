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
  cost_center_name: "",
  parent_cost_center: "",
};

const PayrollForm = () => {
  const router = useRouter();

  const [validated, setValidated] = useState(false);
  const [companyDetailsList, setCompanyDetailsList] = useState([]);
  const [payRollData, setPayRollData] = useState(initialState);
  const [selectedCompanyData, setSelectedCompanyData] = useState<any>({});

  useEffect(() => {
    getCompanyDetails();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    try {
      const bodyData = payRollData;

      await axiosInstance
        .post("/setup/department/new_payroll_center", bodyData)
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

  const selectCompanyData = (name: any, value: any) => {
    setSelectedCompanyData(value);

    setPayRollData((prev: any) => ({ ...prev, [name]: value.hrms_company_id }));
  };

  const handelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: any = event.target;
    setPayRollData((data) => ({ ...data, [name]: value }));
  };

  return (
    <React.Fragment>
      <Head>
        <title>New Cost Center</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="New Cost Center" />

          {/* Form */}

          <Form
            noValidate
            validated={validated}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Cost Center Name</Form.Label>
                <Form.Control
                  type="text"
                  name="cost_center_name"
                  value={payRollData.cost_center_name}
                  onChange={handelInputChange}
                  placeholder=""
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid value.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Parent Cost Center</Form.Label>
                <Form.Control
                  type="text"
                  name="parent_cost_center"
                  value={payRollData.parent_cost_center}
                  onChange={handelInputChange}
                  placeholder=""
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid leave type
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
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
              <Col md={4}>
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

PayrollForm.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default PayrollForm;
