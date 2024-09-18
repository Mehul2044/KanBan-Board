import {useState, useEffect} from 'react';
import KanbanBoard from './components/KanbanBoard';
import {fetchTicketsAndUsers} from './utils/api';
import CombinedDropdown from "./components/CombinedDropDown.jsx";
import styles from "./styles/App.module.css";

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupBy, setGroupBy] = useState(() => {
        const savedGroupBy = localStorage.getItem('groupBy');
        return savedGroupBy ?? 'status';
    });
    const [sortBy, setSortBy] = useState(() => {
        const savedSortBy = localStorage.getItem('sortBy');
        return savedSortBy ?? 'priority';
    });

    useEffect(() => {
        localStorage.setItem('groupBy', groupBy);
        localStorage.setItem('sortBy', sortBy);
    }, [groupBy, sortBy]);

    useEffect(() => {
        fetchTicketsAndUsers().then(({tickets, users}) => {
            setTickets(tickets);
            setUsers(users);
        });
    }, []);

    return (
        <div>
            <div className={styles.navbar}>
                <CombinedDropdown groupBy={groupBy} setGroupBy={setGroupBy} sortBy={sortBy} setSortBy={setSortBy}/>
            </div>
            <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy}/>
        </div>
    );
};

export default App;