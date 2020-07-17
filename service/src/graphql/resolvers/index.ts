const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'JK Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
]
const resolvers = {
  Query: {
    books: () => books,
    stories: () => 'done',
    // @ts-ignore
    tasks: async (_, __, context, ___) => {
      const stories = await context.getTasks()
      const tasks = stories.flatMap((s: any) => s.tasks)
      console.log(tasks)
      return tasks
    },
  },
}

export default resolvers
