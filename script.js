const items = [
  {
    "name": "Watering Can",
    "cost": 10
  },
  {
    "name": "Honey",
    "cost": 50
  },
  {
    "name": "Basic Sprinkler",
    "cost": 100
  },
  {
    "name": "Fun Crate",
    "cost": 120
  },
  {
    "name": "Sheckles",
    "cost": 200
  },
  {
    "name": "Recall Wrench",
    "cost": 250
  },
  {
    "name": "Cleaning Spray",
    "cost": 300
  },
  {
    "name": "Lightning Rod",
    "cost": 400
  },
  {
    "name": "Normal Seed Pack",
    "cost": 600
  },
  {
    "name": "Cacao",
    "cost": 800
  },
  {
    "name": "Pepper",
    "cost": 1000
  },
  {
    "name": "Rare Egg",
    "cost": 1400
  },
  {
    "name": "Honey Sprinkler",
    "cost": 1800
  },
  {
    "name": "Flower Seed Pack",
    "cost": 2000
  },
  {
    "name": "Summer Seed Pack",
    "cost": 2000
  },
  {
    "name": "Twilight Crate",
    "cost": 2400
  },
  {
    "name": "Bloodmoon Crate",
    "cost": 3400
  },
  {
    "name": "Celestiberry",
    "cost": 3600
  },
  {
    "name": "Moon Melon",
    "cost": 3600
  },
  {
    "name": "Green Apple",
    "cost": 4000
  },
  {
    "name": "Night Staff",
    "cost": 4000
  },
  {
    "name": "Night Egg",
    "cost": 4400
  },
  {
    "name": "Nectarine",
    "cost": 4400
  },
  {
    "name": "Reclaimer",
    "cost": 5000
  },
  {
    "name": "Bee Crate",
    "cost": 5000
  },
  {
    "name": "Night Seed Pack",
    "cost": 5000
  },
  {
    "name": "Blood Banana",
    "cost": 5600
  },
  {
    "name": "Chocolate Carrot",
    "cost": 6000
  },
  {
    "name": "Blood Kiwi",
    "cost": 6000
  },
  {
    "name": "Bee Egg",
    "cost": 6000
  },
  {
    "name": "Avocado",
    "cost": 7000
  },
  {
    "name": "Moon Mango",
    "cost": 7000
  },
  {
    "name": "Summer Fun Crate",
    "cost": 8000
  },
  {
    "name": "Rare Summer Egg",
    "cost": 8000
  },
  {
    "name": "Chocolate Sprinkler",
    "cost": 8000
  },
  {
    "name": "Moon Cat",
    "cost": 11000
  },
  {
    "name": "Easter Egg",
    "cost": 12000
  },
  {
    "name": "Ember Lily",
    "cost": 14000
  }
];
const fruits = [
  {
    "name": "Carrot",
    "gain": 1
  },
  {
    "name": "Strawberry",
    "gain": 1
  },
  {
    "name": "Blueberry",
    "gain": 2
  },
  {
    "name": "Tomato",
    "gain": 3
  },
  {
    "name": "Cauliflower",
    "gain": 3
  },
  {
    "name": "Watermelon",
    "gain": 4
  },
  {
    "name": "Banana",
    "gain": 4
  },
  {
    "name": "Avocado",
    "gain": 4
  },
  {
    "name": "Green Apple",
    "gain": 4
  },
  {
    "name": "Pineapple",
    "gain": 5
  },
  {
    "name": "Kiwi",
    "gain": 5
  },
  {
    "name": "Prickly Pear",
    "gain": 5
  },
  {
    "name": "Bell Pepper",
    "gain": 5
  },
  {
    "name": "Loquat",
    "gain": 6
  },
  {
    "name": "Feijoa",
    "gain": 6
  },
  {
    "name": "Sugar Apple",
    "gain": 7
  }
];

const fruitEmojis = {
  "Carrot": "🥕",
  "Strawberry": "🍓",
  "Blueberry": "🫐",
  "Tomato": "🍅",
  "Cauliflower": "🥦",
  "Watermelon": "🍉",
  "Banana": "🍌",
  "Avocado": "🥑",
  "Green Apple": "🍏",
  "Pineapple": "🍍",
  "Kiwi": "🥝",
  "Prickly Pear": "🌵",
  "Bell Pepper": "🫑",
  "Loquat": "🍊",
  "Feijoa": "🍈",
  "Sugar Apple": "🍬"
};


const hoverSound = new Audio("sounds/hover.mp3");
const engineSound = new Audio("sounds/engine.mp3");

function calculate() {
  const cost = parseInt(document.getElementById("itemSelect").value);
  const output = document.getElementById("output");
  const selectedFruits = Array.from(document.querySelectorAll(".fruit-item.selected"))
    .map(el => ({ name: el.dataset.name, gain: parseInt(el.dataset.gain) }))
    .sort((a, b) => b.gain - a.gain);

  if (selectedFruits.length === 0) {
    output.textContent = "Select at least one fruit.";
    return;
  }

  engineSound.play();

  let remaining = cost;
  let usage = {};

  for (let fruit of selectedFruits) {
    let count = Math.floor(remaining / fruit.gain);
    if (count > 0) {
      usage[fruit.name] = count;
      remaining -= count * fruit.gain;
    }
  }

  if (remaining > 0) {
    const smallest = selectedFruits[selectedFruits.length - 1];
    const extra = Math.ceil(remaining / smallest.gain);
    usage[smallest.name] = (usage[smallest.name] || 0) + extra;
  }

  let result = `<strong>To reach ${cost}¢, use:</strong><ul>`;
  for (let fruit in usage) {
    const emoji = fruitEmojis[fruit] || "🍎";
    result += `<li>${emoji} ${fruit}: ${usage[fruit]}</li>`;
  }
  result += "</ul>";
  output.innerHTML = result;
}


window.onload = function () {
  const itemSelect = document.getElementById("itemSelect");
  const fruitList = document.getElementById("fruitList");
  const invFruitSelect = document.getElementById("invFruitSelect");

  items.forEach(item => {
    const option = document.createElement("option");
    option.value = item.cost;
    option.textContent = `⚡ ${item.name} (${item.cost}¢)`;
    itemSelect.appendChild(option);
  });

  fruits.forEach(fruit => {
    const div = document.createElement("div");
    div.className = "fruit-item";
    div.dataset.name = fruit.name;
    div.dataset.gain = fruit.gain;
    div.innerHTML = `<span>${fruitEmojis[fruit.name] || '🍎'} ${fruit.name}</span><span>⬆️ Gain: ${fruit.gain}</span>`;
    div.onclick = () => div.classList.toggle("selected");
    div.onmouseenter = () => hoverSound.play();
    fruitList.appendChild(div);

    const invOption = document.createElement("option");
    invOption.value = fruit.name;
    invOption.textContent = (fruitEmojis[fruit.name] || '🍎') + ' ' + fruit.name;
    invFruitSelect.appendChild(invOption);
  });
};


function calcFullInv() {
  const selected = document.getElementById("invFruitSelect").value;
  const fruit = fruits.find(f => f.name === selected);
  const outputBox = document.getElementById("invResult");
  const itemCost = parseInt(document.getElementById("itemSelect").value);

  if (!fruit) {
    outputBox.innerText = "⚠️ Select a valid fruit.";
    return;
  }

  let totalGain = 0;
  let temp = itemCost;
  const selectedFruits = Array.from(document.querySelectorAll(".fruit-item.selected"))
    .map(el => ({ name: el.dataset.name, gain: parseInt(el.dataset.gain) }))
    .sort((a, b) => b.gain - a.gain);

  for (let f of selectedFruits) {
    let count = Math.floor(temp / f.gain);
    if (f.name === fruit.name) {
      totalGain += count;
    }
    temp -= count * f.gain;
  }

  const invs = Math.ceil(totalGain / 200);
  outputBox.innerHTML = `🚚 You'll need <strong>${invs}</strong> full 200-slot inventories to store <strong>${totalGain}</strong> ${fruit.name}.`;
}
