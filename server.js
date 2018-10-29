
const net = require('net');
const analyseTrame = require('./analyseTrame');
const admin = require('./firebasInit');

var db = admin.firestore();

net.createServer(function(socket) 
{ 
  console.log('GPS connected');
  socket.on('data',function(data)
  {
    console.log(data.toString());
    let dataArray = data.toString().substring(0,data.length-1).split(',');
   
    switch (dataArray[0]){

      //requete firestore pour connaitre les devices autorisés


        case '!1':
      //on vérifie la présence du bip dans firestore
      let presenceDevice = false;
      db.collection('Devices').get()
      .then((docs)=>{
        docs.forEach((doc)=>{
          if(doc.id === data[1]){
            presenceDevice = true
          }
          })
      })
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
