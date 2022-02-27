
const uuid = require("uuid");
const {tasks, users} = require("../../constants");

const taskResolver={

    //region *** Query ***
    Query: {
        tasks: () => tasks,
        task: (_, args) => tasks.find(task => task.id === args.id),



    },
    //endregion


    //***Task relatedField Query***
    Task: {
        // Task is the object.
        user: (parent) => users.find(user => user.id === parent.userId),


        // parent will hold individal task object,
    },
    //endregion


    //region ***Mutations***
    Mutation: {
        createTask: (_, {input}) => {
            const task = {...input, id: uuid.v4()}
            tasks.push(task);
            return task;
        }
    }
    //endregion


}

module.exports = taskResolver;