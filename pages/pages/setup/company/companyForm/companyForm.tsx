import React, { ReactElement, useState, useEffect } from 'react';
import type { GetStaticProps } from 'next'
import Head from 'next/head';
import { Container, Row, Col, Form, Button, InputGroup, Dropdown } from 'react-bootstrap';
import Breadcrumb from '@common/Breadcrumb';
import Layout from '@common/Layout';
import { useRouter } from 'next/router';
import Select from 'react-select';
import ReactFlagsSelect from "react-flags-select";


// Define the types for country and selected option



const newPage = () => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState(null);
    const [validated, setValidated] = useState(false);
    const [selected, setSelected] = useState("");
    const [value, setValue] = useState<any>();
    const [countries, setCountries] = useState<any>([]); // Specify the type as an array of Country
    const [selectedCountry, setSelectedCountry] = useState<any>(null); // Specify the type as Country or null





    // Functions
    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        )
            .then((response) => response.json())
            .then((data) => {
                setCountries(data.countries);
                setSelectedCountry(data.userSelectValue);
            });
    }, []);


    const changeCountryHandler = (value: any) => {
        setValue(value)
    }



    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option 2', label: 'Option 2' },
        { value: 'CreateNewHoliday', label: 'Create new Holiday' }
    ]


    // Change in the Option
    const handleSelectChange = (selectedOption: any) => {
        // Log the clicked option's value
        console.log('Clicked option:', selectedOption?.value);
        setSelectedOption(selectedOption);

        // Check if the selected option is "Strawberry"
        if (selectedOption?.value === 'CreateNewHoliday') {
            router.push("/pages/setup/company/companyForm/newHoliday");
        }
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

                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Country</Form.Label>
                                <Select
                                    options={countries}
                                    value={selectedCountry}
                                    onChange={(selectedOption) => setSelectedCountry(selectedOption)}
                                />
                            </Form.Group>

                            
                            <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label htmlFor="isGroup" className="form-label">Default Holiday List</Form.Label>
                                <Select
                                    required
                                    options={options}
                                    onChange={handleSelectChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please choose an option.
                                </Form.Control.Feedback>
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
                                    Please provide a valid date.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        <Row>
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                                <Form.Label>Date of Establishment</Form.Label>
                                <Form.Control type="date" required />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid date.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>

                        {/* Divider */}
                        <hr className='hr hr-blurry'></hr>

                        <h6 className='bold'>Hello</h6>



                        <Button type="submit">Submit form</Button>
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

