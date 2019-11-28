import ExtractData from '../src/ExtractData'
import {mockData} from './exempleData'

describe(`test de l'extration des données`,()=>{
    const data = new ExtractData(mockData.arrayInitialData).data

    test('test de la date',()=>{
        expect(data.date).toStrictEqual(mockData.date)
    })
 
    test('test position',()=>{
        expect(data.position).toStrictEqual(mockData.position)
    })

    test('test speed',()=>{
        expect(data.speed).toBe(mockData.speed)
    })

    test('test direction',()=>{
        expect(data.dir).toBe(mockData.dir)
    })

    test('test altitude',()=>{
        expect(data.alt).toBe(mockData.alt)
    })

    test('test availableSatellite',()=>{
        expect(data.availableSatellite).toBe(mockData.availableSatellite)
    })
    test('test fixedSatellite',()=>{
        expect(data.fixedSatellite).toBe(mockData.fixedSatellite)
    })

    test('test alarme',()=>{
        expect(data.alarme).toStrictEqual(mockData.alarme)
    })

    test('test turnOn',()=>{
        expect(data.turnOn).toBe(mockData.turnOn)
    })

    test('test inCharge',()=>{
        expect(data.inCharge).toBe(mockData.inCharge)
    })

    test('test GPSChipFailed',()=>{
        expect(data.GPSChipFailed).toBe(mockData.GPSChipFailed)
    })

    test('test GPSfixed',()=>{
        expect(data.GPSfixed).toBe(mockData.GPSfixed)
    })

    test('test levelBattery',()=>{
        expect(data.levelBattery).toBe(mockData.levelBattery)
    })

    test('test GSMLocating',()=>{
        expect(data.GSMLocating).toBe(mockData.GSMLocating)
    })





})