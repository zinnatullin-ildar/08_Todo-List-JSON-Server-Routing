import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import styles from "./toDoList.module.css";
import { Button } from "./components/button/button";
import { SearchTodo } from "./components/searchTodo/searchTodo";
import { TodoListBody } from "./components/todoListBody/todoListBody";
import { Todo } from "./components/todo/todo";
import { NotFound } from "./components/notFound/notFound";

// Старт json-server --watch src/db.json --port 3003

export const App = () => {
    const [todos, setTodos] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [sorted, setSorted] = useState(false);
    const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);

    const navigate = useNavigate();
    const currentTodo = todos.slice();
    const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

    useEffect(() => {
        try {
            const fetchPosts = async () => {
                const result = await fetch("http://localhost:3003/todos");
                const data = await result.json();
                setTodos(data);
            };
            fetchPosts();
        } catch (error) {
            console.error(error.message);
        }
    }, [refreshTodosFlag]);

    const handleAddTodo = () => {
        const inputTodo = prompt("Добавляем новое дело");
        if (!inputTodo) return;

        fetch("http://localhost:3003/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
                id: todos[0]?.id ? todos.at(-1).id + 1 : 1,
                title: inputTodo,
                completed: false,
            }),
        });
        setSearchInput("");
        refreshTodos();
        navigate("/");
    };

    const handleEditTodo = (id) => {
        const inputTodo = prompt("Редактируем дело");
        if (!inputTodo) return;

        fetch(`http://localhost:3003/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
                id,
                title: inputTodo,
                completed: false,
            }),
        });
        refreshTodos();
    };

    const handleDeleteTodo = (id) => {
        fetch(`http://localhost:3003/todos/${id}`, {
            method: "DELETE",
        });
        setSearchInput("");
        refreshTodos();
        navigate("/");
    };

    const handleCheckTodo = (id) => {
        const [todoToChecked] = currentTodo.filter((todo) => todo.id === id);
        const { idTodo, title, completed } = todoToChecked;

        fetch(`http://localhost:3003/todos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json;charset=utf-8" },
            body: JSON.stringify({
                id: idTodo,
                title,
                completed: !completed,
            }),
        });
        refreshTodos();
    };

    const handleSortTodos = () => {
        setSorted((sorted) => !sorted);
    };

    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <h2>Список дел</h2>
                <Button onClick={handleAddTodo}>✚</Button>
                <SearchTodo
                    className={styles.searchBar}
                    todos={todos}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                />
                <Button onClick={handleSortTodos}>A&darr;</Button>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <TodoListBody
                                currentTodo={currentTodo}
                                searchInput={searchInput}
                                sorted={sorted}
                                setSorted={setSorted}
                            />
                        }
                    />
                    <Route
                        path="task/:id"
                        element={
                            <Todo
                                currentTodo={currentTodo}
                                handleEditTodos={handleEditTodo}
                                handleDeleteTodos={handleDeleteTodo}
                                handleCheckTodo={handleCheckTodo}
                            />
                        }
                    />
                    <Route
                        path="/404"
                        element={<NotFound />}
                    />
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/404"
                                replace={true}
                            />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
};
