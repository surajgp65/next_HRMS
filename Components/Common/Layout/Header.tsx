import Image from 'next/image';
import React from 'react';
//import images
import SearchModal from '../SearchModal';
// import BrowseAppsDropdown from '../BrowseAppsDropdown';
// import MyCartDropdown from '../MyCartDropdown';
// import FullScreenDropdown from '../FullScreenDropdown';
// import NotificationDropdown from '../NotificationDropdown';
import ProfileDropdown from '../ProfileDropdown';
import { Button, Dropdown } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { changeLayoutMode } from 'Components/slices/thunk';
import { LAYOUT_MODE_TYPES } from '@common/constants/layout';

import logodark from "@assets/images/logo-dark.png"
import logolight from "@assets/images/logo-light.png"
import logosm from "@assets/images/logo-sm.png"
import Link from 'next/link';

const Header = () => {
    const dispatch: any = useDispatch();

    const toogleMenuBtn = () => {
        var windowSize = document.documentElement.clientWidth;

        if (windowSize > 767)
            document.querySelector(".hamburger-icon")?.classList.toggle('open');

        //For collapse horizontal menu
        if (document.documentElement.getAttribute('data-layout') === "horizontal") {
            document.body.classList.contains("menu") ? document.body.classList.remove("menu") : document.body.classList.add("menu");
        }

        //For collapse vertical menu
        if (document.documentElement.getAttribute('data-layout') === "vertical") {
            if (windowSize < 1025 && windowSize > 767) {
                document.body.classList.remove('vertical-sidebar-enable');
                (document.documentElement.getAttribute('data-sidebar-size') === 'sm') ? document.documentElement.setAttribute('data-sidebar-size', '') : document.documentElement.setAttribute('data-sidebar-size', 'sm');
            } else if (windowSize > 1025) {
                document.body.classList.remove('vertical-sidebar-enable');
                (document.documentElement.getAttribute('data-sidebar-size') === 'lg') ? document.documentElement.setAttribute('data-sidebar-size', 'sm') : document.documentElement.setAttribute('data-sidebar-size', 'lg');
            } else if (windowSize <= 767) {
                document.body.classList.add('vertical-sidebar-enable');
                document.documentElement.setAttribute('data-sidebar-size', 'lg');
            }
        }

        //Two column menu
        if (document.documentElement.getAttribute('data-layout') === "twocolumn") {
            document.body.classList.contains('twocolumn-panel') ? document.body.classList.remove('twocolumn-panel') : document.body.classList.add('twocolumn-panel');
        }
    };

    return (
        <React.Fragment>
            <header id="page-topbar">
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex">

                            <div className="navbar-brand-box horizontal-logo">
                                <Link href="/dashboard" className="logo logo-dark">
                                    <span className="logo-sm">
                                        <Image src={logosm} alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <Image src={logodark} alt="" height="25" priority={true} />
                                    </span>
                                </Link>

                                <Link href="/dashboard" className="logo logo-light">
                                    <span className="logo-sm">
                                        <Image src={logosm} alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <Image src={logolight} alt="" height="25" />
                                    </span>
                                </Link>
                            </div>

                            <button type="button" className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger" id="topnav-hamburger-icon" onClick={toogleMenuBtn}>
                                <span className="hamburger-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>

                            {/* SearchModal */}
                            <SearchModal />
                        </div>

                        <div className="d-flex align-items-center">

                            <div className="d-md-none topbar-head-dropdown header-item">
                                <button type="button" className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle" id="page-header-search-dropdown" data-bs-toggle="modal" data-bs-target="#searchModal">
                                    <i className="bi bi-search fs-16"></i>
                                </button>
                            </div>


                            {/* Browse by Apps Dropdown */}
                            {/* <BrowseAppsDropdown /> */}

                            {/* My Cart Dropdown */}
                            {/* <MyCartDropdown /> */}

                            {/* FullScreenDropdown */}
                            {/* <FullScreenDropdown /> */}

                            <Dropdown className="topbar-head-dropdown ms-1 header-item">
                                <Dropdown.Toggle className="btn btn-icon btn-topbar btn-ghost-dark rounded-circle mode-layout arrow-none">
                                    <i className="align-middle fs-20 bi bi-sun"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="p-2 dropdown-menu-end" id="light-dark-mode">
                                    <Dropdown.Item href="#" data-mode="light" onClick={() => dispatch(changeLayoutMode(LAYOUT_MODE_TYPES.LIGHTMODE))}><i className="bi bi-sun align-middle me-2"></i> Defualt (light mode)</Dropdown.Item>
                                    <Dropdown.Item href="#" data-mode="dark" onClick={() => dispatch(changeLayoutMode(LAYOUT_MODE_TYPES.DARKMODE))}><i className="bi bi-moon align-middle me-2"></i> Dark</Dropdown.Item>
                                    {/* <Dropdown.Item href="#" data-mode="auto" onClick={() => dispatch(changeLayoutMode(LAYOUT_MODE_TYPES.LIGHTMODE))}><i className="bi bi-moon-stars align-middle me-2"></i> Auto (system defualt)</Dropdown.Item> */}
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* NotificationDropdown */}
                            {/* <NotificationDropdown /> */}

                            {/* ProfileDropdown */}
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </header>

            <div id="removeNotificationModal" className="modal fade zoomIn" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" id="NotificationModalbtn-close"></button>
                        </div>
                        <div className="modal-body p-md-5">
                            <div className="text-center">
                                <div className="text-danger">
                                    <i className="bi bi-trash display-4"></i>
                                </div>
                                <div className="mt-4 fs-15">
                                    <h4 className="mb-1">Are you sure ?</h4>
                                    <p className="text-muted mx-4 mb-0">Are you sure you want to remove this Notification ?</p>
                                </div>
                            </div>
                            <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                <Button type="button" variant="light" className="w-sm" data-bs-dismiss="modal">Close</Button>
                                <Button type="button" variant="danger" className="w-sm" id="delete-notification">Yes, Delete It!</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Header;