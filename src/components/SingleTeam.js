import React, { useEffect, useState } from "react";
import { useNHLService } from "../components/NHLContext";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";

const SingleTeam = () => {
  const NHLService = useNHLService();

  const { id } = useParams();
  console.log(id);

  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState(null);
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    NHLService.getSingleTeam(id)
      .then(response => setTeam(response.data.teams[0]))
      .then(() =>
        NHLService.getTeamSchedule(id).then(response =>
          setSchedule(response.data.dates)
        )
      )
      .then(() =>
        NHLService.getTeamPlayers(id).then(response =>
          setPlayers(response.data.roster)
        )
      )
      .catch(error => console.log(error));
  }, [NHLService, id]);

  console.log("players:", players);
  console.log("team:", team);
  console.log(("schedule:", schedule));

  return players === null ? (
    <Loading />
  ) : (
    <div>
      <h1>{team.name}</h1>
      <div className="content">
        <div className="contentChildren">
          <ul>
            <h2>Roster:</h2>
            {players.map(player => {
              return (
                <Link to={`/players/${player.person.id}`}>
                  {" "}
                  <li key={player.person.id}>
                    {player.jerseyNumber} {player.person.fullName},{" "}
                    {player.position.abbreviation}
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="contentChildren">
          <p>Upcoming Matches</p>
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
        </div>
      </div>
    </div>
  );
};

export default SingleTeam;
