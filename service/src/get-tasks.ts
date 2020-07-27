import Clubhouse from 'clubhouse-lib'

const CLUBHOUSE_TOKEN = process.env.clubhouseApiToken

let storyCache: {
  lastUpdate: any
  values: any
} = {
  lastUpdate: null,
  values: [],
}

const getTasksAsync = async (skipCache = false) => {
  const cacheAge = storyCache.lastUpdate
    ? Date.now() - storyCache.lastUpdate
    : 999999
  console.log('cache-age', cacheAge)

  //1 min
  if (!skipCache && cacheAge < 60000) {
    console.log('using cached')
    return storyCache.values
  }

  console.log('renewing cache')

  const client = Clubhouse.create(CLUBHOUSE_TOKEN || '') // See https://github.com/clubhouse/clubhouse-lib#how-to-get-an-api-token

  const [_w, projects] = await Promise.all([
    client.listWorkflows(),
    client.listProjects(),
  ])
  const stories = await Promise.all(
    projects.map((p) => client.listStories(p.id)),
  )

  const stories_ext = await Promise.all(
    stories.flat().map((s) => client.getStory(s.id)),
  )

  console.log('stories', stories_ext)

  storyCache = {
    lastUpdate: Date.now(),
    values: stories_ext,
  }

  console.log('caching result')
  return storyCache.values
}

export { getTasksAsync }
