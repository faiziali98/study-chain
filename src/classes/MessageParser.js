class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse(message) {
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes("hello")) {
            this.actionProvider.handleGreeting();
        } else if (lowerCaseMessage.includes("wallet")) {
            this.actionProvider.handleHelpWallet();
        } else if (lowerCaseMessage.includes("course")) {
            this.actionProvider.handleHelpCourse();
        } else if (lowerCaseMessage.includes("metamask")) {
            this.actionProvider.handleHelpMetamask();
        } else if (lowerCaseMessage.includes("blockchain")) {
            this.actionProvider.handleHelpBlockchain();
        }else if (lowerCaseMessage.includes("studychain")) {
            this.actionProvider.handleHelpStudyChain();
        } else {
            this.actionProvider.handleGreeting(); // Default response
        }
    }
}

export default MessageParser;
