import { useNavigate } from "react-router-dom";
import styles from "../../toDoList.module.css";
import { Button } from "../button/button";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <>
            <Button onClick={() => navigate("/")}>◄</Button>
            <div className={styles.content}>Такой страницы не существует</div>
        </>
    );
};
