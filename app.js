let moneyGoal = Number(localStorage.getItem("moneyGoal")) || 0;

const opportunities = [

  {
    category: "quick",
    title: "📦 Sell Items You Don't Need",
    description: "Turn unused electronics, games, clothes, furniture and other items into cash.",
    tags: ["Free to start", "Potentially fast"],
    link: "https://www.facebook.com/marketplace/"
  },

  {
    category: "quick",
    title: "🧹 Offer Local Services",
    description: "Offer services such as cleaning, yard work, moving help, car washing or other tasks.",
    tags: ["Local", "No special app required"],
    link: "https://www.craigslist.org/"
  },

  {
    category: "online",
    title: "📝 Paid Surveys",
    description: "Some research companies pay eligible users for completing surveys.",
    tags: ["Online", "Free to start"],
    link: "https://www.branded-surveys.com/"
  },

  {
    category: "online",
    title: "💻 Freelancing",
    description: "Offer skills such as writing, graphic design, editing, programming or virtual assistance.",
    tags: ["Online", "Skills-based"],
    link: "https://www.fiverr.com/"
  },

  {
    category: "online",
    title: "🧪 Website Testing",
    description: "Some companies pay people to test websites and provide feedback.",
    tags: ["Online", "May require approval"],
    link: "https://www.usertesting.com/"
  },

  {
    category: "local",
    title: "🚗 Delivery & Gig Work",
    description: "Check legitimate delivery and gig platforms for opportunities in your area.",
    tags: ["Local", "Approval required"],
    link: "https://www.indeed.com/"
  },

  {
    category: "local",
    title: "🏠 Local Jobs",
    description: "Search for part-time, temporary and entry-level jobs near you.",
    tags: ["Local", "Job search"],
    link: "https://www.indeed.com/"
  },

  {
    category: "sell",
    title: "🎮 Sell Games & Consoles",
    description: "Compare offers for gaming systems, games and accessories you no longer use.",
    tags: ["Reselling", "Electronics"],
    link: "https://www.gamestop.com/"
  },

  {
    category: "sell",
    title: "📱 Sell Electronics",
    description: "Phones, tablets, headphones and other electronics may have resale value.",
    tags: ["Reselling", "Electronics"],
    link: "https://www.ebay.com/"
  },

  {
    category: "sell",
    title: "👕 Sell Clothing",
    description: "Resell clothing that is clean, wearable and in demand.",
    tags: ["Reselling", "Online"],
    link: "https://www.depop.com/"
  },

  {
    category: "rewards",
    title: "🛒 Cashback Opportunities",
    description: "Some established services offer cashback for qualifying purchases.",
    tags: ["Cashback", "Terms apply"],
    link: "https://www.rakuten.com/"
  }

];


document.addEventListener("DOMContentLoaded", function () {

  updateGoalDisplay();

  showAll();

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


function showAll() {

  displayOpportunities(opportunities);

}


function showCategory(category) {

  const filtered = opportunities.filter(
    opportunity => opportunity.category === category
  );

  displayOpportunities(filtered);

}


function searchOpportunities() {

  const search =
    document.getElementById("searchInput").value
    .toLowerCase()
    .trim();

  if (!search) {

    showAll();

    return;

  }

  const filtered = opportunities.filter(opportunity => {

    return (

      opportunity.title.toLowerCase().includes(search) ||

      opportunity.description.toLowerCase().includes(search) ||

      opportunity.category.toLowerCase().includes(search) ||

      opportunity.tags.join(" ").toLowerCase().includes(search)

    );

  });

  displayOpportunities(filtered);

}


function displayOpportunities(list) {

  const results = document.getElementById("results");

  if (list.length === 0) {

    results.innerHTML = `

      <div class="empty">

        <h2>😕 No opportunities found</h2>

        <p>Try another search.</p>

      </div>

    `;

    return;

  }


  let html = "<h2>💵 Money Opportunities</h2>";


  list.forEach(opportunity => {

    const tags = opportunity.tags

      .map(tag => `<span class="tag">${tag}</span>`)

      .join("");


    html += `

      <div class="money-option">

        <h3>${opportunity.title}</h3>

        <p>${opportunity.description}</p>

        <div class="tags">

          ${tags}

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

  });


  results.innerHTML = html;

}


/* =========================
   FIND MONEY NEAR ME
========================= */


function findMoneyNearMe() {

  const status =
    document.getElementById("locationStatus");

  const results =
    document.getElementById("nearbyResults");


  if (!navigator.geolocation) {

    status.textContent =
      "Your browser does not support location services.";

    return;

  }


  status.textContent =
    "📍 Finding your location...";


  results.innerHTML = "";


  navigator.geolocation.getCurrentPosition(

    function(position) {

      const latitude = position.coords.latitude;

      const longitude = position.coords.longitude;


      status.textContent =
        "✅ Location found. Showing ways to look for money nearby.";


      showNearbyOptions(latitude, longitude);

    },


    function(error) {

      status.textContent =
        "⚠️ Location permission was not granted. You can still search manually.";

    },

    {

      enableHighAccuracy: false,

      timeout: 10000,

      maximumAge: 300000

    }

  );

}


function showNearbyOptions(latitude, longitude) {

  const results =
    document.getElementById("nearbyResults");


  const mapsJobs =
    "https://www.google.com/maps/search/jobs+near+me/";


  const indeed =
    "https://www.indeed.com/jobs?q=part+time";


  const craigslist =
    "https://www.craigslist.org/search/jjj";


  const facebook =
    "https://www.facebook.com/marketplace/";


  results.innerHTML = `

    <div class="nearby-result">

      <h3>🏠 Local Jobs</h3>

      <p>
        Search for part-time, temporary and entry-level
        jobs in your area.
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
        Use Google Maps to find businesses and employers
        that may be hiring nearby.
      </p>

      <a
        class="nearby-link"
        href="${mapsJobs}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Nearby Jobs →
      </a>

    </div>


    <div class="nearby-result">

      <h3>🧹 Local Services</h3>

      <p>
        Look for local opportunities such as cleaning,
        moving help, yard work and other services.
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
        Sell electronics, games, furniture, clothing
        and other items to people in your area.
      </p>

      <a
        class="nearby-link"
        href="${facebook}"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Marketplace →
      </a>

    </div>


    <div class="nearby-note">

      CashFinder uses your device's location only to
      provide a nearby-search experience. Earnings,
      job availability and acceptance are not guaranteed.

    </div>

  `;

}


/* =========================
   MONEY CALCULATOR
========================= */


function calculateTasks() {

  const earning =
    Number(document.getElementById("earnPerTask").value);


  const result =
    document.getElementById("calculatorResult");


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
    Math.ceil(moneyGoal / earning);


  result.innerHTML = `

    🎯 To reach
    <strong>$${moneyGoal.toFixed(2)}</strong>,

    you would need approximately

    <strong>${tasks}</strong> task(s)

    at $${earning.toFixed(2)} each.

  `;

}
