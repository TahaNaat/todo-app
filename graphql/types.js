const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const { Project, Task } = require('../models');

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.findAll({ where: { projectId: parent.id } });
            }
        }
    })
});

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLInt },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        due_date: { type: GraphQLString },
        project: {
            type: ProjectType,
            resolve(parent, args) {
                return Project.findByPk(parent.projectId);
            }
        }
    })
});

module.exports = { ProjectType, TaskType };
