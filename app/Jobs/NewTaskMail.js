'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

class NewTaskMail {
  // concurrency determina quando desses jobs queremos processar simuntaneamente
  // conseguimos lidar com mais de um job ao mesmo tempo
  static get concurrency () {
    return 1
  }

  // essa key é gerada automaticamente é como se fosse uma chave unica gerada
  // para cada job da nossa aplicação
  static get key () {
    return 'NewTaskMail-job'
  }

  // é o que vai fazer a logica para enviar o email, copiaremos a parte de envio
  // do email antes escrita no arq taskHook
  // usando a desestruturação tiramos as inf title, file etc de dentro de data
  async handle ({ email, username, title, file }) {
    console.log(`Job: ${NewTaskMail.key}`)
    await Mail.send(
      // template que vamos criar
      ['emails.new_task'],
      // as var que vamos passar para o template
      {
        username,
        title,
        // !! para firar sempre booleano
        hasAttachment: !!file
      },
      message => {
        message
          .to(email)
          .from('brunohenriquescosta@hotma.com', 'Bruno Henrique')
          .subject('New task to you')

        // se tiver uma arq, se encontrou um relacionamento vamos add um anexo
        // na task
        if (file) {
          // helpers.tmpPath é onde vai estar o attach, uploads/${file.file} é o
          // caminho fisico do arq
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            // segundo param filename para modificar o nome do arq para ficar
            // exatamente com o nome que o user fez upload
            filename: file.name
          })
        }
      }
    )
  }
}

module.exports = NewTaskMail
