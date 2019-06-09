'use strict'

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Origin
  |--------------------------------------------------------------------------
  |
  | Set a list of origins to be allowed. The value can be one of the following
  |
  | Boolean: true - Allow current request origin
  | Boolean: false - Disallow all
  | String - Comma separated list of allowed origins
  | Array - An array of allowed origins
  | String: * - A wildcard to allow current request origin
  | Function - Receives the current origin and should return one of the above values.
  |
  */
  // origin: quais dominios vamos peritir acessar nossa aplicação, false so permite
  // que endereços com a mesma url da nossa aplicação possam acessar, se true
  // todos os indereços podem acessar. O mais recomendado é que passemos um array
  // e determinar quais os dominios podem acessar
  origin: true,

  /*
  |--------------------------------------------------------------------------
  | Methods
  |--------------------------------------------------------------------------
  |
  | HTTP methods to be allowed. The value can be one of the following
  |
  | String - Comma separated list of allowed methods
  | Array - An array of allowed methods
  |
  */
  // quais metados podem ultilizar
  methods: ['GET', 'PUT', 'POST', 'DELETE'],

  /*
  |--------------------------------------------------------------------------
  | Headers
  |--------------------------------------------------------------------------
  |
  | List of headers to be allowed via Access-Control-Request-Headers header.
  | The value can be one of the following.
  |
  | Boolean: true - Allow current request headers
  | Boolean: false - Disallow all
  | String - Comma separated list of allowed headers
  | Array - An array of allowed headers
  | String: * - A wildcard to allow current request headers
  | Function - Receives the current header and should return one of the above values.
  |
  */
  // true aceta todos os tipos de header
  headers: true,

  /*
  |--------------------------------------------------------------------------
  | Expose Headers
  |--------------------------------------------------------------------------
  |
  | A list of headers to be exposed via `Access-Control-Expose-Headers`
  | header. The value can be one of the following.
  |
  | Boolean: false - Disallow all
  | String: Comma separated list of allowed headers
  | Array - An array of allowed headers
  |
  */
  exposeHeaders: false,

  /*
  |--------------------------------------------------------------------------
  | Credentials
  |--------------------------------------------------------------------------
  |
  | Define Access-Control-Allow-Credentials header. It should always be a
  | boolean.
  |
  */
  credentials: false,

  /*
  |--------------------------------------------------------------------------
  | MaxAge
  |--------------------------------------------------------------------------
  |
  | Define Access-Control-Allow-Max-Age
  |
  */
  maxAge: 90
}
