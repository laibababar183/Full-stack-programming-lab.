// Step 1: Create student objects

let students = [
    {
        name: "Ali",
        age: 21,
        semester: 6,
        courses: ["JavaScript", "HTML", "CSS"]
    },
    {
        name: "Sara",
        age: 22,
        semester: 5,
        courses: ["React", "Node", "MongoDB"]
    },
    {
        name: "Ahmed",
        age: 23,
        semester: 4,
        courses: ["Python", "Django", "SQL"]
    }
];

// Step 2: Convert objects to JSON string

let jsonString = JSON.stringify(students);

// Step 3: Convert JSON string back to object

let parsedStudents = JSON.parse(jsonString);

// Step 4: Display data using destructuring

let output = "";

parsedStudents.forEach(({name, age, semester, courses}) => {

    output += `
        <strong>Name:</strong> ${name} <br>
        <strong>Age:</strong> ${age} <br>
        <strong>Semester:</strong> ${semester} <br>
        <strong>Courses:</strong> ${courses.join(", ")} <br><br>
    `;

});

document.getElementById("studentData").innerHTML = output;