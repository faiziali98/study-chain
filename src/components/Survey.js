import React, { useState } from "react";
import Question from "./Question";
import { useNavigate } from 'react-router-dom';
import { borderStyles, buttonStyle } from '../constants/styles';

const Survey = ({id, nextPage, questions, headings}) => {
    const navigate = useNavigate();
    const totalQuestion = Object.keys(questions).reduce((count, section) => count + questions[section].length, 0);

    const [selected, setSelected] = useState(0);

    const updateSelected = () => {
        setSelected(selected + 1);
    };

    const redirectToNextPage = () => {
        // selected === totalQuestion && 
        navigate(`/${nextPage}`);
    };
    
    return (
        <div style={{padding:"20px", alignSelf: "center", maxWidth: '640px'}}>
            <h1 style={{textAlign: "center", ...borderStyles, borderTop: "12px solid green"}}>User knowledge level survey</h1>
            {
                Object.keys(questions).map((section) => <div style={{...borderStyles, marginBottom: "12px"}}>
                        <h2 style={{textAlign: "center"}}>{headings[section]}</h2>
                        {questions[section].map((q, i) => <Question id = {i} question={q} setSelected={updateSelected} section={section}/>)}
                    </div>
                )
            }
            <button onClick={() => redirectToNextPage()} style={{...buttonStyle, background: selected === totalQuestion ? 'green' : 'grey'}}>Submit</button>
        </div>
    );
}

export default Survey;
