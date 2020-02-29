import React, { useEffect, useState } from "react";
import { useNHLService } from "./NHLContext";

import Loading from "./Loading";

const TeamLeaders = ({ players }) => {
  const NHLService = useNHLService();

  const [leaderboards, setLeaderboards] = useState([]);

  useEffect(() => {
    if (players) {
      const requests = players.map(player =>
        NHLService.getPlayerStats(player.person.id)
      );

      Promise.all(requests)
        .then(responses => {
          let lboards = [];
          responses.forEach((response, i) => {
            if (response.data.stats[0].splits[0]) {
              lboards = lboards.concat([
                {
                  name: players[i].person.fullName,
                  gamesPlayed: response.data.stats[0].splits[0].stat.games,
                  points: response.data.stats[0].splits[0].stat.points,
                  goals: response.data.stats[0].splits[0].stat.goals,
                  assists: response.data.stats[0].splits[0].stat.assists,
                  plusMinus: response.data.stats[0].splits[0].stat.plusMinus
                }
              ]);
              if (i + 1 === players.length) {
                lboards = lboards.filter(player => player.points !== undefined);
                lboards.sort((a, b) => parseInt(b.points) - parseInt(a.points));
                setLeaderboards(lboards);
              }
            }
          });
        })
        .catch(error => console.log(error.message));
    } else return;
  }, [players, NHLService]);

  const handleSortClickFactory = sortBy => () => {
    const lboards = [...leaderboards];

    console.log(sortBy);

    lboards.sort((a, b) => b[sortBy] - a[sortBy]);

    setLeaderboards(lboards);
  };

  return leaderboards.length ? (
    <>
      <h3>Team Leaders</h3>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>GP</th>
            <th onClick={handleSortClickFactory("points")}>Points</th>
            <th onClick={handleSortClickFactory("goals")}>Goals</th>
            <th onClick={handleSortClickFactory("assists")}>Assists</th>
            <th onClick={handleSortClickFactory("plusMinus")}>+/-</th>
          </tr>

          {leaderboards.slice(0, 5).map(player => {
            return (
              <tr key={player.name}>
                <td>{player.name}</td>
                <td>{player.gamesPlayed}</td>
                <td>{player.points}</td>
                <td>{player.goals}</td>
                <td>{player.assists}</td>
                <td>{player.plusMinus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  ) : (
    <Loading />
  );
};

export default TeamLeaders;
