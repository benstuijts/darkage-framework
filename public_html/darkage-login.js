function login() {
    
    socket.emit('login-player', { username: "demoplayer", password: "demo"}, function(response){
        message(response);
        alert(response.index);
    });
    
}

function message(message) {
    var $message = document.getElementById("message");
    if(message.success) {
        $message.innerHTML = message.message;
        $message.className = "alert alert-success";
    } else {
        $message.innerHTML = message.error;
        $message.className = "alert alert-danger";
    }
}