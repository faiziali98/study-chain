import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { borderStyles } from '../constants/styles';

// Component representing a single question with options
const Question = ({ id, question, surveyId, setSelected }) => {
  const { updateFormValues } = useAppContext();

  const [ updated, setUpdated ] = useState(false);

  const handleOptionChange = (e) => {
    if (!updated) {
      setUpdated(true);
      setSelected();
    }
    const selectedValue = parseInt(e.target.value, 10);
    updateFormValues(surveyId, id, selectedValue);
  };

  const formStyle = {
    display: 'flex',
    rowGap: "8px",
    fontSize: "larger",
    flexDirection: 'column', // This is the default, but you can use it for clarity
    justifyContent: 'space-between', // Adjust as needed: flex-start, flex-end, space-between, space-around, center
    alignItems: 'start', // Adjust as needed: flex-start, flex-end, center, baseline, stretch
  };

  return (
    <div style={{...borderStyles, marginBottom: "8px", display: "flex", flexDirection: 'column', rowGap: "10px"}}>
      <h3 style={{margin: "2px"}}>{question}</h3>
      <form style={formStyle}>
        {["Very Poor", "Poor", "Average", "Good", "Excellent"].map((value, i) => (
          <label key={value}>
            <input
              type="radio"
              name={id}
              value={i + 1}
              onChange={handleOptionChange}
              style={{marginRight: "8px"}}
            />
            {value}
          </label>
        ))}
      </form>
    </div>
  );
};

export default Question;
