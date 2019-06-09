'use strict'

// no arq no models so tem a estrutura, vai mapear do BD automaticamente
// obs: model criado com adonis make...
const File = use('App/Models/File')

// helpers do adoni, uma serie de function para trabalhar com caminhos
// algumas functions de ajuada
const Helpers = use('Helpers')

class FileController {
  async show ({ params, response }) {
    // p/ pegar o file
    const file = await File.findOrFail(params.id)

    // retornar o file em formato de img, tmpPath é o caminho que estamos
    // guardando os arqs
    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async store ({ request, response }) {
    try {
      // verifica se existe um arq com o nome file, se nao tiver esse controller
      // nao faz nada
      if (!request.file('file')) return

      // tamanho limite, podemos alterar
      const upload = request.file('file', { size: '2mb' })

      // gerar um novo nome, {Date.now()} tempo atual p/ garantir que n tem
      // nomes repetidos . subtatil
      const fileName = `${Date.now()}.${upload.subtype}`

      // mover o arq p/ algum lugar, Helpers.tmPath('uploads') retorna o caminho
      // para uma pasta temporaria nao compartilhada entre ambientes de dev e prod
      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      // verifica se o processo deu certo
      if (!upload.moved()) {
        throw upload.error()
      }

      // criar um novo model, uma nova instancia no BD
      const file = await File.create({
        // como salvamos no storege
        file: fileName,
        // nome real do arq
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'File upload error' } })
    }
  }
}

module.exports = FileController
