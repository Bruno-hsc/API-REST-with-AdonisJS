'use strict'

const Route = use('Route')

// quando receber um req post na url users, chama o userController
// OBS: nao precisa importar o arq de controller
Route.post('users', 'UserController.store').validator('User')
Route.get('users', 'UserController.index')

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)
Route.put('passwords', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)

Route.get('/files/:id', 'FileController.show')

// route.group por volta das rotas que so quer que tenhao acesso quando o user
// estiver logado
Route.group(() => {
  Route.post('/files', 'FileController.store')

  // aqui vamos usar uma rota que vai satisfazer todos os metados do controller
  // apenas para api. precisa rodar: adonis route:list e vai criar todas as
  // rotas possiveis para o controller, inde, store etc.
  // OBS: usando o resource fica um pouco diferente na hora de fazer o validator
  // vamos usar o map para mapear o que vamos validar.
  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(
      new Map([
        [
          // quais metados queremos validar e  qual validator
          ['projects.store'],
          ['Project']
        ]
      ])
    )

  // OBS:projects.tasks vai criar o id do projeto antes do /task porq nesse caso
  // nao é possivel criar task sem criar um projeto, aqui esta concatenando
  // ficando assim: /projects/:projects_id/tasks. usado quando o registro nao
  // pode ser criado sem o seu pai ser criado. OBS precisa rodar adonis route:list
  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(
      new Map([
        [
          // quais metados queremos validar e  qual validator
          ['projects.tasks.store'],
          ['Task']
        ]
      ])
    )
}).middleware(['auth'])
