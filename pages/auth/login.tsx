"use client"
import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

//Social Media Imports
// import { GoogleLogin } from "react-google-login";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

import { useRouter } from 'next/router';
import { useSelector, useDispatch } from "react-redux";

import * as Yup from "yup";
import { useFormik } from "formik";

// import { loginUser, socialLogin, resetLoginFlag } from "../../Components/slices/thunk";

//import images
import logoLightFull from "@assets/images/logo-light-full.png";
import authEffect2 from "@assets/images/effect-pattern/auth-effect-2.png";
import authEffect from "@assets/images/effect-pattern/auth-effect.png";
import NonAuthLayout from '@common/Layout/NonAuthLayout';

const Login = (props: any) => {

    const dispatch: any = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)
    const [passwordtype, setPasswordtype] = useState<boolean>(true)
    const [userLogin, setUserLogin] = useState<any>([]);

    const { user, error } = useSelector((state: any) => ({
        user: state.Account.user,
        error: state.Login.error
    }));

    useEffect(() => {
        if (user && user) {
            console.log("user",user);
            setUserLogin({
                email: user.email,
                password: user.password
            });
        }
    }, [user]);
    

    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: userLogin.email || "admin@themesbrand.com" || '',
            password: userLogin.password || "123456" || '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please Enter Your Email"),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: (values) => {
            setLoading(true)
            router.push('/dashboard');
        }
    });    


    // const validation: any = useFormik({
    //     // enableReinitialize : use this flag when initial values needs to be changed
    //     enableReinitialize: true,

    //     initialValues: {
    //         email: userLogin.email || "admin@themesbrand.com" || '',
    //         password: userLogin.password || "123456" || '',
    //     },
    //     validationSchema: Yup.object({
    //         email: Yup.string().required("Please Enter Your Email"),
    //         password: Yup.string().required("Please Enter Your Password"),
    //     }),
    //     onSubmit: (values) => {
    //         setLoading(true)
    //         dispatch(loginUser(values,router));
    //     }
    // });


    // useEffect(() => {
    //     setTimeout(() => {
    //         dispatch(resetLoginFlag());
    //         setLoading(false)
    //     }, 3000);
    // }, [dispatch, error]);

    // const signIn = (res: any, type: any) => {
    //     if (type === "google" && res) {
    //         const postData = {
    //             name: res.profileObj.name,
    //             email: res.profileObj.email,
    //             token: res.tokenObj.access_token,
    //             idToken: res.tokenId,
    //         };
    //         dispatch(socialLogin(postData, type));
    //     } else if (type === "facebook" && res) {
    //         const postData = {
    //             name: res.name,
    //             email: res.email,
    //             token: res.accessToken,
    //             idToken: res.tokenId,
    //         };
    //         dispatch(socialLogin(postData, type));
    //     }
    // };

    //handleGoogleLoginResponse
    // const googleResponse = (response: any) => {
    //     signIn(response, "google");
    // };

    //handleTwitterLoginResponse
    // const twitterResponse = e => {}

    //handleFacebookLoginResponse
    // const facebookResponse = (response: any) => {
    //     signIn(response, "facebook");
    // };

    return (
        <React.Fragment>
            <Head>
                <title>Login | Hybrix - Admin & Dashboard Template</title>
            </Head>
            <section className="auth-page-wrapper py-5 position-relative d-flex align-items-center justify-content-center min-vh-100 bg-light">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <Card.Body>
                                    <Row className="g-0">
                                        <Col lg={5}>
                                            <Card className="auth-card bg-primary h-100 border-0 shadow-none p-sm-3 overflow-hidden mb-0">
                                                <Card.Body className="p-4 d-flex justify-content-between flex-column">
                                                    <div className="auth-image mb-3">
                                                        <Image src={logoLightFull} alt="" height="26" />
                                                        <Image src={authEffect2} alt="" className="auth-effect-2" priority />
                                                        <Image src={authEffect} alt="" className="auth-effect" />
                                                        <Image src={authEffect} alt="" className="auth-effect-3" />
                                                    </div>

                                                    <div>
                                                        <h3 className="text-white">Start your journey with us.</h3>
                                                        <p className="text-white-75 fs-15">It brings together your tasks, projects, timelines, files and more</p>
                                                    </div>
                                                    <div className="text-center text-white-75">
                                                        <p className="mb-0">©
                                                            {new Date().getFullYear()}{" "}
                                                            Hybrix. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                                                        </p>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col lg={7}>
                                            <Card className="mb-0 border-0 shadow-none">
                                                <Card.Body className="px-0 p-sm-5 m-lg-4">
                                                    <div className="text-center mt-2">
                                                        <h5 className="text-primary fs-20">Welcome Back !</h5>
                                                        <p className="text-muted">Sign in to continue to Hybrix.</p>
                                                    </div>
                                                    {error && error ? (<Alert variant="danger"> {error} </Alert>) : null}
                                                    <div className="p-2 mt-5">
                                                        <Form
                                                            onSubmit={(e) => {
                                                                e.preventDefault();
                                                                validation.handleSubmit();
                                                                return false;
                                                            }}
                                                        >

                                                            <div className="mb-3">
                                                                <Form.Label htmlFor="username" className="form-label">Username</Form.Label>
                                                                <Form.Control className="form-control" id="username" placeholder="Enter username"
                                                                    name="email"
                                                                    type="email"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.email || ""}
                                                                    isInvalid={
                                                                        validation.touched.email && validation.errors.email ? true : false
                                                                    }

                                                                />
                                                                {validation.touched.email && validation.errors.email ? (
                                                                    <Form.Control.Feedback type="invalid">{validation.errors.email}</Form.Control.Feedback>
                                                                ) : null}
                                                            </div>

                                                            <div className="mb-3">
                                                                <div className="float-end">
                                                                    <Link href="/auth/forget-password" className="text-muted">Forgot password?</Link>
                                                                </div>
                                                                <Form.Label className="form-label" htmlFor="password-input">Password</Form.Label>
                                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                                    <Form.Control type={passwordtype ? "password" : "text"} className="form-control pe-5 password-input" placeholder="Enter password" id="password-input"
                                                                        name="password"
                                                                        // value={validation.values.password || ""}
                                                                        // onChange={validation.handleChange}
                                                                        // onBlur={validation.handleBlur}
                                                                        // isInvalid={
                                                                        //     validation.touched.password && validation.errors.password ? true : false
                                                                        // }
                                                                    />
                                                                    {/* {validation.touched.password && validation.errors.password ? (
                                                                        <Form.Control.Feedback type="invalid">{validation.errors.password}</Form.Control.Feedback>
                                                                    ) : null} */}
                                                                    <Button variant='link' className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick={() => setPasswordtype(!passwordtype)}><i className="ri-eye-fill align-middle"></i></Button>
                                                                </div>
                                                            </div>

                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                                <Form.Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Form.Label>
                                                            </div>

                                                            <div className="mt-4">
                                                                <Button variant="primary" className="w-100" type="submit" disabled={error || loading ? true : false}>
                                                                    {error || loading ? <Spinner animation="border" size="sm" className="me-2"></Spinner> : null}
                                                                    Sign In
                                                                </Button>
                                                            </div>

                                                            {/* <div className="mt-4 pt-2 text-center"> */}
                                                                {/* <div className="signin-other-title">
                                                                    <h5 className="fs-13 mb-4 title">Sign In with</h5>
                                                                </div> */}
                                                                {/* <div className="pt-2 hstack gap-2 justify-content-center"> */}

                                                                    {/* <FacebookLogin
                                                                        // appId={facebook.APP_ID}
                                                                        autoLoad={false}
                                                                        callback={facebookResponse}
                                                                        render={(renderProps: any) => (
                                                                            <Button type="button" variant='soft-primary' className="btn-icon" onClick={renderProps.onClick}>
                                                                                <i className="ri-facebook-fill fs-16" />
                                                                            </Button>
                                                                        )}
                                                                    /> */}
                                                                    {/* <button type="button" className="btn btn-soft-primary btn-icon"><i className="ri-facebook-fill fs-16"></i></button> */}
                                                                    {/* <button type="button" className="btn btn-soft-danger btn-icon"><i className="ri-google-fill fs-16"></i></button> */}

                                                                    {/* <GoogleLogin
                                                                        clientId={"23144678283-oek7ncjmmrgkgmi2i56sc411gp71a8sp.apps.googleusercontent.com"}
                                                                        render={(renderProps: any) => (
                                                                            <Button variant='soft-danger' type="button" className="btn-icon" onClick={renderProps.onClick}>
                                                                                <i className="ri-google-fill fs-16" />
                                                                            </Button>
                                                                        )} onSuccess={googleResponse} onFailure={() => { }} /> */}
                                                                    {/* <Button variant='soft-dark' type="button" className="btn-icon"><i className="ri-github-fill fs-16"></i></Button>
                                                                    <Button variant='soft-info' type="button" className="btn-icon"><i className="ri-twitter-fill fs-16"></i></Button> */}
                                                                {/* </div> */}
                                                            {/* </div> */}
                                                        </Form>

                                                        <div className="text-center mt-5">
                                                            <p className="mb-0">Don't have an account ? <Link href="/auth/register" className="fw-semibold text-secondary text-decoration-underline"> SignUp</Link> </p>
                                                        </div>
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
        </React.Fragment>
    );
}

Login.getLayout = function getLayout(page: any) {
    return (
      <NonAuthLayout>
        {page}
      </NonAuthLayout>
    )
};

export default Login;