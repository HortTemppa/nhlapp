import React, { useState, useEffect } from "react";
import { useNHLService } from "./NHLContext";

import Loading from "./Loading";
import FieldPlayer from "./FieldPlayer";
import Goalie from "./Goalie";

import { useParams } from "react-router-dom";

const SinglePlayer = ({ id }) => {
  const NHLService = useNHLService();

  // const { id } = useParams();

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

  console.log("playerID:", playerStats);

  return playerStats === null ? (
    <Loading />
  ) : (
    <div className="player">
      <div className="contentChildren">
        <h1>{player.fullName}</h1>
        <h2>#{player.primaryNumber}</h2>
        <h3>{player.currentTeam.name}</h3>
        <h4>{player.primaryPosition.abbreviation}</h4>
      </div>
      <div className="contentChidlren">
        {player.primaryPosition.abbreviation === "G" ? (
          <Goalie playerStats={playerStats} />
        ) : (
          <FieldPlayer playerStats={playerStats} />
        )}
      </div>
    </div>
  );
};
export default SinglePlayer;
