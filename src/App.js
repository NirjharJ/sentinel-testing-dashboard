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
        <div className="mt-4">
          <h2>Courses</h2>
          <CheckboxCourse />
        </div>
      </div>
      <div style={{ marginLeft: "20px" }}>
        <h2 className="mb-2">
          {selectedProduct?.AssignmentID !== null
            ? selectedProduct.AssignmentName
            : "No product selected"}
        </h2>
        <button className="btn btn-success mb-4" onClick={handleGenerateStats}>
          Generate Stats
        </button>
        <div style={{ display: "flex", gap: "10%" }}>
          {selectedProduct && <Statistics />}
        </div>
      </div>
    </div>
  );
}

export default App;
