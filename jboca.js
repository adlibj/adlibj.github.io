/*** What functions are there?

init_board()
*/

/*** Jobs they do:

:: init_board() ::

*/

var fileHandle
var fileRWHandle

init_board();

function init_board(){
	var txt = document.getElementById("txt");
	document.getElementById("button_pick").addEventListener("click",pickFile);
	//
}

function updateUI(evt){
	document.getElementById("txt").textContent = evt.data
}

function createSyncAccessSucceed(value){
	document.getElementById("txt").textContent = value
	const worker = new Worker("jboca_worker.js")
	worker.onmessage = updateUI
	worker.postMessage(value)
}

function pickSucceed(value){
	document.getElementById("txt").textContent = value.name
	fileHandle = value
	var d = fileHandle.createSyncAccessHandle()
	d.then(createSyncAccessSucceed,promiseFail)
}

function promiseFail(reason){
	document.getElementById("txt").textContent = reason
}

function pickFile(reason){
	var d = window.showSaveFilePicker();
	d.then(pickSucceed,promiseFail)
}