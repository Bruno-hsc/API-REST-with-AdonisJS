'use strict'

const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', table => {
      table.increments()
      // todo projeto será criado por um user, aqui será o relacionamento entre eles
      // OBS: cada table é um campo
      table
        .integer('user_id')
        // força que seja so valores positivos
        .unsigned()
        // nome do campo que quer referenciar
        .references('id')
        // em qual tabela quer referenciar
        // OBS: nesse caso user_id esta fazendo uma foreing key na table user
        // com o campo id
        .inTable('users')
        // para se o campo for atualizado atualiza na table projetos tbm
        .onUpdate('CASCADE')
        // qaundo  o user for deletado seta o user_id ao inves de deletar o
        // projeto
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.text('description').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
