import React, { useState, useEffect } from "react";
import { useNHLService } from "./NHLContext";

import Loading from "./Loading";

import { useParams } from "react-router-dom";

const SinglePlayer = () => {
  const NHLService = useNHLService();

  const { id } = useParams();
  console.log("playerID:", id);

  const [player, setPlayer] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);

  useEffect(() => {
    NHLService.getPlayerInfo(id)
      .then(response => setPlayer(response.data.people[0]))
      .then(() =>
        NHLService.getPlayerStats(id)
          .then(response => {
            setPlayerStats(response.data.stats[0].splits[0]);
          })
          .catch(error => console.log(error.message))
      );
  }, [NHLService, id]);

  console.log("playerInfo:", player);
  console.log("playerStats", playerStats);

  return playerStats === null ? (
    <Loading />
  ) : (
    <div className="content">
      <div className="contentChildren">
        <h1>{player.fullName}</h1>
        <h2>#{player.primaryNumber}</h2>
        <h3>{player.currentTeam.name}</h3>
        <h4>{player.primaryPosition.abbreviation}</h4>
      </div>
      <div>
        <table>
          <p>Season stats</p>
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
      </div>
    </div>
  );
};
export default SinglePlayer;
