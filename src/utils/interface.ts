import * as net from 'net'
import * as admin from 'firebase-admin'


export interface ISocket extends net.Socket {
    idDevice?: string
}

export interface IData {
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