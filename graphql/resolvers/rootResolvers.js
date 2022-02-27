const userResolver = require("./UserResolver");
const taskResolver = require("./TaskResolver");

const resolvers = [
    userResolver,
    taskResolver
]

module.exports = resolvers;