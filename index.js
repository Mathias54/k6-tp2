const fs = require('fs');

function parseJSON(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function resgatarTempoDeRequisicao() {
  let resultado = {};
  const resumos = [
    parseJSON('./k6/resumos/1-users-summary.json'),
    parseJSON('./k6/resumos/10-users-summary.json'),
    parseJSON('./k6/resumos/100-users-summary.json'),
  ];

  const mapearObjetoTabela = (media, index) => {
    let key = ' 1 usuário(s) ';
    if (index === 1) {
      key = ' 10 usuário(s) '
    }
    if (index === 2) {
      key = ' 100 usuário(s) '
    }
    return {
      [key]: `${media}ms`,
    };
  }

  const agregarObjetosTabela = (objTabela) => {
    resultado = {
      ...resultado,
      ...objTabela,
    };
  };

  resumos
    .map(({ metrics }) => metrics)
    .map(({ http_req_duration }) => http_req_duration)
    .map(({ avg }) => avg)
    .map(media => media.toFixed(2))
    .map(media => media.toString())
    .map(mapearObjetoTabela)
    .forEach(agregarObjetosTabela);

  return resultado;
}

function imprimirResultado() {
  const resultados = resgatarTempoDeRequisicao();
  console.table(resultados);
}

imprimirResultado();
