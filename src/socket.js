import { io } from "socket.io-client";

let sock_settings = {
    timeout: 5000
}

let socket

function init(url = '', options = {}, onConnect = () => { }, onFailure = () => { }) {
    socket = io(url, options)
    const timeout = setTimeout(() => {
        onFailure("Socket failed to connect: ERR_CONN_TIMED_OUT")
        socket = null
    }, sock_settings.timeout)
    socket.on('connect', () => {
        clearTimeout(timeout)
        onConnect({ id: socket.id, url, listeners: [{ name: 'connect', removable: false }] })
    })
}

function disconnect() {
    if (socket) {
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

function setSettings(settings = {}) {
    sock_settings = settings
}

export default { init, addListener, removeListener, emit, disconnect, setSettings }