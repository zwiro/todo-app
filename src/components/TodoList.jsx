import '../scss/TodoList.scss'
import crossIcon from '/src/assets/icon-cross.svg'

export default function TodoList(props) {

    const filters = ['All', 'Active', 'Completed']
    const styles = {
        cursor: props.isBeingDragged ? 'none' : '',
        backgroundColor: props.isBeingDragged ? 'red' : ''
    }

    return (
        <main className="todo">
            <div className='todo__add'>
                <div className='todo__circle'></div>
                <form onSubmit={e => props.addItem(e)}>
                    <input
                        type="text"
                        className="todo__input"
                        placeholder="Create a new todo..."
                    />
                </form>
            </div>
            <div className='todo__list'>
                <div className="todo__items">
                    {props.todoList.map(item => {
                        return (
                            <div
                                className={item.finished ? "todo__item todo__item--checked" : "todo__item"}
                                key={item.id}
                                draggable
                                onDragStart={() => props.dragItem(item.id)}
                                onDragOver={e => {
                                    e.preventDefault();
                                    e.dataTransfer.dropEffect = 'move';
                                }}
                                onDragEnter={(e) => props.dragEnter(e, item.id)}
                                onDrop={() => props.dropItem(item.id)}
                            >
                                <div
                                    className={item.finished ?
                                        "todo__circle todo__circle--checked" :
                                        "todo__circle"}
                                    onClick={() => props.checkItem(item.id)}
                                ></div>
                                <p className='todo__title'>{item.name}</p>
                                <img
                                    className="todo__delete"
                                    src={crossIcon}
                                    alt=""
                                    onClick={() => props.deleteItem(item.id)}
                                />
                            </div>
                        )
                    })
                    }
                    <div className="todo__bottom-panel">
                        <p>{props.todoList.filter(item => !item.finished).length} items left</p>
                        <p onClick={() => props.clearCompleted()}>Clear Completed</p>
                    </div>
                </div>
            </div>
            <div className="todo__filters">
                {filters.map((filter, i) => {
                    return (
                        <p
                            className={props.filter === filter ?
                                "todo__filter todo__filter--current" :
                                "todo__filter"}
                            key={i}
                            onClick={() => props.chooseFilter(filter)}
                        >
                            {filter}
                        </p>
                    )
                })
                }
            </div>
            <p className='todo__info'>Drag and drop to reorder list</p>
        </main >
    )
}