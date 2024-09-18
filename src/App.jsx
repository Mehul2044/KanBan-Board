import { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import GroupingSelector from './components/GroupingSelector';
import SortSelector from './components/SortSelector';
import { fetchTicketsAndUsers } from './utils/api';

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
            <h1>Kanban Board</h1>
            <GroupingSelector setGroupBy={setGroupBy} />
            <SortSelector setSortBy={setSortBy} />
            <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
        </div>
    );
};

export default App;
