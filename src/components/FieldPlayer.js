import React from "react";

const FieldPlayer = ({ playerStats }) => {
  return (
    <>
      <p>Season stats</p>
      <table>
        <tbody>
          <tr>
            <th>GP</th>
            <th>Points</th>
            <th>Assists</th>
            <th>Goals</th>
            <th>+/-</th>
          </tr>
          <tr>
            <td>{playerStats.stat.games}</td>
            <td>{playerStats.stat.points}</td>
            <td>{playerStats.stat.assists}</td>
            <td>{playerStats.stat.goals}</td>
            <td>{playerStats.stat.plusMinus}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default FieldPlayer;
