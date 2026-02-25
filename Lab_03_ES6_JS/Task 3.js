function fetchUsers() {
    return new Promise((resolve, reject) => {

        let success = true;

        setTimeout(() => {
            if(success){
                resolve([
                    {name: "Ali"},
                    {name: "Sara"},
                    {name: "Ahmed"}
                ]);
            } else {
                reject("Failed to load data");
            }
        }, 3000);

    });
}

fetchUsers()
.then(users => {
    let result = "";
    users.forEach(user => {
        result += user.name + "<br>";
    });
    document.getElementById("users").innerHTML = result;
})
.catch(error => {
    document.getElementById("users").innerHTML = error;
});