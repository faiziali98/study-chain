import Web3 from 'web3';

async function withTimeout(promise, timeoutMs) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error(`Operation timed out after ${timeoutMs} ms`));
        }, timeoutMs);

        promise
            .then((result) => {
                clearTimeout(timeout);
                resolve(result);
            })
            .catch((err) => {
                clearTimeout(timeout);
                reject(err);
            });
    });
}

export class DemoDataSource {
    constructor() {
        this.signedUp = false;
        this.courses = [
            {
                auther: "Demo Author",
                name: "Demo Course",
                amount: 4,
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
                summary: "This is a demo course",
                title: "Demo Course"
            },
            {
                auther: "Demo Author 1",
                name: "Demo Course 1",
                amount: 3,
                content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
                summary: "This is a demo course",
                title: "Demo Course 1"
            }
        ];
        this.currentIndex = 2;
        this.courseIndex = {
            "Demo Author_Demo Course": 0,
            "Demo Author 1_Demo Course 1": 1,
        }
        this.boughtCourses = [];
        this.createdCourses = [];
    }

    async connect() {
        try {
            // Connect to MetaMask or local Ganache
            const ethereum = window.ethereum;
            if (ethereum) {
                const web3Instance = new Web3(ethereum);
                this.web3 = web3Instance;
                this.accounts = await withTimeout(this.web3.eth.getAccounts(), 30000);

                // Enable MetaMask account access
                await withTimeout(ethereum.request({ method: 'eth_requestAccounts' }), 30000);
                return true;
            } else {
                console.error('MetaMask not detected. Please install MetaMask extension.');
            }
        } catch (error) {
            console.error('Error connecting to Ethereum:', error);
        }

        return false;
    }

    async checkIfSignedUp(userName, setSignedUp) {
        setSignedUp(this.signedUp);
    }

    async signUp(userName, setResult) {
        this.signedUp = true;
        setResult("Registered!");
    }

    async getCourses(setCourses, setLoading) {
        setCourses(this.boughtCourses);
        setLoading(false);
    }

    async getCreatedCourses(setCourses, setLoading) {
        setCourses(this.createdCourses);
        setLoading(false);
    }

    async getAllCourses(setCourses, setLoading) {
        setCourses(this.courses);
        setLoading(false);
    }

    async buyCourse(course, setLoading) {
        setLoading(true);
        this.boughtCourses.push(
            this.courses[this.courseIndex[`${course.auther}_${course.name}`]]
        );
        setLoading(false);
    }

    async getCourse(setCourseInfo, setLoading, course) {
        setCourseInfo(this.courses[this.courseIndex[`${course.auther}_${course.name}`]]);
        setLoading(false);
    }

    async createCourse(userName, courseData) {
        const course = {
            auther: userName,
            name: courseData.name,
            amount: courseData.cost,
            content: courseData.content, 
            summary: courseData.summary,
            title: courseData.title,
        }

        this.createdCourses.push(course);
        this.courses.push(course);
        this.courseIndex = {
            ...this.courseIndex,
            [`${userName}_${courseData.name}`]: this.currentIndex,
        }

        this.currentIndex += 1;
    }

    getAllAccounts() {
        return ["0x4566777", "0x56035345"];
    }

    validate() {
        return true;
    }

    getType() {
        return "Demo";
    }
}