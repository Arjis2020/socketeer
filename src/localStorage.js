import keys from './localStorage.keys.json'

let current = ''

function setCurrent(id = '') {
    current = id
}

function getCurrent() {
    return current
}

function query(condition = () => { }) {
    let histories = JSON.parse(localStorage.getItem(keys.histories))
    histories = histories.filter(condition)
    return histories[0]
}

function set(value = []) {
    return localStorage.setItem(value[0], value[1])
}

function setMany(values = [[]]) {
    values.forEach(value => {
        set(value)
    })
}

function get(key = "") {
    return localStorage.getItem(key)
}

function getMany(keys = []) {
    let items = []
    keys.forEach(key => {
        items.push(get(key))
    })
    return items
}

function remove(key = "") {
    return localStorage.removeItem(key)
}

function removeMany(keys = []) {
    keys.forEach(key => {
        remove(key)
    })
}

function clear() {
    return localStorage.clear()
}

export default { set, setMany, get, getMany, remove, removeMany, clear, setCurrent, getCurrent, query }