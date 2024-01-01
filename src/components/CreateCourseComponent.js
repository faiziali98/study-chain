import React, { useState } from 'react';
import { borderStyles, buttonStyle, inputStyles } from '../constants/styles';
import { useAppContext } from '../context/AppContext';

const CreateCourseComponent = ({ dataSource, handleCreateCourseDemo }) => {
    const [courseName, setCourseName] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [cost, setCost] = useState('');

    const { getUser } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // You can handle the form submission here
        const courseData = {
            courseName,
            summary,
            content,
            title,
            cost: parseInt(cost, 10), // Convert cost to integer
        };

        dataSource.createCourse(getUser().name, courseData);
        handleCreateCourseDemo();

        // Perform further actions, like sending the data to an API, etc.
        console.log('Course Data:', courseData);

        // Reset the form after submission
        setCourseName('');
        setSummary('');
        setContent('');
        setTitle('');
        setCost('');
    };

    const inputStylez = { ...inputStyles, minWidth: "85vw", padding: "8px"}
    const labelStyle = { marginBottom: '4px', display: "flex", marginTop: "4px"};

    return (
        <div style={{ ...borderStyles, display: "flex", minWidth: "89vw", marginTop: "12px" }}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="courseName" style={labelStyle}>Course Name:</label>
                    <input
                        type="text"
                        id="courseName"
                        value={courseName}
                        style={inputStylez}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="summary" style={labelStyle}>Summary:</label>
                    <textarea
                        id="summary"
                        value={summary}
                        style={inputStylez}
                        rows={5}
                        onChange={(e) => setSummary(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" style={labelStyle}>Content:</label>
                    <textarea
                        id="content"
                        style={inputStylez}
                        value={content}
                        rows={10}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="title" style={labelStyle}>Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        style={inputStylez}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cost" style={labelStyle}>Cost:</label>
                    <input
                        type="number"
                        id="cost"
                        value={cost}
                        style={inputStylez}
                        onChange={(e) => setCost(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit" style={{ ...buttonStyle, marginTop: "12px" }}>Create Course</button>
                </div>
            </form>
        </div>
    );
};

export default CreateCourseComponent;
