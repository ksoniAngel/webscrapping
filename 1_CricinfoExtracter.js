//extract information of worldcup 2019 from cricinfo 
//and present that in the form of excel and pdf scorecard
//get experience with javaScript

//npm init -y
//npm install minimist
//npm install axios
//npm install jsdom
//npm install excel4node
//npm install pdf-lib

//node 1_CricinfoExtracter.js --source=https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-schedule-fixtures-and-results --excel=Worldcup.csv --dataFolder=data

//team1, team2, result, team1score, team2Score

let minimist = require("minimist");
let axios = require("axios");
let jsdom = require("jsdom");
let excel4node = require("excel4node");
let pdf = require("pdf-lib");

let args=minimist(process.argv);
console.log(args.source);
console.log(args.excel);
console.log(args.dataFolder);

//download using axios
//read using jsdom
//make excel using excel4node
//make folder and files make pdf using pdf-lib

let reponseKaPromise = axios.get(args.source);
reponseKaPromise.then(function(response){
    // console.log(response);
    let html = response.data;
    // console.log(html);
    let dom = new jsdom.JSDOM(html);
    let document = dom.window.document;  //ab kuch bhi nikal skte h --document is tree like structure of html
    let title = document.title;    
    console.log(title);


    let matches = [];
    let matchInfoDivs = document.querySelectorAll("div.ds-p-4");
    // let matchInfoDivs = document.querySelectorAll("div.ds-bg-fill-content-prime");

    for(let i=0;i<48;i++)
    {
        let match = {

        };
        

        let namePs =  matchInfoDivs[i].querySelectorAll("p.ds-text-tight-m");
        let scoreStrong = matchInfoDivs[i].querySelectorAll("strong");
        let spanResult = matchInfoDivs[i].querySelectorAll("p.ds-text-tight-s.ds-font-regular.ds-line-clamp-2.ds-text-typo > span")
       
        if(namePs.length>0){
        console.log(namePs[0].textContent);
        console.log(namePs[1].textContent);

        match.t1 = namePs[0].textContent;
        match.t2 = namePs[1].textContent;

        match.t1s = "";
        match.t2s = "";

        if(scoreStrong.length==2){
        console.log(scoreStrong[0].textContent);
        match.t1s = scoreStrong[0].textContent;
        console.log(scoreStrong[1].textContent);
        match.t2s = scoreStrong[1].textContent;
        } else if(scoreStrong.length==1)
        {
           console.log(scoreStrong[0].textContent);
           match.t1s = scoreStrong[0].textContent;
        }
        

        console.log(spanResult[0].textContent);
        match.result = spanResult[0].textContent;
        matches.push(match);
        }

        //match.t1 = "";
        //match.t2 = "";
        //match.t1s = "";
        //match.t2s = "";
        //match.result = "";
        //match.push(match);


    }

    console.log(matches);
    console.log(matchInfoDivs.length);
    
}).catch(function(err){
    console.log(err);
})






