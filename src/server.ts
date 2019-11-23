import * as net from 'net'
import DataBase from './dataBase'
import AnalyseTrame from './analyseTrame'

interface ISocket extends net.Socket {
    idDevice?: string
}

const dataBase = new DataBase()

net.createServer((socket: ISocket) => {

    console.log('Device connected')

    socket.on('data', trame => {

        const trameArray = trame.toString().substring(0, trame.length - 1).split(',')
        const deviceId = trameArray[1]

        switch (trameArray[0]) {
            
            case '!1':
                const isDeviceIdChecked = dataBase.checkIdDevice(deviceId)
                if (!isDeviceIdChecked) {
                    socket.end()
                    console.log('id non reconnu');
                } else {
                    socket.idDevice = deviceId
                    console.log(`device ${socket.idDevice} connected`)
                }

                break;

            case '!D':
                const data = new AnalyseTrame(trameArray).data
                dataBase.sendData(data, socket.idDevice)
                break;

            case '!5':
                console.log('Pas de modif pour le device ' + socket.idDevice);
                break

        }
    })

    socket.on('end', () => {
        console.log('Device disconnected');
    })


})

    .listen(2010, () => {
        console.log('server listening');

    })