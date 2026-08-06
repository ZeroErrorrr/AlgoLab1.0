import Connection from "./Connection";

export default function Connections({ input, hidden, output }) {
  return (
    <>
      {input.map((iPos, i) =>
        hidden.map((hPos, j) => (
          <Connection
            key={`ih-${i}-${j}`}
            start={iPos}
            end={hPos}
          />
        ))
      )}

      {hidden.map((hPos, i) =>
        output.map((oPos, j) => (
          <Connection
            key={`ho-${i}-${j}`}
            start={hPos}
            end={oPos}
            active
          />
        ))
      )}
    </>
  );
}