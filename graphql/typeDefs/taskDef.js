const {gql} = require("apollo-server-express");
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