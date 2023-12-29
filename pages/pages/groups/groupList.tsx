import React, { ReactElement, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import TableContainer from "@common/TableContainer";
import { useRouter } from "next/router";
import axiosReqInstance from "../../../lib/apiInterceptor";
import { useDispatch } from "react-redux";
import { updateGroup } from "Components/slices/group/reducer";

const GroupList = () => {
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [modal_standard, setmodal_standard] = useState<boolean>(false);
  const [groupList, setGroupListData] = useState([]);

  const dispatch: any = useDispatch();
  useEffect(() => {
    getGroupdata();
  }, []);

  function tog_standard() {
    setmodal_standard(!modal_standard);
  }

  const columns = useMemo(
    () => [
      {
        Header: "Group Name",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.group_name;
        },
      },
      {
        Header: "Created On",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.group;
        },
      },
      {
        Header: "Total Members",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.users.length;
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return (
            <div>
              <i
                onClick={() => editGroupRoute(cellProps)}
                className="ri-pencil-line"
              ></i>
            </div>
          );
        },
      },
    ],
    []
  );

  const staticData = [
    {
      id: "Salt-Tech Software Services LLP",
      group: "Manager",
      createDate: "2023-10-09",
      parentCompany: "Parent Company",
    },
    {
      id: "Salt-Tech Software Services LLP",
      group: "Admin",
      createDate: "2023-10-09",
      parentCompany: "",
    },
    {
      id: "Salt-Tech Software Services LLP",
      group: "User",
      createDate: "2023-10-09",
      parentCompany: "Parent Company",
    },
    {
      id: "Salt-Tech Software Services LLP",
      group: "Team Leader",
      createDate: "2023-10-09",
      parentCompany: "Parent Company",
    },
    {
      id: "Salt-Tech Software Services LLP",
      group: "HR",
      createDate: "2023-10-09",
      parentCompany: "Parent Company",
    },
  ];

  const createGroup = () => {
    router.push("/pages/groups/groupForm");
  };

  const formSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
  };

  const getGroupdata = async () => {
    let app_id = "c98e1e7e-ed72-4d30-ba3f-fc465900f8fb";

    try {
      await axiosReqInstance
        .get("/user/user_groups/" + app_id)
        .then((res: any) => {
          setGroupListData(res.data.data);
        })
        .catch((error) => console.log(error));
    } catch (error) {}
  };

  const editGroupRoute = async (data: any) => {
    dispatch(updateGroup(data));
    router.push(`/pages/groups/groupForm?groupId=${data.group_id}`);
  };

  return (
    <React.Fragment>
      <Head>
        <title>GroupList</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Group List" />
          <div className="text-end m-2">
            <Button
              type="submit"
              className="btn-sm mx-4"
              variant="primary"
              onClick={createGroup}
            >
              <i className="ri-add-line align-bottom me-1"></i>Add Group
            </Button>
          </div>

          {/* ______________________Table_____________________ */}
          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">Group List</h5>
                </Card.Header>
                <Card.Body>
                  <TableContainer
                    columns={columns || []}
                    data={groupList || []}
                    isPagination={true}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={5}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Search group..."
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
        id="myModal"
        show={modal_standard}
        onHide={() => {
          tog_standard();
        }}
      >
        <Form
          noValidate
          validated={validated}
          autoComplete="off"
          onSubmit={formSubmit}
        >
          <Modal.Header className="modal-title fw-bold" id="myModalLabel">
            Send Invite Email
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="text" placeholder="" />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          </Modal.Body>
          <div className="modal-footer">
            <Button
              color="light"
              onClick={() => {
                tog_standard();
              }}
            >
              Close
            </Button>
            <Button color="primary">Send Invite</Button>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

GroupList.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default GroupList;
