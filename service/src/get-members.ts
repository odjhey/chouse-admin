import Clubhouse from 'clubhouse-lib'

const CLUBHOUSE_TOKEN = process.env.clubhouseApiToken

let cache: {
  lastUpdate: any
  values: any
} = {
  lastUpdate: Date.now(),
  values: [],
}

const getMembersAsync = async (skipCache = false) => {
  if (!skipCache && cache.values.length > 0) {
    return cache.values
  }

  const client = Clubhouse.create(CLUBHOUSE_TOKEN || '') // See https://github.com/clubhouse/clubhouse-lib#how-to-get-an-api-token

  const members = await client.listMembers()

  /*
    {
      role: 'member',
      entity_type: 'member',
      disabled: false,
      updated_at: '2020-04-03T00:53:02Z',
      created_without_invite: false,
      group_ids: [],
      id: '5e8688ee-ac20-494a-9391-f483f2a70b9e',
      profile: {
        entity_type: 'profile',
        deactivated: false,
        two_factor_auth_activated: false,
        mention_name: 'gavilan24',
        name: 'Gavin Salcedo',
        gravatar_hash: 'd6bead72cdc1b7566195e1cc82f3b424',
        id: '5e38bb4f-d2f8-4ac2-bebb-e280e1a2034a',
        display_icon: null,
        email_address: 'gavin.salcedo@fasttrackph.com'
      },
      created_at: '2020-04-03T00:53:02Z'
    },
  */

  cache = {
    lastUpdate: Date.now(),
    values: members,
  }

  return cache.values
}

export { getMembersAsync }
