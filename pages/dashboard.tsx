import React, { ReactElement } from "react";
import Head from "next/head";
import Layout from "@common/Layout";
import Link from "next/link";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import { useRouter } from "next/router";
import styles from "../styles/dashboard.module.css";

const Dashboard = () => {
  const router = useRouter();

  const gotoSetup = (page: any) => {
    router.push("/pages/setup/" + page);
  };

  const gotoEmployee = (page: any) => {
    router.push("/pages/employee/" + page);
  };

  const gotoLeave = (page: any) => {
    router.push("/pages/leaves/" + page);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Dashboard | Hybrix - Admin & Dashboard Template</title>
      </Head>

      <div className="page-content">
        <Row>
          <Col md="3">
            <h4>Setup</h4>
            <ListGroup as="ul">
              <ListGroup.Item
                className={styles.dashBoard_list}
                onClick={() => gotoSetup("company/companyList")}
              >
                <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                Company
              </ListGroup.Item>
              <ListGroup.Item
                className={styles.dashBoard_list}
                onClick={() => gotoSetup("branch/branchList")}
              >
                <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                Branch
              </ListGroup.Item>
              <ListGroup.Item
                className={styles.dashBoard_list}
                onClick={() => gotoSetup("department/departmentList")}
              >
                <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                Department
              </ListGroup.Item>
              <ListGroup.Item
                className={styles.dashBoard_list}
                onClick={() => gotoSetup("designation/designationList")}
              >
                <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                Designation
              </ListGroup.Item>
              <ListGroup.Item
                className={styles.dashBoard_list}
                onClick={() => gotoSetup("holidays/holidayList")}
              >
                <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                Holiday
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md="3">
            <h4>Employee</h4>
            <ListGroup as="ul">
              <ListGroup.Item
                className={styles.dashBoard_list}
                onClick={() => gotoEmployee("employeeDetails/employeeList")}
              >
                <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                Employee
              </ListGroup.Item>
              <ListGroup.Item
                className={styles.dashBoard_list}
                onClick={() => gotoEmployee("employeeGroup/employeeGroupList")}
              >
                <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                Employee Group
              </ListGroup.Item>
              <ListGroup.Item
                className={styles.dashBoard_list}
                onClick={() => gotoEmployee("employeeGrade/employeeGradeList")}
              >
                <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                Employee Grade
              </ListGroup.Item>
              <ListGroup.Item
                className={styles.dashBoard_list}
                onClick={() => gotoEmployee("job_applicant/jobApplicantList")}
              >
                <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                Job Applicant
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md="3">
            <h4>Leaves</h4>
            <ListGroup as="ul">
              <ListGroup.Item
                className={styles.dashBoard_list}
                onClick={() => gotoLeave("leaveApplication/leaveList")}
              >
                <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                Leave Application
              </ListGroup.Item>
              <ListGroup.Item
                className={styles.dashBoard_list}
                onClick={() =>
                  gotoLeave("compensatoryLeaveApp/compensatoryLeaveList")
                }
              >
                <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                Compensatory Leave
              </ListGroup.Item>
              <ListGroup.Item
                className={styles.dashBoard_list}
                onClick={() => gotoLeave("leaveStructure/leaveStructureList")}
              >
                <i className="mdi mdi-check-bold align-middle lh-1 me-2"></i>
                Leave Structure
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

const listStyle = {
  border: "none !important",
  cursor: "pointer",
};

Dashboard.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
