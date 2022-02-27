const express = require('express');
const {ApolloServer, gql} = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
const {tasks, users} = require("./constants");
const uuid = require('uuid');


// set env variables
dotEnv.config();

const app = express();

//cors
app.use(cors());

// body parser middleware
app.use(express.json());

const typeDefs = gql`

    """
    users:[User!],
    means user can be nullable on a list.
    greet:String!, // non nullable.


    """
    type Query{
        greet:String!,
        tasks:[Task!],
        task(id:ID!):Task,
        users:[User!],
        user(id:ID!):User
    },


    input CreateTaskInput{
        name:String!,
        completed:Boolean!,
        userId:ID!,
    },
    type Mutation{
        createTask(input:CreateTaskInput!):Task
    }
    type User{
        id:ID!,
        name:String!,
        email:String!,
        tasks:[Task!]
    },

 
    type Task{
        id:ID!,
        name:String!,
        completed:Boolean!
        user:User!

    }
    

`

/*
 type Task{
        id:ID!,
        name:String!,
        completed:Boolean!
        user:User! // user name is different so a field label reoolvers must be nammed.

    }
    name must be same as
  { id: "1", name: "Work", completed: false, userId: "3" },

 */
const resolvers = {
    Query: {
        greet: () => "HELLO WORLD",
        //  greet:String!, has to be here. alongside Greet.
        tasks: () => tasks,
        task: (_, args) => tasks.find(task => task.id === args.id),
        users: () => users,
        user: (_, {id}) => users.find(user => user.id === id)


    },



        Task: {
            // Task is the object.
            user: (parent) => users.find(user => user.id === parent.userId),


            // parent will hold individal task object,
        },
        User: {
            tasks: (parent) => tasks.filter(task => task.userId === parent.id)
        },
    Mutation:{
        createTask:(_,{input}) =>{
            const task = {...input,id:uuid.v4()}
            tasks.push(task);
            return task;
        }
    }

}



async function startServer() {
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });
    await apolloServer.start()
    apolloServer.applyMiddleware({app, path: '/graphql'});


    const PORT = process.env.PORT || 3000;

    app.use('/', (req, res, next) => {
        res.send({message: 'Hello'});
    })

    app.listen(PORT, () => {
        console.log(`Server listening on PORT: ${PORT}`);
        console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`);
    });
}

startServer()
