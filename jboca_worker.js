self.onmessage = recordNumber

async function recordNumber(evt){
	const fileHandle = evt.data
	
	const root = await navigator.storage.getDirectory()
	const tmpFileHandle = await root.getFileHandle("a.txt", { create: true })
	const tmpAccessHandle = await tmpFileHandle.createSyncAccessHandle()
	var fileSize = tmpAccessHandle.getSize()
	const msg = new TextEncoder().encode(new Date().toLocaleString())
	tmpAccessHandle.write(msg, { at: fileSize })
	
	var fileSize = tmpAccessHandle.getSize()
	const buffer = new DataView(new ArrayBuffer(fileSize))
	tmpAccessHandle.read(buffer, { at: 0 })
	
	tmpAccessHandle.flush()
	tmpAccessHandle.close()
	
	const writableHandle = await fileHandle.createWritable()
	await writableHandle.write(buffer)
	await writableHandle.close()
	
	self.postMessage("file updated")
}