import { useEffect, useState } from "react"
import { getAllSRDMonsters } from "../utils/dndAPI"
import SearchMonster from "../components/SearchMonster"
import css from "./MainPage.module.css"
import SearchResult from "../components/SearchResult"
export default function MainPage() {
  const [allSRDMonsters, setAllSRDMonsters] = useState([])
  const [searchedMonsters, setSearchedMonsters] = useState([])
  const [page, setPage] = useState(1)
  const [displayedMonster, setDisplayedMonster] = useState([])

  useEffect(() => {
    setAllSRDMonsters(getAllSRDMonsters())
  }, [])
  return (
    <main className={css.MainPageWrapper}>
      <SearchMonster
        searchedMonsters={searchedMonsters}
        setSearchedMonsters={setSearchedMonsters}
        setDisplayedMonster={setDisplayedMonster}
      />
      <SearchResult
        searchedMonsters={searchedMonsters}
        page={page}
        setPage={setPage}
        displayedMonster={displayedMonster}
        setDisplayedMonster={setDisplayedMonster}
      />
    </main>
  )
}
