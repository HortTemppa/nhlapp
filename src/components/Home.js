import React, { useEffect, useState } from "react";
import { useNHLService } from "./NHLContext";
import { useHistory } from "react-router-dom";

import Loading from "./Loading";
import LeagueStandings from "./LeagueStandings";
import DivisionStandings from "./DivisionStandings";
import ConferenceStandings from "./ConferenceStandings";

const Home = () => {
  const NHLService = useNHLService();
  const history = useHistory();

  const [teams, setTeams] = useState(null);
  const [standings, setStandings] = useState(null);
  const [standingsState, setStandingsState] = useState("Division");

  useEffect(() => {
    NHLService.getTeams()
      .then(data => {
        setTeams(data.data.teams);
        console.log(data);
      })
      .then(() => {
        NHLService.getStandings().then(data => {
          setStandings(data.data.records);
        });
      });
  }, [NHLService]);

  console.log(standings);

  const handleTeamClickFactory = i => () => {
    history.push(`/teams/${teams[i].id}`);
  };

  const handleLeagueClick = () => {
    setStandingsState("League");
  };

  const handleDivisionClick = () => {
    setStandingsState("Division");
  };

  const handleConferenceClick = () => {
    setStandingsState("Conference");
  };

  return standings === null ? (
    <Loading />
  ) : (
    <div>
      <div>
        <select>
          <option>Teams</option>
          {teams.map((team, i) => {
            return (
              <option key={team.name} onClick={handleTeamClickFactory(i)}>
                {team.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="headerContent">
        <img className="header" alt="puck" src="./puck.png" width="10%"></img>
        <h1 className="header">NHL Stats</h1>
      </div>
      <div className="sortButtons">
        <button type="button" onClick={handleLeagueClick}>
          League
        </button>
        <button type="button" onClick={handleDivisionClick}>
          Division
        </button>
        <button type="button" onClick={handleConferenceClick}>
          Conference
        </button>
      </div>
      <div className="content">
        {standingsState === "Division" && (
          <DivisionStandings standings={standings} />
        )}
        {standingsState === "League" && (
          <LeagueStandings standings={standings} />
        )}
        {standingsState === "Conference" && (
          <ConferenceStandings standings={standings} />
        )}
      </div>
    </div>
  );
};

export default Home;
