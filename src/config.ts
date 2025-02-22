export default {
  reeApi: {
    baseUrl: 'https://apidatos.ree.es',
    balance: '/es/datos/balance/balance-electrico',
    generation: {
      production: '/es/datos/generacion/evolucion-generacion',
      demand: {
        forecast: '/es/datos/demanda/prevision',
        real: '/es/datos/demanda/evolucion-demanda',
        maxTime : '/es/datos/generacion/demanda-maxima-horaria',
      },
      renewable: '/es/datos/generacion/evolucion-renovable',
    }
  },
}
