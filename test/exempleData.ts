import * as admin from 'firebase-admin'
import {IData} from '../src/utils/interface'

interface IMockData extends IData {
    initialData: string,
    arrayInitialData: string[],
}

export const mockData: IMockData={

    initialData:'!D,3/7/13,6:35:30,56.869524,14.820557,0.0,225.8,1f0001,12.11,98,4,7,0;',
    arrayInitialData: ['!D','3/7/13','6:35:30','56.869524','14.820557','0.0','225.8','1f0001','12.11','98','4','7','0'],
    date: new Date(2013,6,3,6,35,30),
    position: new admin.firestore.GeoPoint(56.869524,14.820557),
    speed: 0.0,
    dir:'SO',
    alt:12.11,
    availableSatellite:7,
    fixedSatellite: 4,
    alarme:[],
    turnOn:false,
    inCharge:false,
    GPSChipFailed: false,
    GPSfixed: false,
    levelBattery: 98,
    GSMLocating: true

}
