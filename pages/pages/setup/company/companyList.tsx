import React, {
  ReactElement,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
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
} from "react-bootstrap";
import TableContainer from "@common/TableContainer";
import { useRouter } from "next/router";
import axiosInstance from "../../../../lib/api";
import { updateCompany } from "Components/slices/company/reducer";
import { useDispatch } from "react-redux";

const CompanyList = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const [companyDetails, setCompanyDetails] = useState([]);

  useEffect(() => {
    getCompanyDetails();
  }, []);

  const getCompanyDetails = async () => {
    const companyDetails = await axiosInstance
      .get("setup/company/list_of_companies")
      .then((response: any) => {
        if (response.status == 200) {
          setCompanyDetails(response?.data?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddButtonClick = () => {
    router.push("/pages/setup/company/companyForm/companyForm");
  };
  const updateCompanyRoute = (data: any) => {
    console.log("reducer data send--->", data);
    dispatch(updateCompany(data));

    router.push(
      `/pages/setup/company/companyForm/companyForm?companyId=${data.hrms_company_id}`
    );
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.company_name;
        },
      },
      {
        Header: "Country",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.country;
        },
      },
      {
        Header: "Parent Company",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.parent_company;
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return (
            <i
              className="ri-pencil-line"
              onClick={() => {
                updateCompanyRoute(cellProps);
              }}
            ></i>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Head>
        <title>Company List</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Company List" />
          <div className="text-end m-2">
            <Button
              type="submit"
              className="btn-sm mx-4"
              variant="primary"
              onClick={handleAddButtonClick}
            >
              <i className="ri-add-line align-bottom me-1"></i>Add Company
            </Button>
          </div>

          {/* ______________________Table_____________________ */}
          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">Company List</h5>
                </Card.Header>
                <Card.Body>
                  <TableContainer
                    columns={columns || []}
                    data={companyDetails || []}
                    isPagination={true}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={5}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Search Company..."
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

CompanyList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default CompanyList;
