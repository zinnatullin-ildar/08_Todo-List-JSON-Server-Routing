import { NavLink, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../../toDoList.module.css";

export const TodoListBody = ({ currentTodo, searchInput, sorted }) => {
    if (sorted) {
        const sortedTodos = currentTodo
            .slice()
            .sort((a, b) =>
                a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1,
            );
        currentTodo = sortedTodos;
    }

    return (
        <div className={styles.content}>
            <ul>
                {currentTodo.length > 0 &&
                    currentTodo
                        .filter((todo) =>
                            searchInput.toLowerCase() === ""
                                ? todo
                                : todo.title
                                      .toLowerCase()
                                      .includes(searchInput.toLowerCase()),
                        )
                        .map((todo) => {
                            return (
                                <li
                                    key={todo.id}
                                    className={styles.listItems}
                                >
                                    <NavLink
                                        className={styles.listItem}
                                        to={`task/${todo.id}`}
                                    >
                                        {todo.title.length > 20
                                            ? todo.title.slice(0, 20) + "..."
                                            : todo.title}
                                    </NavLink>
                                </li>
                            );
                        })}
            </ul>
            <Outlet />
        </div>
    );
};

TodoListBody.propTypes = {
    currentTodo: PropTypes.array,
    searchInput: PropTypes.string,
    sorted: PropTypes.bool,
};
