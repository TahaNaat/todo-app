const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLString, GraphQLNonNull } = require('graphql');
const { ProjectType, TaskType } = require('./types');
const { Project, Task } = require('../models');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.findAll();
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.findAll();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Project.create({ name: args.name, description: args.description });
            }
        },
        addTask: {
            type: TaskType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLString },
                status: { type: GraphQLString },
                due_date: { type: GraphQLString },
                projectId: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return Task.create({
                    title: args.title,
                    description: args.description,
                    status: args.status,
                    due_date: args.due_date,
                    projectId: args.projectId
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
