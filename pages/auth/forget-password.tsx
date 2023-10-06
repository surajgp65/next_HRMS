import React, { ReactNode } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import NonAuthLayout from '@common/Layout/NonAuthLayout';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { useSelector, useDispatch } from "react-redux";

import { userForgetPassword } from 'Components/slices/thunk';

//import images
import logoLightFull from "@assets/images/logo-light-full.png";
import authEffect2 from "@assets/images/effect-pattern/auth-effect-2.png";
import authEffect from "@assets/images/effect-pattern/auth-effect.png";

const PassResetBasic = (props: any) => {
    const dispatch: any = useDispatch();

    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please Enter Your Email"),
        }),
        onSubmit: (values) => {
            dispatch(userForgetPassword(values, props.history));
        }
    });

    const { forgetError, forgetSuccessMsg } = useSelector((state: any) => ({
        forgetError: state.ForgetPassword.forgetError,
        forgetSuccessMsg: state.ForgetPassword.forgetSuccessMsg,
    }));

    return (
        <React.Fragment>
            <Head>
                <title>Reset Password | Hybrix - Admin & Dashboard Template</title>
            </Head>
            <section className="auth-page-wrapper py-5 position-relative d-flex align-items-center justify-content-center min-vh-100 bg-light">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <Card.Body>
                                    <Row className="g-0">
                                        <Col lg={5}>
                                            <Card className="auth-card bg-primary h-100 border-0 shadow-none p-sm-3 overflow-hidden">
                                                <Card.Body className="p-4 d-flex justify-content-between flex-column">
                                                    <div className="auth-image">
                                                        <Image src={logoLightFull} alt="" height="26" />
                                                        <Image src={authEffect2} alt="" className="auth-effect-2" />
                                                        <Image src={authEffect} alt="" className="auth-effect" />
                                                        <Image src={authEffect} alt="" className="auth-effect-3" />
                                                    </div>

                                                    <div>
                                                        <h3 className="text-white">Start your journey with us.</h3>
                                                        <p className="text-white-75 fs-15">It brings together your tasks, projects, timelines, files and more</p>
                                                    </div>
                                                    <div className="text-center text-white-75">
                                                        <p className="mb-0">© {new Date().getFullYear()}{" "} Hybrix. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand </p>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col lg={7}>
                                            <Card className="mb-0 border-0 py-3 shadow-none">
                                                <Card.Body className="px-0 p-sm-5 m-lg-4">
                                                    <div className="text-center mt-2">
                                                        <h5 className="text-primary fs-20">Forgot Password?</h5>
                                                        <p className="text-muted mb-4">Reset password with Hybrix</p>
                                                        <div className="display-5 mb-4 text-danger">
                                                            <i className="bi bi-envelope"></i>
                                                        </div>
                                                    </div>

                                                    <Alert variant="warning" className="alert alert-borderless text-center mb-2 mx-2" role="alert">
                                                        Enter your email and instructions will be sent to you!
                                                    </Alert>
                                                    <div className="p-2">
                                                        {forgetError && forgetError ? (
                                                            <Alert variant="danger" style={{ marginTop: "13px" }}>
                                                                {forgetError}
                                                            </Alert>
                                                        ) : null}
                                                        {forgetSuccessMsg ? (
                                                            <Alert variant="success" style={{ marginTop: "13px" }}>
                                                                {forgetSuccessMsg}
                                                            </Alert>
                                                        ) : null}
                                                        <Form
                                                            onSubmit={(e: any) => {
                                                                e.preventDefault();
                                                                validation.handleSubmit();
                                                                return false;
                                                            }}
                                                        >
                                                            <div className="mb-4">
                                                                <Form.Label className="form-label">Email</Form.Label>
                                                                <Form.Control
                                                                    name="email"
                                                                    type="email"
                                                                    className="form-control"
                                                                    id="email"
                                                                    placeholder="Enter Email"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.email || ""}
                                                                    isInvalid={
                                                                        validation.touched.email && validation.errors.email ? true : false
                                                                    }
                                                                    required />
                                                                {validation.touched.email && validation.errors.email ? (
                                                                    <Form.Control.Feedback type="invalid"><div>{validation.errors.email}</div></Form.Control.Feedback>
                                                                ) : null}
                                                            </div>

                                                            <div className="text-center mt-4">
                                                                <Button variant='primary' className="w-100" type="submit">Send Reset Link</Button>
                                                            </div>
                                                        </Form>
                                                    </div>
                                                    <div className="mt-4 text-center">
                                                        <p className="mb-0">Wait, I remember my password... <Link href="/auth/login" className="fw-semibold text-primary text-decoration-underline"> Click here </Link> </p>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment >
    );
}

PassResetBasic.getLayout = function getLayout(page: any) {
    return (
      <NonAuthLayout>
        {page}
      </NonAuthLayout>
    )
};
export default PassResetBasic;
