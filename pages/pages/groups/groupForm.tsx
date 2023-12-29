import React, { ReactElement, useState, useEffect, useMemo } from "react";
import type { GetStaticProps } from "next";
import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Dropdown,
  ListGroup,
  Card,
} from "react-bootstrap";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import { useRouter } from "next/router";

import TableContainer from "@common/TableContainer";
import axiosReqInstance from "lib/apiInterceptor";
import { useSelector } from "react-redux";

const initialState = {
  group_name: "",
  permissions: [
    {
      feature_id: "",
      action_id: [""],
    },
  ],
};
const GroupPermission = () => {
  const staticData = [
    {
      permission: "Setup",
      value: false,
      id: 1,
    },
    {
      permission: "Setting",
      value: false,
      id: 2,
    },
    {
      permission: "Dashboard",
      value: true,
      id: 3,
    },
    {
      permission: "Profile",
      value: false,
      id: 4,
    },

    // Add more objects as needed
  ];

  const router = useRouter();
  const { groupId }: any = router.query;
  const [validated, setValidated] = useState(false);
  const [permissionMenuList, setPermissionMenuList] = useState([]);
  const [permissionList, setPermissionList] = useState<any>({
    actions: [],
  });
  const [formData, setFormData] = useState(initialState);
  const [setPermissionsData, setPermissionListdata] = useState(initialState);
  const [filteredPermission, setfilteredPermission] = useState<any>([]);
  const [activeItem, setActiveItem] = useState(null);

  const handelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var { name, value }: any = event.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const { group } = useSelector((state: any) => ({
    group: state.Group.group,
  }));

  useEffect(() => {
    getCompanyDetails(groupId);
    getPermissionList();
  }, [formData, permissionList]);

  const formSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    setFormData((data) => ({ ...data, permissions: filteredPermission }));

    const form = event.currentTarget;
    // return;
    try {
      let app_id = "c98e1e7e-ed72-4d30-ba3f-fc465900f8fb";
      await axiosReqInstance
        .post("/user/create_group/" + app_id, formData)
        .then((res: any) => {})
        .catch((error) => {});
    } catch (error) {}
  };

  const getPermissionList = async () => {
    let app_id = "c98e1e7e-ed72-4d30-ba3f-fc465900f8fb";

    try {
      await axiosReqInstance
        .get("/user/get_features_and_actions/" + app_id)
        .then((res: any) => {
          if (res.status === 200) {
            let data = res.data.data;

            setPermissionMenuList(data);

            let result = data.map((e: any) => {
              return {
                feature_id: e.feature_id,
                action_id: [],
              };
            });

            setfilteredPermission(result);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const showPermissionList = (list: any) => {
    setPermissionList([]);
    setActiveItem(list.feature_id);
    setPermissionList(list);


    // for (let i = 0; i < permissionList.length; i++) {
    //   const el = permissionList[i];
    //   el.actions.map((x: any) => {
    //     let htmlTag: any = document.getElementById(x.action_id);
    //     if (htmlTag) htmlTag.checked = false;
    //   });
    // }
  };

  const selectActionData = (data: any) => {
    const dIndex = filteredPermission.findIndex(
      (e: any) => e.feature_id == permissionList.feature_id
    );

    let preIndex = filteredPermission[dIndex].action_id.indexOf(data.action_id);

    if (preIndex != -1) {
      filteredPermission[dIndex].action_id.splice(preIndex, 1);
    } else {
      filteredPermission[dIndex].action_id.push(data.action_id);
    }

    setfilteredPermission(filteredPermission);
    setFormData((data) => ({ ...data, permissions: filteredPermission }));
  };

  const checkPermission = (data: any) => {
    const foundPermission = filteredPermission.permissions?.find(
      (permission: any) => permission.action_id.includes(data.action_id)
    );
    return foundPermission !== undefined;
  };

  const getCompanyDetails = async (data: any) => {
    try {
      if (!data) return;
      let app_id = "c98e1e7e-ed72-4d30-ba3f-fc465900f8fb";

      await axiosReqInstance
        .post(`/user/group_details/${app_id}/${data}`)
        .then((res: any) => {})
        .catch((error) => {});
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head>
        <title>Group Form</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb
            breadcrumb="Pages"
            listProps={{ className: "p-0" }}
            breadcrumbItem="Group Permissions"
          />
          <hr className="hr hr-blurry"></hr>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="validationCustom03">
                <Form.Label>Group Name</Form.Label>
                <Form.Control
                  name="group_name"
                  type="text"
                  placeholder="Enter Group name here..."
                  value={formData.group_name}
                  onChange={handelInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="text-end m-2 align-self-center">
              <Button
                type="submit"
                className="btn-sm mx-4"
                variant="primary"
                onClick={formSubmit}
              >
                <i className="ri-save-line align-bottom me-1"></i>Save
              </Button>
            </Col>
          </Row>

          {/* FORM */}
          <Row className="mb-3">
            <Col sm={4}>
              <Card>
                <Card.Body>
                  <ListGroup as="ul">
                    {permissionMenuList.map((item: any, index) => (
                      <ListGroup.Item
                        key={index}
                        as="li"
                        className={`${
                          activeItem === item.feature_id && item.parent != null
                            ? "list-group-item list-group-item-action active"
                            : "list-group-item list-group-item-action"
                        } ${item.parent == null ? "fw-bold" : "ps-5"}`}
                        disabled={item.parent == null}
                        onClick={() => showPermissionList(item)}
                      >
                        {item.feature_name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={8}>
              <Card>
                <Card.Header>
                  <h5 className="card-title text-uppercase mb-0 font-weight-bold">
                    Group Permission List
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Form
                    noValidate
                    validated={validated}
                    autoComplete="off"
                    id="permission_form"
                    onSubmit={formSubmit}
                  >
                    {permissionList.actions.map((item: any, index: any) => (
                      <Row key={index} className="p-2">
                        <Col md={8}>{item.action_name}</Col>
                        <Col md={4}>
                          <div className="form-check form-switch mb-1">
                            <Form.Check
                              type="checkbox"
                              role="switch"
                              id={item.action_id}
                              onChange={() => selectActionData(item)}
                            />
                            {/* value={item.action_id} */}
                            {/* checked={checkPermission(item)} */}

                            {/* value={item.action_id} */}
                            {/* <Form.Label htmlFor="SwitchCheck3"></Form.Label> */}
                          </div>
                        </Col>
                      </Row>
                    ))}
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

GroupPermission.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default GroupPermission;
