/* jslint esversion: 6 */

var userName = "Alien"; // 1. Bitte zunächst Ihren Nutzernanen eintragen.


function getPosts(){
    fetch('https://basti-fritzsche.de/hda/dudebook/get.php').then(response => {
        return response.json();
    }).then(data => {
        writePostsToTimeline(data);
    }).catch(error => {

    });

}

function sendPost(){
    //10. userName wird global gesetzt am Anfang dieser Datei
    //11. body muss aus dem entsprechendem Textarea ausgelesen werden

    const body = document.querySelector('.postBody').value;

    fetch("https://basti-fritzsche.de/hda/dudebook/post.php?user="+userName+"&body="+body, {
    }).then(response => {
        return response.json();
    }).then(data => {
        if(data.saving == "done"){
            document.querySelector('.postBody').value = "";
        }
    }).catch(error => {

    });
    getPosts();
}

function writePostsToTimeline(posts){
    document.querySelector('#timeline').innerHTML = " ";
    // 2. #timeline ausleeren
    for(var i = 0; i < posts.length; i++){
        console.log(posts[i]); //Gibt in der Browserkonsole das aktuelle Post Objekt aus.
        const postTemplate = document.querySelector('#postItem').cloneNode(true);
        // 3. #postItem ist ein unsichtbares Template eines Posteintrages am Ende der index.html. Dieses Template muss zunächst geclont werden.
        postTemplate.removeAttribute("id");
        // 4. ID sind immer einzigartig, deshalb muss nun die ID des kopierten Elements entfernt werden.
        postTemplate.classList.add('postItem');
        // 5. Das Element muss später erreichbar sein, es muss eine Klasse bekommen.
        postTemplate.querySelector('.postUsername').innerHTML = capitalizeFirstLetter(posts[i].user);
        postTemplate.querySelector('.postTime').innerHTML = timeToDatestring(posts[i].time);
        postTemplate.querySelector('.postBody').innerHTML = posts[i].body;
        // 6. Die Div Elemente für Username, Time und Body müssen befüllt werden aus den Werten der Posts
        // 7. Username wird durch die Hilfsfunktion capitalizeFirstLetter("String") verschönert.
        // 8. Die Uhrzeit des Posts wird durch die Hilfsfunktion timeToDatestring(time) lesbar ausgegeben
        document.querySelector('#timeline').appendChild(postTemplate);
        // 9. Das Element muss der #timeline hinzugefügt werden.
    }
}

function capitalizeFirstLetter(string) {
    var elements = string.split(".");
    var name = "";
    for(var i = 0 ; i < elements.length ; i++){
        name = name + " "+ elements[i].charAt(0).toUpperCase() + elements[i].slice(1);
    }
    return name;
}

function timeToDatestring(time){
    var ts = new Date(time*1000);
    return ts.toGMTString();
}


