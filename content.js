document.onselectionchange = function () {
    let content = window.getSelection().toString();
    
	chrome.storage.sync.set({ 'content': content },function(){
        
	});

};
