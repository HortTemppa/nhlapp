import axios from "axios";
import moment from "moment";
import { useLocation } from "react-router-dom";

class NHLService {
  constructor() {
    this.clearData();
  }

  clearData() {
    this.teams = [];
  }

  location(){
    return useLocation();
  }

  getTeams() {
    return axios.get("https://statsapi.web.nhl.com/api/v1/teams");
  }

  getSingleTeam(id) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}`);
  }

  getTeamSchedule(id) {
    let startDate = moment().format("MM/DD/YYYY");

    let endDate = moment()
      .add(10, "days")
      .format("MM/DD/YYYY");

    return axios.get(
      `https://statsapi.web.nhl.com/api/v1/schedule?teamId=${id}&startDate=${startDate}&endDate=${endDate}`
    );
  }

  getPastGames(id) {
    let startDate = moment()
      .subtract(10, "days")
      .format("MM/DD/YYYY");

    let endDate = moment()
      .subtract(1, "days")
      .format("MM/DD/YYYY");

    return axios.get(
      `https://statsapi.web.nhl.com/api/v1/schedule?teamId=${id}&startDate=${startDate}&endDate=${endDate}`
    );
  }

  getTeamPlayers(id) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${id}/roster`);
  }

  getPlayerInfo(id) {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/people/${id}`);
  }

  getPlayerStats(id) {
    return axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${id}/stats?stats=statsSingleSeason&season=20192020`
    );
  }

  getStandings() {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/standings`);
  }
}

export default NHLService;
