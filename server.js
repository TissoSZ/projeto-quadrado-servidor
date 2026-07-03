const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const publicDir = path.join(__dirname, 'public');

function enviarResposta(res, statusCode, contentType, conteudo) {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(conteudo);
}

function servirArquivoEstatico(req, res) {
  const caminhoArquivo = req.url === '/'
    ? path.join(publicDir, 'index.html')
    : path.join(publicDir, req.url);

  const extensao = path.extname(caminhoArquivo).toLowerCase();
  const tipos = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8'
  };

  fs.readFile(caminhoArquivo, (erro, conteudo) => {
    if (erro) {
      enviarResposta(res, 404, 'text/plain; charset=utf-8', 'Arquivo não encontrado.');
      return;
    }

    enviarResposta(res, 200, tipos[extensao] || 'text/plain; charset=utf-8', conteudo);
  });
}

function receberQuadrado(req, res) {
  let corpo = '';

  req.on('data', parte => {
    corpo += parte.toString();
  });

  req.on('end', () => {
    try {
      const dados = JSON.parse(corpo);
      const numero = Number(dados.numero);
      const quadrado = Number(dados.quadrado);

      if (Number.isNaN(numero) || Number.isNaN(quadrado)) {
        enviarResposta(res, 400, 'application/json; charset=utf-8', JSON.stringify({
          sucesso: false,
          mensagem: 'Número ou quadrado inválido.'
        }));
        return;
      }

      const quadradoCorreto = numero * numero;

      console.log('Dados recebidos do cliente:');
      console.log(`Número informado: ${numero}`);
      console.log(`Quadrado enviado ao servidor: ${quadrado}`);

      enviarResposta(res, 200, 'application/json; charset=utf-8', JSON.stringify({
        sucesso: true,
        mensagem: 'Quadrado recebido com sucesso pelo servidor!',
        numeroRecebido: numero,
        quadradoRecebido: quadrado,
        validacaoServidor: quadrado === quadradoCorreto
          ? 'O quadrado enviado está correto.'
          : `O quadrado enviado está incorreto. O correto seria ${quadradoCorreto}.`
      }));
    } catch (erro) {
      enviarResposta(res, 400, 'application/json; charset=utf-8', JSON.stringify({
        sucesso: false,
        mensagem: 'Erro ao processar os dados enviados.'
      }));
    }
  });
}

const servidor = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/quadrado') {
    receberQuadrado(req, res);
    return;
  }

  if (req.method === 'GET') {
    servirArquivoEstatico(req, res);
    return;
  }

  enviarResposta(res, 405, 'text/plain; charset=utf-8', 'Método não permitido.');
});

servidor.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
