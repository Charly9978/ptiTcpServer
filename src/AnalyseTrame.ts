import {ISocket} from './utils/interface'
import {db} from './index'
import ExtractData from './ExtractData'

class AnalyseTrame {

    private trame: Buffer
    protected _arrayTrame: string[]
    protected _deviceId: string
    private socket: ISocket

    constructor(trame:Buffer, socket:ISocket ){
        this.socket = socket
        this.trame = trame    
        this.transformTrameToArray()
        this.getDeviceId()
        this.analyseTrame()

    }

     private transformTrameToArray(){
        this._arrayTrame = this.trame.toString().substring(0, this.trame.length - 1).split(',')
    }


    private getDeviceId(){
        this._deviceId = this.socket.idDevice || this._arrayTrame[1]
    }

    
    private analyseTrame(){
        const firstData = this._arrayTrame[0]

        switch (firstData) {
            case '!1':
                this.isDeviceIdAuth()
                
                break;
                
            case '!D':
                
                this.sendDataToDb()
                    
                break;
            
            case '!5':
                console.log(`Pas de modif pour le device ${this._deviceId}`)
             
                break;
        
            default:
                console.log(this._arrayTrame)

                break;
        }
    }

    private isDeviceIdAuth(){
        const isDeviceIdChecked = db.checkIdDevice(this._deviceId)

        if (!isDeviceIdChecked) {
            this.socket.end()
            console.log('id non reconnu');
        } else {
            this.socket.idDevice = this._deviceId
            console.log(`device ${this.socket.idDevice} connected`)
        }
    }

    private sendDataToDb(){
        const data = new ExtractData(this._arrayTrame).data
        db.sendData(data, this.socket.idDevice)
    }



}

export default AnalyseTrame