'use strict'

// antl library para fazer as traduções nos testes, nas validações
const Antl = use('Antl')

class Session {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get messages () {
    // validation nome do arq que criamos no resources/locales
    return Antl.list('validation')
  }
}

module.exports = Session
