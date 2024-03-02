self.onmessage = recordNumber

async function recordNumber(evt){
	const fileHandle = evt.data
	const fileRWHandle = await fileHandle.createSyncAccessHandle()
	const fileSize = fileRWHandle.getSize()
	const msg = new TextEncoder().encode(new Date().toLocaleString())
	fileRWHandle.write(msg, { at: fileSize })
	fileRWHandle.flush()
	fileRWHandle.close()
	self.postMessage("file updated")
}