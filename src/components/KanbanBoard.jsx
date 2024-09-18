import TicketCard from './TicketCard';
import {groupTickets, sortTickets} from '../utils/groupTickets';
import styles from "../styles/kanbanBoard.module.css";
import PropTypes from "prop-types";

import addIcon from "../assets/add.svg";
import moreOptionsIcon from "../assets/3 dot menu.svg";

const KanbanBoard = ({tickets, users, groupBy, sortBy}) => {
    const groupedTickets = groupTickets(tickets, groupBy, users);
    const sortedTickets = sortTickets(groupedTickets, sortBy);

    return (
        <div className={styles.kanbanBoard}>
            {Object.keys(sortedTickets).map(group => (
                <div className={styles.kanbanColumn} key={group}>
                    <div className={styles.kanbanHeadingContainer}>
                        <h2 className={styles.heading}>{group} <span
                            style={{fontSize: "1rem", fontWeight: "normal"}}>{sortedTickets[group].length}</span></h2>
                        <div className={styles.groupIcons}>
                            <span className={styles.addIcon}><img src={addIcon} alt="Add"/></span>
                            <span className={styles.moreOptionsIcon}><img src={moreOptionsIcon}
                                                                          alt="More Options"/></span>
                        </div>
                    </div>

                    {sortedTickets[group].map(ticket => (
                        <TicketCard key={ticket.id} ticket={ticket} users={users} groupBy={groupBy}/>
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