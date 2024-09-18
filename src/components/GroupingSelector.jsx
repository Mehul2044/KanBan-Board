import styles from '../styles/groupSelector.module.css';
import PropTypes from "prop-types";

const GroupingSelector = (props) => {
    return (
        <select onChange={(e) => props.setGroupBy(e.target.value)} className={styles.selectClass}>
            <option value="status">Group by Status</option>
            <option value="user">Group by User</option>
            <option value="priority">Group by Priority</option>
        </select>
    );
};

GroupingSelector.propTypes = {
    setGroupBy: PropTypes.func.isRequired,
}

export default GroupingSelector;
