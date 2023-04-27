import css from "./SearchMonster.module.css"

export default function Summary({
  nameSearch,
  keywordSearch,
  crValues,
  sizeValues,
  selectedMonsters,
  display,
}) {
  return (
    <section style={{ display: display }} className={css.summaryForm}>
      <h2>Summary</h2>
      <h3>Name: {nameSearch}</h3>
      <h3>Keyword: {keywordSearch}</h3>
      <h3>
        CR: min: {crValues[0]}, max: {crValues[1]}
      </h3>
      <h3>
        Size: min: {sizeValues[0]}, max: {sizeValues[1]}
      </h3>
      <h3>
        Monster Types:
        {Object.keys(selectedMonsters)
          .filter(type => selectedMonsters[type])
          .reduce((accumulator, currentVal) => {
            return accumulator + ", " + currentVal
          }, "")
          .slice(1) + "."}
      </h3>
    </section>
  )
}
