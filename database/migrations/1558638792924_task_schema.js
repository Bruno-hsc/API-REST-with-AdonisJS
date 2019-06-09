'use strict'

const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', table => {
      table.increments()
      table
        // toda task vai pertencer a um projeto
        .integer('project_id')
        // força que seja so valores positivos
        .unsigned()
        .notNullable()
        // nome do campo que quer referenciar
        .references('id')
        // vamos referenciar a projetos
        .inTable('projects')
        // para se o campo for atualizado atualiza na table projetos tbm
        .onUpdate('CASCADE')
        // quando um projeto for deletado, suas tarefas tbm serão
        .onDelete('CASCADE')

      // uma task tambem pode ser associação a um user, aqui referenciamos
      // om o user_id
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      // relacionamento da tarefa com arquivo
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('title').notNullable()
      table.text('description')
      // qual a data que a task needs to be finish
      table.timestamp('due_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
