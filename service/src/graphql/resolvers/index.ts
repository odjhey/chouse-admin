const resolvers = {
  Query: {
    // @ts-ignore
    allTasks: async (_, args, context, ___) => {
      // vars
      // page: Int
      // perPage: Int
      // sortField: String
      // sortOrder: String
      // filter: TaskFilter

      // TaskFilter
      // q: String
      // id: ID
      // title: String
      // views: Int
      // views_lt: Int
      // views_lte: Int
      // views_gt: Int
      // views_gte: Int
      // user_id: ID

      const stories = await context.getTasks()
      const tasks = stories.flatMap((s: any) => s.tasks)

      console.log('args', args)
      if (args.filter && args.filter.q) {
        const filteredTasks = tasks.filter((t: any) =>
          t.description.includes(args.filter.q),
        )
        console.log('f', filteredTasks)
        return filteredTasks
      }

      return tasks
    },
    // @ts-ignore
    _allTasksMeta: async (_, __, context) => {
      const stories = await context.getTasks()
      const tasks = stories.flatMap((s: any) => s.tasks)
      return { count: tasks.length }
    },
  },
}

export default resolvers
