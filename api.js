/*texto animado*/
const typed = new Typed('.typed', {
	strings: [
		'<i class="apiRepo">Repositorios</i>',
	],

	//stringsElement: '#correntes-texto', // ID do elemento que contém correntes de texto a mostrar.
	typeSpeed: 75, // Velocidade em milisegundos para por uma letra,
	startDelay: 300, // Tempo de retrasso em iniciar a animação. Aplica também quando termina e volta a iniciar,
	backSpeed: 75, // Velocidade em milisegundos para apagar uma letra,
	smartBackspace: true, // Eliminar soamente as palavras que sejan novas em uma corrente de texto.
	shuffle: false, // Alterar o ordem em que escreve as palavras.
	backDelay: 1500, // Tempo de espera depois de que termina de escrever uma palavra.
	loop: true, // Repetir o array de strings
	loopCount: false, // Cantidade de vezes a repetir o array.  false = infinite
	showCursor: true, // Mostra o cursor palpitanto
	cursorChar: '|', // Caracter para o cursor
	contentType: 'html', // 'html' o 'null' para texto sem formato
});


var appForm = document.querySelector("#app form");
var listaEl = document.querySelector("#app ul");

var xhttp = new XMLHttpRequest();
var url_base = "https://api.github.com/";

var lista = [];

appForm.onsubmit = buscarRepo;

function buscarRepo(e){
	e.preventDefault();

	var user = document.getElementById("input_user").value;
	if(user.length === 0) {
		alert("Por favor, preencha o nome do usuário");
		return;
	}

	var url = url_base + 'users/' + user + '/repos';
	xhttp.open('GET', url);
	xhttp.send();

	xhttp.onreadystatechange = function(){
		if(xhttp.readyState === 4){
			if(xhttp.status === 200){
				var result = JSON.parse(xhttp.responseText);
				console.log(result);

				lista =result.map(function(item){
					return { 
						name: item.name, 
						description: item.description,  
						html_url: item.html_url
					};
				});
				renderLista();
			}
			else{
				alert('Falha ao buscar usuário. Tente novamente mais tarde.');
			}
		}
	}
}

function renderLista(){
	listaEl.innerHTML = '';

	for(item of lista){
		var nameEl = document.createElement('strong');
		nameEl.appendChild(document.createTextNode(item.name));

		var descriptionEl = document.createElement('p');
		descriptionEl.appendChild(document.createTextNode(item.description));

		var urlEl = document.createElement('a');
		urlEl.setAttribute('href', item.html_url);
		urlEl.setAttribute('target', '_blank');
		urlEl.appendChild(document.createTextNode(item.html_url));
		
		var itemEl = document.createElement('li');
		itemEl.appendChild(nameEl);
		itemEl.appendChild(descriptionEl);
		itemEl.appendChild(urlEl);

		listaEl.appendChild(itemEl);
	}
}

