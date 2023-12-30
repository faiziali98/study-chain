import React, { useState, useEffect } from 'react';
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

const Navbar = ({ userType, setUserType, page, setPage }) => {
    const { updateUser } = useAppContext();

    const divStyles = {
        cursor: "pointer"
    }
    return (
        <nav style={{ ...borderStyles, marginTop: "12px", padding: "8px", minWidth: "90vw" }}>
            <ul style={{ display: "flex", flexDirection: "row", columnGap: "40px" }}>
                <li>
                    {userType === userTypeEnum.teacher ?
                        <div style={divStyles} onClick={() => setPage(navBarEnum.create)}>Create Course</div> :
                        <div style={divStyles} onClick={() => setPage(navBarEnum.buy)}>Buy Course</div>}
                </li>
                <li>
                    <div style={divStyles} onClick={() => setUserType(userType === userTypeEnum.teacher ? userTypeEnum.student : userTypeEnum.teacher)}>Switch Role</div>
                </li>
                <li>
                    {page === navBarEnum.home
                        ? <div style={divStyles} onClick={() => setPage(navBarEnum.settings)}>Settings</div>
                        : <div style={divStyles} onClick={() => setPage(navBarEnum.home)}>Home</div>
                    }
                </li>
                <li>
                    <div style={divStyles} onClick={() => updateUser(null)}>Logout</div>
                </li>
            </ul>
        </nav>
    );
};


// Component representing a single question with options
const UserHomepageComponent = ({ appType }) => {
    const { getUser } = useAppContext();
    const navigate = useNavigate();
    const [userType, setUserType] = useState(userTypeEnum.student);
    const [signedUp, setSignedUp] = useState(appType === "real" ? false : true);
    const [page, setPage] = useState(navBarEnum.home);
    const [course, setCourse] = useState(null);
    const [connectedToDataSource, setConnectedToDataSource] = useState(false);

    const dataSource = dataSourceFactory[appType];

    useEffect(() => {
        !!getUser() && dataSource.connect().then(() => setConnectedToDataSource(true));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        !!dataSource.validate() && dataSource.checkIfSignedUp(getUser().name, setSignedUp)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connectedToDataSource, page]);

    return (
        <>{!!getUser()
            ? <div style={{ minWidth: "640px", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Navbar userType={userType} setUserType={setUserType} setPage={setPage} page={page} />
                {
                    page === navBarEnum.settings
                        ? <SettingsComponent dataSource={dataSource} signedUp={signedUp} />
                        : signedUp
                            ? page === navBarEnum.home
                                ? userType === userTypeEnum.student 
                                    ? <BoughtCoursesComponent dataSource={dataSource} setPage={setPage} setCourse={setCourse}/>
                                    : <CreatedCoursesComponent dataSource={dataSource} setPage={setPage} setCourse={setCourse}/>
                                : page === navBarEnum.buy ? <AllCoursesComponent dataSource={dataSource} />
                                : page === navBarEnum.course ? <CourseComponent  course={course}/>
                                : page === navBarEnum.create && <CreateCourseComponent dataSource={dataSource} />
                            : <div style={{ minWidth: "640px", minHeight: "100%", display: "flex", flexDirection: "column", alignSelf: "flex-start" }}>
                                Kindly register your wallet before we can start!
                                Go to settings and click register.
                            </div>
                }
            </div>
            : <button onClick={() => navigate("/application")} style={{ ...buttonStyle, marginTop: "12px" }}>Please Login First</button>
        }</>
    );
};

export default UserHomepageComponent;
