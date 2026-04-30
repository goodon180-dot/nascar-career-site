async function loadData() {
  const res = await fetch("data.json");
  return await res.json();
}

// =====================
// RESULTS PAGE
// =====================
async function loadResults() {
  const data = await loadData();
  const table = document.getElementById("results");

  data.forEach(race => {
    let row = `
      <tr>
        <td>${race["RACE NAME"]}</td>
        <td>${race["TRACK"]}</td>
        <td>${race["WINNER"]}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

// =====================
// DRIVER STATS
// =====================
function calculateDriverStats(data) {
  let drivers = {};

  data.forEach(r => {
    let d = r.WINNER;
    if (!drivers[d]) {
      drivers[d] = { wins: 0, races: 0 };
    }
    drivers[d].wins++;
    drivers[d].races++;
  });

  return drivers;
}

// =====================
// DRIVERS PAGE
// =====================
async function loadDrivers() {
  const data = await loadData();
  const drivers = calculateDriverStats(data);
  const table = document.getElementById("drivers");

  Object.keys(drivers).forEach(name => {
    let row = `
      <tr>
        <td>${name}</td>
        <td>${drivers[name].wins}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

// =====================
// STATS PAGE
// =====================
async function loadStats() {
  const data = await loadData();
  const drivers = calculateDriverStats(data);
  const table = document.getElementById("stats");

  Object.keys(drivers).forEach(name => {
    let row = `
      <tr>
        <td>${name}</td>
        <td>${drivers[name].wins}</td>
        <td>${drivers[name].races}</td>
        <td>-</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}
