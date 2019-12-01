import AnalyseTrame from '../src/AnalyseTrame'
import {ISocket} from '../src/utils/interface'
import DataBase from '../src/DataBase'

jest.mock('../src/DataBase')



class TestAnalyseTrame extends AnalyseTrame{
    constructor(trame:Buffer,socket:ISocket){
        super(trame,socket)
    }
    get arrayTrame(){
        return this._arrayTrame
    }

    get deviceId(){
        return this._deviceId
    }
}


describe('test transformToArray',()=>{
    const socket=<ISocket>{}
    const trame = Buffer.from('21312c3836373835363033313138393834353b','hex')
    const spy = jest.spyOn<any,any>(TestAnalyseTrame.prototype,'transformTrameToArray')
    const newAnalyse = new TestAnalyseTrame(trame,socket)
    
    test('la fonction  est appelé',()=>{
        expect(spy).toBeCalled()
        
    })

    test('trameArray est bien un array non vide',()=>{
        expect(newAnalyse.arrayTrame).toEqual(expect.any(Array))
    })
})

describe('test de getDeviceId',()=>{
    const socket=<ISocket>{}
    const trame = Buffer.from('21312c3836373835363033313138393834353b','hex')
    const spy = jest.spyOn<any,any>(TestAnalyseTrame.prototype,'getDeviceId')
    const newAnalyse = new TestAnalyseTrame(trame,socket)

    test('la methode est bien appelée',()=>{
        expect(spy).toBeCalled()
        spy.mockClear()
    })

    test("l'id est obtenu depuis l'array trame",()=>{
        expect(newAnalyse.deviceId).toEqual(expect.any(String))
    })

    test("recupération de l'id dans la socket",()=>{
        socket.idDevice = '2222'
        const newAnalyse2 = new TestAnalyseTrame(trame,socket)
        expect(newAnalyse2.deviceId).toBe('2222')
    })


})


describe("test la méthode analyseTrame",()=>{
    test("test le cas !1",()=>{
    const socket=<ISocket>{}
    const trame = Buffer.from('21312c3836373835363033313138393834353b','hex')
    const spy = jest.spyOn<any,any>(TestAnalyseTrame.prototype,'isDeviceIdAuth')
    const newAnalyse = new TestAnalyseTrame(trame,socket)
    expect(spy).toBeCalled()
    spy.mockClear()
    })

    test("test le cas !1 avec id non reconnu",()=>{
        const socket=<ISocket>{}
        socket.end = ()=> true 
        const trame = Buffer.from('21312c3835373835363033313138393834353b','hex')
        const spy = jest.spyOn<any,any>(socket,'end')
        global.console.log = jest.fn()
        const newAnalyse = new TestAnalyseTrame(trame,socket)
        expect(console.log).toHaveBeenCalledWith('id non reconnu')
        expect(spy).toBeCalled()
        spy.mockClear()
        })

    test("test le cas !D",()=>{
        const socket=<ISocket>{}
        const trame = Buffer.from('21442c32342f30392f31382c32313a31393a35342c34352e3335353234342c352e3934383331332c312c302c303730303030','hex')
        const spy = jest.spyOn<any,any>(TestAnalyseTrame.prototype,'sendDataToDb')
        const newAnalyse = new TestAnalyseTrame(trame,socket)
        expect(spy).toBeCalled()
        spy.mockClear()
    })

    test("test le cas !5",()=>{
        const socket=<ISocket>{}
        socket.idDevice = '2222'
        const trame = Buffer.from('21352C32382C413B','hex')
        global.console.log =jest.fn()
        const newAnalyse = new TestAnalyseTrame(trame,socket)
        expect(console.log).toHaveBeenCalledWith(
            `Pas de modif pour le device ${newAnalyse.deviceId}`
        )
        jest.clearAllMocks()
    })

    test("autre cas",()=>{
        const socket=<ISocket>{}
        socket.idDevice = '2222'
        const trame = Buffer.from('21332C4F3B','hex')
        global.console.log =jest.fn()
        const newAnalyse = new TestAnalyseTrame(trame,socket)
        expect(console.log).toHaveBeenCalledWith(
            newAnalyse.arrayTrame
        )
        jest.clearAllMocks()

    })
})

