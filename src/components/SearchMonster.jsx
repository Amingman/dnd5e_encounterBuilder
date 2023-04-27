import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  Slider,
  Grid,
  TextField,
  Button,
} from "@mui/material"
import { useRef, useState } from "react"
import css from "./SearchMonster.module.css"
import { searchSRDMonster } from "../utils/dndAPI"
import Summary from "./SearchSummary"

export default function SearchMonster({ setSearchedMonsters }) {
  const monsterTypesDict = {
    All: true,
    Abberation: true,
    Beast: true,
    Celestial: true,
    Construct: true,
    Dragon: true,
    Elemental: true,
    Fey: true,
    Fiend: true,
    Giant: true,
    Humanoid: true,
    Monstrosity: true,
    Ooze: true,
    Plant: true,
    Undead: true,
  }

  const [selectedMonsters, setSelectedMonsters] = useState(monsterTypesDict)
  const [crValues, setCRValues] = useState([0, 33])
  const [sizeValues, setSizeValues] = useState([0, 5])
  const [nameSearch, setNameSearch] = useState("")
  const [keywordSearch, setKeywordSearch] = useState("")

  const selectedMonstersRef = useRef()
  selectedMonstersRef.current = selectedMonstersRef

  function handleMonsterType(event) {
    let currentObj = { ...selectedMonsters }
    let label = event.target.value
    currentObj[label] = !currentObj[label]
    setSelectedMonsters(currentObj)
  }

  const CRRangeText = [
    ...[`0`, `1/8`, `1/4`, `1/2`],
    ...Array(30)
      .fill(1)
      .map((x, y) => String(x + y)),
  ]
  const marksDict = {}
  CRRangeText.forEach((cr, index) => {
    return (marksDict[index] = cr)
  })

  function valueCRText(value) {
    return marksDict[value]
  }
  function handleCRChange(event, newVal) {
    setCRValues(newVal)
  }

  const sizeRange = [
    { value: 0, label: `Tiny` },
    { value: 1, label: `Small` },
    { value: 2, label: `Medium` },
    { value: 3, label: `Large` },
    { value: 4, label: `Huge` },
    { value: 5, label: `Gargantuan` },
  ]

  const sizeRangeDict = {
    0: `Tiny`,
    1: `Small`,
    2: `Medium`,
    3: `Large`,
    4: `Huge`,
    5: `Gargantuan`,
  }

  function handleSizeChange(event, newVal) {
    setSizeValues(newVal)
  }

  function valueSizeText(value) {
    return sizeRangeDict[value]
  }

  function handleNameSearch(event) {
    setNameSearch(event.target.value)
  }

  function handleKeywordSearch(event) {
    setKeywordSearch(event.target.value)
  }

  async function handleSearch() {
    const crCalc = CRRangeText.map((cr, index) => {
      if (index >= crValues[0] && index <= crValues[1]) {
        const toReturn = cr.split("/")
        if (toReturn[1]) {
          return Number(toReturn[0]) / Number(toReturn[1])
        } else return Number(toReturn[0])
      }
    }).filter(cr => cr !== undefined)

    const sizeCalc = sizeRange
      .map((size, index) => {
        if (size.value >= sizeValues[0] && size.value <= sizeValues[1]) {
          return size.label
        }
      })
      .filter(cr => cr)

    const typesCalc = Object.keys(selectedMonsters)
      .filter(type => selectedMonsters[type])
      .map(type => type.toLowerCase())

    // console.log(typesCalc)
    const queries = {
      name: nameSearch.trim().toLowerCase(),
      size: sizeCalc,
      cr: crCalc,
      keyword: keywordSearch.trim(),
      types: typesCalc,
    }
    setSearchedMonsters(await searchSRDMonster(queries))
  }

  return (
    <>
      <section className={css.searchFormWrapper}>
        <h2>Search Monster</h2>
        <h3>Monster Type</h3>
        <FormGroup>
          {/* <FormGroup className={css.monsterType}> */}
          <Grid container spacing={1}>
            {Object.keys(monsterTypesDict).map(type => (
              <Grid item xs={6} sm={3} md={2} lg={2} key={type}>
                <FormControlLabel
                  control={<Checkbox color="secondary" defaultChecked />}
                  label={type}
                  onChange={handleMonsterType}
                  value={type}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>

        <h3>Challenge Rating</h3>
        <Slider
          color="secondary"
          getAriaLabel={() => "Challenge Rating"}
          value={crValues}
          max={33}
          valueLabelFormat={valueCRText}
          valueLabelDisplay="auto"
          onChange={handleCRChange}
          marks
          className={css.crSlider}
        />

        <h3>Size</h3>
        <Slider
          color="secondary"
          getAriaLabel={() => "Size"}
          value={sizeValues}
          max={5}
          valueLabelFormat={valueSizeText}
          valueLabelDisplay="auto"
          onChange={handleSizeChange}
          marks
          className={css.crSlider}
        />
        <h3>Search by Name</h3>
        <TextField
          color="secondary"
          id="filled-basic"
          label="e.g. Aboleth"
          variant="filled"
          sx={{ input: { backgroundColor: "#e0efdf", color: "#003319" } }}
          fullWidth
          value={nameSearch}
          onChange={handleNameSearch}
        />

        <h3>Search by Keyword</h3>
        <TextField
          color="secondary"
          id="filled-basic"
          label="e.g. pack tactics"
          variant="filled"
          sx={{ input: { backgroundColor: "#e0efdf", color: "#003319" } }}
          fullWidth
          value={keywordSearch}
          onChange={handleKeywordSearch}
        />
      </section>
      <Summary
        nameSearch={nameSearch}
        keywordSearch={keywordSearch}
        crValues={crValues}
        sizeValues={sizeValues}
        selectedMonsters={selectedMonsters}
        // display={`none`}
      />

      <div className={css.buttonWrapper}>
        <Button color="secondary">Reset</Button>
        <Button color="secondary" onClick={handleSearch}>
          Submit
        </Button>
      </div>
    </>
  )
}
