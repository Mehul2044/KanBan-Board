import TicketCard from './TicketCard';
import {groupTickets, sortTickets} from '../utils/groupTickets';
import styles from "../styles/kanbanBoard.module.css";
import PropTypes from "prop-types";

import addIcon from "../assets/add.svg";
import moreOptionsIcon from "../assets/3 dot menu.svg";

import noPriority from "../assets/No-priority.svg";
import lowPriority from "../assets/Img - Low Priority.svg";
import mediumPriority from "../assets/Img - Medium Priority.svg";
import highPriority from "../assets/Img - High Priority.svg";
import urgentPriority from "../assets/SVG - Urgent Priority colour.svg";

import todoIcon from "../assets/To-do.svg";
import inProgressIcon from "../assets/in-progress.svg";
import doneIcon from "../assets/Done.svg";
import backLogIcon from "../assets/Backlog.svg";
import cancelled from "../assets/Cancelled.svg";
import UserAvatar from "./UserAvatar.jsx";

const KanbanBoard = ({tickets, users, groupBy, sortBy}) => {
    const groupedTickets = groupTickets(tickets, groupBy, users);
    const sortedTickets = sortTickets(groupedTickets, sortBy);

    const groupIcons = {
        priority: {
            'no priority': <img src={noPriority} alt={"noPriority"}/>,
            'urgent': <img src={urgentPriority} alt={"urgent"}/>,
            'high': <img src={highPriority} alt={"high"}/>,
            'medium': <img src={mediumPriority} alt={"medium"}/>,
            'low': <img src={lowPriority} alt={"low"}/>,
        },
        status: {
            todo: <img src={todoIcon} alt={"todo"}/>,
            'in progress': <img src={inProgressIcon} alt={"in progress"}/>,
            done: <img src={doneIcon} alt={"done"}/>,
            backlog: <img src={backLogIcon} alt={"backlog"}/>,
            cancelled: <img src={cancelled} alt={"cancelled"}/>,
        },
    };

    const groupIcon = (groupBy, group, count) => {
        if (groupBy === "priority" || groupBy === "status") {
            return groupIcons[groupBy][group];
        } else if (groupBy === "user") {
            const user = users.find((user) => user.name.toLowerCase() === group);
            return (
                <div className={styles.userIconContainer}>
                    <UserAvatar user={user}/>
                    <span className={styles.userName}>{user.name} {count}</span>
                </div>
            );
        }
    };

    return (
        <div className={styles.kanbanBoard}>
            {Object.keys(sortedTickets).map(group => (
                <div className={styles.kanbanColumn} key={group}>
                    <div className={styles.kanbanHeadingContainer}>
                        <h2 className={styles.heading}>{groupIcon(groupBy, group.toLowerCase(), sortedTickets[group].length)}
                            {groupBy !== "user" && <><span style={{marginLeft: "1rem"}}>{group}</span> <span
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "normal"
                                }}>{sortedTickets[group].length}</span></>}
                        </h2>
                        <div className={styles.groupIcons}>
                            <span className={styles.addIcon}><img src={addIcon} alt="Add"/></span>
                            <span className={styles.moreOptionsIcon}><img src={moreOptionsIcon}
                                                                          alt="More Options"/></span>
                        </div>
                    </div>

                    {sortedTickets[group].length === 0 ? (
                        <div className={styles.noItemsMessage}>No items</div>
                    ) : (
                        sortedTickets[group].map(ticket => (
                            <TicketCard key={ticket.id} ticket={ticket} users={users} groupBy={groupBy}/>
                        ))
                    )}
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
