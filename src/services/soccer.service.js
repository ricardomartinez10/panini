import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, setval, onValue, limitToFirst, update } from 'firebase/database';
const firebaseConfig = {
    databaseURL: 'https://mundial-ce95c-default-rtdb.firebaseio.com'
}

const codes = "QTA,WAL,ARG,TUN,ECU,SEN,KSA,MEX,CRC,NED,ENG,POL,FRA,GHA,IRN,USA,AUS,DEN,JPN,ESP,CAN,MAR,GER,CRO,BRA,URU,SRB,SUI,BEL,CRM,POR,KOR";
const flagsCodes = 'qa,gb-wls,ar,tn,ec,sn,sa,mx,cr,nl,gb-eng,pl,fr,gn,ir,us,au,dk,jp,es,ca,ma,de,hr,br,uy,rs,ch,be,cm,pt,kr';
const teams = codes.split(',');
const flags = flagsCodes.split(',');
const players = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
const gems = ['00','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26', '27','28','29'];
let database;

class soccerService {
    constructor() {
        const app = initializeApp(firebaseConfig);
        database = getDatabase(app);

        if (typeof soccerService.instance === 'object') {
            return soccerService.instance;
        }

        soccerService.instance = this;
        return this;
    }

    addTeams() {
        teams.forEach((team, index) => {
            set(ref(database, 'teams/' + team), {
              name: team,
              flag: flags[index] 
            });
        
            players.forEach((player, index) => {
              set(ref(database, 'teams/' + team + '/' + player), {
                key: index + 1,
                collected: false,
                team
              });
            });
          });
    }

    addGems() {
        set(ref(database, 'teams/FIFA'), {
            name: 'FIFA',
            flag: 'co'
        })
        gems.forEach((gem) => {
            set(ref(database, 'teams/FIFA/'+ gem), {
                key: gem,
                collected: false
            });
        });
    }

    getQuery () {
        return ref(database, 'teams/');
    }

    updatePlayer(team, player, collected){
    const updates = {};
    updates['/teams/'+team+'/'+player+'/collected'] = collected;

    return update(ref(database), updates);
    }

    repeatedPlayer(team, player, repeated){
        const updates = {};
        updates['/teams/'+team+'/'+player+'/repeated'] = repeated;
    
        return update(ref(database), updates);
    }
};

export default soccerService;