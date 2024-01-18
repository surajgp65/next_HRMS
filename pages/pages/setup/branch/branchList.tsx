import React, { ReactElement, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import { useRouter } from "next/router";
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
import { ToastSuccess } from "@common/toast";
import SimpleBar from "simplebar-react";

const initialState = {
  branch_name: "",
  hrms_company_branch_id: null,
  hrms_company_id: null,
};

const BranchList = () => {
  const router = useRouter();
  const [modal_grid, setmodal_grid] = useState(false);
  const [branchList, setBranchList] = useState<any[]>([]);
  const [branchData, setBranchData] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCompanyData, setSelectedCompanyData] = useState<any>({});
  const [companyDetailsList, setCompanyDetailsList] = useState([]);

  useEffect(() => {
    getBranchData();
    getCompanyDetails();
  }, []);

  const getBranchData = async () => {
    try {
      await axiosInstance
        .get("/setup/branch/list_of_branches")
        .then((res: any) => {
          if (res.status === 200) {
            setBranchList(res.data.data);
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

  const tog_grid = () => {
    setmodal_grid(!modal_grid);
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
          return cellProps.branch_name;
        },
      },
      {
        Header: "Branch",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.branch_name;
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
              onClick={() => openPopUp(cellProps)}
            >
              <i className="ri-pencil-line"></i>
            </div>
          );
        },
      },
    ],
    []
  );

  const createBranch = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await axiosInstance
        .post("/setup/branch/add_branch", branchData)
        .then((res: any) => {
          if (res.status === 200) {
            let data = res.data.data;
            setBranchList((prev: any) => [...prev, data]);
            tog_grid();
            ToastSuccess(res.data.message);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const handelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: any = event.target;

    setBranchData((data) => ({ ...data, [name]: value }));
  };

  const openPopUp = (data: any) => {
    setmodal_grid(true);
    setBranchData(data);
    setIsEdit(true);
  };

  const updateBranch = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const bodyData = branchData;

    try {
      await axiosInstance
        .put(
          "/setup/branch/update_branch/" + branchData.hrms_company_branch_id,
          bodyData
        )
        .then((res: any) => {
          if (res.status === 200) {
            let data = res.data.data;
            let value = {
              branch_name: data.branch_name,
              hrms_company_id: data.hrms_company_id,
            };

            setBranchList((prev: any) =>
              prev.map((x: any) =>
                x.hrms_company_branch_id === data.hrms_company_branch_id
                  ? { ...x, value }
                  : x
              )
            );
            setBranchData(initialState);
            tog_grid();
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const selectCompanyData = (name: any, value: any) => {
    setSelectedCompanyData(value);
    setBranchData((prev: any) => ({
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
        <title>Branch</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Branch List" />
          <div className="text-end m-2">
            <Button
              className="btn-sm"
              variant="primary"
              onClick={() => tog_grid()}
            >
              <i className="ri-add-line align-bottom me-1"></i>Add new Branch
            </Button>
          </div>

          {/* ______________________Table_____________________ */}
          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">Branch List</h5>
                </Card.Header>
                <Card.Body>
                  <TableContainer
                    columns={columns || []}
                    data={branchList || []}
                    isPagination={true}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={10}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Search Branch..."
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
      </div>

      <Modal
        show={modal_grid}
        onHide={() => {
          tog_grid();
        }}
      >
        <Modal.Header className="modal-title fw-bold">New Branch</Modal.Header>
        <Modal.Body>
          <form
            action="#"
            onSubmit={isEdit ? updateBranch : createBranch}
            autoComplete="off"
          >
            <div className="row g-3">
              <Col md={6}>
                <div>
                  <Form.Label htmlFor="branchInput" className="form-label">
                    Branch name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="branchInput"
                    name="branch_name"
                    value={branchData.branch_name}
                    onChange={handelInputChange}
                    placeholder="Enter Branch Name"
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
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    variant="light"
                    onClick={() => {
                      setmodal_grid(false);
                      setBranchData(initialState);
                      setIsEdit(false);
                    }}
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
    </React.Fragment>
  );
};

BranchList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default BranchList;
