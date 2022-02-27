const {users} = require("../../constants");


const userResolver ={

    //region ***Query ***
    Query: {

        users: () => users,
        user: (_, {id}) => users.find(user => user.id === id)


    },
    //endregion

    //region ***field Queries***
    User: {
        tasks: (parent) => tasks.filter(task => task.userId === parent.id)
    },
    //endregion


}

module.exports = userResolver;