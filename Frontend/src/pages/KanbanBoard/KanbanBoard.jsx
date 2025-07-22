import React, { useEffect, useState } from 'react';
import TicketService from '../../services/TicketService'; // Adjust if needed

const KanbanBoard = () => {
  const ITEMS_PER_PAGE = 10;
  const userId = "687b6217fece4c25bb1f6f01"; // Static for now

  const [pages, setPages] = useState({
    active: 1,
    overdue: 1,
    planned: 1,
    completed: 1,
  });

  const [tickets, setTickets] = useState({
    active: [],
    overdue: [],
    planned: [],
    completed: [],
  });

  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await TicketService.getTickets(userId);
        const data = response.count;
        console.log(data)
        setTickets({
          active: data.OpenTickets || [],
          overdue: data.PendingTickets || [],
          planned: data.InProgressTickets || [],
          completed: data.CompletedTickets || [],
        });
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    getTickets();
  }, [userId]);

  const paginate = (items, page) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  };

  const totalPages = (items) => Math.ceil(items.length / ITEMS_PER_PAGE);

  const handlePageChange = (type, direction) => {
    setPages((prev) => {
      const maxPage = totalPages(tickets[type]);
      const newPage = Math.min(Math.max(prev[type] + direction, 1), maxPage);
      return { ...prev, [type]: newPage };
    });
  };

  const renderColumn = (type, title, bgColor, dateLabel) => (
    <div className={`${bgColor} p-4 rounded-lg shadow`}>
      <h2 className="text-xl font-semibold mb-3">
        {title} ({tickets[type].length})
      </h2>

      {paginate(tickets[type], pages[type]).map((item) => (
        <div key={item._id} className="bg-white p-3 mb-3 rounded shadow-sm">
          <p className="font-medium">{item.title}
            <span
              className="text-xs text-white px-2 py-1 rounded ml-2"
              style={{
                backgroundColor:
                  item.priority === "high"
                    ? "#ef4444" // red
                    : item.priority === "medium"
                      ? "#f59e0b" // orange
                      : "#10b981", // green (low)
              }}
            >
              {item.priority}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            {dateLabel}: {item.dueDate?.split("T")[0] || 'N/A'}
          </p>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(type, -1)}
          disabled={pages[type] === 1}
          className="px-3 py-1 bg-white rounded shadow disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm self-center">
          Page {pages[type]} of {totalPages(tickets[type])}
        </span>
        <button
          onClick={() => handlePageChange(type, 1)}
          disabled={pages[type] === totalPages(tickets[type])}
          className="px-3 py-1 bg-white rounded shadow disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <div className="grid grid-cols-4 gap-4">
        {renderColumn('active', 'Active', 'bg-green-100', 'Due')}
        {renderColumn('overdue', 'Overdue', 'bg-red-100', 'Due')}
        {renderColumn('planned', 'Planned', 'bg-blue-100', 'Due')}
        {renderColumn('completed', 'Completed', 'bg-gray-300', 'Completed')}
      </div>
    </div>
  );
};

export default KanbanBoard;
