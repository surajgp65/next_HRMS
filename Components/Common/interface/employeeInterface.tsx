export interface IEmployee {
  hrms_company_id: string;
  hrms_company_designation_id: string;
  hrms_company_branch_id: string;
  hrms_company_department_id: string;
  hrms_company_employee_grade_id: string;
  hrms_company_employee_reports_to_id: string;
  employment_type: string;
  series: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  date_of_joining: string;
  status: string;
  salutation: string;
  employee_joining: EmployeeJoining;
  employee_address_contacts: EmployeeAddressContacts;
  employee_salary: EmployeeSalary;
  employee_personal: EmployeePersonal;
  employee_profile: EmployeeProfile;
  employee_exit: EmployeeExit;
}

export interface EmployeeJoining {
  confirmation_date: string;
  contract_end_date: string;
  offer_date: string;
  date_of_retirement: string;
  hrms_company_job_applicant_id: string;
  notice_days: string;
}

export interface EmployeeAddressContacts {
  emergency_contact_name: string;
  personal_email: string;
  company_email: string;
  mobile: string;
  preferred_contact_email: string;
  current_address: string;
  relation: string;
  emergency_phone: string;
  permanent_address: string;
}

export interface EmployeeSalary {
  hrms_company_cost_center_id: string;
  cost_to_company: string;
  salary_currency: string;
  salary_mode: string;
  pan_number: string;
  provident_fund_account: string;
}

export interface EmployeePersonal {
  date_of_issue: string;
  valid_upto: string;
  hrms_company_employee_health_insurance_id: string;
  marital_status: string;
  blood_group: string;
  family_background: string;
  health_details: string;
  passport_number: string;
  place_of_issue: string;
}

export interface EmployeeProfile {
  cover_letter: string;
  educational_qualifications: any[];
  work_experiences: any[];
  history_in_company: any[];
}

export interface EmployeeExit {
  resignation_letter_date: string;
  exit_interview: string;
  relieving_date: string;
  new_workplace: string;
  leave_encashed: string;
  reason_for_leaving: string;
  feedback: string;
}

export const currentAddressIs = ["Rented", "Owned"];
export const IPreferedContactEmail = [
  "Company Email",
  "Personal Email",
  "User ID",
];

export const ICurrency = ["INR", "USD", "EUR", "AUD", "CAD"];
export const ISalaryMode = ["bank", "cash", "cheque"];
export const IMaritalStatus = ["Single", "Married", "Divorced", "Widowed"];
export const IBloodGroup = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
export const IEmpStatus = ["active", "inactive", "suspended", "left"];
export const IPreferedEmail = ["company email", "personal email", "user id"];
export const IEducationLevel = ["graduate", "under graduate", "post graduate"];
export const ISalutation = [
  "Dr",
  "Madam",
  "Master",
  "Miss",
  "Mr",
  "Mrs",
  "Ms",
  "Mx",
  "Prof",
];
