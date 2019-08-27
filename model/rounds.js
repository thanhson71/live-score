import {updateMatchList} from "./matches.js";
import { updateRankingTable , sortRankingTable} from "./rankingTable.js";

let listRound = [];
let listClub = [];
db.collection("matches").onSnapshot(function (snapShot) {
    const rounds = snapShot.docChanges();
    for (let i = 0; i < rounds.length; i++) {
        const round = rounds[i].doc.data();
        
        listRound.push(round) ;
    }
    rankingTableRef.onSnapshot(function (snapShot) {
        const tables = snapShot.docChanges();
        for (let i = 0; i < tables.length; i++) {
            const club = tables[i].doc.data();
            if(listClub.length < 20) {
                listClub.push(club)  ;
            }
        }
        updateRankingTable(listClub, listRound);
    });
}); 

let rankingTableRef = db.collection("rankingTable");
let matchesRef = db.collection("matches");



export function addRound(c) {
    db.collection("matches").doc("round_" + c).set({
        matches : []
    });
}


function updateRounds(){
    for(let i = 0; i < listRound.length; i++){
        updateMatchList(listRound[i].matches);
        db.collection("matches").doc(format(i + 1) + "-round_" + i + 1).set({
            matches : listRound[i].matches
        });
    }
    
}


function removeRound(c) {
    db.collection("matches").doc(format(c) + "-round_" + c).delete();
}

export {listRound} ;