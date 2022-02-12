const socket = io();

const board = document.querySelector('.board');

const typing = document.getElementById('p');
const namee = document.getElementById('name');
const message = document.getElementById('message');
const button = document.getElementById('send');
button.addEventListener('click', send);


function send(){
    if(namee.value == '' || message.value == ''){
        alert('Please enter your name and message');
    }else{
        socket.emit('chat', {
            name: namee.value,
            message: message.value
        });
        message.value = '';
    }
}

socket.on('chat', (data) => {
    typing.innerHTML = '';
    board.innerHTML += ` <div class="message"> 
    <strong class="msg-name"> ${data.name} </strong> 
    ${data.message}</div>`
});

socket.on('typing', (data) => {
    p.innerHTML = data+ " yazıyor...";
});

message.addEventListener('keypress', (code) => {
    socket.emit('typing', namee.value);
    if(code.code == 'Enter'){
        send();
    }
});