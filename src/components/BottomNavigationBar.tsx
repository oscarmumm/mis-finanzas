import {
    FaHome,
    FaChartPie,
    FaPlusCircle,
    FaFolderOpen,
    FaCog,
} from 'react-icons/fa';

import { NavLink } from 'react-router';

export const BottomNavigationBar = () => {
    return (
        <div className="fixed bottom-0 w-full p-3 text-indigo-700 ">
            <ul className="flex justify-evenly items-center rounded-3xl drop-shadow-2xl/50 bg-white">
                <li className="p-3 text-2xl">
                    <NavLink to="/">
                        <FaHome />
                    </NavLink>
                </li>
                <li className="p-3 text-2xl">
                    <NavLink to="/transactions">
                        <FaChartPie />
                    </NavLink>
                </li>
                <li className="p-3 text-4xl">
                    <NavLink to="/new">
                        <FaPlusCircle />
                    </NavLink>
                </li>
                <li className="p-3 text-2xl">
                    <NavLink to="/categories">
                        <FaFolderOpen />
                    </NavLink>
                </li>
                <li className="p-3 text-2xl">
                    <NavLink to="/settings">
                        <FaCog />
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};
