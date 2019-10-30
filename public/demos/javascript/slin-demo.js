var slinStart = document.querySelector("#slin-start");
var slinStop = document.querySelector("#slin-stop");

slinStop.addEventListener('click',function(){
    array = [
        document.getElementById("slin-alpha"),
        document.getElementById("slin-lambda"),
        document.getElementById("slin-epochs"),
        document.getElementById("slin-batchSize"),
    ]

    inputs = []
    // checks to see if inputs have been made
    for(var i = 0; i < array.length; i++){
        if(array[i].value === ''){
            inputs.push(array[i].placeholder);
        } else {
            inputs.push(array[i].value)
        }
    }
    
    console.log(inputs);
    $.ajax({
        url: '/demos/slin',
        type: "POST",
        data: {inputs},
        success: function(response){
            alert('evaluate response and show alert');
        }
    }); 
});
