import orientation from '../src/utils/orientation'
describe("test de l'orientation", ()=>{
    test('test NNE',()=>{
        expect(orientation(21)).toBe('NNE')
    })
    
    test('test NE',()=>{
        expect(orientation(40)).toBe('NE')
    })
    
    test('test ENE',()=>{
        expect(orientation(70)).toBe('ENE')
    })
    
    test('test E',()=>{
        expect(orientation(90)).toBe('E')
    })
    
    test('test ESE',()=>{
        expect(orientation(110)).toBe('ESE')
    })
    
    test('test SE',()=>{
        expect(orientation(135)).toBe('SE')
    })
    
    test('test SSE',()=>{
        expect(orientation(155)).toBe('SSE')
    })
    
    test('test S',()=>{
        expect(orientation(191)).toBe('S')
    })
    
    test('test SSO',()=>{
        expect(orientation(205)).toBe('SSO')
    })
    
    test('test SO',()=>{
        expect(orientation(220)).toBe('SO')
    })
    
    test('test OSO',()=>{
        expect(orientation(240)).toBe('OSO')
    })
    
    test('test O',()=>{
        expect(orientation(260)).toBe('O')
    })
    
    test('test ONO',()=>{
        expect(orientation(290)).toBe('ONO')
    })
    
    test('test NO',()=>{
        expect(orientation(310)).toBe('NO')
    })
    
    test('test NNO',()=>{
        expect(orientation(349)).toBe('NNO')
    })
    
    test('test N',()=>{
        expect(orientation(369)).toBe('N')
    })


})