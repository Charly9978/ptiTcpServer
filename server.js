
const net = require('net');
const analyseTrame = require('./analyseTrame');
const admin = require('./firebasInit');

var db = admin.firestore();

let devicesId = [];

//requete firestore pour connaitre les devices autorisés
  db.collection('Devices').onSnapshot(querySnapshot => {
    querySnapshot.docChanges.forEach(change => {
      if (change.type === 'added') {
        devicesId.push(change.doc.id);
      }
      if (change.type === 'removed') {
        const id= change.doc.id
        const index = devicesId.findIndex((element)=>{element === id});
        if(index){
          devicesId.splice(index,1)
        }
      }
    });
    console.log(devicesId)
  });

  net.createServer(function(socket){ 

  console.log('GPS connected');
  socket.on('data',function(data){
    console.log(data.toString());
    let dataArray = data.toString().substring(0,data.length-1).split(',');
   
    switch (dataArray[0]){

      


        case '!1':
      //on vérifie la présence de id du bip
      let presenceDevice = devicesId.includes(dataArray[1]);

          if (!presenceDevice){
            socket.end();
            console.log('id non reconnu');
          }else{
          socket.idDevice = dataArray[1];
          console.log(socket.idDevice);
          }
      
        break;
    
        case '!D':
        console.log(dataArray)
        analyseTrame(socket.idDevice,dataArray);
        break;
    
        case '!5':
        console.log('Pas de modif pour le device ' +socket.idDevice);
        break
    
    }


  

  });
  socket.on('end', function() {
    console.log('GPS disconnected');
  });
 
}).listen(6060, function() {
  console.log('server listening');
});

