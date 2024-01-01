import React from "react";
import LoadingComponent from "../components/LoadingComponent";
import UserExperienceSurveyComponent from "../components/UserExperienceSurveyComponent";

const UserExperienceSurveyPage = ({id}) => <LoadingComponent>
        <UserExperienceSurveyComponent />
    </LoadingComponent>;

export default UserExperienceSurveyPage;
