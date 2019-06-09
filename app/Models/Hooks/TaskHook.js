'use strict'
const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

const TaskHook = (exports = module.exports = {})

// esse hook vai enviar um email para o user
// sendNewTaskMail no dado para mostrar o que faz
TaskHook.sendNewTaskMail = async taskInstance => {
  // verifica se a task campo user_id e se ele foi editado recentemente
  // porq se foi criado com user_id o email vai ser enviado dizendo que tem
  // uma nova tarefa. se for editada e o user nao alterar o user_id nao precisa
  // enviar outro email para o user.
  // o dirty grava dentro do model quais as novas info add no model, ou seja,
  // se dentro do dirty tiver o user_id ele foi editado recentemente.
  // o modo dirty é resetado quando as inf sao salvas no banco
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return

  // acessamos o relacionamento de user no arq task.js para saber qual o user
  // dessa task. () para indicar que esta querendo trabalhar com a classe user
  // aqui traz qual é o user relacionado com essa task.
  const { email, username } = await taskInstance.user().fetch()

  // aqui pegamos o file se tiver relacionaod com essa task
  const file = await taskInstance.file().fetch()

  // para pegar o title da task
  const { title } = taskInstance

  // aqui era onde envia o email antes de colocar na fila usando o kue
  // Job.key: key é a informação dentro do arq TaskHook.js get key e
  // passamos os parametros. o 3 param podemos passar mais objs de conf
  // para o job como prioridade, data, attepts(quantos vezes tentar se ouver falhas)
  // aletar algume se o job for execultado etc, consultar a documentação.
  Kue.dispatch(
    Job.key,
    { email, username, file, title },
    {
      // se nao conseguir enviar tentar 3 vezes
      attempts: 3
    }
  )
}
