import PropTypes from "prop-types";

export const SearchTodo = ({ className, searchInput, setSearchInput }) => {
    return (
        <input
            className={className}
            type="text"
            placeholder="Поиск дела..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
        />
    );
};

SearchTodo.propTypes = {
    className: PropTypes.string,
    searchInput: PropTypes.string,
    setSearchInput: PropTypes.func,
};
