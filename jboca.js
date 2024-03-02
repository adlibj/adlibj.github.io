/*** What functions are there?

init_board()
*/

/*** Jobs they do:

:: init_board() ::

*/

init_board();

function init_board(){
	var txt = document.getElementById("txt");
	document.getElementById("button_pick").addEventListener("click",pickFile);
	document.getElementById("button_clear").addEventListener("click",clearLog);
}

function clearLog(){
	const worker = new Worker("jboca_worker.js")
	worker.postMessage("clear")
}

function updateUI(evt){
	document.getElementById("txt").textContent = evt.data
}


function pickSucceed(value){
	document.getElementById("txt").textContent = value.name
	const worker = new Worker("jboca_worker.js")
	worker.onmessage = updateUI
	worker.postMessage(value)
}

function promiseFail(reason){
	document.getElementById("txt").textContent = reason
}

function pickFile(reason){
	var d = window.showSaveFilePicker();
	d.then(pickSucceed,promiseFail)
}