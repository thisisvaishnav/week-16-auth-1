// fetch vs axios

async function fetchtwo(url) {
  const response = await fetch(url)
  const json = await response.json();
  console.log(json.todos.length)
}


const axios = require("axios");

async function main() {
  const response = await axios.get("https://sum-server.100xdevs.com/todos")
  console.log(response.data.json.todos.length);
}

main();

// POST request
async function main() {
  const response = await fetch("https://sum-server.100xdevs.com/todos"), { method: "PUT"});
  const json = await response.json();
  console.log(json.todos.length)
}


const axios = require("axios");

async function main() {
  const response = await axios.put("https://sum-server.100xdevs.com/todos")
  console.log(response.data.todos.length);
}
