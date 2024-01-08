import { useState } from "react";
import { useQuery } from "../context/QueryContext";

export default function Form() {
  const { handleSimulationSubmit } = useQuery();
  const [cohort, setCohort] = useState("");
  const [module, setModule] = useState("");
  const [upper, setUpper] = useState("");
  const [middle, setMiddle] = useState("");
  return (
    <form
      onSubmit={(e) => handleSimulationSubmit(e, setCohort, setModule)}
      className="d-flex flex-column"
    >
      <label className="form-label" htmlFor="cohortSummaries">
        Cohort Summaries
      </label>
      <textarea
        id="cohortSummaries"
        name="cohortSummaries"
        rows="2"
        cols="10"
        onChange={(e) => setCohort(e.target.value)}
        value={cohort}
      ></textarea>
      <label className="form-label" htmlFor="moduleActivity">
        Module Activity
      </label>
      <textarea
        id="moduleActivity"
        name="moduleActivity"
        rows="2"
        cols="10"
        onChange={(e) => setModule(e.target.value)}
        value={module}
      ></textarea>
      <div className="d-flex gap-2 my-2">
        <div className="d-flex flex-column">
          <label htmlFor="upper">
            Upper Tertile (
            <span style={{ fontSize: "12px" }}>Lower Limit Inclusive</span>)
          </label>
          <input
            type="number"
            id="upper"
            name="upper"
            onChange={(e) => setUpper(e.target.value)}
            value={upper}
          />
        </div>
        <div className="d-flex flex-column">
          <label htmlFor="middle">
            Middle Tertile (
            <span style={{ fontSize: "12px" }}>Lower Limit Inclusive</span>)
          </label>
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
