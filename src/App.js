import "./App.css";
import CheckboxCourse from "./components/CheckboxCourse";
import Form from "./components/Form";
import Statistics from "./components/Statistics";
import { useQuery } from "./context/QueryContext";

function App() {
  const { selectedProduct, handleGenerateStats } = useQuery();
  return (
    <div style={{ display: "flex", margin: "10px" }}>
      <div>
        <div>
          <Form />
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
          <Statistics />
        </div>
      </div>
    </div>
  );
}

export default App;
