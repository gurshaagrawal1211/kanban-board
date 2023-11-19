// KanbanCard.js
import React from 'react';
// import './KanbanCard/';
import '../KanbanCard/KanbanCard.css'

const KanbanCard = ({ ticket, user }) => {
  return (
    <div className="kanban-card">
      <p>{ticket.id}</p>
      <h3>{ticket.title}</h3>
      <div>
        <div className='requestIcon'>
         <span class="material-symbols-outlined">assignment_late</span>
        </div>
        <div className='requestIcon'><span class="material-symbols-outlined">circle</span>Feature Request</div>
      </div>
      {/* <h3>{ticket.title}</h3>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Assigned to: {user.name}</p> */}
      {/* Render other ticket details */}
    </div>
  );
};

export default KanbanCard;
