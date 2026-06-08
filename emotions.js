// Controleer of Chart.js geladen is
if (typeof Chart === "undefined") {
  console.error("Chart.js niet gevonden!");
}

// Emotiewaarden voor de grafiek
const emotionValues = {
  blij: 5,
  boos: 4,
  neutraal: 3,
  moe: 2,
  verdrietig: 1
};

// Pastelkleuren voor de grafiek
const emotionColors = {
  blij: "#FFE9A3",
  verdrietig: "#CDE7FF",
  boos: "#FFB3B3",
  moe: "#D8C7FF",
  neutraal: "#F0F0F0"
};

// Functie om de grafiek te tekenen
function drawEmotionChart() {
  const history = JSON.parse(localStorage.getItem("emotionHistory")) || [];

  const ctx = document.getElementById("emotionChart").getContext("2d");

  if (history.length === 0) {
    ctx.font = "16px Poppins";
    ctx.fillStyle = "#4A4A4A";
    ctx.fillText("Nog geen emoties geregistreerd.", 50, 100);
    return;
  }

  const labels = history.map(entry => entry.date);
  const data = history.map(entry => emotionValues[entry.emotion]);
  const colors = history.map(entry => emotionColors[entry.emotion]);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Jouw SoulColor emoties",
        data: data,
        borderColor: "#F7C8E0",
        backgroundColor: colors,
        pointBackgroundColor: colors,
        pointRadius: 8,
        borderWidth: 3,
        tension: 0.4
      }]
    },
    options: {
      scales: {
        y: {
          min: 0,
          max: 6,
          ticks: {
            stepSize: 1,
            callback: function(value) {
              return ["", "😢", "😴", "😐", "😡", "😀"][value];
            }
          }
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

