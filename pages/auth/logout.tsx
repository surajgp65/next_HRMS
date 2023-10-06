import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
// import { logoutUser } from "../../Components/slices/thunk";
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

//import images
import logoLightFull from "@assets/images/logo-light-full.png";
import authEffect2 from "@assets/images/effect-pattern/auth-effect-2.png";
import authEffect from "@assets/images/effect-pattern/auth-effect.png";
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import NonAuthLayout from '@common/Layout/NonAuthLayout';

const Logout = () => {
    const dispatch:any = useDispatch();
    const router = useRouter();

    const LogoutUser = () => {
        // dispatch(logoutUser());
        router.push('/auth/login', undefined, { shallow: true })
    }
    return (
        <React.Fragment>
            <Head>
                <title>Logout | Hybrix - Admin & Dashboard Template</title>
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
                                                        <p className="mb-0">©
                                                            {new Date().getFullYear()}{" "} Hybrix. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                                                        </p>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col lg={7}>
                                            <Card className="mb-0 border-0 shadow-none">
                                                <Card.Body className="px-0 p-sm-5 m-lg-4 text-center">
                                                    <div className="display-4 text-primary">
                                                        <i className="bi bi-box-arrow-right"></i>
                                                    </div>
                                                    <div className="mt-4 pt-2">
                                                        <h5 className="fs-18">You are Logged Out</h5>
                                                        <p className="text-muted">Thank you for using <span className="fw-semibold">hybrix</span> admin template</p>
                                                        <div className="mt-4">
                                                            <Button onClick={LogoutUser} className="btn btn-primary w-100">Sign In</Button>
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
        </React.Fragment >
    );
}

Logout.getLayout = function getLayout(page: any) {
    return (
      <NonAuthLayout>
        {page}
      </NonAuthLayout>
    )
};
export default Logout;