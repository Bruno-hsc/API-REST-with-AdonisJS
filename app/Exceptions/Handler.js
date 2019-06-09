'use strict'
// essa arq é como se fosse um global excecion handles, ou sehja vai captar
// os errosde todos os controllers da nossa aplicação

const Raven = require('raven')

const Config = use('Config') // do adonis
const Env = use('Env')
const Youch = use('youch')

const BaseExceptionHandler = use('BaseExceptionHandler')

class ExceptionHandler extends BaseExceptionHandler {
  // aqui é o que queremos retornar para o user final
  async handle (error, { request, response }) {
    // se for um erro de validação apenas retorna as msgs do erro
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }

    // aqui em hambiente de desenvolvimento vamos ultilizar uma dependencia
    // ja instalada no adonis Youch para formatar os erros e nos mostrar
    // OBS: request.request = segundo request é uma prop dentro da req contendo
    // todas as inf da req
    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request)
      // com o metado await vamos transformar o youch em json
      const errorJSON = await youch.toJSON()

      return response.status(error.status).send(errorJSON)
    }

    // se nao cair nos ifs ou seja, nao esta em desenvol, entao o user receberá
    // o  error e retornamos so o response, assim o user nao fica sabendo qual
    // o error.
    return response.status(error.status)
  }

  // o que vamos fazer com esse error
  // services é o nome do arq que criamos .sentry dentro do arq .dsn dentro do arq
  // e retorna a var anbiente que colocamos
  async report (error, { request }) {
    Raven.config(Config.get('services.sentry.dsn'))
    Raven.captureException(error)
  }
}

module.exports = ExceptionHandler
