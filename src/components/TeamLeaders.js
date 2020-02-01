import React, { useEffect, useState } from "react";

import Loading from "./Loading";

const TeamLeaders = ({ leaderboards, sort }) => {
  return leaderboards.length ? (
    <>
      <h3>Team Leaders</h3>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Points</th>
            <th>Goals</th>
            <th>Assists</th>
          </tr>

          {leaderboards.slice(0, 5).map(player => {
            return (
              <tr>
                <td>{player.name}</td>
                <td>{player.points}</td>
                <td>{player.goals}</td>
                <td>{player.assists}</td>
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
