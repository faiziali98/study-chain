import React, { useEffect, useState } from "react";
import { borderStyles } from "../constants/styles";
import AppLoader from "./AppLoader";

const CourseComponent = ({ dataSource, course }) => {
    const [loading, setLoading] = useState(true);
    const [courseInfo, setCourseInfo] = useState([]);

    useEffect(() => {  
        dataSource.getCourse(setCourseInfo, setLoading, course);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div style={{ display: "flex", minWidth: "88vw" }}>
            {!loading ? <div style={{...borderStyles, display: "flex", flexDirection: "column", rowGap: "8px", marginTop: "12px", width: "89vw"}}>
                    <h2>{course.title}</h2>
                    <h3>{course.summary}</h3>
                    <p>{courseInfo.content}</p>
                </div> : <AppLoader />}
        </div>
    )
}

export default CourseComponent;
