 const MockDataBase = jest.fn().mockImplementation(()=>{
return{
    checkIdDevice:jest.fn((deviceId)=>{
        return ['111','222','867856031189845'].includes(deviceId)
    })
}
})

export default MockDataBase