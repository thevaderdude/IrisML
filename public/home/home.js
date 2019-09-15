var logged = false;

document.onreadystatechange = function(){
    if(logged){
        document.getElementById('logged').style.display = 'none';
    } else if (!logged){
        document.getElementById('notLogged').style.display = 'none';
    }
}