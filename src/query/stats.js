export function generateStats(
  simulationCohortSummaries,
  simulationModuleInfo,
  selectedProduct,
  selectedCourse,
  simulationModuleActivity,
  studentSummaries
) {
  if (selectedCourse.length === 0) {
    selectedCourse = simulationCohortSummaries
      .filter((obj) => obj.AssignmentID === selectedProduct.AssignmentID)
      .map((obj) => obj.CohortID);
  }

  const levels = simulationModuleInfo.filter(
    (obj) =>
      obj.AssignmentID === selectedProduct.AssignmentID && obj.MaxScore > 0
  );

  levels.forEach((level) => {
    level.students = [];
    const totalScore = level.MaxScore;

    simulationModuleActivity
      .filter(
        (data) =>
          data.AssignmentID === selectedProduct.AssignmentID &&
          data.ModuleID === level.ModuleID
      )
      .forEach((student) => {
        // for (let i = 0; i < studentSummaries.length; i++) {
        //   const obj = studentSummaries.at(i);
        //   if (
        //     obj.StudentID === student.StudentID &&
        //     selectedCourse.includes(obj.CohortID)
        //   )
        //     level.students.push(student);
        // }
        const { CohortID } = studentSummaries.find(
          (obj) => obj.StudentID === student.StudentID
        );
        if (selectedCourse.includes(CohortID)) {
          student.Percentage = Math.round((student.Score / totalScore) * 100);
          // console.log(level, student);
          level.students.push(student);
        }
      });
  });

  return { levels };
}
