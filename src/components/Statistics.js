import { useQuery } from "../context/QueryContext";
import CardBodyWrapper from "./CardBodyWrapper";

export default function Statistics() {
  const {
    allCourseInProduct,
    selectedCourse,
    selectedProduct,
    stats,
    studentSummaries,
    simulationCohortSummaries,
  } = useQuery();
  let activeLearnersCount = 0;
  let learnersCompleted = 0;
  let learnersEnrolledInMultipleCohort = [];
  function getAverageCompletion(students) {
    if (allCourseInProduct.length === 0) return;
    activeLearnersCount = 0;
    if (selectedCourse.length === 0) {
      activeLearnersCount = allCourseInProduct.reduce(
        (acc, curr) => acc + curr.StudentCount,
        0
      );
    } else {
      selectedCourse.forEach((CohortID) => {
        activeLearnersCount += allCourseInProduct.find(
          (cohort) => cohort.CohortID === CohortID
        ).StudentCount;
      });
    }

    return Math.round(
      students.reduce((acc, curr) => (acc += curr.Progress), 0) /
        activeLearnersCount
    );
  }

  function getAverageScore(students, maxScore) {
    learnersCompleted = students.filter((student) => student.Progress === 100);

    return Math.round(
      (learnersCompleted.reduce((acc, curr) => (acc += curr.Score), 0) /
        (learnersCompleted.length * maxScore)) *
        100
    );
  }

  function getAverageTime() {
    const totalMinutes = Math.round(
      learnersCompleted.reduce((acc, curr) => (acc += curr.MinutesSpent), 0) /
        learnersCompleted.length
    );
    return totalMinutes + " minutes";
  }

  function getPercentileCount(breakpoint) {
    switch (breakpoint) {
      case "UPPER":
        return learnersCompleted.filter(
          (obj) => obj.Percentage >= selectedProduct?.Upper
        ).length;
      case "MIDDLE":
        return learnersCompleted.filter(
          (obj) =>
            obj.Percentage >= selectedProduct?.Middle &&
            obj.Percentage < selectedProduct?.Upper
        ).length;
      case "LOWER":
        return learnersCompleted.filter(
          (obj) => obj.Percentage < selectedProduct?.Middle
        ).length;
      default:
        throw new Error("Unknown Breakpoint");
    }
  }

  function getPercentile(breakpoint) {
    const count = getPercentileCount(breakpoint);
    return Math.round((count / learnersCompleted.length) * 100);
  }

  function getLearnersEnrolledInMultipleCohort() {
    const studentData = studentSummaries.reduce((acc, curr) => {
      if (acc[curr.StudentID.toString()] === undefined) {
        acc[curr.StudentID.toString()] = new Array(curr);
      } else {
        acc[curr.StudentID.toString()].push(curr);
      }
      return acc;
    }, {});

    const filteredData = [];
    for (const [key, value] of Object.entries(studentData)) {
      if (value.length > 1) {
        filteredData.push(value);
      }
    }

    for (let i = 0; i < filteredData.length; ++i) {
      const studentData = filteredData.at(i);
      learnersEnrolledInMultipleCohort.push({
        FirstName: studentData[0].FirstName,
        LastName: studentData[0].LastName,
        Cohorts: [],
      });
      for (let j = 0; j < studentData.length; ++j) {
        const objCohort = studentData.at(j);
        learnersEnrolledInMultipleCohort[i].Cohorts.push(
          simulationCohortSummaries.find(
            (obj) => obj.CohortID === objCohort.CohortID
          ).CohortName
        );
      }
    }
    console.log("Learners enrolled in multiple cohort");
    console.log(learnersEnrolledInMultipleCohort);
    return learnersEnrolledInMultipleCohort;
  }

  function copyDetails() {
    const htmlText = [...document.getElementsByClassName("copy-data")].map(
      (obj) => obj.innerText
    );
    navigator.clipboard.writeText(htmlText);
    // console.log(htmlText);
  }

  console.log(stats);
  return (
    <div>
      {stats?.levels?.map((level) => (
        <div className="card bg-secondary mb-3" key={level.ModuleID}>
          <div className="card-header fs-4">{level.ModuleName}</div>
          <div className="d-flex gap-2">
            <CardBodyWrapper title="Score, Time & Completion">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Average Completion
                  <span className="badge bg-primary rounded-pill">
                    {getAverageCompletion(level.students)}%
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Active Learners
                  <span className="badge bg-primary rounded-pill">
                    {activeLearnersCount}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Table Data
                  <span className="badge bg-primary rounded-pill">
                    {level.students.length}
                  </span>
                </li>
              </ul>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Average Score
                  <span className="badge bg-primary rounded-pill">
                    {getAverageScore(level.students, level.MaxScore)}%
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Learners Completed
                  <span className="badge bg-primary rounded-pill">
                    {learnersCompleted.length}
                  </span>
                </li>
              </ul>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Average Time
                  <span className="badge bg-primary rounded-pill">
                    {getAverageTime()}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Learners Completed
                  <span className="badge bg-primary rounded-pill">
                    {learnersCompleted.length}
                  </span>
                </li>
              </ul>
            </CardBodyWrapper>
            <CardBodyWrapper title="Tertile View">
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Upper Percentile
                  <span className="badge bg-primary rounded-pill">
                    {getPercentile("UPPER")} %
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Upper Percentile Learners
                  <span className="badge bg-primary rounded-pill mx-2">
                    {getPercentileCount("UPPER")}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Middle Percentile
                  <span className="badge bg-primary rounded-pill">
                    {getPercentile("MIDDLE")} %
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Middle Percentile Learners
                  <span className="badge bg-primary rounded-pill">
                    {getPercentileCount("MIDDLE")}
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Lower Percentile
                  <span className="badge bg-primary rounded-pill">
                    {getPercentile("LOWER")} %
                  </span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Lower Percentile Learners
                  <span className="badge bg-primary rounded-pill">
                    {getPercentileCount("LOWER")}
                  </span>
                </li>
              </ul>
            </CardBodyWrapper>
          </div>
          <div className="alert alert-dismissible alert-danger mx-4">
            <div className="d-flex justify-content-between align-self-center">
              <h5>Learners Enrolled In Multiple Cohort</h5>
              <button className="btn btn-success" onClick={copyDetails}>
                Copy Details
              </button>
            </div>
            <ul className="alert alert-dismissible alert-danger copy-data">
              {getLearnersEnrolledInMultipleCohort().map((obj, i) => (
                <p>
                  <span className="fw-bold">{i + 1}. </span>
                  {obj.FirstName} {obj.LastName} enrolled in{" "}
                  {obj.Cohorts.length} cohort :{" "}
                  {obj.Cohorts.map((c, j, arr) => (
                    <span key={j}>
                      {c}
                      {j + 1 === arr.length ? "." : ", "}
                    </span>
                  ))}
                </p>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
