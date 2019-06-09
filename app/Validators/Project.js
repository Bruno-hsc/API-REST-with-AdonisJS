'use strict'

// antl library para fazer as traduções nos testes, nas validações
const Antl = use('Antl')

class Project {
  get validateAll () {
    return true
  }
  get rules () {
    return {
      title: 'required',
      description: 'required'
    }
  }

  get messages () {
    // validation nome do arq que criamos no resources/locales
    return Antl.list('validation')
  }
}

module.exports = Project
