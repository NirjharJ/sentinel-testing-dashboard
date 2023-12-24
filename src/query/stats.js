import {
  SimulationCohortSummaries,
  SimulationModuleInfo,
} from "../data/globalData";
import { SimulationModuleActivity, StudentSummaries } from "../data/moduleData";

export function generateStats(selectedProduct, selectedCourse) {
  if (selectedCourse.length === 0) {
    selectedCourse = SimulationCohortSummaries.filter(
      (obj) => obj.AssignmentID === selectedProduct.AssignmentID
    ).map((obj) => obj.CohortID);
  }

  const levels = SimulationModuleInfo.filter(
    (obj) =>
      obj.AssignmentID === selectedProduct.AssignmentID && obj.MaxScore > 0
  );

  levels.forEach((level) => {
    level.students = [];
    SimulationModuleActivity.filter(
      (data) =>
        data.AssignmentID === selectedProduct.AssignmentID &&
        data.ModuleID === level.ModuleID
    ).forEach((student) => {
      const { CohortID } = StudentSummaries.find(
        (obj) => obj.StudentID === student.StudentID
      );
      if (selectedCourse.includes(CohortID)) {
        level.students.push(student);
      }
    });
  });

  return { levels };
}

export function computeAverageCompletion() {}
