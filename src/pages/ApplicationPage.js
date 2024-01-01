import React, { useState } from "react";
import ApplicationComponent from "../components/ApplicationComponent";
import { applicationEnum } from "../constants/constants";
import SignupForm from "../components/SignupComponent";
import LoginForm from "../components/LoginComponent";
import LoadingComponent from "../components/LoadingComponent";

const ApplicationPage = () => {

    const [state, setState] = useState(applicationEnum.start);

    return <LoadingComponent>
        {state === applicationEnum.start ? <ApplicationComponent setState={setState} /> :
            state === applicationEnum.signup ? <SignupForm setState={setState} /> : <LoginForm />}
    </LoadingComponent>;
};

export default ApplicationPage;
