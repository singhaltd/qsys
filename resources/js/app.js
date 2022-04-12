// app entrypoint
const socket = io()
socket.on('takeCall', (data) => {
    console.log(data)
    let el = document.getElementById('sockmessage')
    el.innerHTML += JSON.stringify(data)
})



