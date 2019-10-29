var slinStart = document.querySelector("#slin-start");
var slinStop = document.querySelector("#slin-stop");
var slin_dataset = document.getElementById("slin-dataset");

slinStop.addEventListener('click',function(){
    array = [
        document.getElementById("slin-alpha"),
        document.getElementById("slin-lambda"),
        document.getElementById("slin-epochs"),
        document.getElementById("slin-batchSize"),
        document.getElementById("slin-datasetName"),
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

slinStart.addEventListener('click', function(){
    alert('hi')
});

slin_dataset.addEventListener('change', function(){
    slin_dataName = document.getElementById("slin-datasetName");
    var arr = [];
    for (var i = slin_dataset.length >>> 0; i--;) { 
      arr[i] = slin_dataset[i].value;
    }

    var index = arr.indexOf(slin_dataset.value)
    slin_dataName.value = slin_dataset[index].value
});
