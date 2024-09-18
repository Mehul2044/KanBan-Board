import {useState, useRef, useEffect} from 'react';
import styles from "../styles/combinedDropDown.module.css";
import PropTypes from "prop-types";
import downArrow from "../assets/down.svg";
import sliderHorizontal from "../assets/sliders-horizontal.svg";

const CombinedDropdown = ({groupBy, setGroupBy, sortBy, setSortBy}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGrouping, setSelectedGrouping] = useState(groupBy);
    const [selectedSorting, setSelectedSorting] = useState(sortBy);
    const dropdownRef = useRef(null);

    const handleGroupByChange = (e) => {
        setSelectedGrouping(e.target.value);
        setGroupBy(e.target.value);
    };

    const handleSortByChange = (e) => {
        setSelectedSorting(e.target.value);
        setSortBy(e.target.value);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.combinedDropdown} ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)}>
                <img src={sliderHorizontal} alt={"slider"}/> <span style={{marginLeft: "1rem"}}>Display</span> <img
                src={downArrow} alt="down"/>
            </button>
            {isOpen && (
                <div className={styles.dropdownMenu}>
                    <div className={styles.groupingOptions}>
                        <label>Grouping</label>
                        <select style={{backgroundColor: 'white'}} value={selectedGrouping}
                                onChange={handleGroupByChange}>
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                    <div className={styles.sortingOptions}>
                        <label>Ordering</label>
                        <select style={{backgroundColor: 'white'}} value={selectedSorting}
                                onChange={handleSortByChange}>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

CombinedDropdown.propTypes = {
    groupBy: PropTypes.string.isRequired,
    setGroupBy: PropTypes.func.isRequired,
    sortBy: PropTypes.string.isRequired,
    setSortBy: PropTypes.func.isRequired,
};

export default CombinedDropdown;