import React, { useEffect, useState } from "react";
import { useNHLService } from "./NHLContext";

import Loading from "./Loading";

const PastGames = ({ id }) => {
  const NHLService = useNHLService();

  const [pastGames, setPastGames] = useState(null);

  useEffect(() => {
    NHLService.getPastGames(id).then(response =>
      setPastGames(response.data.dates)
    );
  }, [id, NHLService]);

  return pastGames === null ? (
    <Loading />
  ) : (
    <>
      <h3>Recent Matches</h3>
      <table>
        <tbody>
          <tr>
            <th>Away</th>
            <th>Home</th>
            <th>Score</th>
          </tr>
          {pastGames.map(pastGames => {
            return (
              <tr key={pastGames.games[0].gamePk}>
                <td>{pastGames.games[0].teams.away.team.name}</td>
                <td>{pastGames.games[0].teams.home.team.name}</td>
                <td>
                  {pastGames.games[0].teams.away.score} -
                  {pastGames.games[0].teams.home.score}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default PastGames;
