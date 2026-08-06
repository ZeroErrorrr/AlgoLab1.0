import { createContext, useContext, useState } from "react";

const NeuronContext = createContext();

export function NeuronProvider({ children }) {
  const [selectedNeuron, setSelectedNeuron] = useState(null);

  return (
    <NeuronContext.Provider
      value={{
        selectedNeuron,
        setSelectedNeuron,
      }}
    >
      {children}
    </NeuronContext.Provider>
  );
}

export function useNeuron() {
  return useContext(NeuronContext);
}