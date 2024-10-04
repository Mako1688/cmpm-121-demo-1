import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Teddy Tycoon";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

//create counter
let counter: number = 0;

//create div to display counter
const counterDiv = document.createElement("div");
counterDiv.id = "counter";
counterDiv.textContent = `${counter} Teddy Bears`;
app.append(counterDiv);

//create button element
const button = document.createElement("button");
//set button text
button.textContent = "🧸";
button.id = "teddy-button";
app.append(button);
//add listening event
button.addEventListener("click", () => {
  counter++;
  counterDiv.textContent = `${counter} Teddy Bears`;
  checkUpgradeButtons();
});

//create growth rate
let growthRate: number = 0;
//list upgrades
const upgrades = [
  { name: "Teddy Poacher 🕵️", cost: 10, rate: 0.1, count: 0 },
  { name: "Teddy Factory 🏭", cost: 100, rate: 2.0, count: 0 },
  { name: "Teddy Amusement Park 🎡", cost: 1000, rate: 50, count: 0 },
];

//create growth rate div
const growthRateDiv = document.createElement("div");
growthRateDiv.id = "growth-rate";
growthRateDiv.textContent = `Growth Rate: ${growthRate} Teddy Bears/second`;
app.append(growthRateDiv);

const upgradeContainer = document.createElement("div");
upgradeContainer.id = "upgrade-container";
app.append(upgradeContainer);

//make buttons for each upgrade
upgrades.forEach((upgrade, index) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.textContent = `Buy ${upgrade.name} (${upgrade.cost} units)`;
  upgradeButton.id = `upgrade-button-${index}`;
  upgradeButton.disabled = true;
  upgradeContainer.append(upgradeButton);

  const upgradeCountDiv = document.createElement("div");
  upgradeCountDiv.id = `upgrade-count-${index}`;
  upgradeCountDiv.textContent = `${upgrade.name} Count: ${upgrade.count}`;
  upgradeContainer.append(upgradeCountDiv);

  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      growthRate += upgrade.rate;
      upgrade.count++;
      counterDiv.textContent = `${Math.floor(counter)} Teddy Bears`;
      growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} Teddy Bears/sec`;
      upgradeCountDiv.textContent = `${upgrade.name} Count: ${upgrade.count}`;
      checkUpgradeButtons();
    }
  });
});

function checkUpgradeButtons() {
  upgrades.forEach((upgrade, index) => {
    const upgradeButton = document.querySelector(
      `#upgrade-button-${index}`
    ) as HTMLButtonElement;
    upgradeButton.disabled = counter < upgrade.cost;
  });
}

checkUpgradeButtons();

//Increment counter based on animation frame
let lastTime = performance.now();

function updateCounter(currentTime: number) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  //increment counter by the time passed
  counter += (deltaTime / 1000) * growthRate;

  counterDiv.textContent = `${Math.floor(counter)} Teddy Bears`;

  checkUpgradeButtons();

  requestAnimationFrame(updateCounter);
}

//start animation loop
requestAnimationFrame(updateCounter);
