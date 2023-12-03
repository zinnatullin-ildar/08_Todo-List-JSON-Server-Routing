import PropTypes from "prop-types";
import styles from "../../toDoList.module.css";

export const ControlButton = ({ onControl, todo, children }) => {
    return (
        <button
            className={styles.editButton}
            onClick={() => onControl(todo.id)}
        >
            {children}
        </button>
    );
};

ControlButton.propTypes = {
    todo: PropTypes.object,
    children: PropTypes.string,
    onControl: PropTypes.func,
};
