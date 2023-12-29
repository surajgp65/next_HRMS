import React, { ReactElement, useState, useEffect, useRef } from "react";
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
  Modal,
} from "react-bootstrap";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import { useRouter } from "next/router";
import Flatpickr from "react-flatpickr";
import SimpleBar from "simplebar-react";
import Image from "next/image";
import axiosInstance from "../../../../../lib/api";

// Country Data
import country from "@common/data/country-list";
import { useSelector } from "react-redux";
import { ToastSuccess } from "@common/toast";

// Define the types for country and selected option

interface initState {
  company_name: string;
  abbr: string;
  currency: string;
  country: string;
  tax_id: string;
  domain: string;
  date_of_establishment?: string;
  parent_company: string;
  hrms_company_holiday_list_id: string;
  hrms_company_letter_head_id: string;
}

const initialState = {
  company_name: "",
  abbr: "",
  currency: "",
  country: "",
  tax_id: "",
  domain: "",
  date_of_establishment: "",
  parent_company: "",
  hrms_company_holiday_list_id: "",
  hrms_company_letter_head_id: "",
};

const currency = ["INR", "USD", "EUR", "AUD", "CAD"];

const CompanyForm = () => {
  const router = useRouter();
  const { companyId } = router.query;
  const isMounted = useRef(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [validated, setValidated] = useState(false);

  const [companyDetails, setCompanyDetails] = useState<initState>({
    company_name: "",
    abbr: "",
    currency: "",
    country: "",
    tax_id: "",
    domain: "",
    date_of_establishment: "",
    parent_company: "",
    hrms_company_holiday_list_id: "",
    hrms_company_letter_head_id: "",
  });

  // Holiday Dropdown
  const [selectedHolidayOption, setSelectedHolidayOption] = useState("");
  const handleHolidayOptionClick = (option: any) => {
    setSelectedHolidayOption(option);
  };
  const [selectedLetterHeadOption, setSelectedLetterHeadOption]: any = useState(
    {}
  );

  const { company, isEditCompany } = useSelector((state: any) => ({
    company: state?.Company?.company,
    isEditCompany: state?.Company?.isEdit,
  }));

  // Country Change States
  const [seletedCountry, setseletedCountry] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [letterHeadData, setLetterHeadData] = useState<any[]>([]);
  const [holidatList, setHolidayList] = useState([]);
  const [modal_standard, setmodal_standard] = useState<boolean>(false);

  const [letterHead, setLetterHead] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  // Functions
  useEffect(() => {
    setCompanyDetails(initialState);
    if (!isMounted.current) {
      getHolidays();
      getLetterHead();
    }
    isMounted.current = true;
    setReducerData();
  }, [company]);

  const setReducerData = () => {
    if (companyId) {
      getCompanyDetails(companyId);
    }

    setCompanyDetails(company);

    console.log("reducer -->", company, isEditCompany);
    setIsEdit(isEditCompany);
    handleHolidayOptionClick(company?.holiday_list?.holiday_list_name);

    if (company?.holiday_list) {
      const name = "hrms_company_holiday_list_id";
      setDataFromDropDown(
        company?.holiday_list?.hrms_company_holiday_list_id,
        name
      );
    }

    if (company?.letter_head) {
      setSelectedLetterHeadOption(company?.letter_head);
      const name = "hrms_company_letter_head_id";
      setDataFromDropDown(
        company?.letter_head?.hrms_company_letter_head_id,
        name
      );
    }
    if (company.date_of_establishment) {
      let value: any = new Date(company.date_of_establishment);
      let name = "date_of_establishment";

      setSelectedDate(value);

      setCompanyDetails((data) => ({
        ...data,
        [name]: value,
      }));
    }

    setCompanyDetails((data: any) => {
      if (data.holiday_list || data.letter_head) {
        delete data.holiday_list;
        delete data.letter_head;
      }
      return data;
    });

    console.log("reduces companyDetails --->", companyDetails);
  };

  const getLetterHead = async () => {
    try {
      const result = await axiosInstance
        .get("setup/company/list_of_letterhead")
        .then((response: any) => {
          if (response.status == 200) {
            setLetterHeadData(response.data.data);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {}
  };

  // Change in the Option
  const handleCreateNewHolidayClick = () => {
    router.push("/pages/setup/company/companyForm/newHoliday");
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
    if (selectedDate != null) {
      let date = changeDateFormat(selectedDate[0]);
      setCompanyDetails((data) => ({ ...data, date_of_establishment: date }));
    }
    const { name, value }: any = event.target;

    setCompanyDetails((data) => ({ ...data, [name]: value }));
  };

  const updateCompanyDetails = (companyData: any) => {
    const updatedCompanyDetails: any = { ...companyData };

    Object.keys(updatedCompanyDetails).forEach((key) => {
      if (updatedCompanyDetails[key] == "") {
        updatedCompanyDetails[key] = null;
      }
    });

    return updatedCompanyDetails;
  };

  const formSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (!companyDetails.country || !companyDetails.currency) {
      // Set the validation state to show the error message
      setValidated(true);
      return;
    }

    try {
      const bodyData = updateCompanyDetails(companyDetails);

      // return;

      console.log(bodyData);

      const result = await axiosInstance
        .post("setup/company/add_company", bodyData)
        .then((response: any) => {
          if (response.status === 200) {
            setCompanyDetails(initialState);
            ToastSuccess(response.data.message);
            router.push("/pages/setup/company/companyList");
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
      setValidated(true);
    } catch (error) {}
  };

  function tog_standard() {
    setmodal_standard(!modal_standard);
  }

  const submitLetterHead = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      let rqData = {
        letter_head_name: letterHead,
      };

      const result = await axiosInstance
        .post("setup/company/new_letterhead", rqData)
        .then((res: any) => {
          if (res.status === 200) {
            let data = res.data.data;
            setLetterHead("");
            setLetterHeadData((prev: any) => [...prev, data]);
            tog_standard();
            ToastSuccess(res.data.message);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const setLetterHeadValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value }: any = event.target;
    setLetterHead(value);
  };

  const setDataFromDropDown = (value: any, value_name: any) => {
    let name = value_name;
    console.log(value);

    if (value_name == "date_of_establishment") {
      value = changeDateFormat(value);
    }

    setCompanyDetails((data) => ({ ...data, [name]: value }));
  };

  const handleLetterHeadOptionClick = (option: any) => {
    setSelectedLetterHeadOption(option);
    setCompanyDetails((data) => ({
      ...data,
      hrms_company_letter_head_id: option.id,
    }));
  };

  const getCompanyDetails = async (data: any) => {
    try {
      if (!data) return;
      await axiosInstance
        .get("setup/company/get_single_company/" + data)
        .then((res: any) => {
          console.log(res);
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const getHolidays = async () => {
    try {
      await axiosInstance
        .get("setup/company/get_holidays")
        .then((res: any) => {
          if (res.status === 200) setHolidayList(res.data.data);
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const updateCompany = async (event: any) => {
    try {
      event.preventDefault();
      event.stopPropagation();

      const form = event.currentTarget;
      if (!companyDetails.country || !companyDetails.currency) {
        // Set the validation state to show the error message
        setValidated(true);
        return;
      }
      let bodyData = companyDetails;

      delete bodyData?.date_of_establishment;
      console.log("update company", bodyData);

      try {
        const bodyData = updateCompanyDetails(companyDetails);

        // return;

        const result = await axiosInstance
          .put("/setup/company/update_company", bodyData)
          .then((response: any) => {
            if (response.status === 200) {
              setCompanyDetails(initialState);
              router.push("/pages/setup/company/companyList");
            }
          })
          .catch((error: any) => {
            console.log(error);
          });
        setValidated(true);
      } catch (error) {}
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head>
        <title>Company Form</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="New Company" />

          {/* FORM */}

          <Form
            noValidate
            validated={validated}
            autoComplete="off"
            onSubmit={isEdit ? updateCompany : formSubmit}
          >
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom01">
                <Form.Label>
                  Company <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  value={companyDetails.company_name}
                  onChange={handelInputChange}
                  name="company_name"
                  type="text"
                  placeholder=""
                  required
                />
                {/* <Form.Control.Feedback type="invalid">
                  Please provide a valid value.
                </Form.Control.Feedback> */}
              </Form.Group>
              <Form.Group as={Col} md="6" controlId="validationCustom02">
                <Form.Label>Default Letter Head</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    value={selectedLetterHeadOption.letter_head_name}
                    name="hrms_company_letter_head_id"
                    readOnly
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {(letterHeadData || []).map((letterHead: any, index) => (
                        <Dropdown.Item
                          key={index}
                          name="group_id"
                          onClick={() =>
                            handleLetterHeadOptionClick(letterHead)
                          }
                        >
                          {letterHead?.letter_head_name}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Divider></Dropdown.Divider>

                      <Dropdown.Item onClick={() => tog_standard()}>
                        <div className="d-flex justify-content-center align-items-center text-primary">
                          <span
                            className="bx bx-plus-medical"
                            style={{ padding: 3 }}
                          ></span>
                          Create new Letter Head
                        </div>
                      </Dropdown.Item>
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid leave type
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom03">
                <Form.Label>
                  Abbr <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  value={companyDetails.abbr}
                  name="abbr"
                  onChange={handelInputChange}
                  type="text"
                  placeholder=""
                  required
                />
                {/* <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback> */}
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustom04">
                <Form.Label>Tax ID</Form.Label>
                <Form.Control
                  value={companyDetails.tax_id}
                  name="tax_id"
                  disabled={isEdit}
                  onChange={handelInputChange}
                  type="text"
                  placeholder=""
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" controlId="validationCustom05">
                <Form.Label>
                  Default Currency <span className="text-danger">*</span>
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    value={companyDetails.currency}
                    defaultValue={initialState.currency}
                    name="currency"
                    placeholder="Choose currency"
                    variant="success"
                    required
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {currency.map((x: any, index) => (
                        <Dropdown.Item
                          key={index}
                          name={"currency_" + index}
                          onClick={() => setDataFromDropDown(x, "currency")}
                        >
                          {x}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Divider></Dropdown.Divider>

                      <Dropdown.Item onClick={() => tog_standard()}>
                        <div className="d-flex justify-content-center align-items-center text-primary">
                          <span
                            className="bx bx-plus-medical"
                            style={{ padding: 3 }}
                          ></span>
                          Create new Letter Head
                        </div>
                      </Dropdown.Item>
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="validationCustom06">
                <Form.Label>Domain</Form.Label>
                <Form.Control
                  type="text"
                  value={companyDetails.domain}
                  name="domain"
                  onChange={handelInputChange}
                  placeholder=""
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid field.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>
                  Country <span className="text-danger">*</span>
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    placeholder="Select Country"
                    required
                    defaultValue={initialState.country}
                    value={companyDetails.country}
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {(country || []).map((item: any, key: number) => (
                        <Dropdown.Item
                          as="li"
                          onClick={() =>
                            setDataFromDropDown(item.countryName, "country")
                          }
                          key={key}
                          className="dropdown-item d-flex"
                        >
                          <div className="flex-shrink-0 me-2">
                            <Image
                              src={item.flagImg}
                              alt="country flag"
                              className="options-flagimg"
                              height="20"
                            />
                          </div>
                          <div className="flex-grow-1">
                            <div className="d-flex">
                              <div className="country-name me-1">
                                {item.countryName}
                              </div>
                              <span className="countrylist-codeno text-muted">
                                {item.countryCode}
                              </span>
                            </div>
                          </div>
                        </Dropdown.Item>
                      ))}
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid date.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label htmlFor="isGroup" className="form-label">
                  Default Holiday List
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    as="input"
                    className="form-control rounded-end flag-input form-select"
                    value={selectedHolidayOption}
                    readOnly
                    name="hrms_company_holiday_list_id"
                  ></Dropdown.Toggle>
                  <Dropdown.Menu
                    as="ul"
                    className="list-unstyled w-100 dropdown-menu-list mb-0"
                  >
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {holidatList.map((x: any, index) => (
                        <Dropdown.Item
                          key={index}
                          name={"currency_" + index}
                          onClick={() => {
                            setDataFromDropDown(
                              x.id,
                              "hrms_company_holiday_list_id"
                            );
                            handleHolidayOptionClick(x.holiday_list_name);
                          }}
                        >
                          {x.holiday_list_name}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Divider></Dropdown.Divider>

                      <Dropdown.Item onClick={handleCreateNewHolidayClick}>
                        <div className="d-flex justify-content-center align-items-center text-primary">
                          <span
                            className="bx bx-plus-medical"
                            style={{ padding: 3 }}
                          ></span>
                          Create new Holiday
                        </div>
                      </Dropdown.Item>
                    </SimpleBar>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Row>

            <Row>
              <Col>
                <InputGroup>
                  <Form.Check
                    type="checkbox"
                    className="col-xs-2"
                    id="isGroup"
                  />
                  <span style={{ height: "10px", width: "10px" }}></span>
                  <Form.Label htmlFor="isGroup" className="form-label">
                    Is Group
                  </Form.Label>
                </InputGroup>
              </Col>

              <Form.Group as={Col} md="6" controlId="validationCustom07">
                <Form.Label>Parent Company</Form.Label>
                <Form.Control
                  type="text"
                  value={companyDetails.parent_company}
                  name="parent_company"
                  onChange={handelInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid answer.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} md="6" controlId="validationCustom08">
                <Form.Label>Date of Establishment</Form.Label>
                <Flatpickr
                  className="form-control"
                  options={{
                    dateFormat: "d-m-Y",
                    maxDate: "today",
                  }}
                  disabled={isEdit}
                  value={selectedDate}
                  name="date_of_establishment"
                  onChange={(date: any) => {
                    setSelectedDate(date);
                    setDataFromDropDown(date[0], "date_of_establishment");
                  }}
                />

                <Form.Control.Feedback type="invalid">
                  Please provide a valid date.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Divider */}
            <hr className="hr hr-blurry"></hr>
            <Button className="btn-sm" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>

      <Modal
        id="letter_Head"
        show={modal_standard}
        onHide={() => {
          tog_standard();
        }}
      >
        <Form
          noValidate
          validated={validated}
          autoComplete="off"
          onSubmit={submitLetterHead}
        >
          <Modal.Header className="modal-title fw-bold" id="myModalLabel">
            Create New Letter Head
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom03">
                <Form.Label>New Letter Head</Form.Label>
                <Form.Control
                  name="letter_head"
                  type="text"
                  value={letterHead}
                  onChange={setLetterHeadValue}
                  placeholder=""
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid letter head.
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
            <Button color="primary" type="submit">
              Create
            </Button>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

CompanyForm.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default CompanyForm;
