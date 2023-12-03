import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "../../toDoList.module.css";
import { Button } from "../button/button";
import { ControlButton } from "../controlButton/controlButton";

export const Todo = ({
    currentTodo,
    handleEditTodos,
    handleDeleteTodos,
    handleCheckTodo,
}) => {
    const params = useParams();
    const navigate = useNavigate();

    currentTodo = currentTodo.filter((todo) => todo.id === Number(params.id));

    return (
        <>
            <Button onClick={() => navigate(-1)}>⬅</Button>
            {currentTodo.map((todo) => (
                <label
                    key={todo.id}
                    className={styles.label}
                >
                    <div>
                        <input
                            className={styles.checkbox}
                            name="search"
                            type="checkbox"
                            checked={todo.checked}
                            onChange={() => handleCheckTodo(todo.id)}
                        />
                        <span className={todo.checked ? styles.checked : ""}>
                            {todo.title}
                        </span>
                    </div>
                    <div className={styles.buttonGroup}>
                        <ControlButton
                            todo={todo}
                            onControl={handleEditTodos}
                        >
                            ✔
                        </ControlButton>
                        <ControlButton
                            styles={styles}
                            todo={todo}
                            onControl={handleDeleteTodos}
                        >
                            ✖
                        </ControlButton>
                    </div>
                </label>
            ))}
        </>
    );
};

Todo.propTypes = {
    currentTodo: PropTypes.array,
    handleEditTodos: PropTypes.func,
    handleDeleteTodos: PropTypes.func,
    handleCheckTodo: PropTypes.func,
};
