import React, { ReactElement, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import TableContainer from "@common/TableContainer";
import SimpleBar from "simplebar-react";
import axiosReqInstance from "../../../lib/apiInterceptor";

const InvitePage = () => {
  useEffect(() => {
    getGroupdata();
  }, []);

  const [validated, setValidated] = useState(false);
  const [modal_large, setmodal_standard] = useState<boolean>(false);
  const [inviteEmail, setInviteData] = useState("");
  const [groupList, setGroupListData] = useState([]);

  function tog_standard() {
    setmodal_standard(!modal_large);
  }

  const columns = useMemo(
    () => [
      {
        Header: "Email",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.email;
        },
      },
      {
        Header: "Role",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.group;
        },
      },
      {
        Header: "Date",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.parent_company;
        },
      },
      {
        Header: "Re-Invite",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return <i className="ri-refresh-line"></i>;
        },
      },
    ],
    []
  );

  const staticData = [
    {
      email: "xox@gmail.com",
      country: "India",
      createDate: "2023-10-09",
      parentCompany: "Parent Company",
    },
    {
      email: "sos@gmail.com",
      country: "India",
      createDate: "2023-10-09",
      parentCompany: "",
    },
    {
      email: "pop@gmail.com",
      country: "India",
      createDate: "2023-10-09",
      parentCompany: "Parent Company",
    },
    {
      email: "oxo@gmail.com",
      country: "India",
      createDate: "2023-10-09",
      parentCompany: "",
    },

    // Add more objects as needed
  ];

  const formSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
  };

  const [selectedGroupOption, setGroupOption]: any = useState({});

  const handleGroupOptionClick = (option: any) => {
    setGroupOption(option);
  };

  const sendInvite = async () => {
    let app_id = "c98e1e7e-ed72-4d30-ba3f-fc465900f8fb";

    let rqData = {
      user_email: inviteEmail,
      group_id: selectedGroupOption.group_id,
    };

    // return;
    await axiosReqInstance
      .post("/user/invite_user/" + app_id, rqData)
      .then((res: any) => {});
  };

  const handelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: any = event.target;
    setInviteData(value);
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

  return (
    <React.Fragment>
      <Head>
        <title>InvitePage</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="Invite Group" />
          <div className="text-end m-2">
            <Button
              type="submit"
              className="btn-sm mx-4"
              variant="primary"
              onClick={() => tog_standard()}
            >
              <i className="ri-add-line align-bottom me-1"></i>Add Invite
            </Button>
          </div>

          {/* ______________________Table_____________________ */}
          <Row>
            <Col lg={12}>
              <Card id="apiKeyList">
                <Card.Header className="d-flex align-items-center">
                  <h5 className="card-title flex-grow-1 mb-0">
                    Invite Group List
                  </h5>
                </Card.Header>
                <Card.Body>
                  <TableContainer
                    columns={columns || []}
                    data={staticData || []}
                    isPagination={true}
                    isGlobalFilter={true}
                    iscustomPageSize={false}
                    isBordered={false}
                    customPageSize={5}
                    className="custom-header-css table align-middle table-nowrap"
                    tableClassName="table-centered align-middle table-nowrap mb-0"
                    theadClassName="text-muted table-light"
                    SearchPlaceholder="Search User..."
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
        size="lg"
        show={modal_large}
        onHide={() => {
          tog_standard();
        }}
        centered
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
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="user_email"
                  type="text"
                  value={inviteEmail}
                  onChange={handelInputChange}
                  placeholder="Enter Email Id here"
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>Group</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    value={selectedGroupOption.group_name}
                    name="group_id"
                    readOnly
                    placeholder="Choose Group"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {groupList.map((groupOption: any, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => handleGroupOptionClick(groupOption)}
                        >
                          {groupOption.group_name}
                        </Dropdown.Item>
                      ))}
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
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
            <Button color="primary" onClick={sendInvite}>
              Send Invite
            </Button>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

InvitePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default InvitePage;
