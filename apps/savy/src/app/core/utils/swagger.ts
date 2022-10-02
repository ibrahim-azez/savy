export const swaggerDocument = {
  swagger: '2.0',
  info: {
    version: '1.0.0',
    title: 'Savy',
    description: 'My User Project Application API',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  host: 'http://localhost:3333',
  basePath: '/',
  tags: [
    {
      name: 'Users',
      description: 'API for users in the system',
    },
  ],
  schemes: ['http'],
};
