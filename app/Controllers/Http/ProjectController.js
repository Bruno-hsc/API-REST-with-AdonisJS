'use strict'
// aqui faremos o crud, creat, read, update delete etc

const Project = use('App/Models/Project')

class ProjectController {
  async index ({ request }) {
    // para pegar a pagina, o request.get retorna os queryparams vindos
    // da url. OBS: se quiser configurar quantos itens por pagina etc
    // consiltar a documentação. chamando uma pagina: projects?page=2
    const { page } = request.get()

    // Project.query().with('user') p/ carregar um relacionamento em cada
    // nivel. fetch para encerrar a query, as inf do user vao aparecer todas
    // para fazer a paginação vamos trocar o .fetch por .paginate(numero da pagina)
    const projects = await Project.query()
      .with('user')
      .paginate(page)

    return projects
  }

  // criar um projeto
  async store ({ request, response, auth }) {
    // no data pegamos os campos que precisamos para a criação do projeto
    // pegando o auth paga relacionar o id do user logado com a criação do
    // project.
    // const data = request.only(['title', 'description']) busca os dados da req
    const data = request.only(['title', 'description'])

    // const para a criação do project, auth.user aqui temos acesso a todas
    // as inf do user logado, user_id: auth.user.id to fill with id logado
    // por causa do relacionamento do projeto com user.
    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  async show ({ params }) {
    const project = await Project.findOrFail(params.id)

    // para mostrar outras inf de user por ex ou as tarefas, aqui nao vamos usar
    // o .with, porq aqui é um unico obj, o index eram varios. aqui vamos usar
    // o load epassamos o nome do relacionamento
    await project.load('user')
    await project.load('tasks')

    return project
  }

  async update ({ params, request }) {
    const project = await Project.findOrFail(params.id)
    const data = request.only(['title', 'description'])

    // merge: coloca as infs que vem da req date dentro desse obj project que
    // criamos
    project.merge(data)

    await project.save()

    // depois de salvar retorna o project atualizado
    return project
  }

  async destroy ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
