var hexToBinary = require('hex-to-binary');

var admin = require('./firebasInit')

// fonction qui analyse et la trame GPS et l'enregistre dans la base de données
let analyseTrame = function (deviceId,dataArray,){

const db = admin.firestore();

let data={};

//on recupére la date dans la trame
let dateArray = dataArray[1].split('/');
  
for(let i=0;i<dateArray.length;i++){
    dateArray[i]=Number(dateArray[i])
}

dateArray[2] = 2000 + dateArray[2];

//on récupère l'heure de la trame
let heureArray = dataArray[2].split(':');
for(let i=0;i<heureArray.length;i++){
    heureArray[i]=Number(heureArray[i])
}

//on crée la date et on la rattache au nouvel enregistrement de la position
data.date = new Date(dateArray[2],dateArray[1]-1,dateArray[0],heureArray[0],heureArray[1],heureArray[2]);


// recupération des coordonnées GPS et on la rattache au nouvel enregistrement de la position

lat = Number(dataArray[3]);
long = Number(dataArray[4]);

data.position = new admin.firestore.GeoPoint(lat,long)


//Recupération de la vitesse et direction et on la rattache au nouvel enregistrement de la position

data.speed = Number(dataArray[5]);

data.dir = orientation(dataArray[6]);

 //récupération de l'altitude et on la rattache au nouvel enregistrement de la position
 data.alt = Number(dataArray[8]);


 //recupère le nombre de satellites disponible et on la rattache au nouvel enregistrement de la position
 data.availableSatellite = Number(dataArray[11]); 

 //recupère le nombre de satellites fixed et on la rattache au nouvel enregistrement de la position
 data.fixedSatellite = Number(dataArray[10]);

 //on envoie vers la base donnée la nouvelle position




//recupération de l'event Code
let evenCode = hexToBinary(dataArray[7]);

let codeArray = evenCode.split("").reverse()

//function qui transforme le 1 binaire en true or false
function extractInfo(nbr){
    if (codeArray[nbr] === '1'){
        return true
    }else{
        return false
    }
}



//Array qui regroupe les alarmes égale à 'true'
var typeAlarme = [];

if (extractInfo(6)===true){
    typeAlarme.push('SOS')
}
if (extractInfo(7)===true){
    typeAlarme.push('overSpeed')
}
if (extractInfo(8)===true){
    typeAlarme.push('fallDown')
}
if (extractInfo(9)===true){
    typeAlarme.push('geoFence1')
}
if (extractInfo(10)===true){
    typeAlarme.push('geoFence2')
}
if (extractInfo(11)===true){
    typeAlarme.push('geoFence3')
}
if (extractInfo(12)===true){
    typeAlarme.push('lowBattery')
}
if (extractInfo(13)===true){
    typeAlarme.push('motion')
}
if (extractInfo(14)===true){
    typeAlarme.push('movement')
}

console.log('alarme :'+typeAlarme)

// d'autres info sont mise jour dans la base de donnée du Device correspondant
    
    data.turnOn = extractInfo(21);
    data.inCharge = extractInfo(22);
    data.GPSChipFailed = extractInfo(2);
    data.levelBattery = Number(dataArray[9]);
    if(codeArray[0] == '0' && codeArray[1] == '0'){
        data.GPSfixed = false;
        data.GSMLocating = false;
    }else if(codeArray[0] == '0' && codeArray[1] == '1'){
       data.GPSfixed = true;
       data.GSMLocating = false; 
    }else if(codeArray[0] == '1' && codeArray[1] == '0'){
       data.GPSfixed = false;
       data.GSMLocating = true;
    }
        data.alarme = typeAlarme;

        console.log(data);
        console.log(deviceId);
   
        db.collection('Devices').doc(deviceId).collection('trame').add(
            data
        ).then(()=>{
            console.log('enregsitrement de la trame réussi')
        }).catch((err)=>{
            console.log('enregistrement echoué : '+err)
        })



 



function orientation(degres){
    if(degres>11 && degres<=34){
        return 'NNE'
    }else if(degres>34 && degres<=56){
        return 'NE'
    }else if(degres>56 && degres<=79){
        return 'ENE'
    }else if(degres>79 && degres<=101){
        return 'E'
    }else if(degres>101 && degres<=124){
        return 'ESE'
    }else if(degres>124 && degres<=146){
        return 'SE'
    }else if(degres>146 && degres<=169){
        return 'SSE'
    }else if(degres>169 && degres<=191){
        return 'S'
    }else if(degres>191 && degres<=214){
        return 'SSO'
    }else if(degres>214 && degres<=236){
        return 'SO'
    }else if(degres>236 && degres<=259){
        return 'OSO'
    }else if(degres>259 && degres<=281){
        return 'O'
    }else if(degres>281 && degres<=304){
        return 'ONO'
    }else if(degres>304 && degres<=326){
        return 'NO'
    }else if(degres>326 && degres<=349){
        return 'NNO'
    }else{
        return 'N'
    }
}


 // push vers base de données
}

module.exports = analyseTrame;


