onmessage = recordNumber

function recordNumber(msg){
	self.postMessage("worker activated")
}