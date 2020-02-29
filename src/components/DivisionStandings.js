import React from "react";
import uuid from "uuid";

const DivisionStandings = ({ standings }) => {
  return standings.map(team => {
    return (
      <div key={uuid.v4()} className="contentChildren">
        {standings.length === 4 && <h3> {team.division.name}</h3>}
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
            {team.teamRecords.map(teamRecords => (
              <tr key={teamRecords.team.id}>
                <td>{teamRecords.divisionRank}</td>
                <td>{teamRecords.team.name}</td>
                <td>{teamRecords.points}</td>
                <td>{teamRecords.gamesPlayed}</td>
                <td>{teamRecords.leagueRecord.wins}</td>
                <td>{teamRecords.leagueRecord.losses}</td>
                <td>{teamRecords.leagueRecord.ot}</td>
                <td>{teamRecords.goalsScored}</td>
                <td>{teamRecords.goalsAgainst}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  });
};

export default DivisionStandings;
