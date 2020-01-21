import axios from "axios";
import moment from "moment";

class NHLService {
  constructor() {
    this.clearData();
  }

  clearData() {
    this.teams = [];
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

    console.log(`startDate=${startDate}#endDate=${endDate}`);

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
    console.log("playerId axios:", id);
    return axios.get(
      `https://statsapi.web.nhl.com/api/v1/people/${id}/stats?stats=statsSingleSeason&season=20192020`
    );
  }

  getStandings() {
    return axios.get(`https://statsapi.web.nhl.com/api/v1/standings`);
  }
}

export default NHLService;
