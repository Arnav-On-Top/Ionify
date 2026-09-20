let hSlider=document.getElementById("hSlider");
let ohSlider=document.getElementById("ohSlider");
let hInput=document.getElementById("hInput");
let ohInput=document.getElementById("ohInput");
let hMinus=document.getElementById("hMinus");
let hPlus=document.getElementById("hPlus");
let ohMinus=document.getElementById("ohMinus");
let ohPlus=document.getElementById("ohPlus");
let undoBtn=document.getElementById("undoBtn");
let redoBtn=document.getElementById("redoBtn");
let resetBtn=document.getElementById("resetBtn");
let history=[];
let historyIndex= -1;
let hValue=document.getElementById("hValue");
let ohValue=document.getElementById("ohValue");
let phNumber=document.getElementById("phNumber");
let marker=document.getElementById("marker");
let type=document.getElementById("type");
hSlider.addEventListener("input", function() {
    let ph=Number(hSlider.value);
    let poh=14-ph;
    ohSlider.value=poh;
    updateScreen();
    saveHistory();
});
ohSlider.addEventListener("input", function() {
    let poh=Number(ohSlider.value);
    let ph=14-poh;
    hSlider.value=ph;
    updateScreen();
    saveHistory();
});
hInput.addEventListener("change", function() {
    let ph=Number(hInput.value);
    if(ph<1) ph=1;
    if(ph>14) ph=14;
    hSlider.value=ph;
    ohSlider.value=14-ph;
    saveHistory();
    updateScreen();
});
ohInput.addEventListener("change", function() {
    let poh=Number(ohInput.value);
    if(poh<1) poh=1;
    if(poh>14) poh=14;
    ohSlider.value=poh;
    hSlider.value=14-poh;
    saveHistory();
    updateScreen();
});
hMinus.addEventListener("click", function() {
    let ph=Number(hSlider.value);
    ph=Math.max(1, ph-0.1);
    hSlider.value=ph;
    ohSlider.value=14-ph;
    saveHistory();
    updateScreen();
});
hPlus.addEventListener("click", function() {
    let ph=Number(hSlider.value);
    ph=Math.min(14, ph+0.1);
    hSlider.value=ph;
    ohSlider.value=14-ph;
    updateScreen();
    saveHistory();
});
ohMinus.addEventListener("click", function() {
    let poh=Number(ohSlider.value);
    poh=Math.max(1, poh-0.1);
    ohSlider.value=poh;
    hSlider.value=14-poh;
    updateScreen();
    saveHistory();
});
ohPlus.addEventListener("click", function() {
    let poh=Number(ohSlider.value);
    poh=Math.min(14, poh+0.1);
    ohSlider.value=poh;
    hSlider.value=14-poh;
    saveHistory();
    updateScreen();
});
function updateScreen() {
    let ph=Number(hSlider.value);
    let poh=Number(ohSlider.value);
    hInput.value=ph.toFixed(1);
    ohInput.value=poh.toFixed(1);
    let h=Math.pow(10, -ph);
    let oh=Math.pow(10, -poh);
    hValue.innerText=h.toExponential(2);
    ohValue.innerText=oh.toExponential(2);
    phNumber.innerText=ph.toFixed(1);
    let position=(ph/14)*100;
    marker.style.left=position+"%";
    if(ph<7){
        type.innerText="Acidic";
    }
    else if(ph==7){
        type.innerText="Neutral";
    }
    else{
        type.innerText="Basic";
    }
}
function saveHistory() {
    let current=Number(hSlider.value);
    if(history[historyIndex]==current) {return;}
    history=history.slice(0, historyIndex+1);
    history.push(current);
    historyIndex++;
    updateHistoryButtons();
}
function undo() {
    if(historyIndex<=0) {return;}
    historyIndex--;
    let ph=history[historyIndex];
    hSlider.value=ph;
    ohSlider.value=14-ph;
    updateScreen();
    updateHistoryButtons();
}
function redo() {
    if(historyIndex>=history.length-1) {return;}
    historyIndex++;
    let ph=history[historyIndex];
    hSlider.value=ph;
    ohSlider.value=14-ph;
    updateScreen();
    updateHistoryButtons();
}
function updateHistoryButtons() {
    undoBtn.disabled=historyIndex<=0;
    redoBtn.disabled=historyIndex>=history.length-1;
}
undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);
resetBtn.addEventListener("click", function() {
    hSlider.value=7;
    ohSlider.value=7;
    saveHistory();
    updateScreen();
    updateHistoryButtons();
});
saveHistory();
updateScreen();
updateHistoryButtons();