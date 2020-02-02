import React from "react";

const Goalie = ({ playerStats }) => {
  return (
    <>
      <h3>Season stats</h3>
      <table>
        <tbody>
          <tr>
            <th>GP</th>
            <th>GS</th>
            <th>W</th>
            <th>L</th>
            <th>OT</th>
            <th>GAA</th>
            <th>Sv%</th>
          </tr>
          <tr>
            <td>{playerStats.stat.games}</td>
            <td>{playerStats.stat.gamesStarted}</td>
            <td>{playerStats.stat.wins}</td>
            <td>{playerStats.stat.losses}</td>
            <td>{playerStats.stat.ot}</td>
            <td>{playerStats.stat.goalAgainstAverage}</td>
            <td>{playerStats.stat.savePercentage}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Goalie;
