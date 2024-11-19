import React from "react";
import Survey from "../components/Survey";
import LoadingComponent from "../components/LoadingComponent";

const questions = {
    basic: [
        "How would you rate your understanding of the fundamental concepts of blockchain?",
        "Do you feel confident in your understanding of decentralized applications (DApps)?",
        "Are you familiar with the role and functionality of smart contracts in decentralized applications?",
        "Do you have any understanding of wallets, digital or cryptocurrency, and their transactions?",
        "Indicate your perception of the security features of blockchain:"
    ],
    wallet: [
        "Your knowledge about Digital Wallet",
        "Do you have an understanding of MetaMask?",
        "Do you know how to connect Digital Wallet with StudyChain?",
    ],
    navigation: [
        "Do you have an understanding of Decentralized Application?",
        "Do you have an understanding of StudyChain Navigation and function?"
    ]
};

const headings = {
    basic: "Basic Knowledge of Blockchain",
    wallet: "Digital Wallet",
    navigation: "Navigation of StudyChain"
}

const SurveyPage = ({id}) => <LoadingComponent>
        <Survey id={id} nextPage='video-tutorial' questions={questions} headings = {headings} />
    </LoadingComponent>;

export default SurveyPage;
