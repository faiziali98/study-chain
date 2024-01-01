import React, { useState } from "react";
import Question from "./Question";
import { useNavigate } from 'react-router-dom';
import { borderStyles, buttonStyle } from '../constants/styles';

const Survey = ({id, nextPage, questions}) => {
    const navigate = useNavigate();

    const [selected, setSelected] = useState(0);

    const updateSelected = () => {
        setSelected(selected + 1);
    };

    const redirectToNextPage = () => {
        selected === questions.length && navigate(`/${nextPage}`);
    };
    
    return (
        <div style={{padding:"20px", alignSelf: "center", maxWidth: '640px'}}>
            <h1 style={{textAlign: "center", ...borderStyles, borderTop: "12px solid green"}}>User knowledge level survey</h1>
            {questions.map((q, i) => <Question id = {i} question={q} surveyId={id} setSelected={updateSelected} />)}
            <button onClick={() => redirectToNextPage()} style={{...buttonStyle, marginTop: "12px"}}>Submit</button>
        </div>
    );
}

export default Survey;
