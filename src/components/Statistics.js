import { useQuery } from "../context/QueryContext";

export default function Statistics() {
  const { stats } = useQuery();
  let learnersCompleted;
  function getAverageCompletion(students) {
    return Math.round(
      (students.filter((obj) => obj.Progress === 100).length /
        students.length) *
        100
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
        <div key={level.ModuleID}>
          <h2>{level.ModuleName}</h2>
          <div style={{ display: "flex", gap: "2rem" }}>
            <div>
              <h4>Score, Time, Completion</h4>
              <div
                style={{
                  border: "2px solid black",
                  paddingLeft: "5px",
                  margin: "1px",
                }}
              >
                <p>
                  <span>Average Completion</span>{" "}
                  <span>{getAverageCompletion(level.students)}%</span>
                </p>
                <p>
                  <span>Active Learners</span>{" "}
                  <span>{level.students.length}</span>
                </p>
              </div>
              <div
                style={{
                  border: "2px solid black",
                  paddingLeft: "5px",
                  margin: "1px",
                }}
              >
                <p>
                  <span>Average Score</span>{" "}
                  <span>
                    {getAverageScore(level.students, level.MaxScore)}%
                  </span>
                </p>
                <p>
                  <span>Learners Completed</span>{" "}
                  <span>{learnersCompleted.length}</span>
                </p>
              </div>
              <div
                style={{
                  border: "2px solid black",
                  paddingLeft: "5px",
                  margin: "1px",
                }}
              >
                <p>
                  <span>Average Time</span>{" "}
                  {/* <span>{getAverageTime(level.students)}</span> */}
                  <span>{getAverageTime()}</span>
                </p>
                <p>
                  <span>Learners Completed</span>{" "}
                  <span>{learnersCompleted.length}</span>
                </p>
              </div>
            </div>
            <div>
              <h4>Tertile View</h4>
              <div
                style={{
                  border: "2px solid black",
                  paddingLeft: "5px",
                  margin: "1px",
                }}
              >
                <div>
                  <span>Learners Completed</span>{" "}
                  <span>{learnersCompleted.length}</span>
                </div>
                <div>
                  <span>Upper Percentile</span>{" "}
                  <span>{getPercentile("UPPER")} %</span>
                </div>
                <div>
                  <span>Upper Percentile Learners</span>{" "}
                  <span>{getPercentileCount("UPPER")}</span>
                </div>
                <div>
                  <span>Middle Percentile</span>{" "}
                  <span>{getPercentile("MIDDLE")} %</span>
                </div>
                <div>
                  <span>Middle Percentile Learners</span>{" "}
                  <span>{getPercentileCount("MIDDLE")}</span>
                </div>
                <div>
                  <span>Lower Percentile</span>{" "}
                  <span>{getPercentile("LOWER")} %</span>
                </div>
                <div>
                  <span>Lower Percentile Learners</span>{" "}
                  <span>{getPercentileCount("LOWER")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
