import {ISocket} from './utils/interface'
import {db} from '.'
import ExtractData from './ExtractData'

class AnalyseTrame {

    private trame: Buffer
    private arrayTrame: string[]
    private deviceId: string
    private socket: ISocket

    constructor(trame:Buffer, socket:ISocket ){
        this.socket = socket
        this.trame = trame    
        this.transformTrameToArray()
        this.getDeviceId()
        this.analyseTrame()

    }

    private transformTrameToArray(){
        this.arrayTrame = this.trame.toString().substring(0, this.trame.length - 1).split(',')
    }
    private getDeviceId(){
        this.deviceId = this.socket.idDevice || this.arrayTrame[1]
    }
    
    private analyseTrame(){
        const firstData = this.arrayTrame[0]

        switch (firstData) {
            case '!1':
                this.isDeviceIdAuth()
                
                break;
                
            case '!D':
                
                this.sendDataToDb()
                    
                break;
            
            case '!5':
                console.log(`Pas de modif pour le device ${this.deviceId}`)
             
                break;
        
            default:
                console.log(this.arrayTrame)
                break;
        }
    }

    private isDeviceIdAuth(){
        const isDeviceIdChecked = db.checkIdDevice(this.deviceId)

        if (!isDeviceIdChecked) {
            this.socket.end()
            console.log('id non reconnu');
        } else {
            this.socket.idDevice = this.deviceId
            console.log(`device ${this.socket.idDevice} connected`)
        }
    }

    private sendDataToDb(){
        const data = new ExtractData(this.arrayTrame).data
        db.sendData(data, this.socket.idDevice)
    }



}

export default AnalyseTrame