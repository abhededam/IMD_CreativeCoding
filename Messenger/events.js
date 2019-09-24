function ohayo(txt){
    txt.innerHTML = "Ohayō!";
}
function ohayoback(txt){
    txt.innerHTML = "Ohayō";
}

function change(txt) {
    txt.innerHTML = "(｡◕‿◕｡)";
}
function changeback(txt) {
    txt.innerHTML = "( ́ ◕◞ε◟◕`)";
}

function yay()
{
    document.querySelector('#bubbl').innerText = "YAY!";
}

window.onload=function(){
    document.getElementById('hello').addEventListener('click', function(){
        alert('AUFDRINGLICH');
    });
  }

