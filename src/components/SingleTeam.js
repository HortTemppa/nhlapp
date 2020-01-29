import React, { useEffect, useState } from "react";
import { useNHLService } from "../components/NHLContext";
import { useParams, Link } from "react-router-dom";

import Loading from "./Loading";
import SinglePlayer from "./SinglePlayer";

const SingleTeam = () => {
  const NHLService = useNHLService();

  const { id } = useParams();
  console.log(id);

  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [leaderboards, setLeaderboards] = useState([]);

  useEffect(() => {
    NHLService.getSingleTeam(id)
      .then(response => setTeam(response.data.teams[0]))
      .then(() =>
        NHLService.getTeamSchedule(id).then(response =>
          setSchedule(response.data.dates)
        )
      )
      .then(() =>
        NHLService.getTeamPlayers(id).then(response => {
          setPlayers(response.data.roster);
          setPlayerId(response.data.roster[0].person.id);
        })
      )
      .catch(error => console.log(error));
  }, [NHLService, id]);

  useEffect(() => {
    if (players) {
      const requests = players.map(player =>
        NHLService.getPlayerStats(player.person.id)
      );

      Promise.all(requests).then(responses =>
        responses.forEach((response, i) => {
          setLeaderboards(leaderboards => [
            ...leaderboards,
            {
              name: players[i].person.fullName,
              points: response.data.stats[0].splits[0].stat.points,
              goals: response.data.stats[0].splits[0].stat.goals,
              assists: response.data.stats[0].splits[0].stat.assists
            }
          ]);
        })
      );
    } else return;
  }, [players]);

  console.log(("leaderboards:", leaderboards));
  console.log("playerId:", playerId);
  console.log("players:", players);
  console.log("team:", team);
  console.log(("schedule:", schedule));

  const handlePlayerClick = player => () => {
    setPlayerId(player);
  };

  return playerId === null ? (
    <Loading />
  ) : (
    <div>
      <h1>{team.name}</h1>
      <div className="content">
        <div>
          <select className="dropdown">
            <option>Players</option>
            {players.map(player => {
              return (
                <option
                  key={player.person.id}
                  onClick={handlePlayerClick(player.person.id)}
                >
                  #{player.jerseyNumber} {player.person.fullName}
                </option>
              );
            })}
          </select>
          <SinglePlayer id={playerId} />
        </div>
        <div>
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
