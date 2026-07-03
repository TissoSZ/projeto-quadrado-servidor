const formulario = document.getElementById('formQuadrado');
const campoNumero = document.getElementById('numero');
const resultado = document.getElementById('resultado');

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const numero = Number(campoNumero.value);
  const quadrado = numero * numero;

  try {
    const resposta = await fetch('/api/quadrado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        numero: numero,
        quadrado: quadrado
      })
    });

    const dados = await resposta.json();

    resultado.hidden = false;

    if (dados.sucesso) {
      resultado.className = 'resultado sucesso';
      resultado.innerHTML = `
        <strong>${dados.mensagem}</strong><br>
        Número informado: ${dados.numeroRecebido}<br>
        Quadrado enviado: ${dados.quadradoRecebido}<br>
        Validação: ${dados.validacaoServidor}
      `;

      campoNumero.value = '';
      campoNumero.focus();
    } else {
      resultado.className = 'resultado erro';
      resultado.textContent = dados.mensagem;
    }
  } catch (erro) {
    resultado.hidden = false;
    resultado.className = 'resultado erro';
    resultado.textContent = 'Não foi possível enviar os dados para o servidor.';
  }
});
