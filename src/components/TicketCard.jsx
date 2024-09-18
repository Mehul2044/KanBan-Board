import PropTypes from 'prop-types';
import styles from '../styles/ticketCard.module.css';

import highPriority from "../assets/Img - High Priority.svg";
import mediumPriority from "../assets/Img - Medium Priority.svg";
import lowPriority from "../assets/Img - Low Priority.svg";
import urgentPriority from "../assets/SVG - Urgent Priority grey.svg";
import noPriority from "../assets/No-priority.svg";
import cancelled from "../assets/Cancelled.svg";

import todoIcon from "../assets/To-do.svg";
import inProgressIcon from "../assets/in-progress.svg";
import doneIcon from "../assets/Done.svg";
import backLogIcon from "../assets/Backlog.svg";
import UserAvatar from "./UserAvatar.jsx";

const TicketCard = ({ticket, users, groupBy}) => {
    const user = users.find((user) => user.id === ticket.userId);

    const priorityIcons = {
        4: <img src={urgentPriority} alt="Urgent"/>,
        3: <img src={highPriority} alt="High"/>,
        2: <img src={mediumPriority} alt="Medium"/>,
        1: <img src={lowPriority} alt="Low"/>,
        0: <img src={noPriority} alt="No priority"/>,
    };

    const statusIcons = {
        todo: <img src={todoIcon} alt="Todo"/>,
        "in progress": <img src={inProgressIcon} alt="In Progress"/>,
        done: <img src={doneIcon} alt="Done"/>,
        backlog: <img src={backLogIcon} alt="Backlog"/>,
        cancelled: <img src={cancelled} alt="Cancelled"/>,
    };

    return (
        <div className={styles.ticketCard}>
            <div className={styles.ticketHeader}>
                <p className={styles.ticketId}>{ticket.id}</p>
                {groupBy !== "user" && <UserAvatar user={user}/>}
            </div>

            <h3 className={styles.ticketTitle}>
                {groupBy !== "status" && <span className={styles.statusIcon}>
                    {statusIcons[ticket.status.toLowerCase()]}
                </span>}
                {ticket.title}
            </h3>

            <div className={styles.ticketInfo}>
                {groupBy !== "priority" && <span className={styles.priorityIcon}>
                    {priorityIcons[ticket.priority]}
                </span>}
                <span className={styles.ticketTag}>{ticket.tag[0]}</span>
            </div>
        </div>
    );
};

TicketCard.propTypes = {
    ticket: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    groupBy: PropTypes.string.isRequired,
};

export default TicketCard;
