import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchService from '../../services/AdvanceSearch';
import UserService from '../../services/UserService';
import ProjectService from '../../services/ProjectService';
import TicketTypeService from '../../services/TicketTypeService';

const SearchResults = () => {
    const location = useLocation();
    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState({ status: '', priority: '', assignee: '', creator: '', tickettype: '', project: '' });
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [tickettype, setTicketType] = useState([]);
    const [project, setProject] = useState([]);
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('q');

    useEffect(() => {
        const fetchResults = async () => {
            if (!keyword) return;
            setLoading(true);
            try {
                const response = await SearchService.getSearchResults(keyword, filters);
                setResults(response.tickets); // Adjust based on your response shape
            } catch (err) {

                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await UserService.getUsers()
                setUsers(response.users)
            }
            catch (err) {
                console.error(err)
            }
        }

        const fetchProject = async () => {
            try {
                const response = await ProjectService.getProjects()
                setProject(response.projects)
            }
            catch (err) {
                console.error(err)
            }
        }

        const fetchTicketType = async () => {
            try {
                const response = await TicketTypeService.getTicketTypes()
                setTicketType(response.tickettype)
            }
            catch (err) {
                console.error(err)
            }
        }
        fetchProject();
        fetchTicketType();
        fetchResults();
        fetchUsers();
    }, [keyword, filters]);

    return (
        <div className="p-6 flex gap-6">
            <aside className="w-full sm:w-1/4 p-4 bg-white shadow-md rounded-lg space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Filters</h2>

                {/* Status Filter with checkboxes */}
                <div>
                    <label className="block font-medium text-gray-600">Status:</label>
                    <div className="flex flex-col space-y-2 mt-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value="open"
                                checked={filters.status.includes('open')}
                                onChange={(e) => {
                                    const newStatus = e.target.checked
                                        ? [...filters.status, 'open']
                                        : filters.status.filter(status => status !== 'open');
                                    setFilters({ ...filters, status: newStatus });
                                }}
                                className="form-checkbox h-4 w-4 text-blue-500"
                            />
                            <span className="text-sm text-gray-700">Active</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value="closed"
                                checked={filters.status.includes('pending')}
                                onChange={(e) => {
                                    const newStatus = e.target.checked
                                        ? [...filters.status, 'pending']
                                        : filters.status.filter(status => status !== 'pending');
                                    setFilters({ ...filters, status: newStatus });
                                }}
                                className="form-checkbox h-4 w-4 text-blue-500"
                            />
                            <span className="text-sm text-gray-700">Pending</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value="closed"
                                checked={filters.status.includes('closed')}
                                onChange={(e) => {
                                    const newStatus = e.target.checked
                                        ? [...filters.status, 'closed']
                                        : filters.status.filter(status => status !== 'closed');
                                    setFilters({ ...filters, status: newStatus });
                                }}
                                className="form-checkbox h-4 w-4 text-blue-500"
                            />
                            <span className="text-sm text-gray-700">Closed</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value="closed"
                                checked={filters.status.includes('closed')}
                                onChange={(e) => {
                                    const newStatus = e.target.checked
                                        ? [...filters.status, 'closed']
                                        : filters.status.filter(status => status !== 'completed');
                                    setFilters({ ...filters, status: newStatus });
                                }}
                                className="form-checkbox h-4 w-4 text-blue-500"
                            />
                            <span className="text-sm text-gray-700">Completed</span>
                        </label>
                    </div>
                </div>

                {/* Priority Filter with checkboxes */}
                <div>
                    <label className="block font-medium text-gray-600">Priority:</label>
                    <div className="flex flex-col space-y-2 mt-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value="high"
                                checked={filters.priority.includes('high')}
                                onChange={(e) => {
                                    const newPriority = e.target.checked
                                        ? [...filters.priority, 'high']
                                        : filters.priority.filter(priority => priority !== 'high');
                                    setFilters({ ...filters, priority: newPriority });
                                }}
                                className="form-checkbox h-4 w-4 text-red-500"
                            />
                            <span className="text-sm text-gray-700">High</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value="high"
                                checked={filters.priority.includes('medium')}
                                onChange={(e) => {
                                    const newPriority = e.target.checked
                                        ? [...filters.priority, 'medium']
                                        : filters.priority.filter(priority => priority !== 'medium');
                                    setFilters({ ...filters, priority: newPriority });
                                }}
                                className="form-checkbox h-4 w-4 text-red-500"
                            />
                            <span className="text-sm text-gray-700">Medium</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value="low"
                                checked={filters.priority.includes('low')}
                                onChange={(e) => {
                                    const newPriority = e.target.checked
                                        ? [...filters.priority, 'low']
                                        : filters.priority.filter(priority => priority !== 'low');
                                    setFilters({ ...filters, priority: newPriority });
                                }}
                                className="form-checkbox h-4 w-4 text-green-500"
                            />
                            <span className="text-sm text-gray-700">Low</span>
                        </label>
                    </div>
                </div>

                {/* Assignee Dropdown */}
                <div>
                    <label className="block font-medium text-gray-600">Assignee:</label>
                    <select
                        value={filters.assignee}
                        onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.fullname}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Creator Dropdown */}
                <div>
                    <label className="block font-medium text-gray-600">Creator:</label>
                    <select
                        value={filters.creator}
                        onChange={(e) => setFilters({ ...filters, creator: e.target.value })}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.fullname}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Ticket Type Dropdown */}
                <div>
                    <label className="block font-medium text-gray-600">Ticket Type:</label>
                    <select
                        value={filters.tickettype}
                        onChange={(e) => setFilters({ ...filters, tickettype: e.target.value })}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All</option>
                        {tickettype.map((tt) => (
                            <option key={tt._id} value={tt._id}>
                                {tt.TicketType}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Project Dropdown */}
                <div>
                    <label className="block font-medium text-gray-600">Project:</label>
                    <select
                        value={filters.project}
                        onChange={(e) => setFilters({ ...filters, project: e.target.value })}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All</option>
                        {project.map((p) => (
                            <option key={p._id} value={p._id}>
                                {p.ProjectName}
                            </option>
                        ))}
                    </select>
                </div>
            </aside>



            {/* Results */}
            <main className="w-3/4">
                <h1 className="text-2xl font-bold mb-4">Search results for "{keyword}"</h1>
                <div className="space-y-4">
                    {results
                        .map((item) => (
                            <div key={item.id} className="border p-4 rounded shadow">
                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                <p>{item.description}</p>
                                <p>Status: {item.status}, Priority: {item.priority}</p>
                            </div>
                        ))}
                    {results.length === 0 && <p>No results found.</p>}
                </div>
            </main>
        </div>
    );
};

export default SearchResults;
