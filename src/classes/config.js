import { createChatBotMessage } from "react-chatbot-kit";

const parentStyle = {
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    overflowX: "auto",
    gap: "4px",
    color: "black",
    scrollbarWidth: "none", // For Firefox
    msOverflowStyle: "none", // For Internet Explorer and Edge
};

const childStyle = {
    padding: "6px",
    border: "1px solid grey",
    whiteSpace: "initial",
    flexShrink: 0,
    borderRadius: '8px',
};

const LinkComponent = ({ link }) => {
    return <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#376B7E", textDecoration: "underline" }}
    >
        Click to open
    </a>
}

const config = {
    botName: "AssistantBot",
    initialMessages: [
        createChatBotMessage(`Hi there! How can I assist you today? 
            Select from the list:`, {
            widget: "options",
        }),
    ],
    customStyles: {
        botMessageBox: {
            backgroundColor: "#376B7E",
        },
        chatButton: {
            backgroundColor: "#376B7E",
        },
    },
    widgets: [
        {
            widgetName: "linkBuyCourse",
            widgetFunc: () => <LinkComponent link="http://localhost:3000/buy-course.mp4" />,
        },
        {
            widgetName: "linkWallet",
            widgetFunc: () => <LinkComponent link="http://localhost:3000/wallet.mp4" />,
        },
        {
            widgetName: "linkBC",
            widgetFunc: () => <LinkComponent link="http://localhost:3000/bc.mp4" />,
        },
        {
            widgetName: "linkNav",
            widgetFunc: () => <LinkComponent link="http://localhost:3000/nav.mp4" />,
        },
        {
            widgetName: "options",
            widgetFunc: () => (
                <div
                    style={parentStyle}
                >
                    <div style={childStyle}> How to connect wallet? </div>
                    <div style={childStyle}>How to buy/create courses?</div>
                    <div style={childStyle}>What is metamask?</div>
                    <div style={childStyle}>What is blockchain?</div>
                    <div style={childStyle}>How to navigate in study chain?</div>
                </div>
            ),
        },
    ],
};

export default config;
