'use strict'

// vamos importar o database uq eé do adonis para usar o trx que é no caso
// de algum campo nao for preenchido, nao criar o user, parar o processo de
// criação
const Database = use('Database')

// OBS: no adonis use é igual a require para arqs do adone, outras librarys
// usar require
const User = use('App/Models/User')

class UserController {
  // ctx é o contexto da req, ou seja, req e res
  async store ({ request }) {
    // com o only filtramos o que queremos, all vem tudo
    const data = request.only(['username', 'email', 'password'])

    // vamos busca o campo addresses com o request.input
    // retorna apenas uma info do body da req
    const addresses = request.input('addresses')

    // trx para se algum campo nao for preenchido parar todo o processo de
    // criação do user. usa a var como ultimo param abaixo
    // OBS: vamos usar sempre que tiver mais de uma operação no banco de
    const trx = await Database.beginTransaction()

    // criar um novo user
    const user = await User.create(data, trx)

    // aqui vai criar varios endereços ja que addresses é um array,
    // acessando afunction addresses
    await user.addresses().createMany(addresses, trx)

    // OBS: no adonis nao usamos o res para retornar porq automaticamente
    // porq quando passamos a flag api only na criação do projeto ele entende
    // que quando retornar alguma coisa do controler ele retorna um json

    // se nao deu erro, da um commit que é efetuar essas alterações no banco de dados
    await trx.commit()

    return user
  }

  async index ({ request, response }) {
    const users = await User.query().fetch()

    return users
  }
}

module.exports = UserController
