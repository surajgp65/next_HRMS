import React, {
  ReactElement,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import TableContainer from "@common/TableContainer";
import Head from "next/head";
import { useRouter } from "next/router";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import {
  Row,
  Col,
  Form,
  Button,
  Card,
  Dropdown,
  Modal,
  Container,
} from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import styles from "./newHoliday.module.css";
import SimpleBar from "simplebar-react";
import Flatpickr from "react-flatpickr";
import axiosInstance from "lib/api";
import { ToastSuccess } from "@common/toast";
import { useSelector } from "react-redux";

const initialState = {
  hrms_company_id: "",
  holiday_list_name: "",
  from_date: "",
  to_date: "",
  weekly_off: "",
};

const holidayInitial = {
  hrms_company_id: "",
  holiday_list_name_id: "",
  date: "",
  description: "",
  is_half_day: false,
  start_time: null,
  shift_end_time: null,
};

const NewHoliday = () => {
  const router = useRouter();
  const [validated, setValidated] = useState(false);

  // Table constants
  const [apikey, setApiKey] = useState<any>();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [issubmitBtn, setsubmitBtn] = useState<boolean>(false);
  const [isRegenerateAPI, setIsRegenerateAPI] = useState<boolean>(false);
  const [isGenerateAPIKey, setIisGenerateAPIKey] = useState<any>();

  const [apiKeyName, setApiKeyName] = useState<any>();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const [holidayData, setHolidayData] = useState(initialState);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [holidayGroupList, setholidayGroupList] = useState<any[]>([]);
  const [newHoliday, setNewHoliday] = useState({});

  // Date
  const date: any = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const todaysDate = date.getDate();
  const currentDate = todaysDate + "-" + month + "-" + year;

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {}, [holidayData]);

  useEffect(() => {
    setReducerData();
  }, []);

  const { holiday } = useSelector((state: any) => ({
    holiday: state?.Company?.holiday,
  }));

  const setReducerData = () => {
    if (holiday) {
      let holidaydata: any = holiday;

      console.log(
        "holidaydata -->",
        holidaydata.from_date,
        holidaydata.to_date
      );
      for (const key in holidaydata) {
        if (typeof holidaydata[key] === "object" && holidaydata[key] !== null) {
          if (holidaydata.list_data) {
            setholidayGroupList(holidaydata[key]);
          }
        } else {
          setHolidayData((prev: any) => ({
            ...prev,
            [key]: holidaydata[key],
          }));
        }
      }
    }
  };

  const toggle = useCallback(() => {
    if (modalShow) {
      setModalShow(false);
      setIsEdit(false);
      setsubmitBtn(false);
      setIsRegenerateAPI(false);
      setApiKey(null);
      setIisGenerateAPIKey(null);
      setApiKeyName(null);
    } else {
      setModalShow(true);
      // setApiKey(null)
    }
  }, [modalShow]);

  const toggleDelete = () => {
    setDeleteModal(false);
    setApiKey(null);
  };

  const handleDeleteAPIKey = () => {
    if (apikey) {
      // dispatch(onDeleteAPIKey(apikey.id));
      setDeleteModal(false);
      setApiKey(null);
    }
  };

  // Validation Form
  const validation: any = useFormik({
    initialValues: {
      description: "",
      date: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Please enter a description."),
    }),
    onSubmit: (values) => {
      let holiday_list_name_id = "";
      if (holidayGroupList.length > 0) {
        holiday_list_name_id = holidayGroupList[0].holiday_list_name_id;
      }

      const bodyData = {
        description: values.description,
        date: changeDateFormat(values.date),
        holiday_list_name_id: holiday_list_name_id,
      };
      setholidayGroupList((prevData: any) => [...prevData, bodyData]);
      toggle();
    },
  });

  // Functions
  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

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
        Header: "No.",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any, index: any) => {
          return index + 1;
        },
      },
      {
        Header: "Date",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.date;
        },
      },
      {
        Header: "Description",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.description;
        },
      },

      {
        Header: "Action",
        disableFilters: true,
        accessor: (cellProps: any) => {
          return (
            <Dropdown>
              <Dropdown.Toggle
                as="a"
                className="btn btn-soft-secondary btn-sm arrow-none"
              >
                <i className="ri-more-fill align-middle"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu
                as="ul"
                className="dropdown-menu-end"
                style={{
                  position: "absolute",
                  inset: "0px 0px auto auto",
                  margin: "0px",
                  transform: "translate(-73px, 33px)",
                }}
              >
                <li>
                  <Dropdown.Item className="edit-item-btn" href="#">
                    Edit
                  </Dropdown.Item>
                </li>
                {/* <li><Dropdown.Item className="regenerate-api-btn" href="#" >Regenerate Key</Dropdown.Item></li> */}
                <li>
                  <Dropdown.Item className="remove-item-btn" href="#">
                    Delete
                  </Dropdown.Item>
                </li>
                <li>
                  <Dropdown.Item className="disable-btn" href="#">
                    {cellProps.status === "Active" ? "Disable" : "Enable"}
                  </Dropdown.Item>
                </li>
              </Dropdown.Menu>
            </Dropdown>
          );
        },
      },
    ],
    []
  );

  const setToDateRange = (date: any, name: any) => {
    date = changeDateFormat(date);
    setToDate(date);
    setHolidayData((data) => ({ ...data, [name]: date }));
  };

  const setAllData = (name: any, value: any, date?: boolean) => {
    if (date) {
      value = changeDateFormat(date);
    }
    setHolidayData((data) => ({ ...data, [name]: value }));
  };

  const changeDateFormat = (date: any) => {
    let newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1; // Months are zero-indexed
    const year = newDate.getFullYear().toString();

    const dayFormatted = day < 10 ? "0" + day : day;
    const monthFormatted = month < 10 ? "0" + month : month;

    const dateFormatted = `${dayFormatted}-${monthFormatted}-${year}`;
    return dateFormatted;
  };

  const handelInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: any = event.target;

    setHolidayData((data) => ({ ...data, [name]: value }));
  };

  const weekOffDropDown = (option: any) => {
    setHolidayData((data) => ({ ...data, weekly_off: option }));
  };

  const getHolidayListData = async () => {
    try {
      const bodyData = changeDatavalue(holidayData);

      await axiosInstance
        .post("/setup/company/list_of_holidays", bodyData)
        .then((res: any) => {
          if (res.status === 200) {
            setholidayGroupList(res.data);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const changeDatavalue = (data: any) => {
    const bodyData: any = { ...data };

    Object.keys(bodyData).forEach((key) => {
      if (bodyData[key] == "") {
        bodyData[key] = null;
      }
    });

    return bodyData;
  };

  const addNewHoliday = async () => {
    try {
      // let rqData = holidayGroupList;

      holidayGroupList.map((x: any) => {
        x.is_half_day = false;
        x.start_time = null;
        x.shift_end_time = null;
        return x;
      });

      await axiosInstance
        .post("/setup/company/add_new_holiday_list", holidayGroupList)
        .then((res: any) => {
          ToastSuccess(res.data.message);
          router.push("/pages/setup/holidays/holidayList");
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const updateHoliday = async () => {
    try {
      let data = holidayGroupList.map((item: any) => {
        const updatedItem = { ...item };
        updatedItem.is_half_day = false;
        updatedItem.start_time = null;
        updatedItem.shift_end_time = null;

        return updatedItem;
      });
      setholidayGroupList(data);
      updateholidayData(data);
    } catch (error) {}
  };

  const updateholidayData = async (listData: any) => {
    try {
      await axiosInstance
        .put(
          "/setup/company/update_holiday_list/" + holiday.holiday_list_name_id,
          listData
        )
        .then((res: any) => {
          if (res.status === 200) {
            ToastSuccess(res.data.message);
            router.push("/pages/setup/holidays/holidayList");
          }
        });
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head>
        <title>
          {holiday.isEdit ? "Update Holiday list" : "Add New Holiday"}
        </title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="New Holiday List" />

          <Form noValidate validated={validated}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="holiday_list_name">
                <Form.Label>Holiday List Name</Form.Label>
                <Form.Control
                  type="text"
                  name="holiday_list_name"
                  placeholder="Holiday name..."
                  value={holidayData.holiday_list_name}
                  onChange={handelInputChange}
                  disabled={holiday.isEdit}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid value.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="totalHoliday">
                <Form.Label>Total Holidays</Form.Label>
                <Form.Control
                  type="text"
                  name="totalHoliday"
                  placeholder="0"
                  value={holidayGroupList?.length}
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid leave type
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="from_date">
                <Form.Label>From Date</Form.Label>
                <Flatpickr
                  className="form-control"
                  name="from_date"
                  options={{
                    dateFormat: "d-m-Y",
                  }}
                  value={holidayData.from_date}
                  onChange={(date: any) => {
                    setAllData("from_date", date[0], true);
                  }}
                  disabled={holiday.isEdit}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Date.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="to_date">
                <Form.Label>To Date</Form.Label>
                <Flatpickr
                  className="form-control"
                  name="to_date"
                  options={{
                    dateFormat: "d-m-Y",
                  }}
                  value={holidayData.to_date}
                  onChange={(date: any) => {
                    setAllData("to_date", date[0], true);
                  }}
                  disabled={holiday.isEdit}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid Date.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* conditional */}
            <h5 style={{ paddingTop: "1rem" }}>Add Weekly Holidays</h5>
            <Row>
              <Form.Group as={Col} md="6" controlId="weeklyHolidays">
                <Form.Label className="form-label">Weekly Holidays</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder="Select Day"
                    value={holidayData.weekly_off}
                    name="weekly_off"
                    readOnly
                    disabled={holiday.isEdit}
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {weekDays.map((item: any, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => weekOffDropDown(item)}
                        >
                          {item}
                        </Dropdown.Item>
                      ))}
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control.Feedback type="invalid">
                  Please choose an option.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <br />
            <Button
              className="btn-sm"
              disabled={holiday.isEdit}
              onClick={getHolidayListData}
            >
              Add to holidays
            </Button>

            <br />
            <br />

            {/* ______________________Table_____________________ */}
            <Row>
              <Col lg={12}>
                <Card id="apiKeyList">
                  <Card.Header className="d-flex align-items-center">
                    <h5 className="card-title flex-grow-1 mb-0">
                      Holiday List
                    </h5>
                    <div className="d-flex gap-1 flex-wrap">
                      <Button type="button" className="btn-sm" onClick={toggle}>
                        <i className="ri-add-line align-bottom me-1"></i>Add New
                        Row
                      </Button>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <TableContainer
                      columns={columns || []}
                      data={holidayGroupList || []}
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

            <footer className={styles.footer}>
              <Card className="w-100 rounded-0 p-2">
                <div className={styles.footerContent}>
                  <Button
                    variant="success"
                    onClick={holiday.isEdit ? updateHoliday : addNewHoliday}
                    className="btn-sm mx-4"
                  >
                    {holiday.isEdit ? "Update" : "Submit"}
                  </Button>
                  <button type="button" className="btn btn-sm btn-light">
                    Reset
                  </button>
                </div>
              </Card>
            </footer>
          </Form>
        </Container>
      </div>

      {/*__________________ The POP UP Modal Code __________________ */}

      <Modal
        id="api-key-modal"
        className="fade"
        show={modalShow}
        onHide={toggle}
        contentClassName="border-0"
        centered
      >
        <Modal.Header className="p-4 pb-0" closeButton>
          <Modal.Title id="exampleModalLabel" className="fs-5 fw-bold">
            Add New Holiday
          </Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
          autoComplete="off"
        >
          <Modal.Body>
            <div
              id="api-key-error-msg"
              className="alert alert-danger py-2 d-none"
            >
              Please enter all fields
            </div>
            <input type="hidden" id="apikeyId" />
            <div className="mb-3">
              <Form.Label className="form-label">
                Description<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="description"
                type="text"
                className="form-control"
                id="description"
                placeholder="Enter Description"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.description || ""}
                isInvalid={
                  validation.touched.description &&
                  validation.errors.description
                    ? true
                    : false
                }
              />
              {validation.touched.description &&
              validation.errors.description ? (
                <Form.Control.Feedback type="invalid">
                  {validation.errors.description}
                </Form.Control.Feedback>
              ) : null}

              <Form.Label className="form-label">
                Date<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="date"
                type="date"
                className="form-control"
                id="api-key-date"
                placeholder="Enter Date"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.date || ""}
                isInvalid={
                  validation.touched.date && validation.errors.date
                    ? true
                    : false
                }
              />

              {validation.touched.date && validation.errors.date ? (
                <Form.Control.Feedback type="invalid">
                  {validation.errors.date}
                </Form.Control.Feedback>
              ) : null}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="hstack gap-2 justify-content-end">
              <Button variant="secondary" type="button" onClick={toggle}>
                Close
              </Button>

              <Button variant="primary" type="submit">
                Add row
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        id="deleteApiKeyModal"
        className="fade zoomIn"
        show={deleteModal}
        onHide={toggleDelete}
        centered
      >
        <Modal.Header className="p-4 pb-0 m-2" closeButton />
        <Modal.Body>
          <div className="mt-2 text-center">
            {/* <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style="width:100px;height:100px"></lord-icon> */}
            <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
              <h4>Are you sure ?</h4>
              <p className="text-muted mx-4 mb-0">
                Are you sure you want to remove this API Key ?
              </p>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
            <Button
              variant="danger"
              type="button"
              className="btn w-sm"
              id="delete-record"
              onClick={handleDeleteAPIKey}
            >
              Yes, Delete It!
            </Button>
            <Button
              variant="light"
              type="button"
              className="btn w-sm"
              onClick={toggleDelete}
            >
              Close
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

NewHoliday.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default NewHoliday;
