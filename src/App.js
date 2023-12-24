import "./App.css";
import CheckboxCourse from "./components/CheckboxCourse";
import ScoreTimeCompletion from "./components/ScoreTimeCompletion";
import SelectDDL from "./components/SelectDDL";
import { useQuery } from "./context/QueryContext";

function App() {
  const { selectedProduct, handleGenerateStats } = useQuery();
  return (
    <div style={{ display: "flex", margin: "10px" }}>
      <div>
        <div>
          <h2>Products</h2>
          <SelectDDL />
        </div>
        <div>
          <h2>Courses</h2>
          <CheckboxCourse />
        </div>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <h1>
          {selectedProduct?.AssignmentID !== null
            ? selectedProduct.AssignmentName
            : "No product selected"}
        </h1>
        <button onClick={handleGenerateStats}>Generate Stats</button>
        <div style={{ display: "flex", gap: "10%" }}>
          <div>
            <h2>Score, Time, Completion</h2>
            <ScoreTimeCompletion />
          </div>
          <div>
            <h2>Tertile View</h2>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
