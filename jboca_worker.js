self.onmessage = recordNumber

async function recordNumber(evt){
	const fileHandle = evt.data
	
	const root = await navigator.storage.getDirectory()
	const tmpFileHandle = await root.getFileHandle("a.txt", { create: true })
	const tmpAccessHandle = await tmpFileHandle.createSyncAccessHandle()
	const fileSize = tmpAccessHandle.getSize()
	const msg = new TextEncoder().encode(new Date().toLocaleString())
	tmpAccessHandle.write(msg, { at: fileSize })
	tmpAccessHandle.flush()
	tmpAccessHandle.close()
	self.postMessage("file updated")
}