// aqui vamos armazenar informaçoes e variaveis sobre os servicos que vamos
// ultilizar. Os conf dao module.exports em um obj

const Env = use('Env')

module.exports = {
  // aqui vamos fazer a conf do sentry, a unica que vamos precisar é o dsn
  // que é a url do sentry. E precisamos criar uma nova var no .Env
  // esse dsn pegamos no site do sentry. depois de fazer isso vamos capturar
  // as exeções no arq da pasta que criamos exceptions/Handler.js
  sentry: {
    dsn: Env.get('SENTRY_DSN')
  }
}
