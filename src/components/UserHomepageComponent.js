import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { buttonStyle, borderStyles } from '../constants/styles';
import { useNavigate } from 'react-router-dom';
import SettingsComponent from './SettingsComponent';
import BoughtCoursesComponent from './BoughtCoursesComponent';
import AllCoursesComponent from './AllCoursesComponent';
import CourseComponent from './CourseComponent';
import CreateCourseComponent from './CreateCourseComponent';
import CreatedCoursesComponent from './CreatedCoursesComponent';
import { dataSourceFactory } from '../data/DataSourceFactory';
import SiteTourComponent from './SiteTourComponent';
import AppLoader from './AppLoader';
import RibbonComponent from './RibbonComponent';
import ReactPlayer from 'react-player';

import '../css/Modal.css'; // Import your CSS file for styling
import '../css/Dashboard.css';

const userTypeEnum = {
    teacher: 0,
    student: 1,
}

const navBarEnum = {
    home: 0,
    create: 1,
    buy: 2,
    settings: 3,
    course: 4,
}

const Navbar = ({ userType, setUserType, page, setPage, isDemo }) => {
    const { updateUser } = useAppContext();
    const navigate = useNavigate();

    const divStyles = {
        cursor: "pointer"
    }
    return (
        <nav style={{ ...borderStyles, marginTop: "12px", padding: "8px", minWidth: "90vw" }}>
            <ul style={{ display: "flex", flexDirection: "row", columnGap: "40px" }}>
                <li className='button-3'>
                    {userType === userTypeEnum.teacher ?
                        <div style={divStyles} onClick={() => setPage(navBarEnum.create)}>Create Course</div> :
                        <div style={divStyles} onClick={() => setPage(navBarEnum.buy)}>Buy Course</div>}
                </li>
                <li>
                    <div style={divStyles} onClick={() => setUserType(userType === userTypeEnum.teacher ? userTypeEnum.student : userTypeEnum.teacher)} className="button-2">Switch Role</div>
                </li>
                <li>
                    {page === navBarEnum.home
                        ? <div style={divStyles} onClick={() => setPage(navBarEnum.settings)} className="button-1">Settings</div>
                        : <div style={divStyles} onClick={() => setPage(navBarEnum.home)}>Home</div>
                    }
                </li>
                <li>
                    {
                        isDemo
                            ? <div style={divStyles} onClick={() => {
                                updateUser(null);
                                navigate("/user-experience-survey")
                            }}>Continue to App</div>
                            : <div style={divStyles} onClick={() => updateUser(null)}>Logout</div>
                    }
                </li>
            </ul>
        </nav>
    );
};

const ConnectWalletJSX = ({ heading, textColor }) => {
    return (
        <>
            <h2>{heading}</h2>
            <img style={{ maxWidth: "500px", marginBottom: "12px" }} src="MetaMask_find_connected_sites_extension.gif" alt="gif" />
            <a style={{color: textColor}} href="https://support.metamask.io/hc/en-us/articles/360045901112-Manually-connecting-to-a-dapp"> Follow this tutorial for step by step wallet connection. </a>
        </>
    )
}

const modalJSX = {
    "default": <ConnectWalletJSX textColor="white" heading="Wallet ID you registered not connected to the website. Connect through Metamask." />,
    "register": <ConnectWalletJSX heading="This is demo, in real app, you will need to register the wallet" />,
    "buy": (
        <>
            <h3>This is demo, in real app, you will pay through Metamask.</h3>
            <ReactPlayer
                url="/buy-course.mp4"
                controls={true}
                width="100%"
                height="80%"
            />
            <p>Demo Course bought successfully! Now click on the home button to see the bought courses.</p>
        </>
    ),
    "create": (
        <>
            <h3>This is demo, in real app, you will pay through Metamask.</h3>
            <ReactPlayer
                url="/buy-course.mp4"
                controls={true}
                width="100%"
                height="80%"
            />
            <p>Demo Course created successfully! Now click on the home button to see the created courses.</p>
        </>
    )
}

const Modal = ({ isOpen, onClose, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // When the modal is opened, set a timeout to add the "in-view" class after a short delay
        if (isOpen) {
            const timeoutId = setTimeout(() => {
                setIsVisible(true);
            }, 120);

            return () => clearTimeout(timeoutId);
        } else {
            // When the modal is closed, reset the visibility state
            setIsVisible(false);
        }
    }, [isOpen]);

    // Render nothing if the modal is not open
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className={`modal-content ${isVisible ? "in-view" : ""}`} onClick={(e) => e.stopPropagation()}>
                {/* Modal content goes here */}
                {children}
                <button className="modal-close-button" onClick={onClose}>
                    <span className="close-icon">×</span>
                </button>
            </div>
        </div>
    );
};


// Component representing a single question with options
const UserHomepageComponent = ({ isDemo }) => {
    const navigate = useNavigate();
    const { getUser } = useAppContext();

    const [userType, setUserType] = useState(userTypeEnum.student);
    const [signedUp, setSignedUp] = useState(isDemo);
    const [page, setPage] = useState(navBarEnum.home);
    const [course, setCourse] = useState(null);
    const [connectedToDataSource, setConnectedToDataSource] = useState(false);
    const [isEthereumSetup, setIsEthereumSetup] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tourInitiated, setTourInitiated] = useState(isDemo ? false : true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currModalJsx, setCurrModalJsx] = useState("default");
    const [noWalletConnected, setNoWalletConnected] = useState(false);
    const [walletNotFound, setWalletNotFound] = useState(false);
    const { walletAddress } = getUser() || {};

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const dataSource = useMemo(() => dataSourceFactory[isDemo ? "demo" : "real"], [isDemo]);
    const handleRegisterDemo = () => {
        if (isDemo) {
            setCurrModalJsx("register");
            openModal();
        }
    }
    const handleBuyCourseDemo = () => {
        if (isDemo) {
            setCurrModalJsx("buy");
            openModal();
        }
    }
    const handleCreateCourseDemo = () => {
        if (isDemo) {
            setCurrModalJsx("create");
            openModal();
        }
    }

    const openWalletNotFoundModal = () => {
        setWalletNotFound(true);
    }

    useEffect(() => {
        !!getUser() && dataSource.connect({ setNoWalletConnected, openWalletNotFoundModal, walletAddress }).then((val) => {
            setConnectedToDataSource(val);
            setIsEthereumSetup(val);
            setLoading(false);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        !!dataSource.validate() && dataSource.checkIfSignedUp(getUser().name, setSignedUp)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connectedToDataSource, page]);

    return loading
        ? <AppLoader />
        : <>
            {
                isEthereumSetup
                    ? !!getUser()
                        ? <div className={`mainSection ${tourInitiated ? 'main-content' : 'main-content blurred'}`} style={{ minWidth: "640px", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <RibbonComponent isDemo={isDemo}>
                                <Navbar userType={userType} setUserType={setUserType} setPage={setPage} page={page} isDemo={isDemo} />
                            </RibbonComponent>
                            {
                                page === navBarEnum.settings
                                    ? <SettingsComponent dataSource={dataSource} signedUp={signedUp} handleRegisterDemo={handleRegisterDemo} />
                                    : signedUp
                                        ? page === navBarEnum.home
                                            ? userType === userTypeEnum.student
                                                ? <BoughtCoursesComponent dataSource={dataSource} setPage={setPage} setCourse={setCourse} />
                                                : <CreatedCoursesComponent dataSource={dataSource} setPage={setPage} setCourse={setCourse} />
                                            : page === navBarEnum.buy ? <AllCoursesComponent dataSource={dataSource} handleBuyCourseDemo={handleBuyCourseDemo} />
                                                : page === navBarEnum.course ? <CourseComponent dataSource={dataSource} course={course} />
                                                    : page === navBarEnum.create && <CreateCourseComponent dataSource={dataSource} handleCreateCourseDemo={handleCreateCourseDemo} />
                                        : <div style={{ minWidth: "80vw", minHeight: "80vh", display: "flex", flexDirection: "column", alignSelf: "center", alignItems: "center", justifyContent: "center" }}>
                                            <img src="/cryptowallet.avif" alt="metamask required" style={{ maxWidth: "40vw", maxHeight: "20vh" }} />
                                            <h3>Kindly register your wallet before we can start!
                                                Go to settings and click register.</h3>
                                        </div>
                            }
                            <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <div className="modal-scrollable-content" style={{ display: "flex", flexDirection: "column", color: "black", maxWidth: "600px", maxHeight: "400px", overflowY: "auto", alignItems: "center" }}>
                                    {modalJSX[currModalJsx]}
                                </div>
                            </Modal>
                            {
                                isDemo && <SiteTourComponent onTourInitiate={setTourInitiated} />
                            }
                        </div>
                        : <button onClick={() => navigate("/application")} style={{ ...buttonStyle, marginTop: "12px" }}>Please Login First</button>
                    : walletNotFound
                        ? modalJSX.default
                        : <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                            <img src="/download.png" alt="metamask required" />
                            <h2>{noWalletConnected
                                ? "This application requires Ethereum wallet to be connected to the website. Kindly use Metamask pop-up to connect your wallet then refresh the page."
                                : "This application requires metamask to be installed, kindly install the metamask extension!"}</h2>
                        </div>
            }
        </>;
};

export default UserHomepageComponent;
