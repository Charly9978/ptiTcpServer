import hexToBinary from '../src/hexToBinary'

test('test first value',()=>{
    expect(hexToBinary('15AACF7')).toBe('1010110101010110011110111')
})

test('test second value',()=>{
    expect(hexToBinary('12D232')).toBe('100101101001000110010')
})