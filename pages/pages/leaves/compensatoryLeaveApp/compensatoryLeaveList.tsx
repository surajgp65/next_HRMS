import React, { ReactElement, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import { Card, Col, Button, Row, Container, Dropdown } from "react-bootstrap";
import TableContainer from "@common/TableContainer";

import { useRouter } from "next/router";
import SimpleBar from "simplebar-react";
import axiosInstance from "lib/api";

const compensatoryLeaveList = () => {
  const router = useRouter();

  const [selectedCompany, setSelectedCompany] = useState<any>({});
  const [companyList, setCompanyList] = useState<any[]>([]);
  const [compensatoryLeaves, setCompensatoryLeaves] = useState<any[]>([]);

  useEffect(() => {
    getCompanyDetails();
  }, []);

  const handleAddButtonClick = () => {
    router.push(
      "/pages/leaves/compensatoryLeaveApp/compensatoryForm/compensatoryForm"
    );
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
          return cellProps.status;
        },
      },
      {
        Header: "From Date",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.work_from_date;
        },
      },
      {
        Header: "To Date",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.work_end_date;
        },
      },
    ],
    []
  );

  const getCompLeave = async (id: any) => {
    console.log(id);
    try {
      await axiosInstance
        .get("/leave/leave applicationlist_compensatory_leave_request/" + id)
        .then((res: any) => {
          if (res.status === 200) {
            setCompensatoryLeaves(res.data.data);
          }
        });
    } catch (error) {}
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
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head>
        <title>Compensatory Leave Request</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            breadcrumb="Pages"
            breadcrumbItem="Compensatory Leave Request"
          />
          <div className="text-end m-2">
            <Button
              type="button"
              className="btn-sm"
              onClick={handleAddButtonClick}
            >
              <i className="ri-add-line align-bottom me-1"></i>Add Compensatory
              Leave Request
            </Button>
          </div>

          {/* ______________________Table_____________________ */}
          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Compensatory Leave List
                  </h5>
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
                                    getCompLeave(x.hrms_company_id);
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
                    data={compensatoryLeaves || []}
                    isPagination={true}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={5}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Search Dates..."
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

compensatoryLeaveList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default compensatoryLeaveList;
