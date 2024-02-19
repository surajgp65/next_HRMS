import React, { ReactElement, useState, useMemo, useEffect } from "react";
import Head from "next/head";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import {
  Card,
  Col,
  Button,
  Row,
  Container,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import TableContainer from "@common/TableContainer";

import { useRouter } from "next/router";
import axiosInstance from "lib/api";
import { ToastSuccess } from "@common/toast";
import { keyNullManipulation } from "@common/commonFunction";

import { useQuery } from '@tanstack/react-query'
import SimpleBar from "simplebar-react";

const JobApplicantList = () => {
  const router = useRouter();
  const [jobApplicantListData, setJobApplicantListData] = useState<any[]>([]);
  const [companyList, setCompanyList] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>({});




  const handleAddButtonClick = () => {
    router.push("/pages/employee/job_applicant/newJobApplicant");
  };

  const getEmployees = async (id:string) => {
    try {
      await axiosInstance
        .get(`/employee/employeedetails/list_of_job_applicant/${id}`)
        .then((res: any) => {
          if (res.status === 200) {
            setJobApplicantListData(res.data.data);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  // useEffect(() => {console.log(jobApplicantListData)}, [jobApplicantListData]);

  

  const { isPending, error, data } = useQuery({
    queryKey: ["jobApplicantList"],
    queryFn: () =>
      axiosInstance.get("setup/company/list_of_companies").then((res) => {
        let rsData = res.data.data;
        setCompanyList(rsData);
        setSelectedCompany(rsData[0]);
        getEmployees(rsData[0].hrms_company_id);

        return res.data.data;
      }),
  });
    


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
          return cellProps.id
        },
      },
      {
        Header: "Job Applicant",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.applicant_name;
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
                router.push({
                  pathname: "/pages/employee/job_applicant/newJobApplicant",
                  query: {
                    EmpId: cellProps.hrms_company_job_applicant_id,
                  },
                });
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

  return (
    <React.Fragment>
      <Head>
        <title>Job Applicant List</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Job Applicant" />
          <div className="text-end m-2">
            <Button type="button" className="btn-sm" onClick={handleAddButtonClick}>
              <i className="ri-add-line align-bottom me-1"></i>
              Add Job Applicant
            </Button>
          </div>

          {/* ______________________Table_____________________ */}

          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Job Applicant
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
                                    getEmployees(x.hrms_company_id);
                                    setSelectedCompany(x);
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
                    data={jobApplicantListData || []}
                    isPagination={true}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={5}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Search Applicant..."
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

JobApplicantList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default JobApplicantList;
