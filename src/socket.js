import { io } from "socket.io-client";

let socket

function init(url = '', options = {}, onConnect = () => { }) {
    socket = io(url, options)
    socket.on('connect', () => {
        onConnect({ id: socket.id, url, listeners: [{ name: 'connect', removable: false }] })
    })
}

function disconnect(){
    if(socket){
        socket.disconnect()
        socket = null
    }
}

let listeners = []

function addListener(key = '', onMessageReceived = () => { }) {
    if (socket) {
        listeners.push(key)
        socket.removeAllListeners()
        return listen(onMessageReceived)
    }
    else {
        throw 'Socket was not initialized'
    }
}

function removeListener(key = '', onMessageReceived = () => { }) {
    if (socket) {
        listeners = listeners.filter(item => item !== key)
        socket.removeAllListeners()
        return listen(onMessageReceived)
    }
    else {
        throw 'Socket was not initialized'
    }
}

function emit(key = '', payload = {} || [] || '' || 0) {
    if (socket)
        return socket.emit(key, payload)
    else
        throw 'Socket was not initialized'
}

function listen(onMessageReceived = () => { }) {
    if (socket) {
        listeners.forEach(listener => {
            socket.on(listener, (data) => {
                onMessageReceived(listener, data)
            })
        })
    }
}

export default { init, addListener, removeListener, emit, disconnect }