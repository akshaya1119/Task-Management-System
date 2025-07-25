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
        await TicketService.getOpenAndDueTicket();
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

  
  const renderColumn = (type, title, dateLabel) => (
    <div className="p-4 rounded-lg shadow flex flex-col justify-between bg-white/10 backdrop-blur-md text-gray-200">
      {/* Header */}
      <div className="p-2">
        <h2 className="text-xl font-semibold text-gray-300">
          {title} ({tickets[type].length})
        </h2>
      </div>

      {/* Ticket Cards */}
      <div className="flex-1 mt-3 overflow-y-auto max-h-[500px]">
        {paginate(tickets[type], pages[type]).map((item) => (
          <div key={item._id} className="bg-gray-800 p-3 mb-3 rounded shadow-sm text-gray-100">
            <p className="font-medium">
              {item.title}
              <span
                className="text-xs text-gray-200 px-2 py-1 rounded ml-2"
                style={{
                  backgroundColor:
                    item.priority === "high"
                      ? "#ef4444"
                      : item.priority === "medium"
                      ? "#f59e0b"
                      : "#10b981",
                }}
              >
                {item.priority}
              </span>
            </p>
            <p className="text-sm text-gray-400">
              {dateLabel}: {item.dueDate?.split("T")[0] || 'N/A'}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-2 flex justify-between">
        <button
          onClick={() => handlePageChange(type, -1)}
          disabled={pages[type] === 1}
          className="px-3 py-1 bg-white text-black rounded shadow disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm self-center text-gray-300">
          Page {pages[type]} of {totalPages(tickets[type])}
        </span>
        <button
          onClick={() => handlePageChange(type, 1)}
          disabled={pages[type] === totalPages(tickets[type])}
          className="px-3 py-1 bg-white text-black rounded shadow disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );



  return (
      <div className="flex flex-col min-h-screen bg-black p-4 text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <div className="grid grid-cols-4 gap-4">
        {renderColumn('active', 'Active', 'Due')}
        {renderColumn('overdue', 'Overdue', 'Due')}
        {renderColumn('planned', 'Planned', 'Due')}
        {renderColumn('completed', 'Completed', 'Completed')}
      </div>
    </div>
  );
};

export default KanbanBoard;
