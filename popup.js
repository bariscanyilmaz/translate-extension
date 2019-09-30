const API_KEY='<YANDEX TRANSLATE API_KEY>';

document.addEventListener('DOMContentLoaded', function () {

	try {
		let code = document.getElementById('code');
		chrome.storage.sync.get(['content'], function (stored) {
            
			if(stored.content){
                

                translate(stored.content).then(function(val){
                    code.innerText=(val);
                });

            }
			
		})

	} catch (ex) {
		alert(ex);
	}

}, false);


async function translate(text) {
	let val= await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY}&text=${text}&lang=en-tr`).then(resp => resp.json());
	 return (val.text.join());
}