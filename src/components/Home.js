import React, { useEffect, useState } from "react";
import { useNHLService } from "./NHLContext";
import { Link, useHistory } from "react-router-dom";

import Loading from "./Loading";

const Home = () => {
  const NHLService = useNHLService();
  const history = useHistory();

  const [teams, setTeams] = useState(null);
  const [standings, setStandings] = useState(null);

  useEffect(() => {
    NHLService.getTeams()
      .then(data => {
        setTeams(data.data.teams);
        console.log(data);
      })
      .then(() => {
        NHLService.getStandings().then(data => {
          setStandings(data.data.records);
        });
      });
  }, [NHLService]);

  console.log(standings);

  const handleTeamClickFactory = i => () => {
    history.push(`/teams/${teams[i].id}`);
  };

  //<Link key={team.name} to={`/teams/${team.id}`}></Link>
  //</Link>

  return standings === null ? (
    <Loading />
  ) : (
    <div>
      <h1>NHL Stats</h1>
      <select className="dropdown">
        <option>Teams</option>
        {teams.map((team, i) => {
          return (
            <option key={team.name} onClick={handleTeamClickFactory(i)}>
              {team.name}
            </option>
          );
        })}
      </select>
      <div className="content">
        <h3>Metropolitan</h3>
        <h3>Atlantic</h3>
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
            {standings[0].teamRecords.map(team => {
              return (
                <tr>
                  <td>{team.divisionRank}</td>
                  <td>{team.team.name}</td>
                  <td>{team.points}</td>
                  <td>{team.gamesPlayed}</td>
                  <td>{team.leagueRecord.wins}</td>
                  <td>{team.leagueRecord.losses}</td>
                  <td>{team.leagueRecord.ot}</td>
                  <td>{team.goalsScored}</td>
                  <td>{team.goalsAgainst}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>GP</th>
              <th>Points</th>
              <th>W</th>
              <th>L</th>
              <th>OTL</th>
              <th>GF</th>
              <th>GA</th>
            </tr>
            {standings[1].teamRecords.map(team => {
              return (
                <tr>
                  <td>{team.divisionRank}</td>
                  <td>{team.team.name}</td>
                  <td>{team.points}</td>
                  <td>{team.gamesPlayed}</td>
                  <td>{team.leagueRecord.wins}</td>
                  <td>{team.leagueRecord.losses}</td>
                  <td>{team.leagueRecord.ot}</td>
                  <td>{team.goalsScored}</td>
                  <td>{team.goalsAgainst}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h3>Central</h3>
        <h3>Pacific</h3>
        <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>GP</th>
              <th>Points</th>
              <th>W</th>
              <th>L</th>
              <th>OTL</th>
              <th>GF</th>
              <th>GA</th>
            </tr>
            {standings[2].teamRecords.map(team => {
              return (
                <tr>
                  <td>{team.divisionRank}</td>
                  <td>{team.team.name}</td>
                  <td>{team.points}</td>
                  <td>{team.gamesPlayed}</td>
                  <td>{team.leagueRecord.wins}</td>
                  <td>{team.leagueRecord.losses}</td>
                  <td>{team.leagueRecord.ot}</td>
                  <td>{team.goalsScored}</td>
                  <td>{team.goalsAgainst}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>Team</th>
              <th>GP</th>
              <th>Points</th>
              <th>W</th>
              <th>L</th>
              <th>OTL</th>
              <th>GF</th>
              <th>GA</th>
            </tr>
            {standings[3].teamRecords.map(team => {
              return (
                <tr>
                  <td>{team.divisionRank}</td>
                  <td>{team.team.name}</td>
                  <td>{team.points}</td>
                  <td>{team.gamesPlayed}</td>
                  <td>{team.leagueRecord.wins}</td>
                  <td>{team.leagueRecord.losses}</td>
                  <td>{team.leagueRecord.ot}</td>
                  <td>{team.goalsScored}</td>
                  <td>{team.goalsAgainst}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
