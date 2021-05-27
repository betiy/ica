var activeMenu = false; //Used to determine if the profile is open
var activeMenuNumber = 1; //Used to indicate which profile loaded
var jsonFile; //JSON file global

window.addEventListener('load', function () {
  loadJSON();
})
//loadJSON();

/*
Handlers for contents buttons
*/
function contentsButton(sectionID){
var sections = document.getElementById('siteContainer').children;
var scrollPos = sections[sectionID].getBoundingClientRect();
window.scrollTo(0, scrollPos.top);
}

/*
This basically just toggles a few variables depending on what you click on and then it bumps over to populating the card with the right info
*/
function profileDisplay(charNumber){
var menuElement=document.getElementById('castInformationContainer');
var menuContainer=document.getElementById('cast');
    console.log(jsonFile);
    if (!activeMenu){
        activeMenu=true;
        activeMenuNumber=charNumber;
        setProfile(activeMenuNumber);
        menuElement.classList.toggle("castVisible");
        menuContainer.classList.toggle("expanded");
    }
    else{
        if(activeMenuNumber==charNumber){
            activeMenu=false;
            menuElement.classList.toggle("castVisible");
            menuContainer.classList.toggle("expanded");
        }
        else{
            activeMenu=true;
            activeMenuNumber=charNumber;
            setProfile(activeMenuNumber);
        }
    }
}
function profileHider(){
document.getElementById('castInformationContainer').classList.toggle("castVisible");
document.getElementById('cast').classList.toggle("expanded");
activeMenu=false;
}
/*
Sets the info in the profile card based on the JSON file
*/
function setProfile(characterID){
document.getElementById("castCharacterName").innerHTML = jsonFile.characters[characterID].name;
document.getElementById("charRace").innerHTML = "Race: "+jsonFile.characters[characterID].race;
document.getElementById("charClass").innerHTML = "Class: "+jsonFile.characters[characterID].class;
document.getElementById("charLevel").innerHTML = "Level: "+jsonFile.characters[characterID].level;
document.getElementById("charStats").innerHTML = (jsonFile.characters[characterID].stats).replaceAll(',','<br>');
document.getElementById("castCharacterExtended").innerHTML = jsonFile.characters[characterID].bodytext;
document.getElementById("castShowcaseImage").style.background = "url(img/characterProfile"+characterID+".png) no-repeat center bottom, #8A3038";                    
}

/*
Sets the text for the untravelled section from JSON
*/
function untravelledText(textID){
    if(textID!=null){
    document.getElementById("untravelledText").innerHTML = jsonFile.roadsText[textID].text; 
    } 
   console.log('aaa'); document.getElementById("untravelledCover").classList.toggle('untravelledTextActive');
}

/*
JSON loading code
*/
function loadJSON(){

var jsondata = document.getElementById("JSONDATA").innerHTML;
jsonFile = JSON.parse(jsondata);
populateContents(jsonFile);
}

function populateContents(j){
    var buttonsContainer = document.getElementById('castButtonsContainer');
    var questsContainer = document.getElementById('questBoardContainer');
    
    for(var i=0;jsonFile.characters.length>i;i++){
        buttonsContainer.insertAdjacentHTML("beforeend","<div class='castButton cast"+i+"'style='background:url(img/characterProfile"+i+"_mini.png) no-repeat;background-size:contain;background-position:center middle;' onclick='profileDisplay("+i+")'><div>"+j.characters[i].name+"</div></div>")
    }
    for(var i=0;jsonFile.quests.length>i;i++){
        questsContainer.insertAdjacentHTML("beforeend","<div class='questNote quest"+i+"' onMouseDown='dragMe(this);'style='left:"+Math.random()*80+"%;top:"+Math.random()*60+"%;transform:rotate("+(Math.random()-0.5)*25+"deg)';><div class='noteHeader'>"+j.quests[i].name+"</div><div class='noteContents'>"+j.quests[i].content+"</div></div>");
    }
}

/*
draggable code
*/
var zindexing = 1;
function dragMe(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;
    

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag; 
    zindexing=zindexing+1;
    elmnt.style.zIndex=(zindexing);
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
