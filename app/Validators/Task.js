'use strict'

// antl library para fazer as traduções nos testes, nas validações
const Antl = use('Antl')

class Task {
  get rules () {
    return {
      title: 'required',
      // valida se o campo é uma data
      due_date: 'date'
    }
  }

  get messages () {
    // validation nome do arq que criamos no resources/locales
    return Antl.list('validation')
  }
}

module.exports = Task
