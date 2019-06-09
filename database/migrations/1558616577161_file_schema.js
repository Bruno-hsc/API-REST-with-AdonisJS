'use strict'

const Schema = use('Schema')

class FileSchema extends Schema {
  up () {
    this.create('files', table => {
      table.increments()
      // onde vai guardar o node do arq fisico do file, esse será o nome
      // que vamos gravar dentro do adoins
      table.string('file').notNullable()
      // nome original do arq, se o user subi uma img como 'avatar' vamos
      // gravar com outro nome, mas aqui quando for exibir a inf vai ser o nome
      table.string('name').notNullable()
      // type: img, pdf etc
      table.string('type', 20)
      // no cado da img, se é pnj, jpg etc
      table.string('subtype', 20)
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FileSchema
