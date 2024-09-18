import TicketCard from './TicketCard';
import { groupTickets, sortTickets } from '../utils/groupTickets';
import styles from "../styles/kanbanBoard.module.css";
import PropTypes from "prop-types";

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {
    const groupedTickets = groupTickets(tickets, groupBy, users);
    const sortedTickets = sortTickets(groupedTickets, sortBy);

    return (
        <div className={styles.kanbanBoard}>
            {Object.keys(sortedTickets).map(group => (
                <div className={styles.kanbanColumn} key={group}>
                    <h2 className={styles.heading}>{group}</h2>
                    {sortedTickets[group].map(ticket => (
                        <TicketCard key={ticket.id} ticket={ticket} users={users} />
                    ))}
                </div>
            ))}
        </div>
    );
};

KanbanBoard.propTypes = {
    tickets: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    groupBy: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired,
};

export default KanbanBoard;
