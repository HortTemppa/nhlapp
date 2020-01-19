import React, { useEffect, useState } from "react";
import { useNHLService } from "./NHLContext";
import { Link } from "react-router-dom";

import Loading from "./Loading";

const Home = () => {
  const NHLService = useNHLService();

  const [teams, setTeams] = useState(null);

  useEffect(() => {
    NHLService.getTeams().then(data => {
      setTeams(data.data);
      console.log(data);
    });
  }, [NHLService]);

  return teams === null ? (
    <Loading />
  ) : (
    <ul>
      {teams.teams.map(team => {
        return (
          <Link key={team.name} to={`/teams/${team.id}`}>
            <li>{team.name}</li>
          </Link>
        );
      })}
    </ul>
  );
};

export default Home;
