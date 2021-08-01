// Node server which will handle socket io connections
const io  = require('socket.io')(8000,{
    cors:{
        origin:'*',
    }
});

const users = {};

io.on('connection', socket =>{
    
    socket.on('new-user-joined', name =>{  
        console.log(name);                            // Agar koi naya user join karta hai to sabko 
        users[socket.id] = name;                      // broadcast kardo(emit kardo ek event ki user joined) 
        socket.broadcast.emit('user-joined', name);   // uska naam or batado ki vo agya hai 
    });

    socket.on('send', message =>{                       // agar koi message send karta hai to baakio ko receive karwado uska 
        socket.broadcast.emit('receive', {name:users[socket.id], message: message}) //message or uska naam uski socketid se
    });

    socket.on('disconnect', message =>{                       // agar koi disconnect hojata hai to baaki logo ko message jaega 
        socket.broadcast.emit('left', users[socket.id]) ;
        delete users[socket.id];
    });

})