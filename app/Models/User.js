'use strict'

const Model = use('Model')
const Hash = use('Hash')

// class User extends Model  - extende do mod padrao do adonis
class User extends Model {
  // o static é o constructor, toda vez que a classe for criada é chamado
  static boot () {
    super.boot()

    // criptografa a senha do user quando alterar a senha ou quando um user for
    // criado
    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }
  // relacionamento entre user e address, ele pode ter mais de um endereço
  addresses () {
    return this.hasMany('App/Models/UserAddress')
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  // relacionamentos das tabelas

  // um user pode ter varios projetos
  projects () {
    return this.hasMany('App/Models/Project')
  }

  // um user pode ter varias tarefas
  tasks () {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = User
