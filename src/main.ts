import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "🧸Teddy Tycoon🧸";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create counter
let counter: number = 0;
let growthRate: number = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  currentCost: number;
  description: string;
}
const upgrades: Item[] = [
  {
    name: "Teddy Poacher 🕵️",
    cost: 10,
    rate: 0.1,
    count: 0,
    currentCost: 10,
    description: "Hire a Teddy Poacher to capture wild Teddy Bears",
  },
  {
    name: "Teddy Factory 🏭",
    cost: 100,
    rate: 2.0,
    count: 0,
    currentCost: 100,
    description: "Build a Teddy Factory to mass produce Teddy Bears",
  },
  {
    name: "Teddy Amusement Park 🎡",
    cost: 1000,
    rate: 50,
    count: 0,
    currentCost: 1000,
    description: "Open a Teddy Amusement Park to attract to donate Teddy Bears",
  },
  {
    name: "TeddyVille, USA 🦅",
    cost: 10000,
    rate: 500,
    count: 0,
    currentCost: 10000,
    description: "Found a Teddy Bear city to increase Teddy Bear population",
  },
  {
    name: "Planet Teddy 🪐",
    cost: 100000,
    rate: 50000,
    count: 0,
    currentCost: 100000,
    description: "Colonize a planet to increase Teddy Bear discovery"
  },
  {
    name: "Teddy Universe 🌌",
    cost: 10000000,
    rate: 500000,
    count: 0,
    currentCost: 10000000,
    description: "Create a Teddy Universe full of Teddy Bears"
  },
  {
    name: "God of Teddy Bears 🐻‍❄️",
    cost: 1000000000,
    rate: 5000000,
    count: 0,
    currentCost: 1000000000,
    description: "Recruit the God of Teddy Bears and use it's power"
  },
];

// Create div to display counter
const counterDiv = document.createElement("div");
counterDiv.id = "counter";
counterDiv.textContent = `${counter} Teddy Bears`;
app.append(counterDiv);

const growthRateDiv = document.createElement("div");
growthRateDiv.id = "growth-rate";
growthRateDiv.textContent = `Growth Rate: ${growthRate} Teddy Bears/sec`;
app.append(growthRateDiv);

// Create button element
const button = document.createElement("button");
// Set button text
button.textContent = "🧸";
button.id = "teddy-button";
button.classList.add("teddy-button"); // apply CSS class
app.append(button);
// Add listening event
button.addEventListener("click", () => {
  counter++;
  counterDiv.textContent = `${counter} Teddy Bears`;
  checkUpgradeButtons();
});

const upgradeContainer = document.createElement("div");
upgradeContainer.id = "upgrade-container";
app.append(upgradeContainer);

function formatCost(cost: number): string {
  return cost % 1 === 0
    ? cost.toString()
    : cost.toFixed(1).replace(/\.?0+$/, "");
}

upgrades.forEach((upgrade, index) => {
  const upgradeRow = document.createElement("div");
  upgradeRow.classList.add("upgrade-row");
  upgradeContainer.append(upgradeRow);

  const upgradeButton = document.createElement("button");
  upgradeButton.textContent = `Buy ${upgrade.name} (${formatCost(upgrade.currentCost)} Teddy Bears)`;
  upgradeButton.id = `upgrade-button-${index}`;
  upgradeButton.classList.add("upgrade-button"); // apply CSS class
  upgradeButton.disabled = true;
  upgradeRow.append(upgradeButton);

  const upgradeCountDiv = document.createElement("div");
  upgradeCountDiv.id = `upgrade-count-${index}`;
  upgradeCountDiv.classList.add("upgrade-count"); // apply CSS class
  upgradeCountDiv.textContent = `${upgrade.name} Count: ${upgrade.count}`;
  upgradeRow.append(upgradeCountDiv);

  const upgradeDescriptionDiv = document.createElement("div");
  upgradeDescriptionDiv.id = `upgrade-description-${index}`;
  upgradeDescriptionDiv.classList.add("upgrade-description"); // apply CSS class
  upgradeDescriptionDiv.textContent = upgrade.description;
  upgradeRow.append(upgradeDescriptionDiv);

  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrade.currentCost) {
      counter -= upgrade.currentCost;
      growthRate += upgrade.rate;
      upgrade.count++;
      upgrade.currentCost *= 1.15;
      counterDiv.textContent = `${Math.floor(counter)} Teddy Bears`;
      growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} Teddy Bears/sec`;
      upgradeCountDiv.textContent = `${upgrade.name} Count: ${upgrade.count}`;
      upgradeButton.textContent = `Buy ${upgrade.name} (${formatCost(upgrade.currentCost)} Teddy Bears)`;
      checkUpgradeButtons();
    }
  });
});

function checkUpgradeButtons() {
  upgrades.forEach((upgrade, index) => {
    const upgradeButton = document.getElementById(`upgrade-button-${index}`) as HTMLButtonElement;
    upgradeButton.disabled = counter < upgrade.currentCost;
  });
}

checkUpgradeButtons();

// Increment counter based on animation frame
let lastTime = performance.now();

function updateCounter(currentTime: number) {
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;

  // Increment counter based on growth rate and deltaTime
  counter += growthRate * (deltaTime / 1000);
  counterDiv.textContent = `${Math.floor(counter)} Teddy Bears`;

  // Check if the upgrade buttons should be enabled
  checkUpgradeButtons();

  requestAnimationFrame(updateCounter);
}

// Start the animation frame loop
requestAnimationFrame(updateCounter);
