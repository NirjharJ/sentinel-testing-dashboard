import { createContext, useContext, useReducer } from "react";
import { generateStats } from "../query/stats";

const QueryContext = createContext();

const intialState = {
  simulationCohortSummaries: [],
  simulationModuleInfo: [],
  simulationModuleActivity: [],
  studentSummaries: [],
  allCourseInProduct: [],
  selectedProduct: {
    AssignmentID: null,
    AssignmentName: null,
    UpperTertile: null,
    MiddleTertile: null,
  },
  selectedCourse: [],
  stats: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "setInitialState":
      const courses = action.payload.SimulationCohortSummaries.filter(
        (obj) =>
          obj.AssignmentID === action.payload.selectedProduct.AssignmentID
      ).map((obj) => {
        return {
          CohortID: obj.CohortID,
          CohortName: obj.CohortName,
          StudentCount: obj.StudentCount,
        };
      });

      return {
        ...state,
        simulationCohortSummaries: action.payload.SimulationCohortSummaries,
        simulationModuleInfo: action.payload.SimulationModuleInfo,
        selectedProduct: action.payload.selectedProduct,
        simulationModuleActivity: action.payload.SimulationModuleActivity,
        studentSummaries: action.payload.StudentSummaries,
        allCourseInProduct: courses,
      };
    case "productSelected":
      const tempCourse = state.simulationCohortSummaries
        .filter((obj) => obj.AssignmentID === action.payload.AssignmentID)
        .map((obj) => {
          return {
            CohortID: obj.CohortID,
            CohortName: obj.CohortName,
            StudentCount: obj.StudentCount,
          };
        });
      return {
        ...state,
        selectedProduct: action.payload,
        allCourseInProduct: tempCourse,
      };
    case "courseSelected":
      let updatedSelectedCourse = [];
      if (state.selectedCourse.includes(action.payload)) {
        updatedSelectedCourse = state.selectedCourse.filter(
          (id) => id != action.payload
        );
      } else {
        updatedSelectedCourse = [...state.selectedCourse, action.payload];
      }
      return {
        ...state,
        selectedCourse: updatedSelectedCourse,
      };
    case "generateStats":
      return { ...state, stats: action.payload };
    default:
      throw new Error("Action Unknown");
  }
}

function QueryContextProvider({ children }) {
  const [
    {
      simulationCohortSummaries,
      simulationModuleInfo,
      simulationModuleActivity,
      studentSummaries,
      allProduct,
      allCourseInProduct,
      selectedProduct,
      selectedCourse,
      stats,
    },
    dispatch,
  ] = useReducer(reducer, intialState);

  function handleSimulationSubmit(e, setCohort, setModule) {
    e.preventDefault();
    const cohortString = e.target[0].value;
    const moduleString = e.target[1].value;
    if (cohortString.length === 0 || moduleString.length === 0) {
      console.log("input data format incorrect");
      return;
    }
    const cohortObj = JSON.parse(cohortString);
    const { SimulationCohortSummaries, SimulationModuleInfo } = cohortObj;
    const moduleObj = JSON.parse(moduleString);
    const { SimulationModuleActivity, StudentSummaries } = moduleObj;
    const { AssignmentID } = SimulationModuleInfo.at(0);

    const { AssignmentName } = SimulationCohortSummaries.find(
      (obj) => obj.AssignmentID === AssignmentID
    );

    dispatch({
      type: "setInitialState",
      payload: {
        selectedProduct: {
          AssignmentID,
          AssignmentName,
          Upper: Number(e.target[2].value),
          Middle: Number(e.target[3].value),
        },
        SimulationCohortSummaries,
        SimulationModuleInfo,
        SimulationModuleActivity,
        StudentSummaries,
      },
    });

    setCohort("");
    setModule("");

    console.log("product updated successfully");
  }

  function handleSelectCourse(e) {
    dispatch({
      type: "courseSelected",
      payload: Number(e.target.id),
    });
  }

  function handleGenerateStats() {
    if (selectedProduct.AssignmentID === null) return;
    dispatch({
      type: "generateStats",
      payload: generateStats(
        simulationCohortSummaries,
        simulationModuleInfo,
        selectedProduct,
        selectedCourse,
        simulationModuleActivity,
        studentSummaries
      ),
    });
  }

  return (
    <QueryContext.Provider
      value={{
        allProduct,
        allCourseInProduct,
        selectedProduct,
        stats,
        handleSimulationSubmit,
        handleSelectCourse,
        handleGenerateStats,
      }}
    >
      {children}
    </QueryContext.Provider>
  );
}

function useQuery() {
  const context = useContext(QueryContext);
  if (context === undefined)
    throw new Error("QueryContext was used outside of QueryContextProvider");
  return context;
}

export { QueryContextProvider, useQuery };
