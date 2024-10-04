import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Teddy Tycoon";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create counter
let counter: number = 0;

// Create div to display counter
const counterDiv = document.createElement("div");
counterDiv.id = "counter";
counterDiv.textContent = `${counter} Teddy Bears`;
app.append(counterDiv);

// Create button element
const button = document.createElement("button");
// Set button text
button.textContent = "🧸";
button.id = "teddy-button";
app.append(button);
// Add listening event
button.addEventListener("click", () => {
  counter++;
  counterDiv.textContent = `${counter} Teddy Bears`;
  checkUpgradeButtons();
});

let growthRate: number = 0;
const upgrades = [
  { name: "A", cost: 10, rate: 0.1, count: 0, currentCost: 10 },
  { name: "B", cost: 100, rate: 2.0, count: 0, currentCost: 100 },
  { name: "C", cost: 1000, rate: 50, count: 0, currentCost: 1000 },
];

const growthRateDiv = document.createElement("div");
growthRateDiv.id = "growth-rate";
growthRateDiv.textContent = `Growth Rate: ${growthRate} Teddy Bears/sec`;
app.append(growthRateDiv);

const upgradeContainer = document.createElement("div");
upgradeContainer.id = "upgrade-container";
app.append(upgradeContainer);

function formatCost(cost: number): string {
  return cost % 1 === 0
    ? cost.toString()
    : cost.toFixed(2).replace(/\.?0+$/, "");
}

upgrades.forEach((upgrade, index) => {
  const upgradeButton = document.createElement("button");
  upgradeButton.textContent = `Buy ${upgrade.name} (${formatCost(upgrade.currentCost)} units)`;
  upgradeButton.id = `upgrade-button-${index}`;
  upgradeButton.disabled = true;
  upgradeContainer.append(upgradeButton);

  const upgradeCountDiv = document.createElement("div");
  upgradeCountDiv.id = `upgrade-count-${index}`;
  upgradeCountDiv.textContent = `${upgrade.name} Count: ${upgrade.count}`;
  upgradeContainer.append(upgradeCountDiv);

  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrade.currentCost) {
      counter -= upgrade.currentCost;
      growthRate += upgrade.rate;
      upgrade.count++;
      upgrade.currentCost *= 1.15;
      counterDiv.textContent = `${Math.floor(counter)} Teddy Bears`;
      growthRateDiv.textContent = `Growth Rate: ${growthRate.toFixed(1)} Teddy Bears/sec`;
      upgradeCountDiv.textContent = `${upgrade.name} Count: ${upgrade.count}`;
      upgradeButton.textContent = `Buy ${upgrade.name} (${formatCost(upgrade.currentCost)} units)`;
      checkUpgradeButtons();
    }
  });
});

function checkUpgradeButtons() {
  upgrades.forEach((upgrade, index) => {
    const upgradeButton = document.getElementById(
      `upgrade-button-${index}`,
    ) as HTMLButtonElement;
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
