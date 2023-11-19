import React from 'react';
import KanbanCard from '../KanbanCard/KanbanCard';
import '../KanbanColumn/KanbanColumn.css';

const KanbanColumn = ({ title, tickets, users, groupingOption }) => {
  const getCountForTitle = (currentTitle) => {
  return tickets.filter((ticket) => {
    if (groupingOption === 'user') {
      const user = users.find((user) => user.id === currentTitle);
      return user && ticket.userId === user.id;
    } else if (groupingOption === 'status') {
      return ticket.status === currentTitle;
    } else if (groupingOption === 'priority') {
      console.log('currentTitle:', currentTitle);
      console.log('ticket.priority:', ticket.priority);
      return String(ticket.priority) === currentTitle;
    } else {
      return ticket.title === currentTitle;
    }
  }).length;
};


  return (
    <div className="kanban-column">
      <h2>
        {groupingOption === 'user'
          ? `${users.find((user) => user.id === title)?.name} (${getCountForTitle(title)})`
          : `${title} (${getCountForTitle(title)})`}
      </h2>
      {/* Render cards based on tickets */}
      {tickets.map((ticket) => {
        const user = users.find((user) => user.id === ticket.userId);
        // Ensure that the ticket has a userId and the corresponding user is found
        if (ticket.userId && user) {
          return <KanbanCard key={ticket.id} ticket={ticket} user={user} />;
        }

        // Handle the case where userId is missing or the user is not found
        return null;
      })}
    </div>
  );
};

export default KanbanColumn;
