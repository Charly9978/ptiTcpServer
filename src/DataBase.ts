import * as admin from 'firebase-admin'
import {IData} from './ExtratcData'
let serviceAccount = require('../bip-pti-013e330dd07d.json');

class DataBase {

    private _acceptedDevicesId: string []=[]
    private  db: admin.firestore.Firestore

    constructor(){
        this.initialConnection()
        this.getAcceptedDevicesId()
    }

    
    private initialConnection(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          })
        this.db = admin.firestore()
    }

    private getAcceptedDevicesId(){
        this.db.collection('Devices').onSnapshot(querySnapshot => {
            querySnapshot.docChanges.forEach(change => {
              if (change.type === 'added') {
                this._acceptedDevicesId.push(change.doc.id);
              }
              if (change.type === 'removed') {
                const id= change.doc.id
                const index = this._acceptedDevicesId.findIndex((element)=>{element === id});
                if(index){
                    this._acceptedDevicesId.splice(index,1)
                }
              }
            })
        
            console.log(this._acceptedDevicesId)
          },err=>console.log(err));

    }

    checkIdDevice(deviceId:string):boolean{
        return this._acceptedDevicesId.includes(deviceId)
    }

    async sendData(data:IData,deviceId:string){
        try {
            await this.db.collection('Devices').doc(deviceId).collection('trame').add(data)
            console.log('enregsitrement de la trame réussi')   
        } catch (error) {
            console.log('enregistrement echoué : '+error)            
        }

    }

}

export default DataBase