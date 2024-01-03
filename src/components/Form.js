import { useState } from "react";
import { useQuery } from "../context/QueryContext";

export default function Form() {
  const { handleSimulationSubmit } = useQuery();
  const [input, setInput] = useState("");
  return (
    <form
      onSubmit={(e) => handleSimulationSubmit(e, setInput)}
      style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
    >
      <label className="fs-3" htmlFor="simulation">
        Product Data
      </label>
      <textarea
        id="simulation"
        name="simulation"
        rows="4"
        cols="50"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      ></textarea>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
