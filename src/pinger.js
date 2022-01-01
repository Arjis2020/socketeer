function pinger(url = '', pong = () => { }, onError = () => { }) {
    var started = new Date().getTime();

    var http = new XMLHttpRequest();

    http.open("GET", url, true);
    http.onreadystatechange = function () {
        if (http.readyState == 4) {
            var ended = new Date().getTime();

            var milliseconds = ended - started;

            if (pong) {
                pong(milliseconds);
            }
        }
    };
    try {
        http.send(null);
    } catch (exception) {
        // this is expected
        if (onError)
            onError(exception)
    }
}

export default pinger