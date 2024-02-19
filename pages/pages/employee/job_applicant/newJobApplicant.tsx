import React, { ReactElement, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import { Container, Dropdown, Form } from "react-bootstrap";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import TableContainer from "@common/TableContainer";
import axiosInstance from "lib/api";
import SimpleBar from "simplebar-react";
import { useDispatch, useSelector } from "react-redux";
import { updateLeave } from "Components/slices/leaves/reducer";
import { keyNullManipulation } from "@common/commonFunction";
import { ToastSuccess,ToastError } from "@common/toast";
import Image from "next/image";
// country data
import country from "@common/data/country-list";
// React query
import { useQuery, useMutation } from "@tanstack/react-query";

const initialState = {
  hrms_company_id: "",
  hrms_company_employee_id: "",
  hrms_company_designation_id: "",
  applicant_name: "",
  email_address: "",
  phone_number: "",
  country: "",
  status: "",
  job_opening: "",
};

const statusValue = ["open", "replied", "rejected"];

const NewJobApplicant = () => {
  const router = useRouter();
  const { EmpId } = router.query;

  const [validated, setValidated] = useState(false);
  const [selectedData, setSelectedData] = useState<any>({});
  const [job_applicant, setJobApplicant] = useState(initialState);
  const [companyList, setCompanyList] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>({});
  const [designationList, setDesignationList] = useState<any[]>([]);
  const [isEdit, setIsEdit] = useState(false);

  // API Responses
  const existingJobApplicant = useQuery({
    queryKey: ["jobApplicantList", EmpId],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(
          "/employee/employeedetails/single_job_applicant/" + EmpId
        );
        const rsData = response.data.data;
        // setJobApplicant(rsData);
        // setSelectedData(rsData);
        setObjData(rsData);
        setIsEdit(true);

        return rsData; // Returning the fetched data
      } catch (error) {
        console.error(error);
        setIsEdit(false);
      }
    },
    enabled: !!EmpId,
  });
  // API Response close

  const setObjData = (data: any) => {
    for (const key in data) {
      if (typeof data[key] === "object" && data[key] !== null) {
        setSelectedData((prev: any) => ({
          ...prev,
          [key]: data[key],
        }));
        setJobApplicant((prev: any) => ({
          ...prev,
          [key]: data[key][key],
        }));
      } else {
        setJobApplicant((prev: any) => ({
          ...prev,
          [key]: data[key],
        }));
      }
    }
  };

  useEffect(() => {
    // console.log(job_applicant);
    console.log("selectedData", selectedData);
    console.log("jobApplicant", job_applicant);
  }, [job_applicant, selectedData]);

  const setAllData = (name: any, value: any, data?: any) => {
    if (data) {
      setSelectedData((prev: any) => ({ ...prev, [name]: data }));
    }

    setJobApplicant((prev: any) => ({ ...prev, [name]: value }));
  };

  const selectDropdownData = (name: any, value: any, data: any) => {
    setSelectedData((prev: any) => ({ ...prev, [name]: data }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.stopPropagation();
    event.preventDefault();

    try {
      let bodyData = keyNullManipulation(job_applicant);
      console.log(bodyData);

      await axiosInstance
        .post("/employee/employeedetails/new_job_applicant", bodyData)
        .then((res: any) => {
          if (res.status === 200) {
            ToastSuccess(res.data.message);
            router.push("/pages/employee/job_applicant/jobApplicantList");
          }
        });
    } catch (error) {}
  };

  const demoUpdate = async (formData: any) => {
    try {
      await axiosInstance.put(
        "/employee/employeedetails/update_jobapplicant/" + EmpId,
        formData
      ).then((res: any) => {
        if (res.status === 200) {
          ToastSuccess(res.data.message);
        }
      });
    } catch (error) {ToastError("Error in Updating")}
  };

  const { mutateAsync: updateJobApplicantMutation } = useMutation({
    mutationFn: demoUpdate,
  });

  const updateEmployee = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      let bodyData = updateJobApplicantMutation(job_applicant); // Call the mutation function
      console.log("update --->", job_applicant);
    } catch (error) {
      console.error(error);
      // Handle error if mutation fails
    }
  };

  const designationListApi = useQuery({
    queryKey: ["desgination"],
    queryFn: () =>
      axiosInstance
        .get("/setup/designation/list_of_designation")
        .then((res) => {
          if (res.status === 200) setDesignationList(res.data.data);
          return res.data.data;
        }),
  });
  const companyListApi = useQuery({
    queryKey: ["companyList"],
    queryFn: () =>
      axiosInstance.get("setup/company/list_of_companies").then((res) => {
        if (res.status === 200) setCompanyList(res.data.data);
        return res.data.data;
      }),
  });

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
            onSubmit={isEdit ? updateEmployee : handleSubmit}
          >
            <Row className="mb-2">
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Applicant Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="applicant_name"
                  onChange={(e) => {
                    setAllData("applicant_name", e.target.value);
                  }}
                  type="text"
                  placeholder=""
                  required
                  defaultValue={job_applicant.applicant_name}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
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
                    value={selectedData?.hrms_company_id?.company_name}
                    defaultValue={selectedData?.hrms_company_id?.company_name}
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
                            setAllData("hrms_company_id", x.hrms_company_id, x);
                          }}
                        >
                          {x.company_name}
                        </Dropdown.Item>
                      ))}
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Job Opening
                </Form.Label>
                <Form.Control
                  name="job_opening"
                  onChange={(e) => {
                    setAllData("job_opening", e.target.value);
                  }}
                  type="text"
                  placeholder=""
                  required
                  defaultValue={job_applicant?.job_opening}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Email Address <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  name="email_address"
                  onChange={(e) => {
                    setAllData("email_address", e.target.value);
                  }}
                  type="text"
                  placeholder=""
                  required
                  defaultValue={job_applicant?.email_address}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Designation
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder=""
                    name="hrms_company_designation_id"
                    value={
                      selectedData?.hrms_company_designation_id?.designation
                    }
                    defaultValue={
                      selectedData?.hrms_company_designation_id?.designation
                    }
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {(designationList || []).map((x: any, index: any) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
                            setAllData(
                              "hrms_company_designation_id",
                              x.hrms_company_designation_id,
                              x
                            );
                          }}
                        >
                          {x.designation}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Divider></Dropdown.Divider>

                      <Dropdown.Item>
                        <div className="d-flex justify-content-center align-items-center text-primary">
                          <span
                            className="bx bx-plus-medical"
                            style={{ padding: 3 }}
                          ></span>
                          Create new Designation
                        </div>
                      </Dropdown.Item>
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Phone Number
                </Form.Label>
                <Form.Control
                  name="phone_number"
                  onChange={(e) => {
                    setAllData("phone_number", e.target.value);
                  }}
                  type="text"
                  placeholder=""
                  required
                  defaultValue={job_applicant?.phone_number}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Status
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    name="status"
                    required
                    defaultValue={job_applicant.status}
                    value={job_applicant.status}
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {(statusValue || []).map((x: any, index: any) => (
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
              </Col>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col} md="6">
                <Form.Label>
                  Country <span className="text-danger">*</span>
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder="Select Country"
                    required
                    defaultValue={initialState.country}
                    value={job_applicant.country}
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {(country || []).map((item: any, key: number) => (
                        <Dropdown.Item
                          as="li"
                          onClick={() =>
                            setAllData("country", item.countryName)
                          }
                          key={key}
                          className="dropdown-item d-flex"
                        >
                          <div className="flex-shrink-0 me-2">
                            <Image
                              src={item.flagImg}
                              alt="country flag"
                              className="options-flagimg"
                              height="20"
                            />
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex">
                              <div className="country-name me-1">
                                {item.countryName}
                              </div>
                              <span className="countrylist-codeno text-muted">
                                {item.countryCode}
                              </span>
                            </div>
                          </div>
                        </Dropdown.Item>
                      ))}
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid date.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button type="submit" className="btn-sm" variant="primary">
              {isEdit ? "Update" : "Submit"}
            </Button>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

NewJobApplicant.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default NewJobApplicant;
