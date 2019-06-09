'use strict'
// o projeto pertence a um user, u user cria um projeto e um projeto pode ter
// varias tabelas. Aqui vamos criar o relacionamento

const Model = use('Model')

class Project extends Model {
  // criamos um metado exatamente com o nome do relacionamento user
  user () {
    // relacionamos que um projeto pertence o model de user
    return this.belongsTo('App/Models/User')
  }

  // usaremos tasks porq aqui pode ser mais de uma, user nao
  tasks () {
    // hasMany: pode ter varias tasks
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Project
