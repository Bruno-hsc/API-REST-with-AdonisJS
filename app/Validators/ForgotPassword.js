'use strict'

// antl library para fazer as traduções nos testes, nas validações
const Antl = use('Antl')

class ForgotPassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      // url de redirecionamento, vai ser requerida e ser no formato de url
      redirect_url: 'required|url'
    }
  }

  get messages () {
    // validation nome do arq que criamos no resources/locales
    return Antl.list('validation')
  }
}

module.exports = ForgotPassword
