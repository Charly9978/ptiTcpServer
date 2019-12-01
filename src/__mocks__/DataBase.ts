import {IData} from '../utils/interface'


const MockDataBase = jest.fn().mockImplementation(()=>{
return{
    checkIdDevice:jest.fn((deviceId)=>{
        return ['1111','2222','867856031189845'].includes(deviceId)
    }),
    sendData: jest.fn((data:IData,idDevice:string)=>{
        console.log("data envoyé")
        return true
    })
}
})

export default MockDataBase