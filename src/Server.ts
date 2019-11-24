import * as net from 'net'
import AnalyseTrame from './AnalyseTrame'
import {ISocket} from './utils/interface'

class Server{

    private port: number
    server : net.Server

    constructor(port:number){
        this.port = port
        this.createServer()
    }

    private createServer(){
        this.server = net.createServer((socket:ISocket)=>{
            console.log('Device connected')
            socket.on('data',trame=>new AnalyseTrame(trame,socket))
            socket.on('end',()=>console.log(`device ${socket.idDevice} deconnecté`))
        })
    }

    start(){
        this.server.listen(this.port,()=>{
            console.log(`server listening on port ${this.port}`)
        })
    }
}

export default Server