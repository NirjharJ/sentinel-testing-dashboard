import { useState } from "react";
import { useQuery } from "../context/QueryContext";

export default function Form() {
  const { handleSimulationSubmit } = useQuery();
  const [input, setInput] = useState("");
  const [upper, setUpper] = useState("");
  const [middle, setMiddle] = useState("");
  return (
    <form
      onSubmit={(e) => handleSimulationSubmit(e, setInput)}
      className="d-flex flex-column"
    >
      <label className="form-label" htmlFor="simulation">
        Product Data
      </label>
      <textarea
        id="simulation"
        name="simulation"
        rows="2"
        cols="10"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      ></textarea>
      <div className="d-flex gap-2 my-2">
        <div className="d-flex flex-column">
          <label htmlFor="upper">Upper Tertile (Inclusive)</label>
          <input
            type="number"
            id="upper"
            name="upper"
            onChange={(e) => setUpper(e.target.value)}
            value={upper}
          />
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="middle">Middle Tertile (Inclusive)</label>
          <input
            type="number"
            id="middle"
            name="middle"
            onChange={(e) => setMiddle(e.target.value)}
            value={middle}
          />
        </div>
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
