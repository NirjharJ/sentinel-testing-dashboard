import { createContext, useContext, useEffect, useReducer } from "react";
import { generateStats } from "../query/stats";
import { SimulationCohortSummaries } from "../data/globalData";

const QueryContext = createContext();

const intialState = {
  // allProduct: [],
  simulationModuleActivity: [],
  studentSummaries: [],
  allCourseInProduct: [],
  selectedProduct: {
    AssignmentID: null,
    AssignmentName: null,
  },
  selectedCourse: [],
  stats: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "setInitialState":
      return {
        ...state,
        selectedProduct: action.payload.selectedProduct,
        simulationModuleActivity: action.payload.SimulationModuleActivity,
        studentSummaries: action.payload.StudentSummaries,
      };
    case "setAllCourses":
      return { ...state, allCourseInProduct: action.payload };
    case "productSelected":
      const tempCourse = SimulationCohortSummaries.filter(
        (obj) => obj.AssignmentID === action.payload.AssignmentID
      ).map((obj) => {
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

  function handleSimulationSubmit(e, setInput) {
    e.preventDefault();
    const inputString = e.target[0].value;
    if (inputString.length === 0) {
      console.log("input data format incorrect");
      return;
    }
    const inputObj = JSON.parse(inputString);
    const { SimulationModuleActivity, StudentSummaries } = inputObj;
    const { AssignmentID } = SimulationModuleActivity.at(0);

    const { AssignmentName } = SimulationCohortSummaries.find(
      (obj) => obj.AssignmentID === AssignmentID
    );

    dispatch({
      type: "setInitialState",
      payload: {
        selectedProduct: { AssignmentID, AssignmentName },
        SimulationModuleActivity,
        StudentSummaries,
      },
    });

    setInput("");

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
        selectedProduct,
        selectedCourse,
        simulationModuleActivity,
        studentSummaries
      ),
    });
  }

  useEffect(
    function () {
      const courses = SimulationCohortSummaries.filter(
        (obj) => obj.AssignmentID === selectedProduct.AssignmentID
      ).map((obj) => {
        return {
          CohortID: obj.CohortID,
          CohortName: obj.CohortName,
          StudentCount: obj.StudentCount,
        };
      });

      dispatch({
        type: "setAllCourses",
        payload: courses,
      });
    },
    [selectedProduct]
  );

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
