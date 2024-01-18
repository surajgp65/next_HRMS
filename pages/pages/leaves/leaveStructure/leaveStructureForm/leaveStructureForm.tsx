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
import { ToastSuccess } from "@common/toast";

const initialState = {
  leave_type_id: "",
  structure_name: "",
  total_no_of_leaves: "",
  credited: "",
  overall_leaves: "",
};

const selectedInitial = {
  hrms_company_id: {},
  leave_type_id: {},
};

const overLeaves = ["pro_rata", "normal"];

const LeaveStructureForm = () => {
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [structureData, setStructureData] = useState(initialState);
  const [leaveTypeList, setLeaveTypeList] = useState<any[]>([]);
  const [companyList, setCompanyList] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any>(selectedInitial);

  useEffect(() => {
    getCompanyDetails();
    setReducerData();
  }, []);

  const { updateLeaveStructure } = useSelector((state: any) => ({
    updateLeaveStructure: state?.LeaveStructure?.leaveStructure,
  }));

  const setReducerData = () => {
    let structureData: any = {};
    if (updateLeaveStructure) {
      structureData = updateLeaveStructure;
      for (const key in structureData) {
        if (
          typeof structureData[key] === "object" &&
          structureData[key] !== null
        ) {
          setSelectedData((prev: any) => ({
            ...prev,
            [key]: structureData[key],
          }));
          setStructureData((prev: any) => ({
            ...prev,
            [key]: structureData[key][key],
          }));
        } else {
          setStructureData((prev: any) => ({
            ...prev,
            [key]: structureData[key],
          }));
        }
      }
    }
  };

  const setAllData = (name: any, value: any, data?: any) => {
    if (data) {
      setSelectedData((prev: any) => ({ ...prev, [name]: data }));
    }
    setStructureData((prev) => ({ ...prev, [name]: value }));
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

  const submitLeaveStructue = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      let bodyData = keyNullManipulation(structureData);
      axiosInstance
        .post("/setup/department/company_leave_structure", bodyData)
        .then((res: any) => {
          if (res.status === 200) {
            ToastSuccess(res.data.message);
            router.push("/pages/leaves/leaveStructure/leaveStructureList");
          }
        });
    } catch (error) {}
  };

  const updateStructure = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      let bodyData = keyNullManipulation(structureData);

      delete bodyData.isEdit;

      axiosInstance
        .put(
          "/setup/department/company_leave_structure/" +
            updateLeaveStructure.company_leaves_structure_id,
          bodyData
        )
        .then((res: any) => {
          if (res.status === 200) {
            ToastSuccess(res.data.message);
            router.push("/pages/leaves/leaveStructure/leaveStructureList");
          }
        });
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
            onSubmit={
              updateLeaveStructure.isEdit
                ? updateStructure
                : submitLeaveStructue
            }
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

            <Row className="mb-2">
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Structure Name:
                </Form.Label>
                <Form.Control
                  value={structureData.structure_name}
                  name="structure_name"
                  onChange={(e) => {
                    setAllData("structure_name", e.target.value);
                  }}
                  type="text"
                  placeholder=""
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Leave Type:
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder=""
                    name="leave_type_id"
                    value={selectedData?.leave_type_id?.leave_type_name}
                    defaultValue={selectedData?.leave_type_id?.leave_type_name}
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
                              setAllData("leave_type_id", x.id, x);
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
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Total no. Leaves:
                </Form.Label>
                <Form.Control
                  value={structureData.total_no_of_leaves}
                  name="total_no_of_leaves"
                  onChange={(e) => {
                    setAllData("total_no_of_leaves", e.target.value);
                  }}
                  type="text"
                  placeholder=""
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Credited Leave:
                </Form.Label>
                <Form.Control
                  value={structureData.credited}
                  name="credited"
                  onChange={(e) => {
                    setAllData("credited", e.target.value);
                  }}
                  type="text"
                  placeholder=""
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Overall Leaves
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder="Select Company"
                    value={structureData.overall_leaves}
                    defaultValue={structureData.overall_leaves}
                    name="hrms_company_id"
                    required
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {(overLeaves || []).map((x: any, index: any) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
                            setAllData("overall_leaves", x);
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

            <Button type="submit" className="btn-sm" variant="primary">
              {updateLeaveStructure.isEdit ? "Update" : "Submit"}
            </Button>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

LeaveStructureForm.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default LeaveStructureForm;
