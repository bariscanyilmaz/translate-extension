const API_KEY = '<YANDEX TRANSLATE API_KEY>';
let btnTranslate;
let responseBox;
let resourceBox;
let loader;



document.addEventListener('DOMContentLoaded', function () {
	
	try {

		btnTranslate = document.getElementById('btn-translate');
		responseBox = document.getElementById('response');
		resourceBox = document.getElementById('resource-text');

		loader = document.getElementById('loader');

		btnTranslate.addEventListener('click', (e) => {

			let text = getResource();
			if (text) {
				responseBox.style.display = 'none'
				loader.style.display = 'block';
				translate(text).then((val) => {
					responseBox.innerText = (val);
					loader.style.display = 'none';
					responseBox.style.display = 'block'

				})
			}

		});


		chrome.storage.sync.get(['content'], function (stored) {

			if (stored.content) {
				responseBox.style.display = 'none'
				loader.style.display = 'block';
				translate(stored.content).then(function (val) {
					responseBox.innerText = (val);
					loader.style.display = 'none';
					responseBox.style.display = 'block'
				});
			}
		})

	} catch (ex) {
		console.log(ex);
	}






}, false);


function mockTranslate(text) {

	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve("merhaba dünya")
		}, 1000);
	})
}


async function translate(text) {
	let val = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${API_KEY}&text=${text}&lang=en-tr`).then(resp => resp.json());
	return (val.text.join());
}

function getResource() {
	return resourceBox.value;
}
