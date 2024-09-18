import { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import { fetchTicketsAndUsers } from './utils/api';
import CombinedDropdown from "./components/CombinedDropDown.jsx";

const App = () => {
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupBy, setGroupBy] = useState('status');
    const [sortBy, setSortBy] = useState('priority');

    useEffect(() => {
        fetchTicketsAndUsers().then(({ tickets, users }) => {
            setTickets(tickets);
            setUsers(users);
        });
    }, []);

    return (
        <div>
            <div style={{ backgroundColor: 'white', padding: '10px' }}>
                <CombinedDropdown groupBy={groupBy} setGroupBy={setGroupBy} sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
        </div>
    );
};

export default App;
