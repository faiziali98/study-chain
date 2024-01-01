// eslint-disable-next-line no-undef
const CourseContract = artifacts.require("CourseContract");

module.exports = function (deployer) {
    deployer.deploy(CourseContract);
};