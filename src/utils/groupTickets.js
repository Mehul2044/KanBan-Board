const priorityMapping = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority'
};

const priorityOrder = ['No priority', 'Urgent', 'High', 'Medium', 'Low'];

export const groupTickets = (tickets, groupBy, users) => {
    let groupedTickets = {};

    tickets.forEach((ticket) => {
        let groupKey;

        if (groupBy === 'status') {
            groupKey = ticket.status;
        } else if (groupBy === 'priority') {
            groupKey = priorityMapping[ticket.priority];
        } else if (groupBy === 'user') {
            const user = users.find((user) => user.id === ticket.userId);
            groupKey = user ? user.name : 'Unknown';
        }

        if (!groupedTickets[groupKey]) {
            groupedTickets[groupKey] = [];
        }

        groupedTickets[groupKey].push(ticket);
    });

    return groupedTickets;
};

export const sortTickets = (groupedTickets, sortBy) => {
    Object.keys(groupedTickets).forEach((group) => {
        groupedTickets[group].sort((a, b) => {
            if (sortBy === 'priority') {
                return b.priority - a.priority;
            } else if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    });

    const sortedGroups = {};
    if (Object.keys(groupedTickets).some((key) => priorityOrder.includes(key))) {
        priorityOrder.forEach((priority) => {
            if (groupedTickets[priority]) {
                sortedGroups[priority] = groupedTickets[priority];
            }
        });
        return sortedGroups;
    }

    return groupedTickets;
};
