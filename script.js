function calculate() {
  const output = document.getElementById("output");
  output.textContent = "Calculation complete!";
  const clickSound = document.getElementById("clickSound");
  if (clickSound) clickSound.play();
}

window.onload = function () {
  const itemSelect = document.getElementById("itemSelect");
  const fruitList = document.getElementById("fruitList");

  itemSelect.innerHTML = `<option value="apple">Apple</option>`;
  fruitList.innerHTML = `<div class="fruit-item">Sample Fruit</div>`;
};