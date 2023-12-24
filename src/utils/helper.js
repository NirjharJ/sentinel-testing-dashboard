// import {
//   SimulationCohortSummaries,
//   SimulationModuleInfo,
// } from "../data/globalData";
// import { SimulationModuleActivity, StudentSummaries } from "../data/moduleData";

// export function SimulationCohortSummariesMapper() {
//   return SimulationCohortSummaries.reduce((acc, curr) => {
//     const index = acc.findIndex(
//       (ele) => ele.AssignmentID === curr.AssignmentID
//     );

//     if (index === -1) {
//       acc.push({
//         AssignmentID: curr.AssignmentID,
//         AssignmentName: curr.AssignmentName,
//         Cohort: [
//           {
//             CohortID: curr.CohortID,
//             CohortName: curr.CohortName,
//             StudentCount: curr.StudentCount,
//           },
//         ],
//         Module: SimulationModuleInfoMapper(curr.AssignmentID),
//       });
//     } else {
//       acc.at(index).Cohort.push({
//         CohortID: curr.CohortID,
//         CohortName: curr.CohortName,
//         StudentCount: curr.StudentCount,
//       });
//     }
//     return acc;
//   }, []);
// }

// export function SimulationModuleInfoMapper(AssignmentID) {
//   return SimulationModuleInfo.filter(
//     (obj) => obj.AssignmentID === AssignmentID && obj.MaxScore > 0
//   ).map((obj) => {
//     return {
//       ModuleID: obj.ModuleID,
//       ModuleName: obj.ModuleName,
//       MaxScore: obj.MaxScore,
//       Sequence: obj.Sequence,
//       Students: StudentSummariesAndModuleActivityMapper(
//         AssignmentID,
//         obj.ModuleID,
//         obj.Sequence
//       ),
//     };
//   });
// }

// export function StudentSummariesAndModuleActivityMapper(
//   AssignmentID,
//   ModuleID,
//   Sequence
// ) {
//   return SimulationModuleActivity.filter(
//     (obj) =>
//       obj.AssignmentID === AssignmentID &&
//       obj.ModuleID === ModuleID &&
//       obj.Sequence === Sequence
//   ).map((obj) => {
//     const student = StudentSummaries.find(
//       (student) => student.StudentID === obj.StudentID
//     );

//     obj.FirstName = student.FirstName;
//     obj.LastName = student.LastName;
//     obj.CohortID = student.CohortID;
//     return obj;
//   });
// }
