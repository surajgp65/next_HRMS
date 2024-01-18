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
import { useDispatch } from "react-redux";
import { updateHoliday } from "Components/slices/company/reducer";

const initialState = {
  designation: "",
  hrms_company_designation_id: null,
  hrms_company_id: null,
};

const HolidayList = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [modal_grid, setmodal_grid] = useState(false);
  const [holidayList, setHolidayList] = useState<any[]>([]);

  useEffect(() => {
    getHolidayList();
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
          return cellProps.holiday_list_name;
        },
      },
      {
        Header: "Holiday name",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.holiday_list_name;
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

  const goToHolidayForm = () => {
    dispatch(updateHoliday({ idEdit: false }));
    router.push("/pages/setup/company/companyForm/newHoliday");
  };

  const sendReducerData = (data: any) => {
    data.isEdit = true;

    console.log(data);
    dispatch(updateHoliday(data));
    router.push("/pages/setup/company/companyForm/newHoliday");
  };

  const getHolidayList = async () => {
    try {
      await axiosInstance
        .get("/setup/company/get_holidays")
        .then((res: any) => {
          if (res.status === 200) {
            setHolidayList(res.data.data);
          }
        });
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head>
        <title>Holiday List</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="" />
          <div className="text-end m-2">
            <Button
              className="btn-sm"
              variant="primary"
              onClick={goToHolidayForm}
            >
              <div className="d-flex justify-content-center align-items-center">
                <i className="ri-add-line align-bottom me-1"></i>Add new Holiday
              </div>
            </Button>
          </div>

          {/* ______________________Table_____________________ */}
          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">Holiday List</h5>
                </Card.Header>
                <Card.Body>
                  <TableContainer
                    columns={columns || []}
                    data={holidayList || []}
                    isPagination={true}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={5}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Search Holiday..."
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

HolidayList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default HolidayList;
