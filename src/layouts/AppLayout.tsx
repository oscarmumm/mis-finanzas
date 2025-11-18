import { Outlet } from 'react-router';
import { BottomNavigationBar } from '../components/BottomNavigationBar';

export const AppLayout = () => {
    return (
        <div>
            <main className='bg-slate-100 min-h-screen'>
                <Outlet />
            </main>
            <BottomNavigationBar />
        </div>
    );
};
