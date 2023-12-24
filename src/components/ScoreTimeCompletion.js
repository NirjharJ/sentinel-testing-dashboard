import { useQuery } from "../context/QueryContext";

export default function ScoreTimeCompletion() {
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

  function getAverageTime(students) {
    const totalMinutes = Math.round(
      learnersCompleted.reduce((acc, curr) => (acc += curr.MinutesSpent), 0) /
        learnersCompleted.length
    );

    const hour = Math.floor(totalMinutes / 60) + " hour ";
    const minutes = (totalMinutes % 60) + " minutes";

    const value =
      Math.floor(totalMinutes / 60) === 0 ? minutes : hour + minutes;

    return value;
  }

  console.log(stats);
  return (
    <div>
      {stats?.levels?.map((level) => (
        <div key={level.ModuleID}>
          <h4>{level.ModuleName}</h4>
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
              <span>Active Learners</span> <span>{level.students.length}</span>
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
              <span>Benchmark Score</span> <span>?</span>
            </p>
            <p>
              <span>Average Score</span>{" "}
              <span>{getAverageScore(level.students, level.MaxScore)}%</span>
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
              <span>Benchmark Time</span> <span>?</span>
            </p>
            <p>
              <span>Average Time</span>{" "}
              <span>{getAverageTime(level.students)}</span>
            </p>
            <p>
              <span>Learners Completed</span>{" "}
              <span>{learnersCompleted.length}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
