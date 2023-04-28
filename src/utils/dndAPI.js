function filterMonsterByAbilities(monster, keyword) {
  for (const ability of monster.special_abilities) {
    if (
      ability.desc.toLowerCase().includes(keyword) ||
      ability.name.toLowerCase().includes(keyword)
    ) {
      return true
    }
  }
  return false
}

function filterMonsterByActions(monster, keyword) {
  for (const action of monster.actions) {
    if (
      action.desc.toLowerCase().includes(keyword) ||
      action.name.toLowerCase().includes(keyword)
    ) {
      return true
    }
  }
  return false
}

function filterMonsterByLegendaryActions(monster, keyword) {
  for (const LAction of monster.legendary_actions) {
    if (
      LAction.desc.toLowerCase().includes(keyword) ||
      LAction.name.toLowerCase().includes(keyword)
    ) {
      return true
    }
  }
  return false
}

export async function getAllSRDMonsters() {
  return await fetch(`https://www.dnd5eapi.co/api/monsters`).then(res =>
    res.json()
  )
  // .then(res => console.log(res.results))
}

export async function getSRDMonsterByURL(index) {
  return await fetch(`https://www.dnd5eapi.co/api/monsters/${index}`).then(
    res => res.json()
  )
}

export async function getSRDMonsterByCR(crArr) {
  let queryString = "https://www.dnd5eapi.co/api/monsters?"
  crArr.forEach(cr => {
    queryString = `${queryString}challenge_rating=${cr}&`
  })
  queryString = queryString.slice(0, -1)
  return fetch(queryString)
    .then(res => res.json())
    .then(res => {
      console.log(`Filtered to ${res.count} monsters by CR`)
      return res.results
    })
}

export async function searchSRDMonster(queries) {
  // Filter CR
  let data = await getSRDMonsterByCR(queries.cr)

  // Fetch all Monster Data ASYNCHRONOUSLY to improve performance
  let monsters = await Promise.all(
    data.map(async monster => {
      let monsterData = await getSRDMonsterByURL(monster.index)
      return monsterData
    })
  )

  // Filter by Name
  if (queries.name) {
    monsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(queries.name)
    )
    console.log(`Filtered to ${monsters.length} monsters by name`)
  }

  const keywords = queries.keyword.split(" ")

  // Filter by Keyword on special_ability, actions and legendary actions
  if (keywords) {
    for (const keyword of keywords) {
      monsters = monsters.filter(monster => {
        if (
          filterMonsterByAbilities(monster, keyword) ||
          filterMonsterByActions(monster, keyword) ||
          filterMonsterByLegendaryActions(monster, keyword)
        ) {
          return monster
        }
      })
    }
    console.log(`Filtered to ${monsters.length} monsters by keywords`)
  }

  // Filter by Size and Type
  monsters = monsters
    .filter(monster => queries.size.includes(monster.size))
    .filter(monster => {
      if (queries.types.includes(`all`)) {
        return monster
      } else if (queries.types.includes(monster.type)) {
        return monster
      }
    })
  monsters.sort((a, b) => {
    return a.challenge_rating - b.challenge_rating
  })
  console.log(monsters)
  return monsters
}
