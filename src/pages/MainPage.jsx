import { useEffect, useState } from "react"
import { getAllSRDMonsters } from "../utils/dndAPI"
import SearchMonster from "../components/SearchMonster"
import css from "./MainPage.module.css"
export default function MainPage() {
  const [allSRDMonsters, setAllSRDMonsters] = useState([])
  const [searchedMonsters, setSearchedMonsters] = useState([])

  useEffect(() => {
    setAllSRDMonsters(getAllSRDMonsters())
  }, [])
  return (
    <main className={css.MainPageWrapper}>
      <SearchMonster
        searchedMonsters={searchedMonsters}
        setSearchedMonsters={setSearchedMonsters}
      />
    </main>
  )
}
