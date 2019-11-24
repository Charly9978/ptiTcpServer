import * as net from 'net'


export interface ISocket extends net.Socket {
    idDevice?: string
}