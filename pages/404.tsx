import React, { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import NonAuthLayout from '@common/Layout/NonAuthLayout';
import { Card, Col, Container, Row } from 'react-bootstrap';

//import images
import logoLightFull from "@assets/images/logo-light-full.png";
import authEffect2 from "@assets/images/effect-pattern/auth-effect-2.png";
import authEffect from "@assets/images/effect-pattern/auth-effect.png";
import error400 from "@assets/images/error400.png";

import Link from 'next/link';

const Error404Basic = () => {
    return (
        <React.Fragment>
            <Head>
                <title>404 Error Basic | Hybrix - Admin & Dashboard Template</title>
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
                                                <Card.Body className="px-0 p-sm-5 m-lg-4">
                                                    <div className="error-img text-center px-5">
                                                        <Image src={error400} className="img-fluid" alt="" />
                                                    </div>
                                                    <div className="mt-4 text-center pt-3">
                                                        <div className="position-relative">
                                                            <h4 className="fs-18 error-subtitle text-uppercase mb-0">Opps, page not found</h4>
                                                            <p className="fs-15 text-muted mt-3">It will be as simple as Occidental in fact,
                                                                it will Occidental to an English person</p>
                                                            <div className="mt-4">
                                                                <Link href="/" className="btn btn-primary"><i className="mdi mdi-home me-1"></i>Back to home</Link>
                                                            </div>
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

Error404Basic.getLayout = function getLayout(page: any) {
    return (
      <NonAuthLayout>
        {page}
      </NonAuthLayout>
    )
};
export default Error404Basic;