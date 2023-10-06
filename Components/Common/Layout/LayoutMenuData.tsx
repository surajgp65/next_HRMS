import React, { useEffect, useState } from "react";
import Router from "next/router";
const Navdata = () => {
    //state data
    const [isAuth, setIsAuth] = useState(false);
    const [isPages, setIsPages] = useState(false);
    const [isMultiLevel, setIsMultiLevel] = useState(false);

    // Authentication
    const [isSignIn, setIsSignIn] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [isPasswordReset, setIsPasswordReset] = useState(false);


    // Setup
    const [isSetup, setIsSetup] = useState(false);

    // Company
    const [isCompany, setIsCompany] = useState(false);
    // Branch
    const [isBranch, setIsBranch] = useState(false);
    // Department
    const [isDepartment, setIsDepartment] = useState(false);
    // Designation
    const [isDesignation, setIsDesignation] = useState(false);



    // Employee
    const [isEmployee, setIsEmployee] = useState(false);


    // Leaves
    const [isLeaves, setIsLeaves] = useState(false);
    
    // Attendance
    const [isAttendance, setIsAttendance] = useState(false);


    // Pages
    const [isProfile, setIsProfile] = useState(false);

    // Multi Level
    const [isLevel1, setIsLevel1] = useState(false);
    const [isLevel2, setIsLevel2] = useState(false);

    const [isCurrentState, setIsCurrentState] = useState('');

    function updateIconSidebar(e: any) {
        if (e && e.target && e.target.getAttribute("sub-items")) {
            const ul: any = document.getElementById("two-column-menu");
            const iconItems: any = ul.querySelectorAll(".nav-icon.active");
            let activeIconItems = [...iconItems];
            activeIconItems.forEach((item) => {
                item.classList.remove("active");
                var id: any = item.getAttribute("sub-items");
                var menusId = document.getElementById(id);
                if (menusId){
                    (menusId.parentElement as HTMLElement).classList.remove("show");
                }
            });
            e.target.classList.add("active");
        }
    }

      useEffect(() => {
        document.body.classList.remove('twocolumn-panel');
        if (isCurrentState !== 'Auth') {
            setIsAuth(false);
        }
        if (isCurrentState !== 'Pages') {
            setIsPages(false);
        }
        if (isCurrentState !== 'Leaves') {
            setIsLeaves(false);
        }
        if (isCurrentState !== 'Employee') {
            setIsEmployee(false);
        }
        if (isCurrentState !== 'Attendance') {
            setIsAttendance(false);
        }
        if (isCurrentState !== 'MuliLevel') {
            setIsMultiLevel(false);
        }
        if (isCurrentState === 'Dashboard') {
            Router.push("/dashboard");
            document.body.classList.add('twocolumn-panel');
        }
        if (isCurrentState === 'Widgets') {
            Router.push("/widgets");
            document.body.classList.add('twocolumn-panel');
        }
        if (isCurrentState === 'Calendar') {
            Router.push("/calendar");
            document.body.classList.add('twocolumn-panel');
        }
        if (isCurrentState === 'API Key') {
            Router.push("/api-key");
            document.body.classList.add('twocolumn-panel');
        }
        if (isCurrentState === 'Contact') {
            Router.push("/contact");
            document.body.classList.add('twocolumn-panel');
        }
        if (isCurrentState === 'Leaderboard') {
            Router.push("/leaderboard");
            document.body.classList.add('twocolumn-panel');
        }
        if (isCurrentState === 'Components') {
            Router.push("https://hybrix-nextjs-components.vercel.app/");
            document.body.classList.add('twocolumn-panel');
        }
    }, [
        isCurrentState,
        isAuth,
        isPages,
        isLeaves,
        isEmployee,
        isAttendance,
        isMultiLevel
    ]);

    const menuItems: any = [
        {
            label: "Menu",
            isHeader: true,
        },
        {
            id: "dashboard",
            label: "Home",
            icon: "bi bi-house",
            link: "/dashboard",
            click: function (e: any) {
                e.preventDefault();
                setIsCurrentState('Dashboard');
            }
        },
        {
            label: "Reports & Masters",
            isHeader: true,
        },
        {
            id: "setup",
            label: "Setup",
            icon: "bi bi-gear-wide-connected",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsAuth(!isAuth);
                setIsCurrentState('Auth');
                updateIconSidebar(e);
            },
            stateVariables: isAuth,
            subItems: [
                {
                    id: "company",
                    label: "Company",
                    link: "/pages/setup/company/companyList",
                    click: function (e: any) {
                        e.preventDefault();
                        setIsSignIn(!isSignIn);
                    },
                    parentId: "setup",
                    stateVariables: isSignIn,
                },
                {
                    id: "branch",
                    label: "Branch",
                    link: "/pages/setup/branch/branchList",
                    click: function (e: any) {
                        e.preventDefault();
                        setIsSignUp(!isSignUp);
                    },
                    parentId: "setup",
                    stateVariables: isSignUp,
                },
                {
                    id: "department",
                    label: "Department",
                    link: "/pages/setup/department/departmentList",
                    click: function (e: any) {
                        e.preventDefault();
                        setIsPasswordReset(!isPasswordReset);
                    },
                    parentId: "setup",
                    stateVariables: isPasswordReset,
                },
                {
                    id: "designation",
                    label: "Designation",
                    link: "/pages/setup/designation/designationList",
                    click: function (e: any) {
                        e.preventDefault();
                        setIsPasswordReset(!isPasswordReset);
                    },
                    parentId: "setup",
                    stateVariables: isPasswordReset,
                },
            ],
        },
        {
            id: "leaves",
            label: "Leaves",
            icon: "bi bi-building-slash",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsLeaves(!isLeaves);
                setIsCurrentState('Leaves');
                updateIconSidebar(e);
            },
            stateVariables: isLeaves,
            subItems: [
                {
                    id: "leaveApplication",
                    label: "Leave Application",
                    link: "/pages/leaves/leaveApplication/leaveList",
                    parentId: "pages",
                },
                {
                    id: "employeeGroup",
                    label: "Compensatory Leave Request",
                    link: "/#",
                    click: function (e: any) {
                        e.preventDefault();
                    },
                },
            ],
        },
        {
            id: "employee",
            label: "Employee",
            icon: "ri-folder-user-line",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsEmployee(!isEmployee);
                setIsCurrentState('Employee');
                updateIconSidebar(e);
            },
            stateVariables: isEmployee,
            subItems: [
                {
                    id: "employee",
                    label: "Employee",
                    link: "#",
                    parentId: "pages",
                },
                {
                    id: "employeeGroup",
                    label: "Employee Group",
                    link: "/#",
                    click: function (e: any) {
                        e.preventDefault();
                    },
                },
                {
                    id: "employeeGrade",
                    label: "Employee Grade",
                    link: "/#",
                    click: function (e: any) {
                        e.preventDefault();

                    },
                },
            ],
        },
        {
            id: "attendance",
            label: "Attendance",
            icon: "bi bi-journal-medical",
            link: "/#",
            click: function (e: any) {
                e.preventDefault();
                setIsAttendance(!isAttendance);
                setIsCurrentState('Attendance');
                updateIconSidebar(e);
            },
            stateVariables: isAttendance,
            subItems: [
                {
                    id: "attendance",
                    label: "Attendance",
                    link: "#",
                    parentId: "pages",
                },
                {
                    id: "attendanceReq",
                    label: "Attendance Request",
                    link: "/#",
                    click: function (e: any) {
                        e.preventDefault();
                    },
                },
                {
                    id: "employeeCheckIn",
                    label: "Employee Check In",
                    link: "/#",
                    click: function (e: any) {
                        e.preventDefault();

                    },
                },
            ],
        },
    ];
    return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;