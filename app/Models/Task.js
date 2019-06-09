'use strict'

const Model = use('Model')

class Task extends Model {
  // static é como se fosse o constructor, olhar na documentação os tipos de hook
  static boot () {
    super.boot()

    // tipo de hook que iremos usar. Nesse casa ele vai disparar antes da task
    // ser criada ou alterada. Segundo parametro é nome do arq que criamos e o
    // metado criado nele tbm.
    // vamos usar o after para poder manipular depois dos dados salvos no banco
    // e beforeUpdate porq quando é salvo no BD a parte do dirty é resetada
    this.addHook('afterCreate', 'TaskHook.sendNewTaskMail')
    this.addHook('beforeUpdate', 'TaskHook.sendNewTaskMail')
  }
  // a tarefa pertence a um projeto
  project () {
    return this.belongsTo('App/Models/Project')
  }

  // pertence a um user, o user tem que fazer essa tarefa
  user () {
    return this.belongsTo('App/Models/User')
  }

  // pode ter um arquivo. OBS: se uma tarefa tivesse varios arqs teria que ter
  // uma tabela apenas para guardar o relacionamento tabela - arquivo, uma tabela
  // pivor, usaria o belongsToMany. Olhar documentação
  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
