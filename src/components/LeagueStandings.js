import React from "react";

const LeagueStandings = ({ standings }) => {
  const mergedStandings = [...standings[0].teamRecords]
    .concat(
      ...standings[1].teamRecords,
      ...standings[2].teamRecords,
      standings[3].teamRecords
    )
    .sort((a, b) => b.points - a.points);

  console.log(mergedStandings);

  return (
    <div className="contentChildren">
      <h3>League</h3>
      <table>
        <tbody>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>Points</th>
            <th>GP</th>
            <th>W</th>
            <th>L</th>
            <th>OT</th>
            <th>GF</th>
            <th>GA</th>
          </tr>
          {mergedStandings.map((standings, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{standings.team.name}</td>
              <td>{standings.points}</td>
              <td>{standings.gamesPlayed}</td>
              <td>{standings.leagueRecord.wins}</td>
              <td>{standings.leagueRecord.losses}</td>
              <td>{standings.leagueRecord.ot}</td>
              <td>{standings.goalsScored}</td>
              <td>{standings.goalsAgainst}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeagueStandings;
