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
import SimpleBar from "simplebar-react";
import { useDispatch } from "react-redux";
import { updateAttendance } from "Components/slices/attendance/reducer";

const AttendanceList = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();

  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [companyList, setCompanyList] = useState<any[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>({});

  useEffect(() => {
    getCompanyDetails();
  }, []);

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
          return <></>;
        },
      },
      {
        Header: "Series",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps?.series;
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
        Header: "Attendance Date",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.attendance_date;
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
                sendReducerData(cellProps);
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

  const sendReducerData = (data: any) => {
    data.isEdit = true;
    dispatch(updateAttendance(data));
    router.push("/pages/attendance/attendance/attendanceForm/attendanceForm");
  };

  const handleAddButtonClick = () => {
    dispatch(updateAttendance({ isEdit: false }));
    router.push("/pages/attendance/attendance/attendanceForm/attendanceForm");
  };

  const getAttendanceList = async (id: any) => {
    try {
      await axiosInstance
        .get("/attendance/attendance/list_of_employee_attendance/" + id)
        .then((res: any) => {
          if (res.status === 200) {
            let data = res.data.data;
            setAttendanceList(data);
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
            let data = response.data.data;
            setCompanyList(data);
            getAttendanceList(data[0].hrms_company_id);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head>
        <title>Attendance List</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Attendance" />
          <div className="text-end m-2">
            <Button
              type="button"
              className="btn-sm"
              onClick={handleAddButtonClick}
            >
              <i className="ri-add-line align-bottom me-1"></i>Add Attendance
            </Button>
          </div>
          {/* <Button variant="primary" onClick={() => tog_grid()}>
                        Add Branch
                    </Button> */}

          {/* ______________________Table_____________________ */}
          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Attendance List
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
                                    getAttendanceList(x.hrms_company_id);
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
                    data={attendanceList || []}
                    isPagination={true}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={5}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Search Attendance..."
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

AttendanceList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default AttendanceList;
