// KanbanBoard.js
import React, { useContext } from 'react';
// import KanbanColumn from './KanbanColumn';
import KanbanColumn from '../KanbanColumn/KanbanColumn';
import '../KanbanBoard/KanbanBoard.css'


import { KanbanContext } from '../../App';

const KanbanBoard = () => {
  const { data, groupingOption, orderingOption } = useContext(KanbanContext);
  const { tickets, users } = data;

  
  // Implement logic to group and sort tickets based on options
  const groupAndSortTickets = () => {

   
    // Group tickets based on the current grouping option
    const groupedTickets = tickets.reduce((grouped, ticket) => {
       let groupKey;
    if (groupingOption === 'user') {
      groupKey = ticket.userId || 'Unknown User'; // Use 'Unknown User' if userId is missing
      
    } else {
      groupKey = ticket[groupingOption];
    }
      grouped[groupKey] = grouped[groupKey] || [];
      grouped[groupKey].push(ticket);
      return grouped;
    }, {});

    // Sort tickets within each group based on the current sorting option
   Object.keys(groupedTickets).forEach((groupKey) => {
      const group = groupedTickets[groupKey];
      group.sort((a, b) => {
        switch (orderingOption) {
          case 'priority':
            const priorityA = parseInt(a.priority, 10);
            const priorityB = parseInt(b.priority, 10);

            return priorityB - priorityA;
          case 'title':
            // Sort by title in ascending order
            return a.title.localeCompare(b.title);
          default:
            return 0; // Default to no sorting
        }
      });
    });

    return groupedTickets;
  };

  // Get the grouped and sorted tickets based on the current options
  const groupedAndSortedTickets = groupAndSortTickets();


  const todoTickets = tickets.filter((ticket) => ticket.status === 'Todo');
  const inProgressTickets = tickets.filter((ticket) => ticket.status === 'In progress');
  const doneTickets = tickets.filter((ticket) => ticket.status === 'Done');
  return (
    <div className="kanban-board">
      {/* Render columns based on grouped and sorted tickets */}
      {Object.entries(groupedAndSortedTickets).map(([groupTitle, groupTickets]) => (
        <KanbanColumn key={groupTitle} title={groupTitle} tickets={groupTickets} users={users} groupingOption={groupingOption} />
      ))}
    </div>
  );
};

export default KanbanBoard;
