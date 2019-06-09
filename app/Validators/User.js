'use strict'
// aqui vamos fazer as validações na hora de entrar com os dados
// na parte do user. OBS: nos Routes passar .validator('nome do arq de validação)

// antl library para fazer as traduções nos testes, nas validações
const Antl = use('Antl')

class User {
  // o adonis vai na validação e no primeiro campo qu nao satisfazer ele ja para
  // e nao valida os demais, com o validadeAll vai validar todos os campos de uma
  // so vez e ja retorna tudo
  get validateAll () {
    return true
  }

  get rules () {
    return {
      // requerido e unique:users (unico dentro da table users)
      username: 'required|unique:users',
      // requerido| email(precisa estar no formato de email, ou seja, contendo
      // um @ .com etc
      email: 'required|email|unique:users',
      // requerido, e querer confirmação
      password: 'required|confirmed'
    }
  }

  get messages () {
    // validation nome do arq que criamos no resources/locales
    return Antl.list('validation')
  }
}

module.exports = User
