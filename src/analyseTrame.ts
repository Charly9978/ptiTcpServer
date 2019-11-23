import * as admin from 'firebase-admin'
import hexToBinary from './utils/hexToBinary'
import orientation from './utils/orientation'

interface IData {
    date: Date
    position: admin.firestore.GeoPoint
    speed: number
    dir: string
    alt: number
    availableSatellite: number
    fixedSatellite: number
    alarme: string[]
    turnOn: boolean
    inCharge: boolean
    GPSChipFailed: boolean
    GPSfixed: boolean
    levelBattery: number
    GSMLocating: boolean
}



class analyseTrame {

    private _data: IData
    private trame: string[]
    private binaryCode : string[]

    constructor(trame:string[]){
        this.trame = trame
        this.setBinaryCode()
        this.getDate()
        this.getPosition()
        this.getSpeed()
        this.getDir()
        this.getAlt()
        this.getAvailableSatellite()
        this.getFixedSatellite()
        this.getAlarm()
        this.getTurnOn()
        this.getInCharge()
        this.GPSChipFailed()
        this.getBatteryLevel()
        this.getGpsFixed()
        this.getGsmLoc()
    }

    get data(){
        return this._data
    }

    private setBinaryCode(){
        this.binaryCode = hexToBinary(this.trame[7])
        .split("")
        .reverse()
    }

    private getDate(){

        //on récupère les chiffres représentant la date
        const dateArray = this.trame[1]
        .split('/')
        .map(date=>Number(date))

        //on récupère les chiffres représentant l'heure
        const timeArray = this.trame[2]
        .split(':')
        .map(string=>Number(string))

        this._data.date = new Date(dateArray[2]+2000,dateArray[1]-1,dateArray[0],timeArray[0],timeArray[1],timeArray[2])
    }

    private getPosition(){

        const lat = Number(this.trame[3])
        const long = Number(this.trame[4])

        this._data.position = new admin.firestore.GeoPoint(lat,long)
    }

    private getSpeed(){
        this._data.speed = Number(this.trame[5])
    }

    private getDir(){
        this._data.dir = orientation(Number(this.trame[6]))
    }

    private getAlt(){
        this._data.alt = Number(this.trame[8])
    }

    private getBatteryLevel(){
        this._data.levelBattery = Number(this.trame[9])
    }

    private getAvailableSatellite(){
        this._data.availableSatellite = Number(this.trame[11])
    }

    private getFixedSatellite(){
        this._data.fixedSatellite = Number(this.trame[10])
    }

    private getAlarm(){
        const typeAlarme:string[] = []
        if(this.binaryCode[6]=='1') typeAlarme.push('SOS')
        if(this.binaryCode[7]=='1') typeAlarme.push('overSpeed')
        if(this.binaryCode[8]=='1') typeAlarme.push('fallDown')
        if(this.binaryCode[9]=='1') typeAlarme.push('geoFence1')
        if(this.binaryCode[10]=='1') typeAlarme.push('geoFence2')
        if(this.binaryCode[11]=='1') typeAlarme.push('geoFence3')
        if(this.binaryCode[12]=='1') typeAlarme.push('lowBattery')
        if(this.binaryCode[13]=='1') typeAlarme.push('motion')
        if(this.binaryCode[14]=='1') typeAlarme.push('movement')

        this._data.alarme = typeAlarme
    }

    private getTurnOn(){
        this._data.turnOn = this.binaryCode[21] == '1'? true : false
    }

    private getInCharge(){
        this._data.inCharge = this.binaryCode[22] == '1'? true : false
    }

    private GPSChipFailed(){
        this._data.GPSChipFailed = this.binaryCode[2] == '1'? true : false
    }

    private getGpsFixed(){
        this._data.GPSfixed = this.binaryCode[1] == '1'? true : false
    }

    private getGsmLoc(){
        this._data.GSMLocating = this.binaryCode[0] == '1'? true : false
    }


}

export default analyseTrame