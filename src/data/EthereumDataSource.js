import contractJson from '../contracts/CourseContract.json';
import { ethers } from 'ethers';
import Web3 from 'web3';

export class EthereumDataSource {
    constructor() {
        this.web3 = null;
        this.contract = null;
        this.accounts = null;
        this.contractAddress = '0xcecb8ED5eC531e53E0974D4D6f67D1aD414C80F1';
    }

    async connect() {
        try {
            // Connect to MetaMask or local Ganache
            const ethereum = window.ethereum;
            if (ethereum) {
                const web3Instance = new Web3(ethereum);
                this.web3 = web3Instance;
                this.accounts = await this.web3.eth.getAccounts();

                // Enable MetaMask account access
                await ethereum.request({ method: 'eth_requestAccounts' });

                // Instantiate the contract using truffle-contract
                const contractInstance = new web3Instance.eth.Contract(contractJson.abi, this.contractAddress);
                this.contract = contractInstance;
            } else {
                console.error('MetaMask not detected. Please install MetaMask extension.');
            }
        } catch (error) {
            console.error('Error connecting to Ethereum:', error);
        }
    }

    async checkIfSignedUp(userName, setSignedUp) {
        try {
            const result = await this.contract.methods.isUserSignedUp(userName).call({ 
                from: this.accounts[0] 
            });
            setSignedUp(result);
        } catch (error) {
            console.error('Error interacting with smart contract:', error);
        }
    }

    async signUp(userName, setResult) {
        try {
            await this.contract.methods.signUp(userName).send({ from: this.accounts[0] });
            setResult("Registered!");
        } catch (error) {
            console.log(error);
            alert("Error Occured! It can be that you are using same wallet in two accounts!");
        }
    }

    async getCourses(setCourses, setLoading) {
        try {
            const boughtCourses = await this.contract.methods.getBoughtCourses().call({ 
                from: this.accounts[0] 
            });

            const results = await Promise.all(boughtCourses.map(async (course) => {
                const [auther, name] = course.split("_");
                const courseInfo = await this.contract.methods.getCourseMeta(auther, name).call({ from: this.accounts[0] });
                return {...courseInfo, auther, name};
            }));

            setCourses(results);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setCourses([]);
        }

    }

    async getCreatedCourses(setCourses, setLoading) {
        try {
            const boughtCourses = await this.contract.methods.getCreatedCourses().call({ from: this.accounts[0] });

            const results = await Promise.all(boughtCourses.map(async (course) => {
                const [auther, name] = course.split("_");
                const courseInfo = await this.contract.methods.getCourseMeta(auther, name).call({ from: this.accounts[0] });
                return {...courseInfo, auther, name};
            }));

            setCourses(results);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setCourses([]);
        }

    }

    async getAllCourses(setCourses, setLoading) {
        try {
            const boughtCourses = await this.contract.methods.getAllCourses().call({ from: this.accounts[0] });

            const results = await Promise.all(boughtCourses.map(async (course) => {
                const [auther, name] = course.split("_");
                const courseInfo = await this.contract.methods.getCourseMeta(auther, name).call({ from: this.accounts[0] });
                return { ...courseInfo, auther, name };
            }));

            setCourses(results);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setCourses([]);
        }

    }

    async buyCourse(course, setLoading) {
        try {
            setLoading(true);

            await this.contract.methods.buyCourse(course.auther, course.name).send({
                value: ethers.parseEther(course.amount.toString()),
                from: this.accounts[0]
            });

            alert("Course bought successfully!");
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert("Transaction cancelled!");
            setLoading(false);
        }
    }

    async getCourse(setCourseInfo, setLoading, course) {
        try {
            const courseInfo = await this.contract.methods.getCourse(course.auther, course.name).call({ from: this.accounts[0] });
            setCourseInfo(courseInfo);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setCourseInfo(null);
            setLoading(false);
        }

    }

    async createCourse(userName, courseData) {
        try {
            await this.contract.methods.createCourse(userName, courseData.courseName, courseData.summary, courseData.content, courseData.title, courseData.cost).send({ from: this.accounts[0] });
            alert("Course created!");
        } catch (error) {
            console.log(error);
            alert("Error Occured!");
        }
    }

    validate() {
        return !!this.contract;
    }
}