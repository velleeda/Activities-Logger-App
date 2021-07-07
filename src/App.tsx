import "./styles/app.scss";

import { Activity } from "./components/ActivitiesList/ActivitiesList";
import { useCRUD } from "./contexts/CRUD";
import { useState } from "react";
import { api } from "./services/api";

function App() {
  const [storeTime, setStoreTime] = useState("");
  const [storeType, setStoreType] = useState("");
  const [storeDate, setStoreDate] = useState("");
  const { totalTime, getActivity, activity, setTotalTime } = useCRUD();

  const noActivity = !activity || (activity && activity.length === 0);

  const newActivity = async (event: any) => {
    event.preventDefault();
    if (storeTime !== "" && storeType !== "" && storeDate !== "") {
      await api
        .post("activities", {
          time: storeTime,
          type: storeType,
          date: storeDate,
        })
        .catch((err) => console.log("Error:", err));

      getActivity();
    }
  };



  return (
    <div className="container">
      <h1>Workout Log</h1>

      <div className="insert-item">
        <fieldset>
          <legend>Insert an item</legend>

          <form onSubmit={newActivity}>
            <div>
              <input
                type="time"
                defaultValue="00:00"
                onChange={(event) => setStoreTime(event.target.value)}
                required
              />

              <input
                list="activity"
                placeholder="Activity done"
                onChange={(event) => setStoreType(event.target.value)}
                required
              />

              <datalist id="activity">
                <option value="Run" />
                <option value="Swim" />
                <option value="Bike" />
                <option value="Walk" />
              </datalist>

              <input
                type="date"
                onChange={(event) => setStoreDate(event.target.value)}
                required
              />

              <button>Add</button>
            </div>
          </form>
        </fieldset>
      </div>

      <div className="separator" />

      <div className="show-item">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {!noActivity &&
              activity.map((activity, i) => <Activity key={i} {...activity} />)}
          </tbody>
        </table>
      </div>

      <div className="amount-time">
        <h2>{totalTime} hours of exercises</h2>
      </div>
    </div>
  );
}

export default App;
