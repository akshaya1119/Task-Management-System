import React, { useState } from 'react';

const KanbanBoard = () => {
  const ITEMS_PER_PAGE = 10;

  const data = {
    active: [
      { title: 'Reducing Scrap in Machine Shop', due: 'Nov 09, 2020' },
      { title: 'Simple Patient Tracking Tool', due: 'Nov 12, 2020' },
      // Add more dummy data if needed
    ],
    overdue: [
      { title: 'KaiNexus 2.2.9', due: 'Oct 01, 2020' },
      { title: 'Overdue Project in List View', due: 'Nov 05, 2020' },
    ],
    planned: [
      { title: 'Test Project', due: 'Nov 16, 2020' },
      { title: 'Review Monthly Metrics', due: 'Nov 20, 2020' },
      { title: 'Review Monthly Metrics', due: 'Nov 20, 2020' },
      { title: 'Review Monthly Metrics', due: 'Nov 20, 2020' },
    ],
    completed: [
      { title: 'KaiNexus 2.2.8', completed: 'Nov 09, 2020' },
      { title: 'Develop Staff Communication Plan', completed: 'Nov 08, 2020' },
      { title: 'Another Completed Task', completed: 'Nov 07, 2020' },
      { title: 'Task 4', completed: 'Nov 06, 2020' },
      { title: 'Task 5', completed: 'Nov 05, 2020' },
      { title: 'Task 6', completed: 'Nov 04, 2020' },
      { title: 'Task 7', completed: 'Nov 03, 2020' },
      { title: 'Task 8', completed: 'Nov 02, 2020' },
      { title: 'Task 9', completed: 'Nov 01, 2020' },
      { title: 'Task 10', completed: 'Oct 31, 2020' },
      { title: 'Task 11', completed: 'Oct 30, 2020' },
    ],
  };

  const [pages, setPages] = useState({
    active: 1,
    overdue: 1,
    planned: 1,
    completed: 1,
  });

  const paginate = (items, page) => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return items.slice(start, start + ITEMS_PER_PAGE);
  };

  const totalPages = (items) => Math.ceil(items.length / ITEMS_PER_PAGE);

  const handlePageChange = (type, direction) => {
    setPages((prev) => {
      const maxPage = totalPages(data[type]);
      const newPage = Math.min(
        Math.max(prev[type] + direction, 1),
        maxPage
      );
      return { ...prev, [type]: newPage };
    });
  };

  const renderColumn = (type, title, bgColor, dateLabel) => (
    <div className={`${bgColor} p-4 rounded-lg shadow`}>
      <h2 className="text-xl font-semibold mb-3">
        {title} ({data[type].length})
      </h2>
      {paginate(data[type], pages[type]).map((item, index) => (
        <div key={index} className="bg-white p-3 mb-3 rounded shadow-sm">
          <p className="font-medium">{item.title}</p>
          <p className="text-sm text-gray-600">
            {dateLabel}: {item.due || item.completed}
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
          Page {pages[type]} of {totalPages(data[type])}
        </span>
        <button
          onClick={() => handlePageChange(type, 1)}
          disabled={pages[type] === totalPages(data[type])}
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
