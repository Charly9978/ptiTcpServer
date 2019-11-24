import DataBase from './DataBase'
import Server from './Server'

export const db = new DataBase()

new Server(2010).start()



