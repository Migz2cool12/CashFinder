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


/* GOAL */

function setGoal() {

  const amount =
    Number(
      document.getElementById("goalInput").value
    );


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


/* EARNED MONEY */

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


  const percent =
    (earnedMoney / moneyGoal) * 100;


  fill.style.width =
    Math.min(percent, 100) + "%";


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

  if (
    !confirm(
      "Reset your earned money and goal?"
    )
  ) {

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


/* SEARCH */

function searchOpportunities() {

  const search =
    document.getElementById("searchInput")
      .value
      .toLowerCase()
      .trim();


  if (!search) {

    showAll();

    return;

  }


  const filtered =
    opportunities.filter(
      opportunity =>

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


  displayOpportunities(filtered);

}


/* CATEGORIES */

function showAll() {

  displayOpportunities(
    opportunities
  );

}


function showCategory(category) {

  displayOpportunities(

    opportunities.filter(
      opportunity =>
        opportunity.category === category
    )

  );

}


/* FILTERS */

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


/* FAVORITES */

function toggleFavorite(id) {

  if (
    favorites.includes(id)
  ) {

    favorites =
      favorites.filter(
        favorite =>
          favorite !== id
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

  const list =
    opportunities.filter(
      opportunity =>
        favorites.includes(
          opportunity.id
        )
    );


  if (!list.length) {

    document.getElementById(
      "results"
    ).innerHTML = `

      <div class="empty">

        <h2>❤️ No Favorites Yet</h2>

        <p>
          Tap 🤍 on an opportunity
          to save it.
        </p>

      </div>

    `;

    return;

  }


  displayOpportunities(list);

}


/* DISPLAY */

function displayOpportunities(list) {

  const results =
    document.getElementById("results");


  if (!list.length) {

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

      const favorite =
        favorites.includes(
          opportunity.id
        );


      const tags =
        opportunity.tags
          .map(
            tag =>
              `<span class="tag">${tag}</span>`
          )
          .join("");


      html += `

        <div class="money-option">

          <button
            class="favorite-btn"
            onclick="toggleFavorite(${opportunity.id})"
          >
            ${favorite ? "❤️" : "🤍"}
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


/* NEARBY */

function findMoneyNearMe() {

  const status =
    document.getElementById(
      "locationStatus"
    );

  const results =
    document.getElementById(
      "nearbyResults"
    );


  if (!navigator.geolocation) {

    status.textContent =
      "Location services are not supported.";

    return;

  }


  status.textContent =
    "📍 Finding your location...";


  results.innerHTML = "";


  navigator.geolocation.getCurrentPosition(

    function(position) {

      status.textContent =
        "✅ Location found.";

      showNearbyOptions();

    },

    function() {

      status.textContent =
        "⚠️ Location permission was not granted.";

    },

    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000
    }

  );

}


function showNearbyOptions() {

  const results =
    document.getElementById(
      "nearbyResults"
    );


  results.innerHTML = `

    <div class="nearby-result">

      <h3>🏠 Local Jobs</h3>

      <p>
        Search for part-time,
        temporary and entry-level jobs.
      </p>

      <a
        class="nearby-link"
        href="https://www.indeed.com/jobs?q=part+time&l=Modesto%2C+CA"
        target="_blank"
        rel="noopener noreferrer"
      >
        Search Local Jobs →
      </a>

    </div>


    <div class="nearby-result">

      <h3>🗺️ Jobs Near You</h3>

      <p>
        Find employers and businesses
        near your location.
      </p>

      <a
        class="nearby-link"
        href="https://www.google.com/search?q=jobs+near+me"
        target="_blank"
        rel="noopener noreferrer"
      >
        Search Nearby →
      </a>

    </div>


    <div class="nearby-result">

      <h3>🧹 Local Gigs</h3>

      <p>
        Look for cleaning, moving,
        yard work and other local services.
      </p>

      <a
        class="nearby-link"
        href="https://www.craigslist.org/search/jjj"
        target="_blank"
        rel="noopener noreferrer"
      >
        Find Local Gigs →
      </a>

    </div>


    <div class="nearby-result">

      <h3>📦 Sell Items Nearby</h3>

      <p>
        Sell electronics, furniture,
        games, clothing and more.
      </p>

      <a
        class="nearby-link"
        href="https://www.facebook.com/marketplace/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Marketplace →
      </a>

    </div>

  `;

}


/* JOB SEARCH */

function searchJobs() {

  const job =
    document.getElementById(
      "jobSearchInput"
    ).value.trim();


  const location =
    document.getElementById(
      "jobLocationInput"
    ).value.trim();


  const results =
    document.getElementById(
      "jobSearchResults"
    );


  if (!job) {

    results.innerHTML = `

      <div class="job-search-result">

        <strong>
          Enter a job or type of work first.
        </strong>

        <p>
          Try warehouse, cashier,
          construction, delivery,
          restaurant or security.
        </p>

      </div>

    `;

    return;

  }


  const searchLocation =
    location || "United States";


  const indeedURL =
    "https://www.indeed.com/jobs?q=" +
    encodeURIComponent(job) +
    "&l=" +
    encodeURIComponent(searchLocation);


  const googleURL =
    "https://www.google.com/search?q=" +
    encodeURIComponent(
      job + " jobs near " + searchLocation
    );


  const zipURL =
    "https://www.ziprecruiter.com/jobs-search?search=" +
    encodeURIComponent(job) +
    "&location=" +
    encodeURIComponent(searchLocation);


  results.innerHTML = `

    <div class="job-search-result">

      <h3>
        💼 ${escapeHTML(job)} Jobs
      </h3>

      <p>
        Searching for
        <strong>${escapeHTML(job)}</strong>
        near
        <strong>${escapeHTML(searchLocation)}</strong>.
      </p>

      <a
        href="${indeedURL}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Search Indeed →
      </a>

    </div>


    <div class="job-search-result">

      <h3>
        🔎 Google Jobs
      </h3>

      <p>
        Search Google's current job results
        for this type of work and location.
      </p>

      <a
        href="${googleURL}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Search Google Jobs →
      </a>

    </div>


    <div class="job-search-result">

      <h3>
        💼 ZipRecruiter
      </h3>

      <p>
        Check additional job listings
        for the same search.
      </p>

      <a
        href="${zipURL}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Search ZipRecruiter →
      </a>

    </div>

  `;

}


function escapeHTML(text) {

  const div =
    document.createElement("div");

  div.textContent =
    text;

  return div.innerHTML;

}


/* CALCULATOR */

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
