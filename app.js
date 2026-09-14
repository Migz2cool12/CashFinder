let moneyGoal =
  Number(localStorage.getItem("moneyGoal")) || 0;

let earnedMoney =
  Number(localStorage.getItem("earnedMoney")) || 0;

let favorites =
  JSON.parse(localStorage.getItem("favorites") || "[]");


const opportunities = [

  {
    id: 1,
    category: "quick",
    title: "📦 Sell Items You Don't Need",
    description: "Turn unused electronics, games, clothes, furniture and other items into cash.",
    tags: ["Free to start", "Fast potential"],
    payout: "Potentially fast",
    potential: "High",
    free: true,
    link: "https://www.facebook.com/marketplace/"
  },

  {
    id: 2,
    category: "quick",
    title: "🧹 Offer Local Services",
    description: "Offer cleaning, yard work, moving help, car washing and other local services.",
    tags: ["Free to start", "Local"],
    payout: "Potentially fast",
    potential: "High",
    free: true,
    link: "https://www.craigslist.org/"
  },

  {
    id: 3,
    category: "online",
    title: "📝 Paid Surveys",
    description: "Some research companies pay eligible users for completing surveys.",
    tags: ["Online", "Free to start"],
    payout: "Varies",
    potential: "Low",
    free: true,
    link: "https://www.branded-surveys.com/"
  },

  {
    id: 4,
    category: "online",
    title: "💻 Freelancing",
    description: "Offer writing, graphic design, editing, programming, virtual assistance or other skills.",
    tags: ["Online", "Skills-based"],
    payout: "Varies",
    potential: "High",
    free: true,
    link: "https://www.fiverr.com/"
  },

  {
    id: 5,
    category: "online",
    title: "🧪 Website Testing",
    description: "Some companies pay approved participants to test websites and provide feedback.",
    tags: ["Online", "Approval required"],
    payout: "Varies",
    potential: "Medium",
    free: true,
    link: "https://www.usertesting.com/"
  },

  {
    id: 6,
    category: "local",
    title: "🚗 Delivery & Gig Work",
    description: "Check legitimate delivery and gig platforms for opportunities in your area.",
    tags: ["Local", "Approval required"],
    payout: "Varies",
    potential: "Medium",
    free: true,
    link: "https://www.indeed.com/"
  },

  {
    id: 7,
    category: "local",
    title: "🏠 Local Jobs",
    description: "Search for part-time, temporary and entry-level jobs near you.",
    tags: ["Local", "Job search"],
    payout: "Usually scheduled",
    potential: "High",
    free: true,
    link: "https://www.indeed.com/"
  },

  {
    id: 8,
    category: "sell",
    title: "🎮 Sell Games & Consoles",
    description: "Compare offers for gaming systems, games and accessories you no longer use.",
    tags: ["Free to start", "Electronics"],
    payout: "Potentially fast",
    potential: "High",
    free: true,
    link: "https://www.gamestop.com/"
  },

  {
    id: 9,
    category: "sell",
    title: "📱 Sell Electronics",
    description: "Phones, tablets, headphones and other electronics may have resale value.",
    tags: ["Free to start", "Electronics"],
    payout: "Potentially fast",
    potential: "High",
    free: true,
    link: "https://www.ebay.com/"
  },

  {
    id: 10,
    category: "sell",
    title: "👕 Sell Clothing",
    description: "Resell clothing that is clean, wearable and in demand.",
    tags: ["Free to start", "Online"],
    payout: "Varies",
    potential: "Medium",
    free: true,
    link: "https://www.depop.com/"
  },

  {
    id: 11,
    category: "rewards",
    title: "🛒 Cashback Opportunities",
    description: "Some established services offer cashback for qualifying purchases.",
    tags: ["Free to start", "Cashback"],
    payout: "Varies",
    potential: "Low",
    free: true,
    link: "https://www.rakuten.com/"
  }

];


document.addEventListener(
  "DOMContentLoaded",
  function () {

    updateGoalDisplay();

    updateProgress();

    showAll();

  }
);


/* =========================
   GOAL
========================= */

function setGoal() {

  const input =
    document.getElementById("goalInput");

  const amount =
    Number(input.value);


  if (amount <= 0) {

    alert("Please enter a money goal.");

    return;

  }


  moneyGoal = amount;

  localStorage.setItem(
    "moneyGoal",
    moneyGoal
  );


  updateGoalDisplay();

  updateProgress();

}


function updateGoalDisplay() {

  document.getElementById(
    "goalDisplay"
  ).textContent =
    "🎯 Your goal: $" +
    moneyGoal.toFixed(2);

}


/* =========================
   EARNED MONEY
========================= */

function addEarnedMoney() {

  const input =
    document.getElementById("earnedInput");

  const amount =
    Number(input.value);


  if (amount <= 0) {

    alert("Enter the amount you earned.");

    return;

  }


  earnedMoney += amount;


  localStorage.setItem(
    "earnedMoney",
    earnedMoney
  );


  input.value = "";

  updateProgress();

}


function updateProgress() {

  const earned =
    document.getElementById("earnedDisplay");

  const goal =
    document.getElementById("goalProgressText");

  const fill =
    document.getElementById("progressFill");

  const percentText =
    document.getElementById("progressPercent");


  earned.textContent =
    "$" + earnedMoney.toFixed(2);


  goal.textContent =
    "of $" + moneyGoal.toFixed(2);


  if (moneyGoal <= 0) {

    fill.style.width = "0%";

    percentText.textContent =
      "Set a goal to track progress.";

    return;

  }


  let percent =
    (earnedMoney / moneyGoal) * 100;


  const displayPercent =
    Math.min(percent, 100);


  fill.style.width =
    displayPercent + "%";


  if (percent >= 100) {

    percentText.textContent =
      "🎉 Goal reached!";

  } else {

    percentText.textContent =
      Math.round(percent) +
      "% complete";

  }

}


function resetProgress() {

  const confirmReset =
    confirm(
      "Reset your earned money and goal?"
    );


  if (!confirmReset) {

    return;

  }


  earnedMoney = 0;

  moneyGoal = 0;


  localStorage.removeItem(
    "earnedMoney"
  );

  localStorage.removeItem(
    "moneyGoal"
  );


  updateGoalDisplay();

  updateProgress();

}


/* =========================
   OPPORTUNITY DISPLAY
========================= */

function showAll() {

  displayOpportunities(
    opportunities
  );

}


function showCategory(category) {

  const filtered =
    opportunities.filter(
      opportunity =>
        opportunity.category === category
    );


  displayOpportunities(
    filtered
  );

}


function searchOpportunities() {

  const search =
    document.getElementById(
      "searchInput"
    ).value
    .toLowerCase()
    .trim();


  if (!search) {

    showAll();

    return;

  }


  const filtered =
    opportunities.filter(
      opportunity => {

        return (

          opportunity.title
            .toLowerCase()
            .includes(search)

          ||

          opportunity.description
            .toLowerCase()
            .includes(search)

          ||

          opportunity.category
            .toLowerCase()
            .includes(search)

          ||

          opportunity.tags
            .join(" ")
            .toLowerCase()
            .includes(search)

        );

      }
    );


  displayOpportunities(
    filtered
  );

}


/* =========================
   SMART FILTERS
========================= */

function filterFree() {

  displayOpportunities(
    opportunities.filter(
      opportunity =>
        opportunity.free
    )
  );

}


function filterFast() {

  displayOpportunities(
    opportunities.filter(
      opportunity =>
        opportunity.payout
          .toLowerCase()
          .includes("fast")
    )
  );

}


function filterHighPotential() {

  displayOpportunities(
    opportunities.filter(
      opportunity =>
        opportunity.potential === "High"
    )
  );

}


/* =========================
   FAVORITES
========================= */

function toggleFavorite(id) {

  if (favorites.includes(id)) {

    favorites =
      favorites.filter(
        favoriteId =>
          favoriteId !== id
      );

  } else {

    favorites.push(id);

  }


  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );


  showAll();

}


function showFavorites() {

  const favoriteOpportunities =
    opportunities.filter(
      opportunity =>
        favorites.includes(
          opportunity.id
        )
    );


  if (
    favoriteOpportunities.length === 0
  ) {

    document.getElementById(
      "results"
    ).innerHTML = `

      <div class="empty">

        <h2>❤️ No Favorites Yet</h2>

        <p>
          Tap the ❤️ button on an opportunity
          to save it here.
        </p>

      </div>

    `;

    return;

  }


  displayOpportunities(
    favoriteOpportunities
  );

}


/* =========================
   RENDER OPPORTUNITIES
========================= */

function displayOpportunities(list) {

  const results =
    document.getElementById(
      "results"
    );


  if (list.length === 0) {

    results.innerHTML = `

      <div class="empty">

        <h2>😕 Nothing Found</h2>

        <p>
          Try another search or filter.
        </p>

      </div>

    `;

    return;

  }


  let html =
    "<h2>💵 Money Opportunities</h2>";


  list.forEach(
    opportunity => {

      const isFavorite =
        favorites.includes(
          opportunity.id
        );


      const tags =
        opportunity.tags
          .map(
            tag => {

              let className =
                "tag";

              if (
                tag
                  .toLowerCase()
                  .includes("fast")
              ) {

                className += " fast";

              }

              if (
                tag
                  .toLowerCase()
                  .includes("free")
              ) {

                className += " free";

              }

              return `
                <span class="${className}">
                  ${tag}
                </span>
              `;

            }
          )
          .join("");


      html += `

        <div class="money-option">

          <button
            class="favorite-btn"
            onclick="toggleFavorite(${opportunity.id})"
            aria-label="Favorite"
          >
            ${isFavorite ? "❤️" : "🤍"}
          </button>

          <h3>
            ${opportunity.title}
          </h3>

          <p>
            ${opportunity.description}
          </p>

          <div class="tags">

            ${tags}

            <span class="tag">
              💵 ${opportunity.potential} potential
            </span>

            <span class="tag">
              ⏱️ ${opportunity.payout}
            </span>

          </div>

          <a
            class="opportunity-btn"
            href="${opportunity.link}"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Opportunity →
          </a>

        </div>

      `;

    }
  );


  results.innerHTML =
    html;

}


/* =========================
   FIND MONEY NEAR ME
========================= */

function findMoneyNearMe() {

  const status =
    document.getElementById(
      "locationStatus"
    );

  const results =
    document.getElementById(
      "nearbyResults"
    );


  if (
    !navigator.geolocation
  ) {

    status.textContent =
      "Your browser does not support location services.";

    return;

  }


  status.textContent =
    "📍 Finding your location...";


  results.innerHTML =
    "";


  navigator.geolocation.getCurrentPosition(

    function(position) {

      status.textContent =
        "✅ Location found. Here are nearby money searches.";

      showNearbyOptions(
        position.coords.latitude,
        position.coords.longitude
      );

    },


    function() {

      status.textContent =
        "⚠️ Location permission was not granted. You can still use CashFinder.";

    },


    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000
    }

  );

}


function showNearbyOptions(
  latitude,
  longitude
) {

  const results =
    document.getElementById(
      "nearbyResults"
    );


  const maps =
    "https://www.google.com/maps/search/jobs+near+me/";


  const indeed =
    "https://www.indeed.com/jobs?q=part+time";


  const craigslist =
    "https://www.craigslist.org/search/jjj";


  const marketplace =
    "https://www.facebook.com/marketplace/";


  results.innerHTML = `

    <div class="nearby-result">

      <h3>🏠 Local Jobs</h3>

      <p>
        Search for part-time, temporary
        and entry-level jobs.
      </p>

      <a
        class="nearby-link"
        href="${indeed}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Search Local Jobs →
      </a>

    </div>


    <div class="nearby-result">

      <h3>🗺️ Jobs Near You</h3>

      <p>
        Search businesses and employers
        around your current location.
      </p>

      <a
        class="nearby-link"
        href="${maps}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Nearby Search →
      </a>

    </div>


    <div class="nearby-result">

      <h3>🧹 Local Gigs</h3>

      <p>
        Look for cleaning, moving,
        yard work and other local gigs.
      </p>

      <a
        class="nearby-link"
        href="${craigslist}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Find Local Gigs →
      </a>

    </div>


    <div class="nearby-result">

      <h3>📦 Sell Items Nearby</h3>

      <p>
        Sell electronics, games, furniture,
        clothing and other items locally.
      </p>

      <a
        class="nearby-link"
        href="${marketplace}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Marketplace →
      </a>

    </div>


    <div class="nearby-note">

      CashFinder does not store your
      location. Job availability,
      acceptance and earnings vary.

    </div>

  `;

}


/* =========================
   CALCULATOR
========================= */

function calculateTasks() {

  const earning =
    Number(
      document.getElementById(
        "earnPerTask"
      ).value
    );


  const result =
    document.getElementById(
      "calculatorResult"
    );


  if (earning <= 0) {

    result.innerHTML =
      "Enter an earning amount first.";

    return;

  }


  if (moneyGoal <= 0) {

    result.innerHTML =
      "Set your money goal first.";

    return;

  }


  const tasks =
    Math.ceil(
      moneyGoal / earning
    );


  result.innerHTML = `

    🎯 To reach
    <strong>
      $${moneyGoal.toFixed(2)}
    </strong>,

    you would need approximately

    <strong>
      ${tasks}
    </strong>

    task(s) at

    <strong>
      $${earning.toFixed(2)}
    </strong>

    each.

  `;

}
