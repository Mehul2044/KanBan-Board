const priorityMapping = {
    4: 'Urgent',
    3: 'High',
    2: 'Medium',
    1: 'Low',
    0: 'No priority'
};

const priorityOrder = ['No priority', 'Urgent', 'High', 'Medium', 'Low'];

export const groupTickets = (tickets, groupBy, users) => {
    const groupedTickets = tickets.reduce((acc, ticket) => {
        const groupKey = getGroupKey(ticket, groupBy, users);
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(ticket);
        return acc;
    }, {});

    if (groupBy === 'status') {
        const allStatusCategories = ['Todo', 'In progress', 'Backlog', 'Done', 'Cancelled'];
        allStatusCategories.forEach((status) => {
            if (!groupedTickets[status]) {
                groupedTickets[status] = [];
            }
        });
    }
    return groupedTickets;
};

const getGroupKey = (ticket, groupBy, users) => {
    switch (groupBy) {
        case 'status':
            return ticket.status;
        case 'priority':
            return priorityMapping[ticket.priority];
        case 'user': {
            const user = users.find((user) => user.id === ticket.userId);
            return user ? user.name : 'Unknown';
        }
        default:
            return '';
    }
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
