import React, { useEffect, useState } from "react";
import { useNHLService } from "../components/NHLContext";
import { useParams } from "react-router-dom";

import Loading from "./Loading";
import SinglePlayer from "./SinglePlayer";
import TeamLeaders from "./TeamLeaders";
import Upcoming from "./Upcoming";
import PastGames from "./PastGames";

const SingleTeam = () => {
  const NHLService = useNHLService();

  const { id } = useParams();

  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState(null);
  const [playerId, setPlayerId] = useState(null);

  useEffect(() => {
    NHLService.getSingleTeam(id)
      .then(response => setTeam(response.data.teams[0]))
      .then(() =>
        NHLService.getTeamPlayers(id).then(response => {
          setPlayers(response.data.roster);
          setPlayerId(response.data.roster[0].person.id);
        })
      )
      .catch(error => console.log(error));
  }, [NHLService, id]);

  const handlePlayerClick = player => () => {
    setPlayerId(player);
  };

  return playerId === null ? (
    <Loading />
  ) : (
    <div>
      <h1>{team.name}</h1>
      <div className="content">
        <div className="contentChildren">
          <TeamLeaders players={players} />
        </div>
        <div className="contentChildren">
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
        <div className="contentChildren">
          <Upcoming id={id} />
        </div>
        <div className="contentChildren">
          <PastGames id={id} />
        </div>
      </div>
    </div>
  );
};

export default SingleTeam;
