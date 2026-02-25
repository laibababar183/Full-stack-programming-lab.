class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.courses = new Set();
    }

    addCourse(course){
        this.courses.add(course);
    }
}

let studentMap = new Map();

let s1 = new Student(1, "Ali");
s1.addCourse("JS");
s1.addCourse("HTML");
s1.addCourse("JS");

studentMap.set(s1.id, s1);

function saveData(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Data Saved Successfully!");
        }, 2000);
    });
}

saveData().then(message => {

    let output = "";

    studentMap.forEach(student => {
        output += `${student.name} Courses: ${[...student.courses].join(", ")} <br>`;
    });

    document.getElementById("portal").innerHTML =
        output + "<br>" + message;
});