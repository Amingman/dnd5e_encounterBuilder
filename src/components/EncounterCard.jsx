import css from "./Encounter.module.css"
import { Droppable, Draggable } from "react-beautiful-dnd"
export default function EncounterCard({ title, monsters }) {
  return (
    <section className={css.groupWrapper}>
      <h3>{title}</h3>
      <Droppable droppableId={title}>
        {provided => (
          <section ref={provided.innerRef} {...provided.droppableProps}>
            {monsters.map((monster, index) => (
              <Draggable
                draggableId={monster.index}
                key={monster.name}
                index={index}
              >
                {provided => (
                  <h4
                    className={css.monster}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {monster.name} ({monster.challenge_rating})
                  </h4>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </section>
  )
}

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       items: getItems(10),
//     }
//     this.onDragEnd = this.onDragEnd.bind(this)
//   }

//   onDragEnd(result) {
//     // dropped outside the list
//     if (!result.destination) {
//       return
//     }

//     const items = reorder(
//       this.state.items,
//       result.source.index,
//       result.destination.index
//     )

//     this.setState({
//       items,
//     })
//   }

//   // Normally you would want to split things out into separate components.
//   // But in this example everything is just done in one place for simplicity
//   render() {
//     return (
//       <DragDropContext onDragEnd={this.onDragEnd}>
//         <Droppable droppableId="droppable">
//           {(provided, snapshot) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               style={getListStyle(snapshot.isDraggingOver)}
//             >
//               {this.state.items.map((item, index) => (
//                 <Draggable key={item.id} draggableId={item.id} index={index}>
//                   {(provided, snapshot) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       style={getItemStyle(
//                         snapshot.isDragging,
//                         provided.draggableProps.style
//                       )}
//                     >
//                       {item.content}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     )
//   }
// }

// Put the thing into the DOM!
// ReactDOM.render(<App />, document.getElementById("root"))
