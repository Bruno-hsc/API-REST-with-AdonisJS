'use strict'

const Model = use('Model')
const Env = use('Env')

class File extends Model {
  // aqui vamos criar um novo campo virtal, campo que nao existe na tabela
  // do BD, toda vez que mostrarmos o arq ele vem junto, esse campo é a url
  // para mostrar o arq, dessa forma conseguimos ter acesso a url do arq dire
  // tamente pelo model e nao precisar ficar criando toda vez a url no front
  // computed() retorna o novo campo que vai inserir
  static get computed () {
    return ['url']
  }
  // pega so id do model que esta sendo extendido acima, app_url em do arq .env
  // /files/${id}` rota que criamos
  getUrl ({ id }) {
    return `${Env.get('APP_URL')}/files/${id}`
  }
}

module.exports = File
