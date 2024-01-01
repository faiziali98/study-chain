import React from "react";
import Survey from "../components/Survey";
import LoadingComponent from "../components/LoadingComponent";

const questions = {
    initial: [
        "How would you rate your understanding of the fundamental concepts of blockchain?",
        "Do you feel confident in your understanding of decentralized applications (DApps)?",
        "Are you familiar with the role and functionality of smart contracts in decentralized applications?",
        "Do you have any understanding of wallets, digital or cryptocurrency, and their transactions?",
        "Indicate your perception of the security features of blockchain:"
    ],
    final: [
        "After video tutorial:  Now rate your understanding of the fundamental concepts of blockchain?",
        "After the tutorial, how confident do you feel in your understanding of decentralized applications (DApps)?",
        "After the video tutorial, how familiar do you feel with the role and functionality of smart contracts in decentralized applications?",
        "After the video tutorial, how much understanding have you gained about wallets, digital or cryptocurrency, and their transactions?",
        "After the video tutorial, please indicate your perception of the security features of blockchain."
    ]
};

const nextPage = {
    initial: "video-tutorial",
    final: "score"
}

const SurveyPage = ({id}) => <LoadingComponent>
        <Survey id={id} nextPage={nextPage[id]} questions={questions[id]}/>
    </LoadingComponent>;

export default SurveyPage;
