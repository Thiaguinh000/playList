// Array que irá armazenar as músicas da playlist
let playlist = [];

// Seleciona os elementos do DOM que serão utilizados
const form = document.getElementById('form-musica');
const lista = document.getElementById('playlist');

// Função para salvar a playlist no localStorage
function salvarNoLocalStorage() {
  // Converte o array em uma string JSON e salva com a chave "playlist"
  localStorage.setItem('playlist', JSON.stringify(playlist));
}

// Função para carregar a playlist do localStorage ao iniciar a página
function carregarDoLocalStorage() {
  const dados = localStorage.getItem('playlist');
  // Se houver dados salvos, converte de volta para array e exibe
  if (dados) {
    playlist = JSON.parse(dados);
    atualizarLista();
  }
}

// Função para atualizar a lista na tela
function atualizarLista() {
  // Limpa a lista atual antes de exibir novamente
  lista.innerHTML = '';

  // Percorre todas as músicas e cria um <li> para cada uma
  playlist.forEach((musica, index) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <strong>${musica.nome}</strong> - ${musica.artista} 
      <a href="${musica.link}" target="_blank">[Ouvir]</a>
      <button onclick="removerMusica(${index})">Remover</button>
    `;
    lista.appendChild(item);
  });
}

// Função para remover uma música da playlist
function removerMusica(indice) {
  // Remove 1 item na posição indicada
  playlist.splice(indice, 1);
  salvarNoLocalStorage(); // Atualiza o armazenamento
  atualizarLista();       // Atualiza a tela
}

// Evento de envio do formulário
form.addEventListener('submit', function(evento) {
  evento.preventDefault(); // Evita recarregar a página

  // Cria um objeto com os dados da nova música
  const novaMusica = {
    nome: document.getElementById('nome').value,
    artista: document.getElementById('artista').value,
    link: document.getElementById('link').value
  };

  // Adiciona a música no array
  playlist.push(novaMusica);

  // Salva no localStorage e atualiza a tela
  salvarNoLocalStorage();
  atualizarLista();

  // Limpa os campos do formulário
  form.reset();
});

// Chama a função ao carregar a página
carregarDoLocalStorage();
