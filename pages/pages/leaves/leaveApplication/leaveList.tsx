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

const initialState = {};

const LeaveList = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState("Hr");
  const [leaveApplication, setLeaveApplication] = useState(initialState);
  const [leaveList, setLeaveList] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>({});
  const [companyList, setCompanyList] = useState<any[]>([]);

  useEffect(() => {
    getCompanyDetails();
  }, []);

  const handleAddButtonClick = () => {
    if (userRole === "Hr") {
      router.push("/pages/leaves/leaveApplication/leaveForm/leaveForm");
    } else if (userRole === "Employee") {
      router.push("/pages/leaves/leaveApplication/leaveForm/employeeLeaveForm");
    } else {
      // Handle other roles or unauthorized users as needed
      // You can redirect them to a different page or show an error message
    }
  };

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
          return cellProps.id;
        },
      },
      {
        Header: "Employee Name",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return (
            cellProps?.hrms_company_employee_id?.first_name +
            " " +
            cellProps?.hrms_company_employee_id?.last_name
          );
        },
      },
      {
        Header: "Status",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.status.toUpperCase();
        },
      },
      {
        Header: "From Date",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.from_date;
        },
      },
      {
        Header: "To Date",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.to_date;
        },
      },
    ],
    []
  );

  const getCompanyDetails = async () => {
    try {
      await axiosInstance
        .get("setup/company/list_of_companies")
        .then((response: any) => {
          if (response.status == 200) {
            let data = response.data.data;
            console.log(data);
            setCompanyList(data);
            setSelectedCompany(data[0]);
            getLeaveList(data[0].hrms_company_id);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const getLeaveList = async (id: any) => {
    try {
      await axiosInstance
        .get("/leave/leave application/list_all_leave_application/" + id)
        .then((res: any) => {
          if (res.status === 200) {
            setLeaveList(res.data.data);
          }
        });
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head>
        <title>Leave List</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Leave List" />
          <div className="text-end m-2">
            <Button
              type="submit"
              variant="primary"
              className="btn-sm"
              onClick={handleAddButtonClick}
            >
              Add Leave Application
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
                                    getLeaveList(x.hrms_company_id);
                                    setSelectedCompany(x);
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
                  </form>
                </Card.Header>
                <Card.Body>
                  <TableContainer
                    columns={columns || []}
                    data={leaveList || []}
                    isPagination={true}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={5}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Search Employee or Leave..."
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

LeaveList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default LeaveList;
