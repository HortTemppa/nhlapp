import React from "react";

const Upcoming = ({ schedule }) => {
  return (
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
              <tr>
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
