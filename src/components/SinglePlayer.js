import React, { useState, useEffect } from "react";
import { useNHLService } from "./NHLContext";

import Loading from "./Loading";
import FieldPlayer from "./FieldPlayer";
import Goalie from "./Goalie";

const SinglePlayer = ({ id }) => {
  const NHLService = useNHLService();

  const [player, setPlayer] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);

  useEffect(() => {
    NHLService.getPlayerInfo(id)
      .then(response => setPlayer(response.data.people[0]))
      .then(() =>
        NHLService.getPlayerStats(id)
          .then(response => {
            if (response.data.stats[0].splits[0]) {
              setPlayerStats(response.data.stats[0].splits[0]);
            }
          })
          .catch(error => console.log(error.message))
      );
  }, [NHLService, id]);

  console.log("playerID:", id);

  return playerStats === null ? (
    <Loading />
  ) : (
    <>
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
    </>
  );
};
export default SinglePlayer;
