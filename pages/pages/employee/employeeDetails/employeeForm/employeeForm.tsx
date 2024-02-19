import React, {
  ReactElement,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import Head from "next/head";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Tab,
  Card,
  Nav,
  Dropdown,
  Modal,
} from "react-bootstrap";
import Breadcrumb from "@common/Breadcrumb";
import Layout from "@common/Layout";
import { useRouter } from "next/router";
import Flatpickr from "react-flatpickr";
import SimpleBar from "simplebar-react";
import TableContainer from "@common/TableContainer";
import {
  currentAddressIs,
  IBloodGroup,
  ICurrency,
  IEducationLevel,
  IEmployee,
  IEmpStatus,
  IMaritalStatus,
  IPreferedContactEmail,
  IPreferedEmail,
  ISalaryMode,
  ISalutation,
} from "@common/interface/employeeInterface";
import axiosInstance from "lib/api";
import { ToastSuccess } from "@common/toast";
import {
  changeDateFormat,
  keyNullManipulation,
  replaceEmptyWithNull,
} from "@common/commonFunction";
import { useSelector } from "react-redux";

const initialSelected = {
  hrms_company_id: {},
  hrms_company_designation_id: {},
  hrms_company_branch_id: {},
  hrms_company_department_id: {},
  hrms_company_cost_center_id: {},
  employment_type: {},
  employee_joining: {},
  employee_address_contacts: {},
  employee_personal: {},
  employee_salary: {},
  hrms_company_holiday_name_id: {},
  hrms_company_shift_type_id: {},
  expense_approver_id: {},
  hrms_company_employee_reports_to_id: {},
  shift_approver_id: {},
  leave_approver_id: {},
  hrms_company_employee_health_insurance_id:{},
};

const initialEmploymentType = {
  hrms_company_id: "",
  employment_type_name: "",
  employment_type: null,
};

const initialEmployee = {
  hrms_company_id: "",
  hrms_company_designation_id: "",
  hrms_company_branch_id: "",
  hrms_company_department_id: "",
  hrms_company_employee_grade_id: "",
  hrms_company_employee_reports_to_id: "",
  employment_type: "",
  series: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  date_of_birth: "",
  gender: "",
  date_of_joining: "",
  status: "",
  salutation: "",
  employee_joining: {
    confirmation_date: "",
    contract_end_date: "",
    offer_date: "",
    date_of_retirement: "",
    hrms_company_job_applicant_id: "",
    notice_days: "",
  },
  employee_address_contacts: {
    emergency_contact_name: "",
    personal_email: "",
    company_email: "",
    mobile: "",
    preferred_contact_email: "",
    current_address: "",
    relation: "",
    emergency_phone: "",
    permanent_address: "",
  },
  employee_salary: {
    hrms_company_cost_center_id: "",
    cost_to_company: "",
    salary_currency: "",
    salary_mode: "",
    pan_number: "",
    provident_fund_account: "",
  },
  employee_personal: {
    date_of_issue: "",
    valid_upto: "",
    hrms_company_employee_health_insurance_id: "",
    marital_status: "",
    blood_group: "",
    family_background: "",
    health_details: "",
    passport_number: "",
    place_of_issue: "",
  },
  employee_profile: {
    cover_letter: "",
    educational_qualifications: [],
    work_experiences: [],
    history_in_company: [],
  },
  employee_exit: {
    resignation_letter_date: "",
    exit_interview: "",
    relieving_date: "",
    new_workplace: "",
    leave_encashed: "",
    reason_for_leaving: "",
    feedback: "",
  },
  employee_attendance_leaves: {
    hrms_company_holiday_name_id: "",
    hrms_company_shift_type_id: "",
    biometric_id: "",
    expense_approver_id: "",
    leave_approver_id: "",
    shift_approver_id: "",
  },
};

const educationInitial = {
  hrms_company_employee_id: "",
  university_name: "",
  qualification: "",
  level: "",
  percentage: "",
  year_of_passing: "",
};

const workExperiencesInitial = {
  hrms_company_employee_id: "",
  company: "",
  designation: "",
  salary: "",
  address: "",
};

const companyHistoryInitial = {
  hrms_company_employee_id: "",
  branch: "",
  department: "",
  designation: "",
  from_date: "",
  to_date: "",
};

const employeeGrade = {
  hrms_company_employee_id: "",
  name: "",
  default_salary_structure: "",
};

const EmployeeForm = () => {
  const router = useRouter();
  const editorRef = useRef<any>();
  const [editor, setEditor] = useState(false);
  const { CKEditor, ClassicEditor }: any = editorRef.current || {};
  const [data, setData] = useState("");
  const [activeTab, setActiveTab] = useState<any>("overview");
  const [employeeData, setEmployeeData] = useState<IEmployee>(initialEmployee);
  const [companyDetails, setCompanyDetails] = useState([]);
  const [designationList, setDesignationList] = useState<any[]>([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [branchList, setBranchList] = useState<any[]>([]);
  const [employmentTypeList, setEmploymentTypeList] = useState<any[]>([]);
  const [selectedData, setSelectedData] = useState<any>(initialSelected);
  const [modal_grid, setmodal_grid] = useState(false);
  const [educationModal, setEducationModal] = useState(false);
  const [workExpModal, setWorkExpModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [employeeGradeModal, setemployeeGradeModal] = useState(false);
  const [employmentType, setEmploymentType] = useState(initialEmploymentType);
  const [selectedCompany, setSelectedCompany] = useState<any>({});
  const [employeeList, setEmployeeList] = useState<any[]>([]);
  const [employeeListGrade, setEmployeeListGrade] = useState<any[]>([]);
  const [jobApplicantList, setJobApplicantList] = useState<any[]>([]);
  const [payRollList, setPayRollList] = useState<any[]>([]);
  const [healthInsuranceList, setHealthInsuranceList] = useState<any[]>([]);
  const [educationData, setEducationData] = useState(educationInitial);
  const [workExperienceData, setWorkExperience] = useState(
    workExperiencesInitial
  );
  const [companyHistoryData, setCompanyHistoryData] = useState(
    companyHistoryInitial
  );
  const [holidayList, setHolidayList] = useState([]);
  const [shiftList, setShiftList] = useState<any[]>([]);

  // data loaded state
  const [dataLoaded, setDataLoaded] = useState(false);

  // Get data from redux
  const { updateEmployeeDetail } = useSelector((state: any) => ({
    updateEmployeeDetail: state?.EmployeeDetail?.employeeDetail,
  }));

  // Handle Input change
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setEmployeeData((prev: any) => ({ ...prev, [name]: value }));
  };

  const employmentTypeInputChange = (name: any, value: any, data: any) => {
    setEmploymentType((prev: any) => ({ ...prev, [name]: value }));
  };

  const inputEducationDetails = (name: any, value: any, data: any) => {
    console.log('value --->',typeof value,value)
    setEducationData((prev: any) => ({ ...prev, [name]: value,hrms_company_employee_id: updateEmployeeDetail.hrms_company_employee_id }));
  };

  const inputWorkExpDetails = (name: any, value: any, data: any) => {
    setWorkExperience((prev: any) => ({ ...prev, [name]: value }));
  };
  const inputHistoryDetails = (name: any, value: any, data: any) => {
    if (data === "date") {
      value = changeDateFormat(value);
    }
    setCompanyHistoryData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      let bodyData = keyNullManipulation(employeeData);
      console.log(bodyData);

      await axiosInstance
        .post("/employee/employeedetails/add_employee_overview", bodyData)
        .then((res: any) => {
          if (res.status === 200) {
            ToastSuccess(res.data.message);
            router.push("/pages/employee/employeeDetails/employeeList");
          }
        });
    } catch (error) {}
  };

  const selectedSecondNameData = (
    name: any,
    value: any,
    data: any,
    type?: any,
    s_name?: any
  ) => {
    if (type === "date") {
      value = changeDateFormat(value);
      console.log('data --->',value)
    }


    if (data) {
      setSelectedData((prev: any) => ({ ...prev, [name]: data }));
    }

    if (s_name) {
      setEmployeeData((prev: any) => ({
        ...prev,
        [name]: { ...prev[name], [s_name]: value },
      }));
    } else {
      setEmployeeData((prev: any) => ({ ...prev, [name]: value }));
    }

    console.log(data);
  };

  const setDropDownData = (name: any, data: any, s_name?: any) => {
    setSelectedData((prev: any) => ({ ...prev, [s_name]: data }));
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditor(true);
    getAllData();
    if (updateEmployeeDetail) {
      getAllEmployeeData(updateEmployeeDetail.hrms_company_employee_id);
    }
  }, []);

  useEffect(() => {
    console.log("Use effect --->", employeeData);
    // console.log("Use effect --->", selectedData);
  }, [employeeData]);

  const tog_grid = () => {
    setmodal_grid(!modal_grid);
  };

  // Change in the Option
  const handleDropDownCreateNew = (selectedValue: any) => {
    if (selectedValue === "holiday") {
      router.push("/pages/setup/company/companyForm/newHoliday");
    } else if (selectedValue === "user") {
    } else {
    }
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
        Header: "School/University",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.university_name;
        },
      },
      {
        Header: "Qualification",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.qualification;
        },
      },
      {
        Header: "Level",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.level;
        },
      },
      {
        Header: "Year of Passing",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.year_of_passing;
        },
      },
      {
        Header: "Percentage",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.percentage;
        },
      },
    ],
    []
  );

  // Work Experience column
  const workExpColumns = useMemo(
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
        Header: "Company",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps?.company;
        },
      },
      {
        Header: "Designation",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps?.designation;
        },
      },
      {
        Header: "Salary",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps?.salary;
        },
      },
      {
        Header: "Address",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps?.address;
        },
      },
    ],
    []
  );

  //   History in Company Table column
  const historyColumns = useMemo(
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
        Header: "Branch",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.branch;
        },
      },
      {
        Header: "Department",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.department;
        },
      },
      {
        Header: "Designation",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.designation;
        },
      },
      {
        Header: "From Date",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.from_date;
        },
      },
      {
        Header: "To Date",
        disableFilters: true,
        filterable: true,
        accessor: (cellProps: any) => {
          return cellProps.to_date;
        },
      },
    ],
    []
  );

  const getAllEmployeeData = async (id: string) => {
    try {
      await axiosInstance
        .get("/employee/employeedetails/employee_overview/" + id)
        .then((response: any) => {
          if (response.status == 200) {
            let data = response.data.data;
console.log('oview data --->',data)
            setObj(data, "employee_overview");

            // setEmployeeData((prev: any) => ({ ...prev, ...data }));
            setObjectData(data);
            // employeeJoining(id);
          }
        })
        .catch((error) => {});

      // Employee Joining
      await axiosInstance
        .get("/employee/employeedetails/employee_joining/" + id)
        .then((response: any) => {
          if (response.status == 200) {
            let data = response.data.data;
            // setEmployeeData((prev: any) => ({
            //   ...prev,
            //   employee_joining: data,
            // }));
            setObj(data, "employee_joining");

            // setSelectedData(data);
          }
        })
        .catch((error) => {});

      // Employee Address and Contact
      await axiosInstance
        .get("/employee/employeedetails/employee_address_contacts/" + id)
        .then(async (response: any) => {
          if (response.status == 200) {
            let data = response.data.data;
            // setEmployeeData((prev: any) => ({
            //   ...prev,
            //   employee_address_contacts: data,
            // }));
            await setObj(data, "employee_address_contacts");
            // await setSelectedData(data);
          }
        })
        .catch((error) => {});

      // Employee Attendance and Leave
      await axiosInstance
        .get("/employee/employeedetails/employee_attendance/" + id)
        .then(async (response: any) => {
          if (response.status == 200) {
            let data = response.data.data;
            // setEmployeeData((prev: any) => ({
            //   ...prev,
            //   employee_attendance_leaves: data,
            // }));
            await setObj(data, "employee_attendance_leaves");
            // await setSelectedData(data);
          }
        })
        .catch((error) => {});

      // Salary
      await axiosInstance
        .get("/employee/employeedetails/employee_salary/" + id)
        .then(async (response: any) => {
          if (response.status == 200) {
            let data = response.data.data;
            // setEmployeeData((prev: any) => ({
            //   ...prev,
            //   employee_salary: data,
            // }));
            await setObj(data, "employee_salary");
            await setSelectedData(data);
          }
        })
        .catch((error) => {});

      // Personal
      await axiosInstance
        .get("/employee/employeedetails/employee_personal/" + id)
        .then(async (response: any) => {
          if (response.status == 200) {
            let data = response.data.data;

            // setEmployeeData((prev: any) => ({
            //   ...prev,
            //   employee_personal: data,
            // }));
            await setObj(data, "employee_personal");
            // setObj2(data);
            await setSelectedData(data);
          }
        })
        .catch((error) => {});

      // Profile
      await axiosInstance
        .get("/employee/employeedetails/employee_profile/" + id)
        .then(async (response: any) => {
          if (response.status == 200) {
            let data = response.data.data;
            // setEmployeeData((prev: any) => ({
            //   ...prev,
            //   employee_profile: data,
            // }));
            await setObj(data, "employee_profile");
            await setSelectedData(data);
          }
        })
        .catch((error) => {});

      // Exit Tab
      await axiosInstance
        .get("/employee/employeedetails/employee_exit/" + id)
        .then(async (response: any) => {
          if (response.status == 200) {
            let data = response.data.data;
            console.log('employyee exit --->',data)
            await setObj(data, "employee_exit");
            setSelectedData(data);
          }
        })
        .catch((error) => {});

      setDataLoaded(true);
    } catch (error) {
      console.log(error);
    }finally{
      console.log('employee data all --->',employeeData)
    }
  };

  const setObjectData = async (data: any) => {
    for (const key in data) {
      if (typeof data[key] === "object") {
        setSelectedData((prev: any) => ({
          ...prev,
          [key]: data[key],
        }));
      }
    }


    console.log('selectedData --->',selectedData)
  };

  // const setObj = async (data: any) => {
  //   const updatedData = data;

  //   for (const key in updatedData) {
  //     if (typeof updatedData[key] === "object" && updatedData[key] !== null) {
  //       setEmployeeData((prev: any) => ({
  //         ...prev,
  //         [key]: updatedData[key][key],
  //       }));
  //     } else {
  //       if (updatedData[key] === "") {
  //         setEmployeeData((prev: any) => ({
  //           ...prev,
  //           [key]: null,
  //         }));
  //       } else {
  //         setEmployeeData((prev: any) => ({
  //           ...prev,
  //           [key]: updatedData[key],
  //         }));
  //       }
  //     }
  //   }
  // };

  const setObj = async (data: any, sectionKey?: string) => {
    try {
      switch (sectionKey) {
        case "employee_overview":
          const updatedData = data;
          for (const key in data) {
            if (
              typeof updatedData[key] === "object" &&
              updatedData[key] !== null
            ) {
              setEmployeeData((prev: any) => ({
                ...prev,
                [key]: data[key][key] ?? null,
              }));
            } else if (data[key] === "") {
              setEmployeeData((prev: any) => ({
                ...prev,
                [key]: null,
              }));
            } else {
              setEmployeeData((prev: any) => ({ ...prev, [key]: data[key] }));
            }
          }
          break;
        case "employee_joining":
          for (const key in data) {
            if (
              typeof data[sectionKey] === "object" &&
              data[sectionKey] !== null
            ) {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: data[key][key],
                },
              }));
            } else if (data[key] === "") {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: null,
                },
              }));
            } else {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: data[key],
                },
              }));
            }
          }
          break;
        case "employee_address_contacts":
          for (const key in data) {
            if (
              typeof data[sectionKey] === "object" &&
              data[sectionKey] !== null
            ) {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: data[key][key],
                },
              }));
            } else if (data[key] === "") {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: null,
                },
              }));
            } else {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: data[key],
                },
              }));
            }
          }
          break;
        case "employee_attendance_leaves":
          for (const key in data) {
            if (typeof data[key] === "object" && data[key] !== null) {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: data[key][key],
                },
              }));
              setSelectedData((prev: any) => ({
                ...prev,
                [key]: data[key],
              }));
            } else if (data[key] === "") {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: null,
                },
              }));
            } else {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: data[key],
                },
              }));
            }
          }
          break;
        case "employee_salary":
          for (const key in data) {
            if (
              typeof data[key] === "object" &&
              data[key] !== null
            ) {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: data[key][key],
                },
              }));
            } else if (data[key] === "") {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: null,
                },
              }));
            } else {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: data[key],
                },
              }));
            }
          }
          break;
        case "employee_personal":
          for (const key in data) {
            if (
              typeof data[key] === "object" &&
              data[key] !== null
            ) {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: data[key][key],
                },
              }));
            } else if (data[key] === "") {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: null,
                },
              }));
            } else {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: data[key],
                },
              }));
            }
          }
          break;
        case "employee_profile":
          console.log('employee_profile --->',data);
          // for (const key in data) {
          //   if (
          //     typeof data[key] === "object" &&
          //     data[key] !== null
          //   ) {
          //     setEmployeeData((prev: any) => ({
          //       ...prev,
          //       [sectionKey]: {
          //         ...prev[sectionKey],
          //         [key]: data[key][key],
          //       },
          //     }));
          //   } else if (Array.isArray(data[key]) && data[key].length === 0) {
          //     setEmployeeData((prev: any) => ({
          //       ...prev,
          //       [sectionKey]: {
          //         ...prev[sectionKey],
          //         [key]: [],
          //       },
          //     }));
          //   } else if (data[key] === "") {
          //     setEmployeeData((prev: any) => ({
          //       ...prev,
          //       [sectionKey]: {
          //         ...prev[sectionKey],
          //         [key]: null,
          //       },
          //     }));
          //   } else {
          //     setEmployeeData((prev: any) => ({
          //       ...prev,
          //       [sectionKey]: {
          //         ...prev[sectionKey],
          //         [key]: data[key],
          //       },
          //     }));
          //   }
          // }

          for (const key in data) {
            if (Array.isArray(data[key])) {
                // Check if it's an empty array
                if (data[key].length === 0) {
                    setEmployeeData((prev: any) => ({
                        ...prev,
                        [sectionKey]: {
                            ...prev[sectionKey],
                            [key]: [],
                        },
                    }));
                } else {
                    // If it's a non-empty array, simply set the value
                    setEmployeeData((prev: any) => ({
                        ...prev,
                        [sectionKey]: {
                            ...prev[sectionKey],
                            [key]: data[key],
                        },
                    }));
                }
            } else if (
                typeof data[key] === "object" &&
                data[key] !== null
            ) {
                // For objects, set the value recursively
                setEmployeeData((prev: any) => ({
                    ...prev,
                    [sectionKey]: {
                        ...prev[sectionKey],
                        [key]: data[key],
                    },
                }));
            } else if (data[key] === "") {
                // Handle empty strings
                setEmployeeData((prev: any) => ({
                    ...prev,
                    [sectionKey]: {
                        ...prev[sectionKey],
                        [key]: null,
                    },
                }));
            } else {
                // For other types (strings, numbers, etc.), simply set the value
                setEmployeeData((prev: any) => ({
                    ...prev,
                    [sectionKey]: {
                        ...prev[sectionKey],
                        [key]: data[key],
                    },
                }));
            }
        }
        
          break;
        case "employee_exit":
          for (const key in data) {
            if (
              typeof data[key] === "object" &&
              data[key] !== null
            ) {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: data[key][key],
                },
              }));
            } else if (Array.isArray(data[key]) && data[key].length === 0) {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: [],
                },
              }));
            } else if (data[key] === "") {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: null,
                },
              }));
            } else {
              setEmployeeData((prev: any) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  [key]: data[key],
                },
              }));
            }
          }
          break;
        default:
          console.warn("Unknown sectionKey:", sectionKey);
      }
    } catch (error) {
      console.error("Error setting data:", error);
    }
  };

  const getAllData = async () => {
    try {
      await axiosInstance
        .get("setup/company/list_of_companies")
        .then((response: any) => {
          if (response.status == 200) {
            setCompanyDetails(response?.data?.data);
          }
        })
        .catch((error) => {});

      await axiosInstance
        .get("/setup/designation/list_of_designation")
        .then((res) => {
          if (res.status === 200) setDesignationList(res.data.data);
        })
        .catch((error) => {});

      await axiosInstance
        .get("/setup/department/list_of_department")
        .then((res) => {
          if (res.status === 200) setDepartmentList(res.data.data);
        })
        .catch((error) => {});

      await axiosInstance
        .get("/setup/branch/list_of_branches")
        .then((res: any) => {
          if (res.status === 200) {
            setBranchList(res.data.data);
          }
        })
        .catch((error) => {});

      await axiosInstance
        .get("/employee/employeedetails/list_of_employee_type")
        .then((res: any) => {
          if (res.status === 200) {
            setEmploymentTypeList(res.data.data);
          }
        })
        .catch((error) => {});

      await axiosInstance
        .get("/employee/employeedetails/list_of_employee_grade")
        .then((res: any) => {
          if (res.status === 200) {
            setEmployeeListGrade(res.data.data);
          }
        })
        .catch((error) => {});

      await axiosInstance
        .get("/employee/employeedetails/list_of_health_insurance")
        .then((res: any) => {
          if (res.status === 200) {
            setHealthInsuranceList(res.data.data);
          }
        })
        .catch((error) => {});

      await axiosInstance
        .get("setup/company/get_holidays")
        .then((res: any) => {
          if (res.status === 200) setHolidayList(res.data.data);
        })
        .catch((error) => {});

      await axiosInstance
        .get("/attendance/attendance/list_shift_type")
        .then((res: any) => {
          if (res.status === 200) {
            setShiftList(res.data.data);
          }
        });
    } catch (error) {}
  };

  const getEmployeeList = async (id: any) => {
    try {
      await axiosInstance
        .get("/employee/employeedetails/list_of_employees/" + id)
        .then((res: any) => {
          if (res.status === 200) {
            setEmployeeList(res.data.data);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const selectDropdownData = (name: any, value: any, data: any) => {
    setSelectedData((prev: any) => ({ ...prev, [name]: data }));
    setEmployeeData((prev: any) => ({ ...prev, [name]: value }));
  };

  const createEmploymentType = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    let bodyData: any = employmentType;
    bodyData.hrms_company_id = selectedCompany.hrms_company_id;

    // return;
    await axiosInstance
      .post("/employee/employeedetails/create_employee_type", bodyData)
      .then((res: any) => {
        if (res.status === 200) {
          let data = res.data.data;
          setEmploymentType(initialEmploymentType);
          setSelectedCompany({});
          setEmploymentTypeList((prev: any) => [...prev, data]);
          tog_grid();
          ToastSuccess(res.data.message);
        }
      })
      .catch((error) => {});
  };

  const getJobApplicantList = async (id: any) => {
    try {
      await axiosInstance
        .get("/employee/employeedetails/list_of_job_applicant/" + id)
        .then((res: any) => {
          if (res.status === 200) {
            setJobApplicantList(res.data.data);
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const getPayRollList = async (id: any) => {
    try {
      await axiosInstance
        .get("setup/department/list_payroll_cost_center/" + id)
        .then((res: any) => {
          if (res.status === 200) setPayRollList(res.data.data);
        })
        .catch((error: any) => {});
    } catch (error) {}
  };

  const addEducationData = (name: any, s_name: any, event: any) => {
    event.preventDefault();
    event.stopPropagation();

    let value: any;
    if (s_name === "educational_qualifications") {
      value = keyNullManipulation(educationData);

      console.log('valueeee --->',value)
    } else if (s_name === "work_experiences") {

      console.log('work exp --->',name,s_name )
      value = keyNullManipulation(workExperienceData);
    } else if (s_name === "history_in_company") {
      value = keyNullManipulation(companyHistoryData);
    }


    setEmployeeData((prev: any) => {
      const existingArray = prev[name][s_name] || [];
      const newArray = [...existingArray, value];
      return {
        ...prev,
        [name]: {
          ...prev[name],
          [s_name]: newArray,
        },
      };
    });

    setEducationModal(false);
    setWorkExpModal(false);
    setHistoryModal(false);
    setEducationData(educationInitial);
    setWorkExperience(workExperiencesInitial);
    setCompanyHistoryData(companyHistoryInitial);
  };

  const createEmployeeGrade = async () => {
    try {
      await axiosInstance
        .post("/employee/employeedetails/add_employee_grade", null)
        .then((res: any) => {
          if (res.status === 200) {
          }
        })
        .catch((error) => {});
    } catch (error) {}
  };

  const updateEmployee = async (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      console.log("employeeData Update --___->", employeeData);
      let bodyData = replaceEmptyWithNull(employeeData);
      console.log( 'employeeData Update  -->',  bodyData);


      
      await axiosInstance
        .put(
          "/employee/employeedetails/update_employee_overview/" +
            updateEmployeeDetail.hrms_company_employee_id,
          bodyData
        )
        .then((res: any) => {
          if (res.status === 200) {
            ToastSuccess(res.data.message);
            router.push("/pages/employee/employeeDetails/employeeList");
          }
        });
    } catch (error) {}
  };

  return (
    <React.Fragment>
      <Head>
        <title>Employee Form</title>
      </Head>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb breadcrumb="Pages" breadcrumbItem="New Employee" />

          {/* Form */}

          <Form
            autoComplete="off"
            onSubmit={
              updateEmployeeDetail.isEdit ? updateEmployee : handleSubmit
            }
            className="row g-3"
          >
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Tab.Container
                    defaultActiveKey="overview"
                    activeKey={activeTab}
                    onSelect={(key) => setActiveTab(key)}
                  >
                    <Nav as="ul" variant="tabs" className="mb-3">
                      <Nav.Item as="li">
                        <Nav.Link eventKey="overview"> Overview </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="joining"> Joining </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="Address">
                          Address & Contacts
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="Attendance">
                          Attendance & Leaves
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="salary"> Salary </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="personal"> Personal </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="profile"> Profile </Nav.Link>
                      </Nav.Item>
                      <Nav.Item as="li">
                        <Nav.Link eventKey="exit"> Exit </Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Tab.Content className="text-muted">
                      <Tab.Pane eventKey="overview" id="overview">
                        {/* <Button className='btn-sm' onClick={changeActiveTab}>Change Tab</Button> */}
                        <Row className="mb-3">
                          <Col md={4}>
                            <Form.Label htmlFor="series" className="form-label">
                              Series<span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="series"
                              name="series"
                              value={employeeData?.series}
                              onChange={handleInputChange}
                              required
                            />
                          </Col>

                          <Col md={4}>
                            <Form.Label htmlFor="gender" className="form-label">
                              Gender
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                name="gender"
                                value={employeeData?.gender}
                                defaultValue={employeeData?.gender}
                                readOnly
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  <Dropdown.Item
                                    key={"male"}
                                    onClick={() => {
                                      selectedSecondNameData(
                                        "gender",
                                        "male",
                                        null
                                      );
                                    }}
                                  >
                                    Male
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    key={"female"}
                                    onClick={() => {
                                      selectedSecondNameData(
                                        "gender",
                                        "female",
                                        null
                                      );
                                    }}
                                  >
                                    Female
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    key={"Other"}
                                    onClick={() => {
                                      selectedSecondNameData(
                                        "gender",
                                        "other",
                                        null
                                      );
                                    }}
                                  >
                                    Other
                                  </Dropdown.Item>
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                          <Col md={4}>
                            <Form.Label
                              htmlFor="date_of_joining"
                              className="form-label"
                            >
                              Date of joining
                            </Form.Label>
                            <Flatpickr
                              className="form-control"
                              name="date_of_joining"
                              value={employeeData?.date_of_joining}
                              options={{
                                dateFormat: "d-m-Y",
                              }}
                              onChange={(date: any) => {
                                selectedSecondNameData(
                                  "date_of_joining",
                                  date[0],
                                  null,
                                  "date"
                                );
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col md={4}>
                            <Form.Label
                              htmlFor="firstName"
                              className="form-label"
                            >
                              First Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="firstName"
                              name="first_name"
                              value={employeeData?.first_name}
                              onChange={handleInputChange}
                            />
                          </Col>
                          <Col md={4}>
                            <Form.Label
                              htmlFor="date_of_birth"
                              className="form-label"
                            >
                              Date of Birth
                            </Form.Label>
                            <Flatpickr
                              className="form-control"
                              name="date_of_birth"
                              options={{
                                dateFormat: "d-m-Y",
                              }}
                              value={employeeData?.date_of_birth}
                              onChange={(date: any) => {
                                selectedSecondNameData(
                                  "date_of_birth",
                                  date[0],
                                  null,
                                  "date"
                                );
                              }}
                            />
                          </Col>
                          <Col md={4}>
                            <Form.Label htmlFor="status" className="form-label">
                              Status
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                value={employeeData?.status}
                                defaultValue={employeeData?.status}
                                name="status"
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {IEmpStatus.map((x: any, index: any) => (
                                    <Dropdown.Item
                                      key={x + "_" + index}
                                      onClick={(date: any) => {
                                        selectedSecondNameData(
                                          "status",
                                          x,
                                          null
                                        );
                                      }}
                                    >
                                      {x}
                                    </Dropdown.Item>
                                  ))}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>
                        <Row className="mb-5">
                          <Col md={4}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Middle Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="validationDefault01"
                              name="middle_name"
                              value={employeeData?.middle_name}
                              onChange={handleInputChange}
                            />
                          </Col>
                          <Col md={4}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Salutation
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                name="hrms_company_id"
                                value={employeeData?.salutation}
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(ISalutation || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() => {
                                          selectedSecondNameData(
                                            "salutation",
                                            x,
                                            null
                                          );
                                        }}
                                      >
                                        {x}
                                      </Dropdown.Item>
                                    )
                                  )}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col md={4}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Last Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="validationDefault01"
                              name="last_name"
                              value={employeeData?.last_name}
                              onChange={handleInputChange}
                            />
                          </Col>
                        </Row>
                        {/* Divider */}

                        <div className="border-top my-3"></div>

                        <Row className="mb-3">
                          <Card.Subtitle>User Details</Card.Subtitle>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label m-1"
                            >
                              User Id
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="validationDefault01"
                            />
                            <div className="mt-3">
                              <Form.Label
                                htmlFor="validationDefault01"
                                className="form-label m-1"
                              >
                                System User (login) ID. If set, it will become
                                default for all HR forms.
                              </Form.Label>
                              <Button className="btn-sm">Create user</Button>
                            </div>
                          </Col>
                        </Row>

                        {/* Divider */}

                        <div className="border-top my-3"></div>

                        <Row className="mb-3">
                          <Card.Subtitle className="mb-3 ">
                            Company Details
                          </Card.Subtitle>
                          <Col md={4}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Company
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                name="hrms_company_id"
                                value={
                                  selectedData?.hrms_company_id?.company_name
                                }
                                defaultValue={selectedData?.hrms_company_id?.company_name}
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(companyDetails || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() => {
                                          selectDropdownData(
                                            "hrms_company_id",
                                            x.hrms_company_id,
                                            x
                                          );
                                          getJobApplicantList(
                                            x.hrms_company_id
                                          );
                                          getPayRollList(x.hrms_company_id);
                                          getEmployeeList(x.hrms_company_id);
                                        }}
                                      >
                                        {x.company_name}
                                      </Dropdown.Item>
                                    )
                                  )}

                                  <Dropdown.Divider></Dropdown.Divider>

                                  <Dropdown.Item
                                    onClick={handleDropDownCreateNew}
                                  >
                                    <div className="d-flex justify-content-center align-items-center text-primary">
                                      <span
                                        className="bx bx-plus-medical"
                                        style={{ padding: 3 }}
                                      ></span>
                                      Create new Company
                                    </div>
                                  </Dropdown.Item>
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>

                          <Col md={4}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Designation
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                name="hrms_company_designation_id"
                                value={
                                  selectedData?.hrms_company_designation_id
                                    ?.designation
                                }
                                defaultValue={
                                  selectedData?.hrms_company_designation_id
                                    ?.designation
                                }
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(designationList || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() =>
                                          selectDropdownData(
                                            "hrms_company_designation_id",
                                            x.hrms_company_designation_id,
                                            x
                                          )
                                        }
                                      >
                                        {x.designation}
                                      </Dropdown.Item>
                                    )
                                  )}
                                  <Dropdown.Divider></Dropdown.Divider>

                                  <Dropdown.Item
                                    onClick={handleDropDownCreateNew}
                                  >
                                    <div className="d-flex justify-content-center align-items-center text-primary">
                                      <span
                                        className="bx bx-plus-medical"
                                        style={{ padding: 3 }}
                                      ></span>
                                      Create new Designation
                                    </div>
                                  </Dropdown.Item>
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                          <Col md={4}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Branch
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                name="hrms_company_branch_id"
                                readOnly
                                value={
                                  selectedData?.hrms_company_branch_id
                                    ?.branch_name
                                }
                                defaultValue={
                                  selectedData?.hrms_company_branch_id
                                    ?.branch_name
                                }
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(branchList || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() =>
                                          selectDropdownData(
                                            "hrms_company_branch_id",
                                            x.hrms_company_branch_id,
                                            x
                                          )
                                        }
                                      >
                                        {x.branch_name}
                                      </Dropdown.Item>
                                    )
                                  )}
                                  <Dropdown.Divider></Dropdown.Divider>

                                  <Dropdown.Item
                                    onClick={handleDropDownCreateNew}
                                  >
                                    <div className="d-flex justify-content-center align-items-center text-primary">
                                      <span
                                        className="bx bx-plus-medical"
                                        style={{ padding: 3 }}
                                      ></span>
                                      Create new Branch
                                    </div>
                                  </Dropdown.Item>
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col md={4}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Department
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                name="hrms_company_department_id"
                                readOnly
                                value={
                                  selectedData?.hrms_company_department_id
                                    ?.department
                                }
                                defaultValue={
                                  selectedData?.hrms_company_department_id
                                    ?.department
                                }
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(departmentList || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() =>
                                          selectDropdownData(
                                            "hrms_company_department_id",
                                            x.hrms_company_department_id,
                                            x
                                          )
                                        }
                                      >
                                        {x.department}
                                      </Dropdown.Item>
                                    )
                                  )}
                                  <Dropdown.Divider></Dropdown.Divider>

                                  <Dropdown.Item
                                    onClick={handleDropDownCreateNew}
                                  >
                                    <div className="d-flex justify-content-center align-items-center text-primary">
                                      <span
                                        className="bx bx-plus-medical"
                                        style={{ padding: 3 }}
                                      ></span>
                                      Create new Deaprtment
                                    </div>
                                  </Dropdown.Item>
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>

                          <Col md={4}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Report
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                value={
                                  selectedData
                                    ?.hrms_company_employee_reports_to_id
                                    ?.first_name
                                }
                                defaultValue={
                                  selectedData
                                    ?.hrms_company_employee_reports_to_id
                                    ?.first_name
                                }
                                readOnly
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(employeeList || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() =>
                                          selectedSecondNameData(
                                            "hrms_company_employee_reports_to_id",
                                            x.hrms_company_employee_id,
                                            x,
                                            null
                                          )
                                        }
                                      >
                                        {x.first_name}
                                      </Dropdown.Item>
                                    )
                                  )}

                                  <Dropdown.Divider></Dropdown.Divider>

                                  <Dropdown.Item
                                    onClick={handleDropDownCreateNew}
                                  >
                                    <div className="d-flex justify-content-center align-items-center text-primary">
                                      <span
                                        className="bx bx-plus-medical"
                                        style={{ padding: 3 }}
                                      ></span>
                                      Create a new Employee
                                    </div>
                                  </Dropdown.Item>
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                          <Col md={4}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Grade
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                value={
                                  selectedData?.hrms_company_employee_grade_id
                                    ?.name
                                }
                                defaultValue={
                                  selectedData?.hrms_company_employee_grade_id
                                    ?.name
                                }
                                readOnly
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(employeeListGrade || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() =>
                                          selectDropdownData(
                                            "hrms_company_employee_grade_id",
                                            x.hrms_company_employee_grade_id,
                                            x
                                          )
                                        }
                                      >
                                        {x.name}
                                      </Dropdown.Item>
                                    )
                                  )}

                                  <Dropdown.Divider></Dropdown.Divider>

                                  <Dropdown.Item
                                    onClick={handleDropDownCreateNew}
                                  >
                                    <div className="d-flex justify-content-center align-items-center text-primary">
                                      <span
                                        className="bx bx-plus-medical"
                                        style={{ padding: 3 }}
                                      ></span>
                                      Create new Grade
                                    </div>
                                  </Dropdown.Item>
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col md={4}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Employement Type
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                readOnly
                                name="employment_type_name"
                                value={
                                  selectedData?.employment_type
                                    ?.employment_type_name
                                }
                                defaultValue={
                                  selectedData?.employment_type
                                    ?.employment_type_name
                                }
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(employmentTypeList || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() =>
                                          selectDropdownData(
                                            "employment_type",
                                            x.hrms_company_employment_type_id,
                                            x
                                          )
                                        }
                                      >
                                        {x.employment_type_name}
                                      </Dropdown.Item>
                                    )
                                  )}
                                  <Dropdown.Divider></Dropdown.Divider>

                                  <Dropdown.Item
                                    onClick={() => setmodal_grid(true)}
                                  >
                                    <div className="d-flex justify-content-center align-items-center text-primary">
                                      <span
                                        className="bx bx-plus-medical"
                                        style={{ padding: 3 }}
                                      ></span>
                                      Create new Employement Type
                                    </div>
                                  </Dropdown.Item>
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>
                      </Tab.Pane>

                      <Tab.Pane eventKey="joining" id="joining">
                        <Row className="mb-3">
                          <Col md={4}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Job Applicant
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                name="applicant_name"
                                defaultValue={
                                  selectedData?.employee_joining?.applicant_name
                                }
                                value={
                                  selectedData?.employee_joining?.applicant_name
                                }
                                readOnly
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(jobApplicantList || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() =>
                                          selectedSecondNameData(
                                            "employee_joining",
                                            x.hrms_company_employment_type_id,
                                            x,
                                            null,
                                            "applicant_name"
                                          )
                                        }
                                      >
                                        {x.applicant_name}
                                      </Dropdown.Item>
                                    )
                                  )}
                                  {/* <Dropdown.Divider></Dropdown.Divider>

                                  <Dropdown.Item
                                    onClick={() => setmodal_grid(true)}
                                  >
                                    <div className="d-flex justify-content-center align-items-center text-primary">
                                      <span
                                        className="bx bx-plus-medical"
                                        style={{ padding: 3 }}
                                      ></span>
                                      Create new Job Applicant
                                    </div>
                                  </Dropdown.Item> */}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                          <Col md={4}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Confirmation Date
                            </Form.Label>
                            <Flatpickr
                              className="form-control"
                              options={{
                                dateFormat: "d-m-Y",
                              }}
                              value={
                                employeeData?.employee_joining
                                  ?.confirmation_date
                              }
                              onChange={(date: any) => {
                                selectedSecondNameData(
                                  "employee_joining",
                                  date[0],
                                  null,
                                  "date",
                                  "confirmation_date"
                                );
                              }}
                              name="confirmation_date"
                            />
                          </Col>
                          <Col md={4}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Notice (days)
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="validationDefault01"
                              name="notice_days"
                              value={
                                employeeData?.employee_joining?.notice_days
                              }
                              onChange={(e: any) => {
                                selectedSecondNameData(
                                  "employee_joining",
                                  e.target.value,
                                  null,
                                  null,
                                  "notice_days"
                                );
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col md={4}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Offer Date
                            </Form.Label>
                            <Flatpickr
                              className="form-control"
                              options={{
                                dateFormat: "d-m-Y",
                              }}
                              value={employeeData?.employee_joining?.offer_date}
                              name="offer_date"
                              onChange={(date: any) => {
                                selectedSecondNameData(
                                  "employee_joining",
                                  date[0],
                                  null,
                                  "date",
                                  "offer_date"
                                );
                              }}
                            />
                          </Col>
                          <Col md={4}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Contract End Date
                            </Form.Label>
                            <Flatpickr
                              className="form-control"
                              options={{
                                dateFormat: "d-m-Y",
                                minDate: "today",
                              }}
                              value={
                                employeeData?.employee_joining
                                  ?.contract_end_date
                              }
                              name="contract_end_date"
                              onChange={(date: any) => {
                                selectedSecondNameData(
                                  "employee_joining",
                                  date[0],
                                  null,
                                  "date",
                                  "contract_end_date"
                                );
                              }}
                            />
                          </Col>
                          <Col md={4}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Date Of Retirement
                            </Form.Label>
                            <Flatpickr
                              className="form-control"
                              options={{
                                dateFormat: "d-m-Y",
                                minDate: "today",
                              }}
                              value={
                                employeeData?.employee_joining
                                  ?.date_of_retirement
                              }
                              name="date_of_retirement"
                              onChange={(date: any) => {
                                selectedSecondNameData(
                                  "employee_joining",
                                  date[0],
                                  null,
                                  "date",
                                  "date_of_retirement"
                                );
                              }}
                            />
                          </Col>
                        </Row>
                      </Tab.Pane>

                      {/* Address Tab */}

                      <Tab.Pane eventKey="Address" id="Address">
                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Label htmlFor="mobile" className="form-label">
                              Mobile
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="mobile"
                              value={
                                employeeData?.employee_address_contacts?.mobile
                              }
                              name="mobile"
                              onChange={(e: any) => {
                                selectedSecondNameData(
                                  "employee_address_contacts",
                                  e.target.value,
                                  null,
                                  null,
                                  "mobile"
                                );
                              }}
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="personal_email"
                              className="form-label"
                            >
                              Personal Email
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="personal_email"
                              value={
                                employeeData?.employee_address_contacts
                                  ?.personal_email
                              }
                              name="personal_email"
                              onChange={(e: any) => {
                                selectedSecondNameData(
                                  "employee_address_contacts",
                                  e.target.value,
                                  null,
                                  null,
                                  "personal_email"
                                );
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Label
                              htmlFor="company_email"
                              className="form-label"
                            >
                              Company Email
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="company_email"
                              value={
                                employeeData?.employee_address_contacts
                                  ?.company_email
                              }
                              name="company_email"
                              onChange={(e: any) => {
                                selectedSecondNameData(
                                  "employee_address_contacts",
                                  e.target.value,
                                  null,
                                  null,
                                  "company_email"
                                );
                              }}
                            />
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Provide Email Address registered in company
                            </Form.Label>
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Prefered Contact Email
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                readOnly
                                value={
                                  employeeData?.employee_address_contacts
                                    ?.preferred_contact_email
                                }
                                defaultValue={
                                  employeeData?.employee_address_contacts
                                    ?.preferred_contact_email
                                }
                                name="preferred_contact_email"
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {IPreferedEmail.map((x: any, index: any) => (
                                    <Dropdown.Item
                                      key={index}
                                      onClick={(e: any) => {
                                        selectedSecondNameData(
                                          "employee_address_contacts",
                                          x,
                                          null,
                                          null,
                                          "preferred_contact_email"
                                        );
                                      }}
                                    >
                                      {x}
                                    </Dropdown.Item>
                                  ))}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                          <Col className="col-12">
                            <div className="form-check">
                              <Form.Check
                                type="checkbox"
                                value=""
                                id="invalidCheck2"
                              />
                              <Form.Label
                                className="form-check-label"
                                htmlFor="invalidCheck2"
                              >
                                Unsubscribed
                              </Form.Label>
                            </div>
                          </Col>
                        </Row>
                        {/* Divider */}

                        <div className="border-top my-3"></div>
                        <Card.Subtitle>Address</Card.Subtitle>
                        <Row className="mb-3 mt-3">
                          <Col md={6}>
                            <Form.Label>Current Address</Form.Label>
                            <textarea
                              className="form-control"
                              id="current_address"
                              name="current_address"
                              value={
                                employeeData?.employee_address_contacts
                                  ?.current_address
                              }
                              onChange={(e: any) => {
                                selectedSecondNameData(
                                  "employee_address_contacts",
                                  e.target.value,
                                  null,
                                  null,
                                  "current_address"
                                );
                              }}
                              rows={4}
                            ></textarea>
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid response.
                            </Form.Control.Feedback>
                          </Col>
                          <Col md={6}>
                            <Form.Label>Permanent Address</Form.Label>
                            <textarea
                              className="form-control"
                              id="permanent_address"
                              name="permanent_address"
                              value={
                                employeeData?.employee_address_contacts
                                  ?.permanent_address
                              }
                              onChange={(e: any) => {
                                selectedSecondNameData(
                                  "employee_address_contacts",
                                  e.target.value,
                                  null,
                                  null,
                                  "permanent_address"
                                );
                              }}
                              rows={4}
                            ></textarea>
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid response.
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Current Address Is
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                readOnly
                              ></Dropdown.Toggle>
                              {/* value={
                                    employeeData?.employee_address_contacts
                                      ?.current_address
                                  } */}
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(currentAddressIs || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        id={x}
                                        key={index}
                                        onClick={(e: any) => {
                                          selectedSecondNameData(
                                            "employee_address_contacts",
                                            x,
                                            null,
                                            null,
                                            x
                                          );
                                        }}
                                      >
                                        {x}
                                      </Dropdown.Item>
                                    )
                                  )}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                          {/* <Col md={6}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Prefered Contact Email
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder="Select "
                                readOnly
                                value={
                                  employeeData?.employee_address_contacts
                                    ?.preferred_contact_email
                                }
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(IPreferedContactEmail || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={x}
                                        id={x}
                                        name={x}
                                        onClick={(e: any) => {
                                          selectedSecondNameData(
                                            "employee_address_contacts",
                                            x,
                                            null,
                                            null,
                                            "preferred_contact_email"
                                          );
                                        }}
                                      >
                                        {x}
                                      </Dropdown.Item>
                                    )
                                  )}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col> */}
                        </Row>
                        <div className="border-top my-3"></div>
                        <Card.Subtitle>Emergency Contact</Card.Subtitle>
                        <Row className="mt-3 mb-3">
                          <Col md={6}>
                            <Form.Label htmlFor="v" className="form-label">
                              Emergency Contact Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="emergency_contact_name"
                              name="emergency_contact_name"
                              value={
                                employeeData?.employee_address_contacts
                                  ?.emergency_contact_name
                              }
                              onChange={(e) => {
                                selectedSecondNameData(
                                  "employee_address_contacts",
                                  e.target.value,
                                  null,
                                  null,
                                  "emergency_contact_name"
                                );
                              }}
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="emergency_contact_name"
                              className="form-label"
                            >
                              Personal Phone
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="emergency_contact_name"
                              name="emergency_contact_name"
                              value={
                                employeeData?.employee_address_contacts
                                  ?.emergency_phone
                              }
                              onChange={(e) => {
                                selectedSecondNameData(
                                  "employee_address_contacts",
                                  e.target.value,
                                  null,
                                  null,
                                  "emergency_phone"
                                );
                              }}
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="relation"
                              className="form-label"
                            >
                              Relation
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="relation"
                              name="relation"
                              value={
                                employeeData?.employee_address_contacts
                                  ?.relation
                              }
                              onChange={(e) => {
                                selectedSecondNameData(
                                  "employee_address_contacts",
                                  e.target.value,
                                  null,
                                  null,
                                  "relation"
                                );
                              }}
                            />
                          </Col>
                        </Row>
                      </Tab.Pane>

                      {/* Attendance */}
                      <Tab.Pane eventKey="Attendance" id="Attendance">
                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Label
                              htmlFor="biometric_id"
                              className="form-label"
                            >
                              Attendance Device ID (Biometric/RF tag ID)
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="biometric_id"
                              name="biometric_id"
                              onChange={(e) => {
                                selectedSecondNameData(
                                  "employee_attendance_leaves",
                                  e.target.value,
                                  null,
                                  null,
                                  "biometric_id"
                                );
                              }}
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Holiday List
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                value={
                                  selectedData?.hrms_company_holiday_name_id
                                    ?.holiday_list_name
                                }
                                defaultValue={
                                  selectedData?.hrms_company_holiday_name_id
                                    ?.holiday_list_name
                                }
                                name="hrms_company_holiday_name_id"
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {holidayList.map((x: any, index) => (
                                    <Dropdown.Item
                                      key={index}
                                      onClick={() => {
                                        selectedSecondNameData(
                                          "employee_attendance_leaves",
                                          x.holiday_list_name_id,
                                          x,
                                          null,
                                          "hrms_company_holiday_name_id"
                                        );
                                        setDropDownData(
                                          "employee_attendance_leaves",
                                          x,
                                          "hrms_company_holiday_name_id"
                                        );
                                      }}
                                    >
                                      {x.holiday_list_name}
                                    </Dropdown.Item>
                                  ))}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Default Shift
                            </Form.Label>
                            <Dropdown aria-required>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                value={
                                  selectedData?.hrms_company_shift_type_id
                                    ?.shift_type_name
                                }
                                defaultValue={
                                  selectedData?.hrms_company_shift_type_id
                                    ?.shift_type_name
                                }
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {shiftList.map((x: any, index: any) => (
                                    <Dropdown.Item
                                      key={index}
                                      onClick={() => {
                                        selectedSecondNameData(
                                          "employee_attendance_leaves",
                                          x.id,
                                          null,
                                          null,
                                          "hrms_company_shift_type_id"
                                        );
                                        setDropDownData(
                                          "employee_attendance_leaves",
                                          x,
                                          "hrms_company_shift_type_id"
                                        );
                                      }}
                                    >
                                      {x.shift_type_name}
                                    </Dropdown.Item>
                                  ))}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>

                        <div className="border-top my-3"></div>
                        <Card.Subtitle>Approvers</Card.Subtitle>

                        <Row className="mb-3 mt-3">
                          <Col md={6}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Expense Approver
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                value={
                                  selectedData?.expense_approver_id?.first_name
                                }
                                defaultValue={
                                  selectedData?.expense_approver_id?.first_name
                                }
                                readOnly
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(employeeList || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() => {
                                          selectedSecondNameData(
                                            "employee_attendance_leaves",
                                            x.hrms_company_employee_id,
                                            null,
                                            null,
                                            "expense_approver_id"
                                          );
                                          setDropDownData(
                                            "employee_attendance_leaves",
                                            x,
                                            "expense_approver_id"
                                          );
                                        }}
                                      >
                                        {x.first_name + " " + x.last_name}
                                      </Dropdown.Item>
                                    )
                                  )}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Shift Request Approver
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                value={
                                  selectedData?.shift_approver_id?.first_name
                                }
                                defaultValue={
                                  selectedData?.shift_approver_id?.first_name
                                }
                                readOnly
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(employeeList || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() => {
                                          selectedSecondNameData(
                                            "employee_attendance_leaves",
                                            x.hrms_company_employee_id,
                                            null,
                                            null,
                                            "shift_approver_id"
                                          );
                                          setDropDownData(
                                            "employee_attendance_leaves",
                                            x,
                                            "shift_approver_id"
                                          );
                                        }}
                                      >
                                        {x.first_name + " " + x.last_name}
                                      </Dropdown.Item>
                                    )
                                  )}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Leave Approver
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                value={
                                  selectedData?.leave_approver_id?.first_name
                                }
                                defaultValue={
                                  selectedData?.leave_approver_id?.first_name
                                }
                                readOnly
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(employeeList || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() => {
                                          selectedSecondNameData(
                                            "employee_attendance_leaves",
                                            x.hrms_company_employee_id,
                                            null,
                                            null,
                                            "leave_approver_id"
                                          );
                                          setDropDownData(
                                            "employee_attendance_leaves",
                                            x,
                                            "leave_approver_id"
                                          );
                                        }}
                                      >
                                        {x.first_name + " " + x.last_name}
                                      </Dropdown.Item>
                                    )
                                  )}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>
                      </Tab.Pane>

                      {/* Salary Tab */}
                      <Tab.Pane eventKey="salary" id="salary">
                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Label
                              htmlFor="cost_to_company"
                              className="form-label"
                            >
                              Cost to Company (CTC)
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="cost_to_company"
                              name="cost_to_company"
                              value={
                                employeeData?.employee_salary?.cost_to_company
                              }
                              onChange={(e) => {
                                selectedSecondNameData(
                                  "employee_salary",
                                  e.target.value,
                                  null,
                                  null,
                                  "cost_to_company"
                                );
                              }}
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Payroll Cost Center
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                readOnly
                                value={
                                  selectedData?.employee_salary
                                    ?.cost_center_name
                                }
                                defaultValue={
                                  selectedData?.employee_salary
                                    ?.cost_center_name
                                }
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(payRollList || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() => {
                                          selectedSecondNameData(
                                            "employee_salary",
                                            x.hrms_company_id,
                                            x,
                                            null,
                                            "hrms_company_cost_center_id"
                                          );
                                        }}
                                      >
                                        {x.cost_center_name}
                                      </Dropdown.Item>
                                    )
                                  )}

                                  <Dropdown.Divider></Dropdown.Divider>

                                  <Dropdown.Item eventKey="costCenter">
                                    <div className="d-flex justify-content-center align-items-center text-primary">
                                      <span
                                        className="bx bx-plus-medical"
                                        style={{ padding: 3 }}
                                      ></span>
                                      Create a new Cost Center
                                    </div>
                                  </Dropdown.Item>
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Salary Currency
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                readOnly
                                name="salary_currency"
                                value={
                                  employeeData?.employee_salary?.salary_currency
                                }
                                defaultValue={
                                  employeeData?.employee_salary?.salary_currency
                                }
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(ICurrency || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() => {
                                          selectedSecondNameData(
                                            "employee_salary",
                                            x,
                                            null,
                                            null,
                                            "salary_currency"
                                          );
                                        }}
                                      >
                                        {x}
                                      </Dropdown.Item>
                                    )
                                  )}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="pan_number"
                              className="form-label"
                            >
                              PAN Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="pan_number"
                              name="pan_number"
                              value={employeeData?.employee_salary?.pan_number}
                              onChange={(e) => {
                                selectedSecondNameData(
                                  "employee_salary",
                                  e.target.value,
                                  null,
                                  null,
                                  "pan_number"
                                );
                              }}
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Salary Mode
                            </Form.Label>
                            <Dropdown onSelect={handleDropDownCreateNew}>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                value={
                                  employeeData?.employee_salary?.salary_mode
                                }
                                defaultValue={
                                  employeeData?.employee_salary?.salary_mode
                                }
                                name="salary_mode"
                                readOnly
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {ISalaryMode.map((x: any, index: any) => (
                                    <Dropdown.Item
                                      key={index}
                                      onClick={() => {
                                        selectedSecondNameData(
                                          "employee_salary",
                                          x,
                                          null,
                                          null,
                                          "salary_mode"
                                        );
                                      }}
                                    >
                                      {x}
                                    </Dropdown.Item>
                                  ))}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Provident Fund Account
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="provident_fund_account"
                              name="provident_fund_account"
                              value={
                                employeeData?.employee_salary
                                  ?.provident_fund_account
                              }
                              onChange={(e) => {
                                selectedSecondNameData(
                                  "employee_salary",
                                  e.target.value,
                                  null,
                                  null,
                                  "provident_fund_account"
                                );
                              }}
                            />
                          </Col>
                        </Row>
                      </Tab.Pane>

                      {/* Personal Tab */}
                      <Tab.Pane eventKey="personal" id="personal">
                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Marital Status
                            </Form.Label>
                            <Dropdown onSelect={handleDropDownCreateNew}>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                name="marital_status"
                                value={
                                  employeeData?.employee_personal
                                    ?.marital_status
                                }
                                defaultValue={
                                  employeeData?.employee_personal
                                    ?.marital_status
                                }
                                readOnly
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {IMaritalStatus.map((x: any, index: any) => (
                                    <Dropdown.Item
                                      key={index}
                                      onClick={() => {
                                        selectedSecondNameData(
                                          "employee_personal",
                                          x,
                                          null,
                                          null,
                                          "marital_status"
                                        );
                                      }}
                                    >
                                      {x}
                                    </Dropdown.Item>
                                  ))}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>

                          <Col md={6}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Blood Group
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                value={
                                  employeeData?.employee_personal?.blood_group
                                }
                                defaultValue={
                                  employeeData?.employee_personal?.blood_group
                                }
                                readOnly
                                name="blood_group"
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {IBloodGroup.map((x: any, index: any) => (
                                    <Dropdown.Item
                                      key={index}
                                      onClick={() => {
                                        selectedSecondNameData(
                                          "employee_personal",
                                          x,
                                          null,
                                          null,
                                          "blood_group"
                                        );
                                      }}
                                    >
                                      {x}
                                    </Dropdown.Item>
                                  ))}
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <Form.Label for="family_background">
                              Family Background
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              name="family_background"
                              value={
                                employeeData?.employee_personal
                                  ?.family_background
                              }
                              onChange={(e) => {
                                selectedSecondNameData(
                                  "employee_personal",
                                  e.target.value,
                                  null,
                                  null,
                                  "family_background"
                                );
                              }}
                              rows={3}
                            />
                            <Form.Label>
                              Here you can maintain family details like name and
                              occupation of parent, spouse and children
                            </Form.Label>
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid response.
                            </Form.Control.Feedback>
                          </Col>
                          <Col md={6}>
                            <Form.Label>Health Details</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="health_details"
                              value={
                                employeeData?.employee_personal?.health_details
                              }
                              onChange={(e) => {
                                selectedSecondNameData(
                                  "employee_personal",
                                  e.target.value,
                                  null,
                                  null,
                                  "health_details"
                                );
                              }}
                              rows={3}
                            />
                            <Form.Label>
                              Here you can maintain height, weight, allergies,
                              medical concerns etc
                            </Form.Label>
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid response.
                            </Form.Control.Feedback>
                          </Col>
                        </Row>

                        {/* Divider */}

                        <div className="border-top my-3"></div>
                        <Card.Subtitle>Health Insurance</Card.Subtitle>

                        <Row className="mb-3 mt-3">
                          <Col md={6}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Health Insurance Provider
                            </Form.Label>
                            <Dropdown>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                value={
                                  selectedData?.hrms_company_employee_health_insurance_id
                                    ?.health_insurance_name
                                }
                                defaultValue={
                                  selectedData?.hrms_company_employee_health_insurance_id
                                    ?.health_insurance_name
                                }
                                readOnly
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  {(healthInsuranceList || []).map(
                                    (x: any, index: any) => (
                                      <Dropdown.Item
                                        key={index}
                                        onClick={() => {
                                          selectedSecondNameData(
                                            "employee_personal",
                                            x.hrms_company_employee_health_insurance_id,
                                            x,
                                            null,
                                            "hrms_company_employee_health_insurance_id"
                                          );
                                        }}
                                      >
                                        {x.health_insurance_name}
                                      </Dropdown.Item>
                                    )
                                  )}

                                  <Dropdown.Divider></Dropdown.Divider>

                                  <Dropdown.Item eventKey="healthInsurance">
                                    <div className="d-flex justify-content-center align-items-center text-primary">
                                      <span
                                        className="bx bx-plus-medical"
                                        style={{ padding: 3 }}
                                      ></span>
                                      Create a new Employee Health Insurance
                                    </div>
                                  </Dropdown.Item>
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>
                        </Row>

                        {/* Divider */}

                        <div className="border-top my-3"></div>
                        <Card.Subtitle>Passport Details</Card.Subtitle>

                        <Row className="mb-3 mt-3">
                          <Col md={6}>
                            <Form.Label
                              htmlFor="passport_number"
                              className="form-label"
                            >
                              Passport Number
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="passport_number"
                              name="passport_number"
                              value={
                                employeeData?.employee_personal?.passport_number
                              }
                              onChange={(e) => {
                                selectedSecondNameData(
                                  "employee_personal",
                                  e.target.value,
                                  null,
                                  null,
                                  "passport_number"
                                );
                              }}
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="date_of_issue"
                              className="form-label"
                            >
                              Date of Issue
                            </Form.Label>
                            <Flatpickr
                              className="form-control"
                              options={{
                                dateFormat: "d-m-Y",
                              }}
                              name="date_of_issue"
                              value={
                                employeeData?.employee_personal?.date_of_issue
                              }
                              onChange={(date: any) => {
                                selectedSecondNameData(
                                  "employee_personal",
                                  date[0],
                                  null,
                                  "date",
                                  "date_of_issue"
                                );
                              }}
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3 mt-3">
                          <Col md={6}>
                            <Form.Label
                              htmlFor="valid_upto"
                              className="form-label"
                            >
                              Valid Upto
                            </Form.Label>
                            <Flatpickr
                              className="form-control"
                              options={{
                                dateFormat: "d-m-Y",
                              }}
                              name="valid_upto"
                              value={
                                employeeData?.employee_personal?.valid_upto
                              }
                              onChange={(date: any) => {
                                selectedSecondNameData(
                                  "employee_personal",
                                  date[0],
                                  null,
                                  "date",
                                  "valid_upto"
                                );
                              }}
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="place_of_issue"
                              className="form-label"
                            >
                              Place of Issue
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="place_of_issue"
                              name="place_of_issue"
                              value={
                                employeeData?.employee_personal?.place_of_issue
                              }
                              onChange={(e: any) => {
                                selectedSecondNameData(
                                  "employee_personal",
                                  e.target.value,
                                  null,
                                  null,
                                  "place_of_issue"
                                );
                              }}
                            />
                          </Col>
                        </Row>
                      </Tab.Pane>

                      <Tab.Pane eventKey="profile" id="profile">
                        <Row>
                          <Col lg={12}>
                            <Card>
                              <Card.Body>
                                <p className="text-muted">Bio / Cover Letter</p>
                                {editor ? (
                                  <CKEditor
                                    editor={ClassicEditor}
                                    data={data}
                                    onReady={(editor: any) => {
                                      // You can store the "editor" and use when it is needed.
                                    }}
                                    value={
                                      employeeData?.employee_profile
                                        ?.cover_letter
                                    }
                                    name="cover_letter"
                                    onChange={(event: any, editor: any) => {
                                      const data = editor.getData();
                                      setData(data);
                                      selectedSecondNameData(
                                        "employee_profile",
                                        data,
                                        null,
                                        null,
                                        "cover_letter"
                                      );
                                    }}
                                  />
                                ) : (
                                  <p>ckeditor5</p>
                                )}
                              </Card.Body>
                            </Card>
                          </Col>

                          {/* Education Table */}
                          <Col lg={12}>
                            <Card id="apiKeyList">
                              <Card.Header className="d-flex align-items-center">
                                <h5 className="card-title flex-grow-1 mb-0">
                                  Education Qualification
                                </h5>
                                <div className="d-flex gap-1 flex-wrap">
                                  <Button
                                    variant="soft-danger"
                                    id="remove-actions"
                                  >
                                    <i className="ri-delete-bin-2-line"></i>
                                  </Button>
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      setEducationModal(true);
                                    }}
                                    className="btn-sm"
                                  >
                                    <i className="ri-add-line align-bottom me-1"></i>
                                    Add Row
                                  </Button>
                                </div>
                              </Card.Header>
                              <Card.Body>
                                <TableContainer
                                  columns={columns || []}
                                  data={
                                    employeeData?.employee_profile
                                      ?.educational_qualifications || []
                                  }
                                  isPagination={true}
                                  // isGlobalFilter={true}
                                  iscustomPageSize={false}
                                  isBordered={false}
                                  customPageSize={5}
                                  className="custom-header-css table align-middle table-nowrap"
                                  tableClassName="table-centered align-middle table-nowrap mb-0"
                                  theadClassName="text-muted table-light"
                                  SearchPlaceholder="Search Company..."
                                />
                                <div
                                  className="noresult"
                                  style={{ display: "none" }}
                                >
                                  <div className="text-center">
                                    {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px"></lord-icon> */}
                                    <h5 className="mt-2">
                                      Sorry! No Result Found
                                    </h5>
                                    <p className="text-muted mb-0">
                                      We've searched more than 150+ API Keys We
                                      did not find any API for you search.
                                    </p>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>

                          {/* Experience table */}
                          <Col lg={12}>
                            <Card id="apiKeyList">
                              <Card.Header className="d-flex align-items-center">
                                <h5 className="card-title flex-grow-1 mb-0">
                                  Previous Work Experience
                                </h5>
                                <div className="d-flex gap-1 flex-wrap">
                                  <Button
                                    variant="soft-danger"
                                    id="remove-actions"
                                  >
                                    <i className="ri-delete-bin-2-line"></i>
                                  </Button>
                                  <Button
                                    type="button"
                                    className="btn-sm"
                                    onClick={() => {
                                      setWorkExpModal(true);
                                    }}
                                  >
                                    <i className="ri-add-line align-bottom me-1"></i>
                                    Add Row
                                  </Button>
                                </div>
                              </Card.Header>
                              <Card.Body>
                                <TableContainer
                                  columns={workExpColumns || []}
                                  data={
                                    employeeData?.employee_profile
                                      ?.work_experiences || []
                                  }
                                  isPagination={true}
                                  // isGlobalFilter={true}
                                  iscustomPageSize={false}
                                  isBordered={false}
                                  customPageSize={5}
                                  className="custom-header-css table align-middle table-nowrap"
                                  tableClassName="table-centered align-middle table-nowrap mb-0"
                                  theadClassName="text-muted table-light"
                                  SearchPlaceholder="Search Company..."
                                />
                                <div
                                  className="noresult"
                                  style={{ display: "none" }}
                                >
                                  <div className="text-center">
                                    {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px"></lord-icon> */}
                                    <h5 className="mt-2">
                                      Sorry! No Result Found
                                    </h5>
                                    <p className="text-muted mb-0">
                                      We've searched more than 150+ API Keys We
                                      did not find any API for you search.
                                    </p>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>

                          {/* History Table */}
                          <Col lg={12}>
                            <Card id="apiKeyList">
                              <Card.Header className="d-flex align-items-center">
                                <h5 className="card-title flex-grow-1 mb-0">
                                  History In Company
                                </h5>
                                <div className="d-flex gap-1 flex-wrap">
                                  <Button
                                    variant="soft-danger"
                                    id="remove-actions"
                                  >
                                    <i className="ri-delete-bin-2-line"></i>
                                  </Button>
                                  <Button
                                    type="button"
                                    className="btn-sm"
                                    onClick={() => {
                                      setHistoryModal(true);
                                    }}
                                  >
                                    <i className="ri-add-line align-bottom me-1"></i>
                                    Add Row
                                  </Button>
                                </div>
                              </Card.Header>
                              <Card.Body>
                                <TableContainer
                                  columns={historyColumns || []}
                                  data={
                                    employeeData?.employee_profile
                                      ?.history_in_company || []
                                  }
                                  isPagination={true}
                                  // isGlobalFilter={true}
                                  iscustomPageSize={false}
                                  isBordered={false}
                                  customPageSize={5}
                                  className="custom-header-css table align-middle table-nowrap"
                                  tableClassName="table-centered align-middle table-nowrap mb-0"
                                  theadClassName="text-muted table-light"
                                  SearchPlaceholder="Search Company..."
                                />
                                <div
                                  className="noresult"
                                  style={{ display: "none" }}
                                >
                                  <div className="text-center">
                                    {/* <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:75px;height:75px"></lord-icon> */}
                                    <h5 className="mt-2">
                                      Sorry! No Result Found
                                    </h5>
                                    <p className="text-muted mb-0">
                                      We've searched more than 150+ API Keys We
                                      did not find any API for you search.
                                    </p>
                                  </div>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Tab.Pane>

                      <Tab.Pane eventKey="exit" id="exit">
                        <Row className="mb-3 mt-3">
                          <Col md={6}>
                            <Form.Label
                              htmlFor="resignation_letter_date"
                              className="form-label"
                            >
                              Resignation Letter Date
                            </Form.Label>
                            <Flatpickr
                              className="form-control"
                              options={{
                                dateFormat: "d-m-Y",
                              }}
                              id="resignation_letter_date"
                              name="resignation_letter_date"
                              value={
                                employeeData?.employee_exit
                                  ?.resignation_letter_date
                              }
                              onChange={(date: any) => {
                                selectedSecondNameData(
                                  "employee_exit",
                                  date[0],
                                  null,
                                  "date",
                                  "resignation_letter_date"
                                );
                              }}
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Exit Interview Held On
                            </Form.Label>
                            <Flatpickr
                              className="form-control"
                              options={{
                                dateFormat: "d-m-Y",
                              }}
                              id="exit_interview"
                              name="exit_interview"
                              value={
                                employeeData?.employee_exit?.exit_interview
                              }
                              onChange={(date: any) => {
                                selectedSecondNameData(
                                  "employee_exit",
                                  date[0],
                                  null,
                                  "date",
                                  "exit_interview"
                                );
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="isGroup"
                              className="form-label"
                            >
                              Leave Encashed?
                            </Form.Label>
                            <Dropdown onSelect={handleDropDownCreateNew}>
                              <Dropdown.Toggle
                                as="input"
                                className="form-control rounded-end flag-input form-select"
                                placeholder=""
                                value={
                                  employeeData?.employee_exit?.leave_encashed
                                }
                                defaultValue={
                                  employeeData?.employee_exit?.leave_encashed
                                }
                                readOnly
                              ></Dropdown.Toggle>
                              <Dropdown.Menu
                                as="ul"
                                className="list-unstyled w-100 dropdown-menu-list mb-0"
                              >
                                <SimpleBar
                                  style={{ maxHeight: "220px" }}
                                  className="px-3"
                                >
                                  <Dropdown.Item
                                    onClick={(date: any) => {
                                      selectedSecondNameData(
                                        "employee_exit",
                                        "yes",
                                        null,
                                        null,
                                        "leave_encashed"
                                      );
                                    }}
                                  >
                                    Yes
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={(date: any) => {
                                      selectedSecondNameData(
                                        "employee_exit",
                                        "no",
                                        null,
                                        null,
                                        "leave_encashed"
                                      );
                                    }}
                                  >
                                    No
                                  </Dropdown.Item>
                                </SimpleBar>
                              </Dropdown.Menu>
                            </Dropdown>
                          </Col>

                          <Col md={6}>
                            <Form.Label
                              htmlFor="validationDefault01"
                              className="form-label"
                            >
                              Relieving Date
                            </Form.Label>
                            <Flatpickr
                              className="form-control"
                              options={{
                                dateFormat: "d-m-Y",
                              }}
                              id="relieving_date"
                              name="relieving_date"
                              value={
                                employeeData?.employee_exit?.relieving_date
                              }
                              onChange={(date: any) => {
                                selectedSecondNameData(
                                  "employee_exit",
                                  date[0],
                                  null,
                                  "date",
                                  "relieving_date"
                                );
                              }}
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Label
                              htmlFor="new_workplace"
                              className="form-label"
                            >
                              New Workplace
                            </Form.Label>
                            <Form.Control
                              type="text"
                              id="new_workplace"
                              name="new_workplace"
                              value={employeeData?.employee_exit?.new_workplace}
                              onChange={(e: any) => {
                                selectedSecondNameData(
                                  "employee_exit",
                                  e.target.value,
                                  null,
                                  null,
                                  "new_workplace"
                                );
                              }}
                            />
                          </Col>
                        </Row>

                        {/* Divider */}

                        <div className="border-top my-3"></div>
                        <Card.Subtitle>Feedback</Card.Subtitle>

                        <Row>
                          <Col md={6}>
                            <Form.Label>Reason for Leaving</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              id="reason_for_leaving"
                              name="reason_for_leaving"
                              value={
                                employeeData?.employee_exit?.reason_for_leaving
                              }
                              onChange={(e: any) => {
                                selectedSecondNameData(
                                  "employee_exit",
                                  e.target.value,
                                  null,
                                  null,
                                  "reason_for_leaving"
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid response.
                            </Form.Control.Feedback>
                          </Col>
                          <Col md={6}>
                            <Form.Label>Feedback</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              id="feedback"
                              name="feedback"
                              value={employeeData?.employee_exit?.feedback}
                              onChange={(e: any) => {
                                selectedSecondNameData(
                                  "employee_exit",
                                  e.target.value,
                                  null,
                                  null,
                                  "feedback"
                                );
                              }}
                            />
                            <Form.Control.Feedback type="invalid">
                              Please provide a valid response.
                            </Form.Control.Feedback>
                          </Col>
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Card.Body>
              </Card>
            </Col>

            <Col className="col-12">
              <Button variant="primary" className="btn-sm" type="submit">
                {updateEmployeeDetail.isEdit ? "Update" : "Submit"}
              </Button>
            </Col>
          </Form>
        </Container>
      </div>

      <Modal
        show={modal_grid}
        onHide={() => {
          tog_grid();
        }}
      >
        <Modal.Header className="modal-title fw-bold">
          Employment Type
        </Modal.Header>
        <Modal.Body>
          <form action="#" onSubmit={createEmploymentType} autoComplete="off">
            <div className="row g-3">
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Company<span className="text-danger">*</span>
                </Form.Label>
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
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {(companyDetails || []).map((x: any, index: any) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
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
              <Col md={12}>
                <div>
                  <Form.Label
                    htmlFor="employment_type_name"
                    className="form-label"
                  >
                    Employment Type
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="employment_type_name"
                    name="employment_type_name"
                    value={employmentType.employment_type_name}
                    onChange={(e) =>
                      employmentTypeInputChange(
                        "employment_type_name",
                        e.target.value,
                        data
                      )
                    }
                    placeholder=""
                  />
                </div>
              </Col>

              <Col md={6}></Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    variant="light"
                    onClick={() => {
                      setmodal_grid(false);
                    }}
                  >
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </div>
              </Col>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        show={employeeGradeModal}
        onHide={() => {
          setemployeeGradeModal(false);
        }}
      >
        <Modal.Header className="modal-title fw-bold">
          Employment Type
        </Modal.Header>
        <Modal.Body>
          <form action="#" onSubmit={createEmployeeGrade} autoComplete="off">
            <div className="row g-3">
              <Col md={6}>
                <Form.Label htmlFor="isGroup" className="form-label">
                  Company<span className="text-danger">*</span>
                </Form.Label>
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
                    <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                      {(companyDetails || []).map((x: any, index: any) => (
                        <Dropdown.Item
                          key={index}
                          onClick={() => {
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
              <Col md={12}>
                <div>
                  <Form.Label
                    htmlFor="employment_type_name"
                    className="form-label"
                  >
                    Employment Type
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="employment_type_name"
                    name="employment_type_name"
                    value={employmentType.employment_type_name}
                    onChange={(e) =>
                      employmentTypeInputChange(
                        "employment_type_name",
                        e.target.value,
                        data
                      )
                    }
                    placeholder=""
                  />
                </div>
              </Col>

              <Col md={6}></Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    variant="light"
                    onClick={() => {
                      setmodal_grid(false);
                    }}
                  >
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </div>
              </Col>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <Modal
        show={educationModal}
        onHide={() => {
          setEducationModal(false);
        }}
      >
        <Modal.Header className="modal-title fw-bold">
          Education Qualification
        </Modal.Header>
        <Modal.Body>
          <form
            action="#"
            onSubmit={(e) => {
              addEducationData(
                "employee_profile",
                "educational_qualifications",
                e
              );
            }}
            autoComplete="off"
          >
            <div className="row g-3">
              <Col md={6}>
                <Form.Label htmlFor="School" className="form-label">
                  School/University:
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="School"
                  name="School"
                  value={educationData.university_name}
                  onChange={(e) =>
                    inputEducationDetails(
                      "university_name",
                      e.target.value,
                      null
                    )
                  }
                  placeholder=""
                />
              </Col>
              <Col md={6}>
                <Form.Label htmlFor="School" className="form-label">
                  Qualification:
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="qualification"
                  name="qualification"
                  value={educationData.qualification}
                  onChange={(e) =>
                    inputEducationDetails("qualification", e.target.value, null)
                  }
                  placeholder=""
                />
              </Col>
              <Col md={6}>
                <div>
                  <Form.Label
                    htmlFor="employment_type_name"
                    className="form-label"
                  >
                    Level
                  </Form.Label>
                  <Dropdown>
                    <Dropdown.Toggle
                      as="input"
                      className="form-control rounded-end flag-input form-select"
                      placeholder=""
                      value={educationData.level}
                      defaultValue={educationData.level}
                      name="level"
                    ></Dropdown.Toggle>
                    <Dropdown.Menu
                      as="ul"
                      className="list-unstyled w-100 dropdown-menu-list mb-0"
                    >
                      <SimpleBar
                        style={{ maxHeight: "220px" }}
                        className="px-3"
                      >
                        {(IEducationLevel || []).map((x: any, index: any) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => {
                              inputEducationDetails("level", x, null);
                            }}
                          >
                            {x}
                          </Dropdown.Item>
                        ))}
                      </SimpleBar>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Col>

              <Col md={6}>
                <Form.Label htmlFor="School" className="form-label">
                  Year of Passing:
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="year_of_passing"
                  name="year_of_passing"
                  value={educationData.year_of_passing}
                  onChange={(e) =>
                    inputEducationDetails(
                      "year_of_passing",
                      e.target.value,
                      null
                    )
                  }
                  placeholder=""
                />
              </Col>
              <Col md={6}>
                <Form.Label htmlFor="School" className="form-label">
                  Percentage:
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="percentage"
                  name="percentage"
                  value={educationData.percentage}
                  onChange={(e) =>
                    inputEducationDetails("percentage", e.target.value, null)
                  }
                  placeholder=""
                />
              </Col>
              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    variant="light"
                    onClick={() => {
                      setEducationModal(false);
                    }}
                  >
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </div>
              </Col>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        show={workExpModal}
        onHide={() => {
          setWorkExpModal(false);
        }}
      >
        <Modal.Header className="modal-title fw-bold">
          Previous Work Experience
        </Modal.Header>
        <Modal.Body>
          <form
            action="#"
            onSubmit={(e) => {
              addEducationData("employee_profile", "work_experiences", e);
            }}
            autoComplete="off"
          >
            <div className="row g-3">
              <Col md={6}>
                <Form.Label htmlFor="company" className="form-label">
                  Comapny:
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="company"
                  name="company"
                  value={workExperienceData.company}
                  onChange={(e) =>
                    inputWorkExpDetails("company", e.target.value, null)
                  }
                  placeholder=""
                />
              </Col>
              <Col md={6}>
                <Form.Label htmlFor="designation" className="form-label">
                  Designation:
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="designation"
                  name="designation"
                  value={workExperienceData.designation}
                  onChange={(e) =>
                    inputWorkExpDetails("designation", e.target.value, null)
                  }
                  placeholder=""
                />
              </Col>
              <Col md={6}>
                <div>
                  <Form.Label htmlFor="salary" className="form-label">
                    Salary
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="salary"
                    name="salary"
                    value={workExperienceData.salary}
                    onChange={(e) =>
                      inputWorkExpDetails("salary", e.target.value, null)
                    }
                    placeholder=""
                  />
                </div>
              </Col>

              <Col md={6}>
                <Form.Label htmlFor="School" className="form-label">
                  Address:
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={workExperienceData.address}
                  onChange={(e) =>
                    inputWorkExpDetails("address", e.target.value, null)
                  }
                  placeholder=""
                />
              </Col>

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    variant="light"
                    onClick={() => {
                      setWorkExpModal(false);
                    }}
                  >
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </div>
              </Col>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Modal
        show={historyModal}
        onHide={() => {
          setHistoryModal(false);
        }}
      >
        <Modal.Header className="modal-title fw-bold">
          History In Company
        </Modal.Header>
        <Modal.Body>
          <form
            action="#"
            onSubmit={(e) => {
              addEducationData("employee_profile", "history_in_company", e);
            }}
            autoComplete="off"
          >
            <div className="row g-3">
              <Col md={6}>
                <Form.Label
                  htmlFor="hrms_company_employee_branch_id"
                  className="form-label"
                >
                  Branch:
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="hrms_company_employee_branch_id"
                  name="hrms_company_employee_branch_id"
                  value={companyHistoryData.branch}
                  onChange={(e) => {
                    inputHistoryDetails("branch", e.target.value, null);
                  }}
                  placeholder=""
                />
              </Col>
              <Col md={6}>
                <Form.Label htmlFor="designation" className="form-label">
                  Designation:
                </Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="designation"
                  name="designation"
                  value={companyHistoryData.designation}
                  onChange={(e) =>
                    inputHistoryDetails("designation", e.target.value, null)
                  }
                  placeholder=""
                />
              </Col>
              <Col md={6}>
                <div>
                  <Form.Label htmlFor="department" className="form-label">
                    Department
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form-control"
                    id="department"
                    name="department"
                    value={companyHistoryData.department}
                    onChange={(e) =>
                      inputHistoryDetails("department", e.target.value, null)
                    }
                    placeholder=""
                  />
                </div>
              </Col>

              <Col md={6}>
                <Form.Label htmlFor="from_date" className="form-label">
                  from date:
                </Form.Label>
                <Flatpickr
                  className="form-control"
                  name="from_date"
                  value={companyHistoryData.from_date}
                  onChange={(e: any) =>
                    inputHistoryDetails("from_date", e[0], "date")
                  }
                  options={{
                    dateFormat: "d-m-Y",
                  }}
                />
              </Col>
              <Col md={6}>
                <Form.Label htmlFor="to_date" className="form-label">
                  to date:
                </Form.Label>
                <Flatpickr
                  className="form-control"
                  name="to_date"
                  value={companyHistoryData.to_date}
                  onChange={(e: any) =>
                    inputHistoryDetails("to_date", e[0], "date")
                  }
                  options={{
                    dateFormat: "d-m-Y",
                  }}
                />
              </Col>

              <Col lg={12}>
                <div className="hstack gap-2 justify-content-end">
                  <Button
                    variant="light"
                    onClick={() => {
                      setWorkExpModal(false);
                    }}
                  >
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Add
                  </Button>
                </div>
              </Col>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

EmployeeForm.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default EmployeeForm;
