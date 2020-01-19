import React, { useState, useEffect } from "react";
import { useNHLService } from "./NHLContext";

import Loading from "./Loading";

import { useParams } from "react-router-dom";

const Players = () => {
  const NHLService = useNHLService();

  const { id } = useParams();

  const [player, setPlayer] = useState(null);

  useEffect(() => {
    NHLService.getPlayerStats(id).then(response => setPlayer(response.data));
  }, [NHLService, id]);

  return player === null ? <Loading /> : <p>Players</p>;
};

export default Players;
