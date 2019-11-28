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


describe.only('test transformToArray',()=>{
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