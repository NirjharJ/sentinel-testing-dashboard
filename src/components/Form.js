import { useState } from "react";
import { useQuery } from "../context/QueryContext";

export default function Form() {
  const { handleSimulationSubmit } = useQuery();
  const [input, setInput] = useState("");
  return (
    <form
      onSubmit={(e) => handleSimulationSubmit(e, setInput)}
      style={{ display: "flex" }}
    >
      <label htmlFor="simulation">Product Data</label>
      <textarea
        id="simulation"
        name="simulation"
        rows="4"
        cols="50"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}
