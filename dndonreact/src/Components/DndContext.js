import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function DndContext() {

    const data = [

        {
            name: "one",
            id: "1"
        },

        {
            name: "two",
            id: "2"
        },

        {
            name: "three",
            id: "3"
        },

        {
            name: "four",
            id: "4"
        },

        {
            name: "five",
            id: "5"
        }

    ];

    const [list, setList] = React.useState(data);

    // step 4: update the order of the list
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onEnd = (result) => {
        console.log(result)
        setList(reorder(list, result.source.index, result.destination.index))
    }

  return (
    <div>
        {/* Step 1: DragnDrop Context */}
        <DragDropContext
            onDragEnd={onEnd}
        >
            {/* Step 2: place where the item will be dnd */}
            <Droppable
                droppableId="12345678"
            >
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                    >
                        {list.map((item, index) => (
                            // Step 3: each draggable item
                            <Draggable
                                draggableId={item.id}
                                key={item.id}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div className="flex-col justify-items-center items-center"
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}  
                                    >
                                        <div className="flex-col justify-items-center items-center" 
                                            style={{
                                                text: "center",
                                                width: "300px",
                                                padding: "20px 0",
                                                margin: "20px 0",
                                                background: "gray"
                                            }}>
                                            {item.name}
                                        </div>

                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>

    </div>
  );
}

export default DndContext;
