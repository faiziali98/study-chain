// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CourseContract {
    struct CourseInfo {
        uint256 amount;
        string content;
        string summary;
        string title;
    }

    address private owner;
    
    mapping(address => bool) private users; // userId to wallet mapping
    mapping(string => CourseInfo) private courses; // userId to course mapping with cost
    mapping(string => address payable) private authers;
    mapping(string => mapping(address => bool)) private canAccess;

    mapping(address => string[]) private boughtCourses;
    mapping(address => string[]) private createdCourses;

    string[] private courseKeys;
    
    event CourseCreated(string auther, string courseName, uint256 cost);
    event CourseBought(string auther, string courseName, uint256 cost);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function signUp(string memory auther) external {
        address userId = msg.sender;
        require(!users[userId], "User already signed up");
        require(authers[auther] == address(0), "Auther name already taken");
        require(bytes(auther).length > 0, "Auther name is required");
        users[userId] = true;
        authers[auther] = payable(userId);
    }
    
    function createCourse(string memory auther, string memory courseName, string memory summary,
                string memory content, string memory title, uint256 cost) external {
        require(users[msg.sender], "User not signed up");
        require(msg.sender == authers[auther], "Cant make course on someone else behalf");
        string memory courseId = concatenateStrings(auther, courseName);
        courses[courseId] = CourseInfo(cost, content, summary, title);
        courseKeys.push(courseId);
        createdCourses[msg.sender].push(courseId);
        emit CourseCreated(auther, courseName, cost);
    }
    
    function getAllCourses() external view returns (string[] memory) {
        require(users[msg.sender], "User not signed up");
        return courseKeys;
    }

    function getBoughtCourses() external view returns (string[] memory) {
        require(users[msg.sender], "User not signed up");
        return boughtCourses[msg.sender];
    }

    function getCreatedCourses() external view returns (string[] memory) {
        require(users[msg.sender], "User not signed up");
        return createdCourses[msg.sender];
    }

    function deleteCourse(string memory auther, string memory courseName) external {
        require(users[msg.sender], "User not signed up");
        string memory courseId = concatenateStrings(auther, courseName);

        require(authers[auther] == msg.sender, "Can not delete the course.");
        require(courses[courseId].amount > 0, "Course not found");

        delete courses[courseId];

        for (uint256 i = 0; i < courseKeys.length; i++) {
            string memory storageCourseId = courseKeys[i];
        
            if (keccak256(abi.encodePacked(storageCourseId)) == keccak256(abi.encodePacked(courseId))) {
                removeItemAtIndex(i);
            }
        }
    }

    function getCourse(string memory auther, string memory courseName) external view returns (string memory title, string memory content) {
        address userId = msg.sender;
        string memory courseId = concatenateStrings(auther, courseName);

        verifyCourse(userId, auther, courseId);
        require(canAccess[courseId][userId] || authers[auther] == msg.sender, "Can not access the course.");
        return (courses[courseId].title, courses[courseId].content);
    }

    function getCourseMeta(string memory auther, string memory courseName) external view returns (string memory title, string memory summary, uint256 amount) {
        address userId = msg.sender;
        string memory courseId = concatenateStrings(auther, courseName);

        verifyCourse(userId, auther, courseId);
        return (courses[courseId].title, courses[courseId].summary, courses[courseId].amount);
    }
    
    function buyCourse(string memory auther, string memory courseName) external payable {
        address userId = msg.sender;
        string memory courseId = concatenateStrings(auther, courseName);

        verifyCourse(userId, auther, courseId);
        
        uint256 courseCost = courses[courseId].amount;
        require(courseCost <= address(this).balance, "Insufficient contract balance");

        authers[auther].transfer(address(this).balance);
        canAccess[courseId][userId] = true;
        
        boughtCourses[userId].push(courseId);
        emit CourseBought(auther, courseName, courseCost);
    }
    
    function isUserSignedUp(string memory userId) external view returns (bool) {
        return users[msg.sender] && authers[userId] != address(0);
    }

    function concatenateStrings(string memory str1, string memory str2) private pure returns (string memory) {
        bytes memory str1Bytes = bytes(str1);
        bytes memory str2Bytes = bytes(str2);
        bytes memory joiner = bytes("_");

        // Create a new bytes array by concatenating str1Bytes and str2Bytes
        bytes memory result = new bytes(str1Bytes.length + str2Bytes.length + joiner.length);

        // Copy str1Bytes to the result array
        for (uint256 i = 0; i < str1Bytes.length; i++) {
            result[i] = str1Bytes[i];
        }

        for (uint256 k = 0; k < joiner.length; k++) {
            result[str1Bytes.length + k] = joiner[k];
        }

        // Copy str2Bytes to the result array starting from str1Bytes.length
        for (uint256 j = 0; j < str2Bytes.length; j++) {
            result[joiner.length + str1Bytes.length + j] = str2Bytes[j];
        }

        // Convert the result bytes array to a string
        return string(result);
    }

    function removeItemAtIndex(uint256 index) private {
        require(index < courseKeys.length, "Index out of bounds");

        // Move the last element to the position of the element to be removed
        courseKeys[index] = courseKeys[courseKeys.length - 1];

        // Resize the array to remove the last element
        courseKeys.pop();
    }

    function verifyCourse(address userId, string memory auther, string memory courseId) private view {
        require(users[userId], "User not signed up");
        require(authers[auther] != address(0), "Author not found");
        require(courses[courseId].amount > 0, "Course not found");
    }
}
