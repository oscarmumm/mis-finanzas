import { Route, Routes, BrowserRouter } from 'react-router';
import { Home } from '../pages/Home';
import { NewEntry } from '../pages/NewEntry';
import { Transactions } from '../pages/Transactions';
import { Settings } from '../pages/Settings';
import { AppLayout } from '../layouts/AppLayout';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/new" element={<NewEntry />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
