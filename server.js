const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');
const playground = require('graphql-playground-middleware-express').default;
const schema = require('./graphql/schema');

const app = express();
app.use(express.json());

// GraphQL endpoint
app.all('/graphql', createHandler({ schema }));

// GraphQL Playground
app.get('/playground', playground({ endpoint: '/graphql' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
