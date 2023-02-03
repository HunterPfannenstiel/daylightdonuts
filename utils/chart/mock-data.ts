const DonutData = [
  {
    day: "Monday",
    profit: 750,
  },
  {
    day: "Tuesday",
    profit: 500,
  },
  {
    day: "Wednesday",
    profit: 550,
  },
  {
    day: "Thursday",
    profit: 900,
  },
  {
    day: "Friday",
    profit: 1250,
  },
  {
    day: "Saturday",
    profit: 1500,
  },
  {
    day: "Sunday",
    profit: 1000,
  },
];

export const donutLabels = DonutData.map((data) => data.day);

export const donutDataset = [
  {
    label: "Daily Donut Profits",
    data: DonutData.map((data) => data.profit),
    backgroundColor: ["#003472", "#FFD503"],
    tension: 0.4,
  },
];
