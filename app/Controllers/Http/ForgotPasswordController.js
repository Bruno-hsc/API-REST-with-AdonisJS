'use strict'

// bibli do node para gerar um token aleatorio
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')
const moment = require('moment')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      // vamos buscar o email da req, e p/ um unico campo usamos o input
      // informado pelo user
      const email = request.input('email')

      // tentamos encontrar um user com esse email, findBy encontra um unico
      // registro, by para pegar uma outra coluna, no caso, o email.
      // or fail para caso nao der certo.
      const user = await User.findByOrFail('email', email)

      // se encontrar cria um token, tamanho de 10, em hexadecimal
      user.token = crypto.randomBytes(10).toString('hex')
      // coloca a data atual
      user.token_created_at = new Date()

      // salva o user
      await user.save()

      // enviamos um email p/ o user informando que ele fex uma req de
      // alteração de senha
      await Mail.send(
        ['emails.forgot_password'], // qual template vamos usar
        // quais param vamos enviar para o template, eviar as vars
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from('brunohenriquescosta@hotmail.com', 'Bruno Henrique')
            .subject('Password recovery')
        }
      )
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Invalid email' } })
    }
  }

  // nesse metado vamos alterar a senha
  async update ({ request, response }) {
    try {
      // pega o token e o password que ele envia pela req
      const { token, password } = request.all()

      // aqui vamos procurar o user
      const user = await User.findByOrFail('token', token)

      // usando a bibl moment vamos ver se o token nao esta expirado
      // moment() - pegamos a data atual
      const tokenExpired = moment()
        .subtract('2', 'days') // tira 2 dias da data atual
        .isAfter(user.token_created_at) // verifica se continua maior que tokenat

      if (tokenExpired) {
        return response.status(401).send({
          error: {
            message: 'Expired token'
          }
        })
      }

      // se o token nao estiver expirado
      user.token = null
      user.token_created_at = null
      // passoword que vem da req, que é a nova senha
      user.password = password

      await user.save()
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: 'Something went wrong trying to reset the password'
        }
      })
    }
  }
}

module.exports = ForgotPasswordController
