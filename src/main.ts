import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "🧸Teddy Tycoon🧸";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Create variables and interfaces
let counter: number = 0;
let growthRate: number = 0;
let lastSavedTime: number = Date.now();

interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  currentCost: number;
  description: string;
}

// List of upgrade items
const upgrades: Item[] = [
  {
    name: "Teddy Poacher 🕵️",
    cost: 100,
    rate: 1,
    count: 0,
    currentCost: 100,
    description: "Hire a Teddy Poacher to capture wild Teddy Bears",
  },
  {
    name: "Teddy Factory 🏭",
    cost: 1000,
    rate: 20.0,
    count: 0,
    currentCost: 1000,
    description: "Build a Teddy Factory to mass produce Teddy Bears",
  },
  {
    name: "Teddy Amusement Park 🎡",
    cost: 10000,
    rate: 500,
    count: 0,
    currentCost: 10000,
    description: "Open a Teddy Amusement Park to attract to donate Teddy Bears",
  },
  {
    name: "TeddyVille, USA 🦅",
    cost: 100000,
    rate: 5000,
    count: 0,
    currentCost: 100000,
    description: "Found a Teddy Bear city to increase Teddy Bear population",
  },
  {
    name: "Planet Teddy 🪐",
    cost: 1000000,
    rate: 500000,
    count: 0,
    currentCost: 1000000,
    description: "Colonize a planet to increase Teddy Bear discovery",
  },
  {
    name: "Teddy Universe 🌌",
    cost: 100000000,
    rate: 5000000,
    count: 0,
    currentCost: 100000000,
    description: "Create a Teddy Universe full of Teddy Bears",
  },
  {
    name: "God of Teddy Bears 🐻‍❄️",
    cost: 10000000000,
    rate: 50000000,
    count: 0,
    currentCost: 10000000000,
    description: "Recruit the God of Teddy Bears and use its power",
  },
];

// Load game state from local storage
function loadGameState() {
  const savedState = localStorage.getItem("teddyTycoonState");
  if (savedState) {
    const state = JSON.parse(savedState);
    counter = state.counter;
    growthRate = state.growthRate;
    lastSavedTime = state.lastSavedTime || Date.now();
    const timeElapsed = (Date.now() - lastSavedTime) / 1000;
    counter += growthRate * timeElapsed;
    state.upgrades.forEach((savedUpgrade: Item, index: number) => {
      upgrades[index].count = savedUpgrade.count;
      upgrades[index].currentCost = savedUpgrade.currentCost;
    });
  }
}

// Save game state to local storage
function saveGameState() {
  const state = {
    counter,
    growthRate,
    lastSavedTime: Date.now(),
    upgrades: upgrades.map((upgrade) => ({
      count: upgrade.count,
      currentCost: upgrade.currentCost,
    })),
  };
  localStorage.setItem("teddyTycoonState", JSON.stringify(state));
}

// Create div to display counter
const counterDiv = document.createElement("div");
counterDiv.id = "counter";
counterDiv.textContent = `${counter} Teddy Bears`;
app.append(counterDiv);

// Create div to display growth rate
const growthRateDiv = document.createElement("div");
growthRateDiv.id = "growth-rate";
growthRateDiv.textContent = `Growth Rate: ${growthRate} Teddy Bears/sec`;
app.append(growthRateDiv);

// Create button element for manual clicks
const button = document.createElement("button");
button.textContent = "🧸";
button.id = "teddy-button";
button.classList.add("teddy-button"); // apply CSS class
app.append(button);

// Add event listener for manual clicks
button.addEventListener("click", (event) => {
  counter++;
  counterDiv.textContent = `${counter} Teddy Bears`;
  showPopText("+1", event.clientX, event.clientY);
  checkUpgradeButtons();
  saveGameState();
});

// Container for upgrade items
const upgradeContainer = document.createElement("div");
upgradeContainer.id = "upgrade-container";
app.append(upgradeContainer);

// Purchase an upgrade
function purchaseUpgrade(upgrade: Item) {
  counter -= upgrade.currentCost;
  growthRate += upgrade.rate;
  upgrade.count++;
  upgrade.currentCost = Math.round(upgrade.currentCost * 1.1);
  saveGameState();
}

// Update UI after purchasing an upgrade
function updateUIAfterPurchase(
  upgrade: Item,
  upgradeCountDiv: HTMLDivElement,
  upgradeButton: HTMLButtonElement
) {
  counterDiv.textContent = `${Math.floor(counter)} Teddy Bears`;
  growthRateDiv.textContent = `Growth Rate: ${Math.floor(growthRate)} Teddy Bears/sec`;
  upgradeCountDiv.textContent = `${upgrade.name} Count: ${upgrade.count}`;
  upgradeButton.textContent = `Buy ${upgrade.name} (${upgrade.currentCost} Teddy Bears)`;
}

// Create upgrade rows
upgrades.forEach((upgrade, index) => {
  const upgradeRow = document.createElement("div");
  upgradeRow.classList.add("upgrade-row");
  upgradeContainer.append(upgradeRow);

  const upgradeButton = document.createElement("button");
  upgradeButton.textContent = `Buy ${upgrade.name} (${upgrade.currentCost} Teddy Bears)`;
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

  // Add event listener for purchasing upgrades
  upgradeButton.addEventListener("click", (event) => {
    if (counter >= upgrade.currentCost) {
      purchaseUpgrade(upgrade);
      updateUIAfterPurchase(upgrade, upgradeCountDiv, upgradeButton);
      showPopText(
        `+${upgrade.rate} Teddy Bears/sec`,
        event.clientX,
        event.clientY
      );
      checkUpgradeButtons();
    }
  });
});

// Check if upgrade buttons should be enabled
function checkUpgradeButtons() {
  upgrades.forEach((upgrade, index) => {
    const upgradeButton = document.getElementById(
      `upgrade-button-${index}`
    ) as HTMLButtonElement;
    upgradeButton.disabled = counter < upgrade.currentCost;
  });
}

checkUpgradeButtons();

// Create a teddy element with specified class, emoji, and size
function createTeddyElement(
  className: string,
  emoji: string,
  size: string
): HTMLDivElement {
  const teddy = document.createElement("div");
  teddy.classList.add(className);
  teddy.innerHTML = emoji;
  teddy.style.position = "absolute";
  teddy.style.left = `${Math.random() * (window.innerWidth - 50)}px`;
  teddy.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
  teddy.style.fontSize = size;
  return teddy;
}

function addFadeOutEffect(
  element: HTMLElement,
  delay: number,
  duration: number
) {
  setTimeout(() => {
    element.style.transition = `opacity ${duration}s`;
    element.style.opacity = "0";
    setTimeout(() => element.remove(), duration * 1000);
  }, delay);
}

function showPopText(text: string, x: number, y: number) {
  const popText = document.createElement("div");
  popText.classList.add("fade-up");
  popText.textContent = text;
  popText.style.left = `${x}px`;
  popText.style.top = `${y}px`;
  app.append(popText);
  setTimeout(() => popText.remove(), 2000); // Remove after animation
}

function handleGoldenTeddyClick(goldenTeddy: HTMLElement) {
  goldenTeddy.addEventListener("click", (event) => {
    const amount = growthRate > 0 ? growthRate * 10 : 1;
    counter += amount;
    counterDiv.textContent = `${Math.floor(counter)} Teddy Bears`;
    goldenTeddy.style.animation = "pop 0.5s forwards"; // Apply pop animation
    setTimeout(() => goldenTeddy.remove(), 500); // Remove after animation
    showPopText(`+${amount}`, event.clientX, event.clientY); // Show the "+X" text at the click position
    saveGameState();
  });
}

function spawnGoldenTeddy() {
  const goldenTeddy = createTeddyElement("golden-teddy", "🧸", "50px");
  app.append(goldenTeddy);

  handleGoldenTeddyClick(goldenTeddy);
  addFadeOutEffect(goldenTeddy, 3000, 3);
}

// Function to randomly spawn a golden teddy bear
function maybeSpawnGoldenTeddy() {
  if (Math.random() < 0.005) {
    // 0.5% chance to spawn a golden teddy every frame
    spawnGoldenTeddy();
  }
}

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

  // Maybe spawn a golden teddy bear every frame
  maybeSpawnGoldenTeddy();

  // Update rotation speed based on growth rate
  const rotationSpeed = growthRate > 0 ? 360 / growthRate : 0;
  button.style.animationDuration = `${rotationSpeed}s`;

  requestAnimationFrame(updateCounter);
}

// Load game state when the game starts
loadGameState();

// Update UI for all upgrades after loading the game state
upgrades.forEach((upgrade, index) => {
  const upgradeCountDiv = document.getElementById(
    `upgrade-count-${index}`
  ) as HTMLDivElement;
  const upgradeButton = document.getElementById(
    `upgrade-button-${index}`
  ) as HTMLButtonElement;
  updateUIAfterPurchase(upgrade, upgradeCountDiv, upgradeButton);
});

// Start the animation frame loop
requestAnimationFrame(updateCounter);
