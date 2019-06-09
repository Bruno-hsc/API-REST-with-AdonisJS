'use strict'

class SessionController {
  async store ({ request, response, auth }) {
    // pega o email e a senha que o user digitou
    const { email, password } = request.all()

    // auth.attempt metado para gerar o token
    const token = await auth.attempt(email, password)

    return token
  }
}

module.exports = SessionController
