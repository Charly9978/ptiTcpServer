const orientation = (degres:number)=>{
    if(degres>11 && degres<=34){
        return 'NNE'
    }else if(degres>34 && degres<=56){
        return 'NE'
    }else if(degres>56 && degres<=79){
        return 'ENE'
    }else if(degres>79 && degres<=101){
        return 'E'
    }else if(degres>101 && degres<=124){
        return 'ESE'
    }else if(degres>124 && degres<=146){
        return 'SE'
    }else if(degres>146 && degres<=169){
        return 'SSE'
    }else if(degres>169 && degres<=191){
        return 'S'
    }else if(degres>191 && degres<=214){
        return 'SSO'
    }else if(degres>214 && degres<=236){
        return 'SO'
    }else if(degres>236 && degres<=259){
        return 'OSO'
    }else if(degres>259 && degres<=281){
        return 'O'
    }else if(degres>281 && degres<=304){
        return 'ONO'
    }else if(degres>304 && degres<=326){
        return 'NO'
    }else if(degres>326 && degres<=349){
        return 'NNO'
    }else{
        return 'N'
    }
}

export default orientation