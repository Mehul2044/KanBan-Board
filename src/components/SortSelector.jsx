import styles from '../styles/sortSelector.module.css';
import PropTypes from "prop-types";

const SortSelector = (props) => {
    return (
        <select onChange={(e) => props.setSortBy(e.target.value)} className={styles.selectClass}>
            <option value="priority">Sort by Priority</option>
            <option value="title">Sort by Title</option>
        </select>
    );
};

SortSelector.propTypes = {
    setSortBy: PropTypes.func.isRequired,
}

export default SortSelector;
