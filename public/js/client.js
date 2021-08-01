const socket = io('http://localhost:8000');

//get DOM elements in respective JS variables

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
var audio = new Audio('notification.mp3');
var audio2 = new Audio('sent.mp3');

//Function which will append event info to the container
const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left')
    {
        audio.play();
    }
    else{
        audio2.play();
    }  
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value='';
})

let name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name=>{
    append(`${name} JOINED THE CHAT`, 'centre')
})

socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name=>{
    append(`${name} LEFT THE CHAT`, 'left')
})

