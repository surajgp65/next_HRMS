import React from 'react';
import Link from 'next/link';
import { Row } from 'react-bootstrap';

const Breadcrumb = (props: any) => {
    return (
        <React.Fragment>
            <Row>
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0">{props.breadcrumbItem}</h4>

                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link href="#">{props.breadcrumb}</Link></li>
                                <li className="breadcrumb-item active">{props.breadcrumbItem}</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </Row>
        </React.Fragment>
    );
}

export default Breadcrumb;