import React, { ReactElement, useState, useEffect } from 'react';
import type { GetStaticProps } from 'next'
import Head from 'next/head';
import { Container, Row, Col, Form, Button, InputGroup, Dropdown } from 'react-bootstrap';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { useRouter } from 'next/router';
import Flatpickr from "react-flatpickr";
import SimpleBar from 'simplebar-react';
import Image from 'next/image';

// Country Data
import country from '@common/data/country-list';



// Define the types for country and selected option



const newPage = () => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState(null);
    const [validated, setValidated] = useState(false);
    const [selected, setSelected] = useState("");
    const [value, setValue] = useState<any>();
    // const [countries, setCountries] = useState<any>([]); // Specify the type as an array of Country
    // const [selectedCountry, setSelectedCountry] = useState<any>(null); // Specify the type as Country or null

    // Country Change States
    const [seletedCountry, setseletedCountry] = useState('');




    // Functions
    // useEffect(() => {
    //     fetch(
    //         "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    //     )
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setCountries(data.countries);
    //             setSelectedCountry(data.userSelectValue);
    //         });
    // }, []);


    const changeCountryHandler = (value: any) => {
        setValue(value)
    }



    // Change in the Option
    const handleCreateNewHolidayClick = () => {
            router.push("/pages/setup/company/companyForm/newHoliday");
    };

    const handleSubmit = (event: any) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
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

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Company</Form.Label>
                                <Form.Control type="text" placeholder="" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid value.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Default Letter Head</Form.Label>
                                <Form.Control type="text" placeholder="" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid leave type
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Abbr</Form.Label>
                                <Form.Control type="text" placeholder="" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid field.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Tax ID</Form.Label>
                                <Form.Control type="text" placeholder="" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid field.
                                </Form.Control.Feedback>
                            </Form.Group>


                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Default Currency</Form.Label>
                                <Form.Control type="text" placeholder="" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid field.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Domain</Form.Label>
                                <Form.Control type="text" placeholder="" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid field.
                                </Form.Control.Feedback>
                            </Form.Group>


                        </Row>



                        <Row className="mb-3">

                            

                            <Form.Group as={Col} md="6">
                                <Form.Label htmlFor="isGroup" className="form-label">Default Holiday List</Form.Label>
                                <Dropdown>
                                    <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select Holiday List" readOnly>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                        <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                            <Dropdown.Item>Option 1</Dropdown.Item>
                                            <Dropdown.Item>Option 2</Dropdown.Item>
                                            <Dropdown.Divider></Dropdown.Divider>
                                            
                                            <Dropdown.Item onClick={handleCreateNewHolidayClick}><div className='d-flex justify-content-center align-items-center text-primary'><span className="bx bx-plus-medical" style={{ padding: 3 }}></span>Create new Holiday</div></Dropdown.Item>
                                        </SimpleBar>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>


                            <Form.Group as={Col} md="6">
                                <Form.Label> Country</Form.Label>
                                <Dropdown>
                                    <Dropdown.Toggle as="input" className="form-control rounded-end flag-input form-select" placeholder="Select Country" readOnly defaultValue={seletedCountry}>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu as='ul' className="list-unstyled w-100 dropdown-menu-list mb-0">
                                        <SimpleBar style={{ maxHeight: "220px" }} className="px-3">
                                            {(country || []).map((item: any, key: number) => (
                                                <Dropdown.Item as='li' onClick={() => setseletedCountry(item.countryName)} key={key} className="dropdown-item d-flex">
                                                    <div className="flex-shrink-0 me-2">
                                                        <Image src={item.flagImg} alt="country flag" className="options-flagimg" height="20" />
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="d-flex">
                                                            <div className="country-name me-1">{item.countryName}</div>
                                                            <span className="countrylist-codeno text-muted">{item.countryCode}</span>
                                                        </div>
                                                    </div>
                                                </Dropdown.Item>
                                            ))}
                                        </SimpleBar>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Form.Group>




                        </Row>


                        <Row>
                            <Col>
                                <InputGroup>
                                    <Form.Check type="checkbox" className='col-xs-2' id="isGroup" />
                                    <span style={{ height: "10px", width: "10px" }}></span>
                                    <Form.Label htmlFor="isGroup" className="form-label">Is Group</Form.Label>
                                </InputGroup>
                            </Col>


                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Parent Company</Form.Label>
                                <Form.Control type="text" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid answer.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Date of Establishment</Form.Label>
                                <Flatpickr
                                    className="form-control"
                                    options={{
                                        dateFormat: "d-m-Y",
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid date.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        {/* Divider */}
                        <hr className='hr hr-blurry'></hr>




                        <Button className='btn-sm'>Submit</Button>
                    </Form>
                </Container>
            </div>
        </React.Fragment>
    );
}

newPage.getLayout = (page: ReactElement) => {
    return (
        <Layout>
            {page}
        </Layout>
    )
};

export default newPage;

