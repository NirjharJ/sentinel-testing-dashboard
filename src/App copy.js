import { useEffect, useState } from "react";
import "./App.css";

import { SimulationCohortSummariesMapper } from "./utils/mapping";

function App() {
  const [productsData, setProductsData] = useState([]);

  useEffect(function () {
    setProductsData(SimulationCohortSummariesMapper());
  }, []);

  console.log(productsData);

  return (
    <div className="App">
      {productsData.map((prod) => (
        <div key={prod.AssignmentID}>
          <h3>
            AssignmentID:{prod.AssignmentID} ***** AssignmentName:
            {prod.AssignmentName}
          </h3>
          <ul>
            <li style={{ listStyleType: "none" }} key={"all"}>
              <h4>
                No filter / All filter **** StudentCount:
                {prod.Cohort.reduce(
                  (acc, curr) => (acc += curr.StudentCount),
                  0
                )}
              </h4>
            </li>
            {prod.Cohort.map((obj) => (
              <li style={{ listStyleType: "none" }} key={obj.CohortID}>
                <h4>
                  CohortID:{obj.CohortID} **** CohortName:{obj.CohortName} ****
                  StudentCount:({obj.StudentCount})
                </h4>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
