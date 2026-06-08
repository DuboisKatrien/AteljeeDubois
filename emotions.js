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

// Grafiek tekenen
function drawEmotionChart() {
  const history = JSON.parse(localStorage.getItem("emotionHistory")) || [];

  if (history.length === 0) return;

  const labels = history.map(entry => entry.date);
  const data = history.map(entry => emotionValues[entry.emotion]);
  const colors = history.map(entry => emotionColors[entry.emotion]);

  const ctx = document.getElementById("emotionChart").getContext("2d");

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
      }
    }
  });
}
