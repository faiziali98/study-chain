import React, { useEffect, useState } from "react";
import { borderStyles, buttonStyle } from "../constants/styles";
import AppLoader from "./AppLoader";

const AllCoursesComponent = ({ dataSource, handleBuyCourseDemo }) => {
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([]);

    useEffect(() => { 
        dataSource.getAllCourses(setCourses, setLoading);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", minWidth: "100%", alignItems: "center" }}>
            <h1 style={borderStyles}> Here are the courses that we have got! </h1>
            {!loading ? <ul style={{ display: "flex", flexDirection: "column", rowGap: "8px", minWidth: "86vw", maxWidth: "86vw", alignSelf: "flex-start" }}>
                {courses.map((c) => (<li style={{ ...borderStyles }}>
                    <h3 style={{ margin: "0px" }}>{c.title}</h3>
                    <p>{c.summary}</p>
                    <button onClick={() => {
                        handleBuyCourseDemo();
                        dataSource.buyCourse(c, setLoading);
                    }} style={{ ...buttonStyle, marginTop: "8px", alignSelf: "center" }}>{`Buy for ${c.amount} ETH`}</button>
                </li>))}
            </ul> : <AppLoader />}
        </div>
    )
}

export default AllCoursesComponent;
