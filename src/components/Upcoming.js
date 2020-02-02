import React, { useEffect, useState } from "react";
import { useNHLService } from "./NHLContext";
import Loading from "./Loading";

const Upcoming = ({ id }) => {
  const NHLService = useNHLService();

  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    NHLService.getTeamSchedule(id).then(response =>
      setSchedule(response.data.dates)
    );
  }, [id, NHLService]);

  console.log(schedule);

  return schedule === null ? (
    <Loading />
  ) : (
    <>
      <h3>Upcoming matches</h3>
      <table>
        <tbody>
          <tr>
            <th>Away</th>
            <th>Home</th>
            <th>Date</th>
          </tr>
          {schedule.map(schedule => {
            return (
              <tr key={schedule.games[0].gamePk}>
                <td>{schedule.games[0].teams.away.team.name}</td>
                <td>{schedule.games[0].teams.home.team.name}</td>
                <td>{schedule.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Upcoming;
