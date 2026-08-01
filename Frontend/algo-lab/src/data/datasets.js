// All datasets are tiny and bundled with the frontend on purpose —
// the simulation engine never needs a network call to run.

export const songDataset = [
  { x: 22, y: 30, label: "Miss" }, { x: 18, y: 22, label: "Miss" },
  { x: 30, y: 35, label: "Miss" }, { x: 25, y: 18, label: "Miss" },
  { x: 15, y: 40, label: "Miss" }, { x: 34, y: 28, label: "Miss" },
  { x: 72, y: 78, label: "Hit" }, { x: 80, y: 65, label: "Hit" },
  { x: 65, y: 88, label: "Hit" }, { x: 90, y: 70, label: "Hit" },
  { x: 76, y: 60, label: "Hit" }, { x: 85, y: 82, label: "Hit" },
  { x: 55, y: 50, label: "Hit" }, { x: 45, y: 45, label: "Miss" },
];

export const studyScoreDataset = [
  { hours: 1, score: 42 }, { hours: 2, score: 50 }, { hours: 2.5, score: 55 },
  { hours: 3.5, score: 61 }, { hours: 4, score: 68 }, { hours: 5, score: 74 },
  { hours: 5.5, score: 70 }, { hours: 6, score: 82 }, { hours: 7, score: 88 },
  { hours: 8, score: 95 }, { hours: 8.5, score: 91 }, { hours: 9, score: 98 },
];

export const treeData = {
  outlook: { label: "Outlook?" },
  edges: [
    { from: "outlook", to: "humidity", value: "sunny", label: "Sunny" },
    { from: "outlook", to: "overcast", value: "overcast", label: "Overcast" },
    { from: "outlook", to: "wind", value: "rain", label: "Rain" },
  ],
};

// The classic 14-row PlayTennis training set (Quinlan's ID3 example).
// Real counts are derived from this everywhere in the Decision Tree sim,
// instead of a scripted animation — so the "why" is actually true.
export const tennisTrainingData = [
  { outlook: "sunny", humidity: "high", wind: "weak", play: "No" },
  { outlook: "sunny", humidity: "high", wind: "strong", play: "No" },
  { outlook: "overcast", humidity: "high", wind: "weak", play: "Yes" },
  { outlook: "rain", humidity: "high", wind: "weak", play: "Yes" },
  { outlook: "rain", humidity: "normal", wind: "weak", play: "Yes" },
  { outlook: "rain", humidity: "normal", wind: "strong", play: "No" },
  { outlook: "overcast", humidity: "normal", wind: "strong", play: "Yes" },
  { outlook: "sunny", humidity: "high", wind: "weak", play: "No" },
  { outlook: "sunny", humidity: "normal", wind: "weak", play: "Yes" },
  { outlook: "rain", humidity: "normal", wind: "weak", play: "Yes" },
  { outlook: "sunny", humidity: "normal", wind: "strong", play: "Yes" },
  { outlook: "overcast", humidity: "high", wind: "strong", play: "Yes" },
  { outlook: "overcast", humidity: "normal", wind: "weak", play: "Yes" },
  { outlook: "rain", humidity: "high", wind: "strong", play: "No" },
];

export function countPlay(rows) {
  const yes = rows.filter((r) => r.play === "Yes").length;
  return { yes, no: rows.length - yes, total: rows.length };
}

// simple entropy in bits, for the "why this question first" explanation
export function entropy(rows) {
  const { yes, no, total } = countPlay(rows);
  if (total === 0 || yes === 0 || no === 0) return 0;
  const p1 = yes / total, p2 = no / total;
  return -(p1 * Math.log2(p1) + p2 * Math.log2(p2));
}

export const critterClasses = ["Cat", "Dog", "Bird"];
export const critterIcons = { Cat: "🐱", Dog: "🐶", Bird: "🐦" };
export const critterFeatures = ["Ear shape", "Tail length", "Fur texture", "Sound pitch"];
