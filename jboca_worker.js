self.onmessage = recordNumber

function recordNumber(evt){
	const fileRWHandle = evt.data
	const fileSize = fileRWHandle.getSize()
	const msg = new TextEncoder().encode(new Date().toLocaleString())
	fileRWHandle.write(msg, { at: fileSize })
	fileRWHandle.flush()
	fileRWHandle.close()
	self.postMessage("file updated")
}