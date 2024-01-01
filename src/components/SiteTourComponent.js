// SiteTour.js
import React, { useState, useEffect } from 'react';
import Joyride from 'react-joyride';

const SiteTourComponent = ({ onTourInitiate }) => {
    const [run, setRun] = useState(true);

    useEffect(() => {
        if (run) {
            // Tour has been initiated, notify the parent component
            onTourInitiate(true);
        }
    }, [run, onTourInitiate]);

    const steps = [
        {
            target: '.button-1', // Use a CSS selector for the target button
            content: 'Use this button to setup Ethereum wallet!',
        },
        {
            target: '.button-2',
            content: 'This button is used to switch roles. Initially the role is set to Student, click this to switch to teacher role.',
        },
        {
            target: '.button-3',
            content: 'In student mode, this button will take you to the course catalogue. In teacher mode, you can create new course using this button.',
        },
        {
            target: '.mainSection',
            content: 'All the courses will be displayed in this section based on which page you are at.'
        }
        // Add more steps as needed
    ];

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous={true}
            spotlightClicks
            showSkipButton={true}
            callback={(data) => {
                if (data.status === 'finished') {
                    // Site tour has finished, you can save this information in local storage or state
                    setRun(false);
                }
            }}
        />
    );
};

export default SiteTourComponent;
