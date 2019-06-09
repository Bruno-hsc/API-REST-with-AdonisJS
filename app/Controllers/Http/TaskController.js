'use strict'

const Task = use('App/Models/Task')

class TaskController {
  // aqui vamos usar o param porq vamos retornar nesse index apenas as taks
  // do project que estamos mostrando.
  async index ({ params }) {
    const tasks = await Task.query()
      .where('project_id', params.projects_id)
      // para carregar tbm o user da task
      .with('user')
      .fetch()

    return tasks
  }

  async store ({ params, request }) {
    // OBS: dentro do store porq a rota create é para formulario
    // buscar os dados da req, OBS: nao vamos precisar enviar o project_id pelos
    // dados pois na rota criada em Routes  ja vem o project_id no endereço
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    // cria a tabela com todos esses dados(...data) e o project id que vai buscar dos
    // params
    const task = await Task.create({ ...data, project_id: params.projects_id })

    return task
  }

  async show ({ params }) {
    // busca a task, nao vai precisar do id do project
    const task = await Task.findOrFail(params.id)

    return task
  }

  async update ({ params, request }) {
    const task = await Task.findOrFail(params.id)
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    task.merge(data)

    await task.save()

    return task
  }

  async destroy ({ params }) {
    const task = await Task.findOrFail(params.id)

    await task.delete()
  }
}

module.exports = TaskController
