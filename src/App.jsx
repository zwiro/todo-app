import { nanoid } from "nanoid"
import { useState, useEffect } from "react"
import Header from "./components/Header"
import TodoList from "./components/TodoList"
import "./css/App.css"
import "./scss/Dark.scss"

function App() {
  const [itemBeingDragged, setItemBeingDragged] = useState(undefined)
  const [itemBeingSwapped, setItemBeingSwapped] = useState(undefined)
  const [darkMode, setDarkMode] = useState(() =>
    JSON.parse(localStorage.getItem("darkMode") || false)
  )
  const [todoList, setTodoList] = useState(
    () => JSON.parse(localStorage.getItem("todos")) || []
  )
  const [filter, setFilter] = useState("All")
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList))
  }, [todoList])

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark")
    } else document.body.classList.remove("dark")
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => {
    function watchWidth() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", watchWidth)

    return function () {
      window.removeEventListener("resize", watchWidth)
    }
  }, [])

  function setTheme() {
    setDarkMode((prevMode) => !prevMode)
  }

  function addItem(e) {
    e.preventDefault()
    const item = {
      name: e.target.children[0].value,
      active: false,
      finished: false,
      id: nanoid(),
    }
    if (e.target.children[0].value) {
      setTodoList((prevList) => [item, ...prevList])
    }
    e.target.children[0].value = ""
  }

  function checkItem(id) {
    setTodoList((prevList) =>
      prevList.map((item) => {
        if (id === item.id) {
          return { ...item, finished: !item.finished }
        } else return item
      })
    )
  }

  function deleteItem(id) {
    setTimeout(() => {
      setTodoList((prevList) => prevList.filter((item) => item.id !== id))
    }, 500)
  }

  function clearCompleted() {
    setTodoList((prevList) => prevList.filter((item) => !item.finished))
  }

  function chooseFilter(name) {
    setFilter(name)
  }

  function dragItem(id) {
    todoList.find((item) => {
      if (item.id === id) {
        setItemBeingDragged(item)
      }
    })
  }

  function dragEnter(e, id) {
    todoList.find((item) => {
      if (item.id === id) {
        setItemBeingSwapped(item)
      }
    })
  }

  function dropItem(id) {
    if (itemBeingDragged && itemBeingSwapped) {
      if (itemBeingDragged !== itemBeingSwapped) {
        setTodoList((prevList) => {
          const newList = [...prevList]
          newList.splice(
            prevList.indexOf(itemBeingDragged),
            1,
            itemBeingSwapped
          )
          newList.splice(
            prevList.indexOf(itemBeingSwapped),
            1,
            itemBeingDragged
          )
          return newList
        })
      }
    }
  }

  return (
    <>
      <Header
        darkMode={darkMode}
        setTheme={setTheme}
        windowWidth={windowWidth}
      />
      <TodoList
        todoList={
          filter === "Active"
            ? todoList.filter((item) => !item.finished)
            : filter === "Completed"
            ? todoList.filter((item) => item.finished)
            : todoList
        }
        addItem={addItem}
        checkItem={checkItem}
        deleteItem={deleteItem}
        clearCompleted={clearCompleted}
        chooseFilter={chooseFilter}
        filter={filter}
        dragItem={dragItem}
        dropItem={dropItem}
        dragEnter={dragEnter}
      />
    </>
  )
}

export default App
