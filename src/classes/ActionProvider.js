class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    handleGreeting = () => {
        const message = this.createChatBotMessage(`Have you tried our demo? If you still need assistance
            select from the list:`, {
                widget: "options",
            }
        );
        this.updateChatbotState(message);
    };

    handleHelp = () => {
        const message = this.createChatBotMessage(
            `Sure, I'm here to help! Please tell me what you need assistance with. Select from the list:`,
            {
                widget: "options",
            }
        );
        this.updateChatbotState(message);
    };

    handleHelpWallet = () => {
        const message = this.createChatBotMessage(
            `Checkout the video tutorial here:`,
            {
                widget: "linkWallet"
            }
        );
        this.updateChatbotState(message);
    };

    handleHelpCourse = () => {
        const message = this.createChatBotMessage(
            `Checkout the video tutorial here:`,
            {
                widget: "linkBuyCourse"
            }
        );
        this.updateChatbotState(message);
    };

    handleHelpMetamask = () => {
        const message = this.createChatBotMessage(
            `Checkout the video tutorial here:`,
            {
                widget: "linkWallet"
            }
        );
        this.updateChatbotState(message);
    };

    handleHelpBlockchain = () => {
        const message = this.createChatBotMessage(
            `Checkout the video tutorial here:`,
            {
                widget: "linkBC"
            }
        );
        this.updateChatbotState(message);
    };
    handleHelpStudyChain = () => {
        const message = this.createChatBotMessage(
            `Checkout the video tutorial here:`,
            {
                widget: "linkNav"
            }
        );
        this.updateChatbotState(message);
    };

    updateChatbotState = (message) => {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    };
}

export default ActionProvider;
