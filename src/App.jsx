import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Marketplace from './components/Marketplace';
import MobileBottomNav from './components/MobileBottomNav';
import BusinessDetail from './components/BusinessDetail';

export default function App() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 relative overflow-y-auto">
          {!selectedBusiness ? (
            <Marketplace onOpenDetail={setSelectedBusiness} />
          ) : (
            <BusinessDetail
              business={selectedBusiness}
              onBack={() => setSelectedBusiness(null)}
            />
          )}
        </main>

        <MobileBottomNav />
      </div>
    </div>
  );
}
