import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My first cmpm 121 game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//create counter
let counter: number = 0;

//create div to display counter
const counterDiv = document.createElement("div");
counterDiv.id = "counter";
counterDiv.textContent = `${counter} Vine Booms`;
app.append(counterDiv);

//create button element
const button = document.createElement("button");
//set button text
button.textContent = "💀";
button.id = "skull-button";
app.append(button);
//add listening event
button.addEventListener("click", () => {
  counter++;
  counterDiv.textContent = `${counter} Vine Booms`;
  checkUpgradeButton();
});

let growthRate: number = 0;

//create button element
const upgradeButton = document.createElement("button");
//set button text
upgradeButton.textContent = "Upgrade";
upgradeButton.id = "upgrade-button";
app.append(upgradeButton);
//add listening event
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate++;
    counterDiv.textContent = `${counter} Vine Booms`;
    checkUpgradeButton();
  }
});

function checkUpgradeButton() {
  upgradeButton.disabled = counter < 10;;
}

checkUpgradeButton();

//Increment counter based on animation frame
let lastTime = performance.now();

function updateCounter(currentTime: number) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  //increment counter by the time passed
  counter += (deltaTime / 1000) * growthRate;

  counterDiv.textContent = `${Math.floor(counter)} Vine Booms`;

  checkUpgradeButton();

  requestAnimationFrame(updateCounter);
}

//start animation loop
requestAnimationFrame(updateCounter);
