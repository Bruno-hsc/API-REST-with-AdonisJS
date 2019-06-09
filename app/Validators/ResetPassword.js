'use strict'

// antl library para fazer as traduções nos testes, nas validações
const Antl = use('Antl')

class ResetPAssword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      token: 'required',
      // precisa da nova senha do user
      password: 'required|confirmed'
    }
  }

  get messages () {
    // validation nome do arq que criamos no resources/locales
    return Antl.list('validation')
  }
}

module.exports = ResetPAssword
