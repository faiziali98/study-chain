import React, { useEffect, useState } from "react";
import { borderStyles, buttonStyle } from "../constants/styles";
import AppLoader from "./AppLoader";

const BoughtCoursesComponent = ({ dataSource, setPage, setCourse }) => {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        dataSource.getCourses(setCourses, setLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const open = (c) => {
        setPage(4);
        setCourse(c);
    }


    return (
        <div style={{ display: "flex", flexDirection: "column", minWidth: "100%", alignItems: "center" }}>
            <h1 style={borderStyles}> List of courses that you have bought! </h1>
            {!loading ? <ul style={{ display: "flex", flexDirection: "column", rowGap: "8px", minWidth: "86vw", maxWidth: "86vw", alignSelf: "flex-start" }}>
                {courses.map((c) => (
                    <li style={borderStyles}>
                        <h3>{c.title}</h3>
                        <p>{c.summary}</p>
                        <button onClick={() => open(c)} style={{ ...buttonStyle, marginTop: "8px", alignSelf: "center" }}>Open Course</button>
                    </li>))}
            </ul> : <AppLoader />}
        </div>
    )
}

export default BoughtCoursesComponent;
