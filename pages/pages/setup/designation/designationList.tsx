import React, { ReactElement, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Card,
  Col,
  Row,
  Button,
  Modal,
  Form,
  Container,
  Dropdown,
} from "react-bootstrap";
import TableContainer from "@common/TableContainer";
import axiosInstance from "lib/api";
import { toast, ToastContainer } from "react-toastify";
import { ToastSuccess } from "@common/toast";
import SimpleBar from "simplebar-react";

const initialState = {
  designation: "",
  hrms_company_designation_id: null,
  hrms_company_id: null,
};

const DesignationList = () => {
  const router = useRouter();
  const [modal_grid, setmodal_grid] = useState(false);
  const [designationList, setDesignationList] = useState<any[]>([]);
  const [designationData, setDesignationData] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCompanyData, setSelectedCompanyData] = useState<any>({});
  const [companyDetailsList, setCompanyDetailsList] = useState([]);

  useEffect(() => {
    getDesignations();
    getCompanyDetails();
  }, []);

  const tog_grid = () => {
    setmodal_grid(!modal_grid);
    setDesignationData(initialState);
  };

  const columns = useMemo(
    () => [
      {
        id: "#",
        Header: "#",
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
          return cellProps.designation;
        },
      },
      {
        Header: "Designation",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.designation;
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return (
            <div
              className="cursor-pointer"
              onClick={() => {
                setmodal_grid(true);
                setIsEdit(true);
                setDesignationData(cellProps);
              }}
            >
              <i className="ri-pencil-line"></i>
            </div>
          );
        },
      },
    ],
    []
  );

  const getDesignations = async () => {
    try {
      axiosInstance
        .get("/setup/designation/list_of_designation")
        .then((res) => {
          if (res.status === 200) setDesignationList(res.data.data);
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const createDesignation = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await axiosInstance
        .post("/setup/designation/add_designation", designationData)
        .then((res) => {
          if (res.status === 200) {
            let data = res.data.data;
            ToastSuccess(res.data.message);
            setDesignationList((prev: any) => [...prev, data]);
            tog_grid();
            setDesignationData(initialState);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const handelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: any = event.target;
    setDesignationData((data) => ({ ...data, [name]: value }));
  };

  const updateDesignation = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await axiosInstance
        .put("/setup/designation/update_designation", designationData)
        .then((res) => {
          if (res.status === 200) {
            let data = res.data.data;
            toast.success(`${res.data.message}`, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
            });
            setDesignationList((prev: any) =>
              prev.map((x: any) =>
                x.hrms_company_designation_id ===
                data.hrms_company_designation_id
                  ? { ...x, designation: data.designation }
                  : x
              )
            );
            tog_grid();
            setDesignationData(initialState);
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
            setCompanyDetailsList(response?.data?.data);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const selectCompanyData = (name: any, value: any) => {
    setSelectedCompanyData(value);
    setDesignationData((prev: any) => ({
      ...prev,
      [name]: value.hrms_company_id,
    }));
  };

  const handleCreateNewCompany = () => {
    router.push("/pages/setup/company/companyForm/companyForm");
  };

  return (
    <React.Fragment>
      <Head>
        <title>Designation List</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="" />
          <div className="text-end m-2">
            <Button
              className="btn-sm"
              variant="primary"
              onClick={() => tog_grid()}
            >
              <div className="d-flex justify-content-center align-items-center">
                <i className="ri-add-line align-bottom me-1"></i>Add new
                Designation
              </div>
            </Button>
          </div>

          {/* ______________________Table_____________________ */}
          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Designation List
                  </h5>
                </Card.Header>
                <Card.Body>
                  <TableContainer
                    columns={columns || []}
                    data={designationList || []}
                    isPagination={true}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={5}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Search Designation..."
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
        <Modal
          show={modal_grid}
          onHide={() => {
            tog_grid();
          }}
        >
          <Modal.Header className="modal-title fw-bold">
            New Designation
          </Modal.Header>
          <Modal.Body>
            <form
              action="#"
              autoComplete="off"
              onSubmit={isEdit ? updateDesignation : createDesignation}
            >
              <div className="row g-3">
                <Col md={6}>
                  <div>
                    <Form.Label htmlFor="designation" className="form-label">
                      Designation
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      id="designation"
                      name="designation"
                      value={designationData.designation}
                      onChange={handelInputChange}
                      placeholder="Enter Designation"
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
                      value={selectedCompanyData.company_name}
                      name="hrms_company_id"
                    ></Dropdown.Toggle>
                    <Dropdown.Menu
                      as="ul"
                      className="list-unstyled w-100 dropdown-menu-list mb-0"
                    >
                      <SimpleBar
                        style={{ maxHeight: "220px" }}
                        className="px-3"
                      >
                        {(companyDetailsList || []).map(
                          (x: any, index: any) => (
                            <Dropdown.Item
                              key={index}
                              onClick={() => {
                                selectCompanyData("hrms_company_id", x);
                              }}
                            >
                              {x.company_name}
                            </Dropdown.Item>
                          )
                        )}
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
                <Col lg={12}>
                  <div className="hstack gap-2 justify-content-end">
                    <Button
                      variant="light"
                      onClick={() => setmodal_grid(false)}
                    >
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      {isEdit ? "Update" : "Add"}
                    </Button>
                  </div>
                </Col>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

DesignationList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default DesignationList;
