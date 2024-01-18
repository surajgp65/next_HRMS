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
import { useDispatch } from "react-redux";
import { updateLeaveStructure } from "Components/slices/leaveStructure/reducer";

const initialState = {};

const LeaveStructureList = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [companyList, setCompanyList] = useState<any[]>([]);
  const [leaveStructureList, setLeaveStructureList] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>({});

  useEffect(() => {
    getCompanyDetails();
  }, []);

  // Table Headers and populating cells

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
          return cellProps.structure_name;
        },
      },
      {
        Header: "Structure",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps?.structure_name;
        },
      },
      {
        Header: "Credited",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.credited;
        },
      },
      {
        Header: "Total Leaves",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.total_no_of_leaves;
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
                sendReduxData(cellProps);
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

  const sendReduxData = (data: any) => {
    data.isEdit = true;
    dispatch(updateLeaveStructure(data));
    router.push(
      "/pages/leaves/leaveStructure/leaveStructureForm/leaveStructureForm"
    );
  };

  const handleAddButtonClick = () => {
    dispatch(updateLeaveStructure({ isEdit: false }));
    router.push(
      "/pages/leaves/leaveStructure/leaveStructureForm/leaveStructureForm"
    );
  };

  const getCompanyDetails = async () => {
    try {
      await axiosInstance
        .get("setup/company/list_of_companies")
        .then((response: any) => {
          if (response.status == 200) {
            let data = response.data.data;
            setCompanyList(data);
            setSelectedCompany(data[0]);
            getLeaveStructure(data[0]);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const getLeaveStructure = async (data: any) => {
    try {
      await axiosInstance
        .get(
          "/setup/department/list_comp_leave_structure/" + data.hrms_company_id
        )
        .then((res: any) => {
          if (res.status === 200) {
            setLeaveStructureList(res.data.data);
          }
        });
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head>
        <title>Leave Structure</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Leave Structure" />
          <div className="text-end m-2">
            <Button
              type="submit"
              variant="primary"
              className="btn-sm"
              onClick={handleAddButtonClick}
            >
              Add Leave Structure
            </Button>
          </div>

          {/* ______________________Table_____________________ */}
          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">Leave List</h5>
                  <form action="#" autoComplete="off">
                    <Row>
                      <Col md={12}>
                        {/* <Form.Label htmlFor="isGroup" className="form-label">
                          Company
                        </Form.Label> */}
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
                            <SimpleBar
                              style={{ maxHeight: "220px" }}
                              className="px-3"
                            >
                              {(companyList || []).map((x: any, index: any) => (
                                <Dropdown.Item
                                  key={index}
                                  onClick={() => {
                                    setSelectedCompany(x);
                                    getLeaveStructure(x);
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
                  </form>
                </Card.Header>
                <Card.Body>
                  <TableContainer
                    columns={columns || []}
                    data={leaveStructureList || []}
                    isPagination={true}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={5}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Search Leave Structure..."
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
    </React.Fragment>
  );
};

LeaveStructureList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default LeaveStructureList;
