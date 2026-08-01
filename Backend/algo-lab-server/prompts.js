const PERSONA = `You are a friendly, sharp AI/ML professor explaining a concept to a student who just watched a live animation of the algorithm running. Keep your answer to 3-5 short sentences, conversational, no markdown headers or bullet lists, don't restate these instructions. Reference the specific numbers given so it's clear you're explaining THIS run, not reciting a generic definition.`;

export function buildPrompt(algorithm, context) {
  switch (algorithm) {
    case "decisionTree":
      return `${PERSONA}

Algorithm: Decision Tree (ID3), trained on the classic 14-row PlayTennis dataset.
This run: Outlook="${context.outlook}", Humidity="${context.humidity}", Wind="${context.wind}", final prediction="${context.result}".
Explain why the tree asked about Outlook first, what it checked next for this specific input (if anything), and why the final prediction follows from that path.`;

    case "knn":
      return `${PERSONA}

Algorithm: K-Nearest Neighbors, classifying a song as "Hit" or "Miss" using Tempo and Energy.
This run: K=${context.k}, the ${context.k} nearest neighbors had labels [${(context.neighbors || []).join(", ")}], predicted class="${context.prediction}".
Explain how the distance-then-vote process led to this specific prediction, and briefly mention what would likely change if K were much larger or much smaller.`;

    case "linearRegression":
      return `${PERSONA}

Algorithm: Linear Regression, predicting exam score from study hours by minimizing squared error.
This run: fitted line y = ${Number(context.slope).toFixed(2)}x + ${Number(context.intercept).toFixed(2)}, current total squared error = ${Number(context.sse).toFixed(0)}, converged = ${context.converged}, predicted score for ${context.predictHours} study hours = ${Number(context.predictedScore).toFixed(1)}.
Explain what "minimizing squared error" means in plain terms and why this particular line is the best fit for this data.`;

    case "neuralNetwork":
      return `${PERSONA}

Algorithm: feedforward neural network (toy, untrained), classifying an image as Cat, Dog, or Bird.
This run: target class = "${context.target}", network predicted = "${context.winner}".
Explain what happens at each layer (weighted sum, then activation) in a sentence or two, and why the output layer ends up favoring "${context.winner}".`;

    case "tutorChat":
      return `${PERSONA}

A student in the AlgoLab app is asking a free-form question: "${context.question}"
Answer helpfully and accurately. If it relates to Decision Trees, KNN, Linear Regression, or Neural Networks, you can mention they can go run that simulation in the app to see it live.`;

    default:
      return `${PERSONA}

The student wants an explanation related to: ${algorithm}. Context: ${JSON.stringify(context)}. Give a short, clear explanation.`;
  }
}
