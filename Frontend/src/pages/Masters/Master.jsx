import React, { useEffect, useState } from "react";
import DepartmentService from "../../services/DepartmentService";
import DesignationService from "../../services/DesignationService";
import TicketTypeService from "../../services/TicketTypeService";
import ProjectService from "../../services/ProjectService";

const DashboardConfig = () => {
    const [department, setDepartment] = useState([])
    const [designation, setDesignation] = useState([])
    const [tickettype, setTicketType] = useState([])
    const [project, setProject] = useState([])

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const getDepartment = await DepartmentService.getDepartment();
                setDepartment(getDepartment.department);
                console.log(getDepartment.department)
            } catch (error) {
                console.log('Error fetching department:', error);
            }
        };

        const fetchDesignation = async () => {
            try {
                const getDesignation = await DesignationService.getDesignation();
                setDesignation(getDesignation.Designations);
                  console.log(getDesignation.designation)
            } catch (error) {
                console.log('Error fetching department:', error);
            }
        };

        const fetchTicketType = async () => {
            try {
                const getTicketType = await TicketTypeService.getTicketTypes();
                setTicketType(getTicketType.tickettype);
                  console.log(getTicketType.tickettype)
            } catch (error) {
                console.log('Error fetching department:', error);
            }
        };

        const fetchProject = async () => {
            try {
                const getProject = await ProjectService.getProjects();
                setProject(getProject.projects);
                  console.log(getProject.projects)
            } catch (error) {
                console.log('Error fetching department:', error);
            }
        };

        fetchDepartment(); // Call the async function inside useEffect
        fetchDesignation();
        fetchProject();
        fetchTicketType();
    }, []);
    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-9 gap-6">
            {/* Department & Designation */}
            <div className="bg-white p-4 rounded-xl shadow md:col-span-5">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Department</h2>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">+ Add Department</button>

                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-600">
                            <th className="text-left py-1">S.No</th>
                            <th className="text-left py-1">Department</th>
                            <th className="text-left py-1">Users</th>
                            <th className="text-left py-1">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(department)}
                        {department.map((dept, index) => (
                            <tr key={dept._id} className="border-t">
                                <td>{index + 1}</td>
                                <td className="py-2">{dept.DepartmentName}</td>
                                <td className="py-2">{dept.DepartmentName}</td>
                                <td><button className="text-red-500">🗑️</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Ticket Types */}
            <div className="bg-white p-4 rounded-xl shadow md:col-span-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Designation</h2>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">+ Add Designation</button>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-600">
                            <th className="text-left py-1">S.No</th>
                            <th className="text-left py-1">Designation</th>
                            <th className="text-left py-1">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            designation.map((d,index) => (
                                <tr key={d._id} className="border-t">
                                    <td>{index + 1}</td>
                                    <td className="py-2">{d.designation}</td>
                                    <td><button className="text-red-500">🗑️</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {/* Project Configuration */}

            <div className="bg-white p-4 rounded-xl shadow md:col-span-5">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Project</h2>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">+ Add Project</button>
                </div>
               
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-600">
                            <th className="text-left py-1">S.No</th>
                            <th className="text-left py-1">Project Name</th>
                            <th className="text-left py-1">Project Leader</th>
                            <th className="text-left py-1">Team Members</th>
                            <th className="text-left py-1">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            project.map((p,index) => (
                                <tr key={p._id} className="border-t">
                                    <td>{index + 1}</td>
                                    <td className="py-2">{p.ProjectName}</td>
                                    <td className="py-2">{p.ProjectLeader.fullname}</td>
                                    <td className="py-2">{p.TeamMembers.fullname}</td>
                                    <td><button className="text-red-500">🗑️</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {/* Custom Fields Configuration */}
            <div className="bg-white p-4 rounded-xl shadow md:col-span-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Ticket Types</h2>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">+ Add Type</button>
                </div>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-600">
                            <th className="text-left py-1">S.No</th>
                            <th className="text-left py-1">Type</th>
                            <th className="text-left py-1">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickettype.map((type,index) => (
                            <tr key={type._id} className="border-t">
                                <td>{index + 1}</td>
                                <td className="py-2">{type.TicketType}</td>
                                <td><button className="text-red-500">🗑️</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardConfig;
