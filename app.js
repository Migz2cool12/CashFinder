let moneyGoal = Number(localStorage.getItem("moneyGoal")) || 0;

document.addEventListener("DOMContentLoaded", function () {
  updateGoalDisplay();
});

function setGoal() {
  const input = document.getElementById("goalInput");
  const amount = Number(input.value);

  if (amount <= 0) {
    alert("Please enter a money goal.");
    return;
  }

  moneyGoal = amount;
  localStorage.setItem("moneyGoal", moneyGoal);

  updateGoalDisplay();
}

function updateGoalDisplay() {
  document.getElementById("goalDisplay").textContent =
    "🎯 Your goal: $" + moneyGoal.toFixed(2);
}

function showCategory(category) {

  const results = document.getElementById("results");

  if (category === "quick") {
    results.innerHTML = `
      <h2>⚡ Quick Cash</h2>

      <div class="money-option">
        <h3>📦 Sell unused items</h3>
        <p>Look around your home for electronics, games, clothes, tools and other items you don't use.</p>
        <span class="tag">No upfront cost</span>
      </div>

      <div class="money-option">
        <h3>🧹 Local odd jobs</h3>
        <p>Offer services such as cleaning, yard work, moving help or other tasks.</p>
        <span class="tag">Local</span>
      </div>

      <div class="money-option">
        <h3>🚗 Gig work</h3>
        <p>Check legitimate delivery and task platforms available in your area.</p>
        <span class="tag">Approval may be required</span>
      </div>
    `;
  }

  if (category === "online") {
    results.innerHTML = `
      <h2>📱 Online Money</h2>

      <div class="money-option">
        <h3>📝 Paid surveys</h3>
        <p>Some legitimate research platforms pay users for completing surveys.</p>
        <span class="tag">Free to start</span>
      </div>

      <div class="money-option">
        <h3>💻 Freelancing</h3>
        <p>Offer writing, editing, design, data entry or other skills online.</p>
        <span class="tag">Online</span>
      </div>

      <div class="money-option">
        <h3>🧪 Website testing</h3>
        <p>Some companies pay people to test websites and apps and provide feedback.</p>
        <span class="tag">Online</span>
      </div>
    `;
  }

  if (category === "local") {
    results.innerHTML = `
      <h2>📍 Local Money</h2>

      <div class="money-option">
        <h3>🌱 Yard work</h3>
        <p>Offer lawn cleanup, weeding, trimming and other basic yard services.</p>
        <span class="tag">Local</span>
      </div>

      <div class="money-option">
        <h3>📦 Moving help</h3>
        <p>Help people move boxes, furniture or household items.</p>
        <span class="tag">Local</span>
      </div>

      <div class="money-option">
        <h3>🧽 Cleaning</h3>
        <p>Offer basic home or vehicle cleaning services.</p>
        <span class="tag">Local</span>
      </div>
    `;
  }

  if (category === "sell") {
    results.innerHTML = `
      <h2>📦 Sell Stuff</h2>

      <div class="money-option">
        <h3>🎮 Games & consoles</h3>
        <p>Check the value of old gaming systems, games and accessories.</p>
      </div>

      <div class="money-option">
        <h3>📱 Electronics</h3>
        <p>Phones, tablets, headphones and other electronics may have resale value.</p>
      </div>

      <div class="money-option">
        <h3>👕 Clothes</h3>
        <p>Clean and desirable clothing may be resold.</p>
      </div>
    `;
  }

  if (category === "rewards") {
    results.innerHTML = `
      <h2>🎁 Rewards & Cashback</h2>

      <div class="money-option">
        <h3>💳 Legitimate promotions</h3>
        <p>Look for promotions from established companies and carefully read their requirements.</p>
        <span class="tag">Terms apply</span>
      </div>

      <div class="money-option">
        <h3>🛒 Cashback</h3>
        <p>Some services offer cashback when you make qualifying purchases.</p>
        <span class="tag">Terms apply</span>
      </div>
    `;
  }

  if (category === "calculator") {
    results.innerHTML = `
      <h2>🧮 Money Calculator</h2>

      <p>How much could you potentially earn per task?</p>

      <input
        class="calc-input"
        type="number"
        id="earnPerTask"
        placeholder="Example: 10"
      >

      <button class="calc-btn" onclick="calculateTasks()">
        Calculate
      </button>

      <div id="calculatorResult"></div>
    `;
  }
}

function calculateTasks() {

  const earning = Number(
    document.getElementById("earnPerTask").value
  );

  if (earning <= 0) {
    alert("Enter an earning amount.");
    return;
  }

  if (moneyGoal <= 0) {
    alert("Set your money goal first.");
    return;
  }

  const tasks = Math.ceil(moneyGoal / earning);

  document.getElementById("calculatorResult").innerHTML = `
    <div class="money-option">
      <h3>🎯 Your target</h3>
      <p>
        At $${earning.toFixed(2)} per task, you would need approximately
        <strong>${tasks} task(s)</strong> to reach your
        <strong>$${moneyGoal.toFixed(2)}</strong> goal.
      </p>
    </div>
  `;
}
