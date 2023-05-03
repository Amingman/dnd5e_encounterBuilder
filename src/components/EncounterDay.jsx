import React, { Component, useEffect, useState } from "react"
import css from "./Encounter.module.css"
import EncounterCard from "./EncounterCard"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import SearchPage from "../pages/SearchPage"
import { capitaliseFirstLetter } from "../utils/generalFunctions"

export default function EncounterDay() {
  const initData = {
    monsters: {
      //   aboleth: { index: "aboleth", name: "aboleth", challenge_rating: 10 },
      //   aboleth2: { index: "aboleth2", name: "aboleth2", challenge_rating: 10 },
      //   aboleth3: { index: "aboleth3", name: "aboleth3", challenge_rating: 10 },
      //   aboleth4: { index: "aboleth4", name: "aboleth4", challenge_rating: 10 },
      //   aboleth5: { index: "aboleth5", name: "aboleth5", challenge_rating: 10 },
    },
    encounterGroups: {
      pool: {
        id: "pool",
        title: "Pool",
        monsterIds: [],
        // monsterIds: [`aboleth`, `aboleth2`, `aboleth3`],
      },
      group1: {
        id: "group1",
        title: "Group1",
        monsterIds: [],
        // monsterIds: [`aboleth4`, `aboleth5`],
      },
    },
    groupOrder: ["pool", "group1"],
  }
  const [encounterData, setEncounterData] = useState(initData)

  function dragEndHandler(result) {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }
    const start = encounterData.encounterGroups[source.droppableId]
    const finish = encounterData.encounterGroups[destination.droppableId]

    if (start === finish) {
      const newMonsterIds = Array.from(start.monsterIds)
      newMonsterIds.splice(source.index, 1)
      newMonsterIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        monsterIds: newMonsterIds,
      }

      const newState = {
        ...encounterData,
        encounterGroups: {
          ...encounterData.encounterGroups,
          [newColumn.id]: newColumn,
        },
      }
      setEncounterData(newState)
      return
    }

    // Moving from one list to another
    const startGroupIds = Array.from(start.monsterIds)
    startGroupIds.splice(source.index, 1)
    const newStart = {
      ...start,
      monsterIds: startGroupIds,
    }

    const finishGroupIds = Array.from(finish.monsterIds)
    finishGroupIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      monsterIds: finishGroupIds,
    }

    const newState = {
      ...encounterData,
      encounterGroups: {
        ...encounterData.encounterGroups,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }
    setEncounterData(newState)
    return
  }

  function handleAdd(monster) {
    const newState = {
      ...encounterData,
      monsters: {
        ...encounterData.monsters,
        [monster.index]: monster,
      },
      encounterGroups: {
        ...encounterData.encounterGroups,
        pool: {
          id: "pool",
          title: "Pool",
          monsterIds: [
            ...encounterData.encounterGroups.pool.monsterIds,
            monster.index,
          ],
        },
      },
    }
    setEncounterData(newState)
  }

  function handleAddGroup() {
    console.log(`here`)

    const newGroupLen = Object.keys({ ...encounterData.encounterGroups }).length
    const newGroup = `group${newGroupLen}`
    const newState = {
      ...encounterData,
      encounterGroups: {
        ...encounterData.encounterGroups,
        [newGroup]: {
          id: newGroup,
          title: capitaliseFirstLetter(newGroup),
          monsterIds: [],
        },
      },
      groupOrder: [...encounterData.groupOrder, newGroup],
    }
    console.log(newState)
    setEncounterData(newState)
  }

  return (
    <main>
      {/* <EncounterCard /> */}
      <h2>My Encounter</h2>
      <section className={css.encounterWrapper}>
        <DragDropContext onDragEnd={dragEndHandler}>
          {encounterData.groupOrder.map((groupId, index) => {
            const group = encounterData.encounterGroups[groupId]
            const monsters = group.monsterIds.map(
              monsterId => encounterData.monsters[monsterId]
            )
            return (
              <EncounterCard
                title={group.title}
                id={groupId}
                monsters={monsters}
                key={groupId}
              />
            )
          })}
        </DragDropContext>
        <button onClick={handleAddGroup}>+</button>
      </section>

      <SearchPage handleAdd={handleAdd} />
    </main>
  )
}
