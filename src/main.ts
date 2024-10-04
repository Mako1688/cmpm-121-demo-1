import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My first cmpm 121 game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//create button element
const button = document.createElement("button");
//set button text
button.textContent = "💀";
button.id = "skull-button";
app.append(button);
//add listening event
button.addEventListener("click", () => {
  alert("Button, Clicked!");
});