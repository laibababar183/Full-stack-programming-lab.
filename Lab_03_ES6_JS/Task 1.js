class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses;
    }

    getDetails() {
        return `
        ID: ${this.id} <br>
        Name: ${this.name} <br>
        Semester: ${this.semester} <br>
        Courses: ${this.courses.join(", ")} <br><br>`;
    }
}

const s1 = new Student(1, "Ali", 6, ["JS", "HTML"]);
const s2 = new Student(2, "Sara", 5, ["CSS", "React"]);
const s3 = new Student(3, "Ahmed", 4, ["Node", "MongoDB"]);

let students = [s1, s2, s3];
let output = "";

students.forEach(student => {
    output += student.getDetails();
});

document.getElementById("students").innerHTML = output;