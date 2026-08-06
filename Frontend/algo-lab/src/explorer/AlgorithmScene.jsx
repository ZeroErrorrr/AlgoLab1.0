import NeuralNetwork from "./algorithms/NeuralNetwork";
import DecisionTree from "./algorithms/DecisionTree";
import KNN from "./algorithms/KNN";
import LinearRegression from "./algorithms/LinearRegression";

export default function AlgorithmScene({ algorithm }) {

  switch (algorithm) {

    case "Decision Tree":
      return <DecisionTree />;

    case "KNN":
      return <KNN />;

    case "Linear Regression":
      return <LinearRegression />;

    default:
      return <NeuralNetwork />;
  }

}