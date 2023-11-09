export const info = {

definition: {
openapi: '3.0.0',
info: {
    title: 'Ecommerce',
    version: '1.0.0',
    description : 'Ecommerce Products'

},

servers: [{

    url: 'http://localhost:8080'
}]

},

apis: ['/src/docs/*.yml']

};


