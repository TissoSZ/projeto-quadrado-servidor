# Projeto: Enviar Quadrado ao Servidor

Este projeto permite que o usuário informe um número em uma página web. O JavaScript calcula o quadrado desse número e envia o resultado para um servidor Node.js.

## Tecnologias utilizadas

- HTML
- CSS
- JavaScript
- Node.js

## Como executar

1. Instale o Node.js no computador, caso ainda não tenha.
2. Abra a pasta do projeto no terminal.
3. Execute o comando:

```bash
npm start
```

4. Abra o navegador e acesse:

```text
http://localhost:3000
```

## Funcionamento

1. O usuário digita um número.
2. O sistema calcula o quadrado do número no navegador.
3. O quadrado é enviado para o servidor por meio de uma requisição `POST`.
4. O servidor recebe os dados, valida o resultado e retorna uma mensagem de confirmação.

## Exemplo

Se o usuário informar o número `5`, o sistema calcula:

```text
5 x 5 = 25
```

E envia o valor `25` para o servidor.
