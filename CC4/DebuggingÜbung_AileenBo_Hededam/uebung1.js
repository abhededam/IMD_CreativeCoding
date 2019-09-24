function printEvenNums(){
    var numbers = $("#input").val().split(",");
        numbers = convertAllElementsToInteger(numbers);
    var evenNumbers = [];
    for(var i=0; i<numbers.length-1; i++){
        if(numberes /2 == 1) {     
            evenNumbers.push(i);
            }
        doSomeMagickWithTheNumbers(evenNumbres.join());
    }
}


$(document).ready(function(){
    $("#input").change(function(){
        printEvenNums();
    });
});

function convertAllElementsToInteger(arr){
    for(var i=0; i < arr.length; i++){
        var pointer = arr[i];
        arr[i] = parseInt(pointer);
    }
    return arr
}

function doSomeMagickWithTheNumbers(numbers){
    var numbersTOBEWRITTEN= numbrs
    $("#output").val(numbersTOBEWRITTEN);
}