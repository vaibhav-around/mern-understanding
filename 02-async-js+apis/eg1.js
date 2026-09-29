// example 1

// console.log("1");
// console.log("2");
// console.log("3");











// example 2 
console.log("Start");

for (let i = 0; i < 1000000000; i++) {}

console.log("End");











// example 3 callback
// console.log("Start");

// setTimeout(() => {
//     console.log("Inside timeout");
// }, 2000);

// console.log("End");





// example 4 callback hell
// orderFood(() => {
//     eatFood(() => {
//         washDishes(() => {
//             goToSleep(() => {
//                 console.log("Finally sleeping 😴");
//             });
//         });
//     });
// });






// promise example 1
// const promise = new Promise((resolve, reject) => {
//     resolve("Data received");
// });





// promise example 2

// console.log(" 1");

// const promise = new Promise((resolve, reject) => {
//     setTimeout(()=> {
//         reject("2");
//     }, 2000)
// });

// promise
//     .then(data => {
//         console.log(data);
//         console.log("Promise succeded in it's work");
        
//     })
//     .catch(error => {
//         console.log(error);
//         console.log("Promise failed in it's work");
//     });


// console.log(" 3");



// example 3 (multiple work with promises)
// getUser()
//     .then(user => {
//         return getPosts(user.id);
//     })
//     .then(posts => {
//         return getComments(posts[0].id);
//     })
//     .then(comments => {
//         console.log(comments);
//     })
//     .catch(error => {
//         console.log(error);
//     });





// async/await example 1

// async function getData() {
//     const result = await somePromise;
// }



// async exmple 2
// const getData = async () => {

//     console.log("Starting");

//     const result = await somePromise;

//     console.log(result);

//     console.log("Finished");
// };




// async example 3 with try catch
// const getData = async () => {

//     console.log("Starting");

//     try {
//         const result = await somePromise;
//     }
//     catch(err){
//         console.log(err);
//     }

//     console.log(result);

//     console.log("Finished");
// };



// fetch example 1

async function fetchData() {
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        console.log(data);
    }catch(err){
        console.log(`Some errror happened: ${err}`);
    }
}

// fetchData();




// filter() example
// let todos = [
//     { title: "Study", completed: true },
//     { title: "Gym", completed: false },
//     { title: "Code", completed: true }
// ]


// const completedTodos = todos.filter(
//     (todo) => {
//          if(todo.completed == true){
//             return todo
//          }}
// );

// console.log(completedTodos);




// map() example

// let todos = [
//     { title: "Study", completed: true },
//     { title: "Gym", completed: false },
//     { title: "Code", completed: true }
// ]


// const modified_todos = todos.map((e) => {
//     return e.title
// })

// console.log(modified_todos);
