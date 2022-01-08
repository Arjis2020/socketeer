import { io } from "socket.io-client";
import keys from './localStorage.keys.json'
import LocalStorage from './localStorage'
import pinger from "./pinger";
import { v4 as uuidV4 } from 'uuid'

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
        pinger(url, (ping_in_ms) => {
            let histories = JSON.parse(LocalStorage.get(keys.histories)) || []
            histories.push(
                {
                    id: uuidV4(),
                    url,
                    options: JSON.stringify(options),
                    avg_rtt: ping_in_ms,
                    listeners: [{ name: 'connect', removable: false }],
                    timestamp_in_unix: Math.floor(new Date() / 1000)
                }
            )
            LocalStorage.set(
                [keys.histories, JSON.stringify(histories)]
            )
            onConnect({ id: socket.id, url, options, listeners: [{ name: 'connect', removable: false }] })
        }, null)
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

        //local storage updation
        let history = LocalStorage.query((history) => history.id === LocalStorage.getCurrent())
        history.listeners = listeners
        let histories = JSON.parse(LocalStorage.get(keys.histories))
        histories = histories.filter(item => item.id !== history.id)
        histories.push(history)
        LocalStorage.set(
            [keys.histories, JSON.stringify(histories)]
        )

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

        //local storage updation
        let history = LocalStorage.query((history) => history.id === LocalStorage.getCurrent())
        history.listeners = listeners
        let histories = JSON.parse(LocalStorage.get(keys.histories))
        histories = histories.filter(item => item.id !== history.id)
        histories.push(history)
        LocalStorage.set(
            [keys.histories, JSON.stringify(histories)]
        )

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