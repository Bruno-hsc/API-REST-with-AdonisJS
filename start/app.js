'use strict'

const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/mail/providers/MailProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/validator/providers/ValidatorProvider',
  '@adonisjs/antl/providers/AntlProvider',
  '@adonisjs/redis/providers/RedisProvider',
  'adonis-kue/providers/KueProvider'
]

const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  'adonis-kue/providers/CommandsProvider'
]

const aliases = {}

const commands = []

// jobs, ultilizados depois de instalar o kue para gerencias filas
// nessa var vai estar a fila de jobs, OBS exportada mais abaixo.
// OBS: as caminhos são copiados depois de rodar o comando para criar o job
const jobs = ['App/Jobs/NewTaskMail']

module.exports = { providers, aceProviders, aliases, commands, jobs }
