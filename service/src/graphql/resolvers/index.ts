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

      //const stories: Array<any> = [] //await context.getTasks()
      const stories: Array<any> = await context.getTasks()
      const members = (await context.getMembers()).map((m: any) => ({
        id: m.id,
        name: m.profile.name,
      }))

      // task {
      //   description: 'create custom report for clubhouse showing all tasks - July 15, 2020 - DUE July 17, 2020',
      //   entity_type: 'story-task',
      //   story_id: 2847,
      //   mention_ids: [],
      //   member_mention_ids: [],
      //   completed_at: null,
      //   updated_at: '2020-07-17T00:59:34Z',
      //   group_mention_ids: [],
      //   owner_ids: [],
      //   external_id: null,
      //   id: 2857,
      //   position: 1,
      //   complete: false,
      //   created_at: '2020-07-15T01:36:01Z'
      // }

      const tasks = stories
        .flatMap((s: any) => s.tasks)
        .map((t) => {
          console.log('task', t)
          return {
            ...t,
            owners: t.owner_ids
              .map(
                (userId: string) =>
                  members.find((m: any) => m.id === userId).name,
              )
              .join(','),
          }
        })

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
