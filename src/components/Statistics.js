import { useQuery } from "../context/QueryContext";
import CardBodyWrapper from "./CardBodyWrapper";

export default function Statistics() {
  const { stats } = useQuery();
  let learnersCompleted;
  function getAverageCompletion(students) {
    return Math.round(
      students.reduce((acc, curr) => (acc += curr.Progress), 0) /
        students.length
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

    const hour = Math.floor(totalMinutes / 60) + " hour ";
    const minutes = (totalMinutes % 60) + " minutes";

    const value =
      Math.floor(totalMinutes / 60) === 0 ? minutes : hour + minutes;

    // return value;
    return totalMinutes + " minutes";
  }

  function getPercentileCount(breakpoint) {
    switch (breakpoint) {
      case "UPPER":
        return learnersCompleted.filter((obj) => obj.Percentage > 82).length;
      case "MIDDLE":
        return learnersCompleted.filter(
          (obj) => obj.Percentage <= 82 && obj.Percentage > 70
        ).length;
      case "LOWER":
        return learnersCompleted.filter((obj) => obj.Percentage <= 70).length;
      default:
        throw new Error("Unknown Breakpoint");
    }
  }

  function getPercentile(breakpoint) {
    const count = getPercentileCount(breakpoint);
    return Math.round((count / learnersCompleted.length) * 100);
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
        </div>
      ))}
    </div>
  );
}
