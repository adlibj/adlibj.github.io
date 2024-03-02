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
	const worker = new Worker("jboca_worker.js")
	worker.onmessage = updateUI
	worker.postMessage("fromMain")
	document.getElementById("button_pick").addEventListener("click",pickFile);
	//
}

function updateUI(msg){
	document.getElementById("txt").textContent = msg
}

function createSyncAccessSucceed(value){
	document.getElementById("txt").textContent = value
	fileRWHandle = value
	const fileSize = fileRWHandle.getSize()
	const msg = new TextEncoder().encode(new Date().toLocaleString())
	fileRWHandle.write(msg, { at: fileSize })
	fileRWHandle.flush()
	fileRWHandle.close()
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