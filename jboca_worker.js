self.onmessage = recordNumber

async function recordNumber(evt){
	const root = await navigator.storage.getDirectory()
	
	if(evt.data == "clear") {
		try {
		const reason = await root.removeEntry("a.txt")
		self.postMessage("Log cleared")
		} catch(e) {
		self.postMessage("Log already cleared")
		self.close()
		}
	} else {
		fetch("https://www.boca.gov.tw/sp-wain-board-1.html",{ mode:"no-cors" })
			.then(
				(response) => {
					if(response.ok) {
						return response.text()
					}
				}
			)
			.then(
				async (txt) => {
					const tmpFileHandle = await root.getFileHandle("a.txt", { create: true })
					const tmpAccessHandle = await tmpFileHandle.createSyncAccessHandle()
					var fileSize = tmpAccessHandle.getSize()
					const msg = new TextEncoder().encode((new Date().toLocaleString()) + " " + txt.match(/一般件目前號碼.*?>(\d*?)</)[1] + "\n")
					tmpAccessHandle.write(msg, { at: fileSize })
					
					var fileSize = tmpAccessHandle.getSize()
					const buffer = new DataView(new ArrayBuffer(fileSize))
					tmpAccessHandle.read(buffer, { at: 0 })
					
					tmpAccessHandle.flush()
					tmpAccessHandle.close()
					
					const fileHandle = evt.data
					const writableHandle = await fileHandle.createWritable()
					await writableHandle.write(buffer)
					await writableHandle.close()
					self.postMessage("Log updated")
				}
			)
		
		//self.close()
	}
}