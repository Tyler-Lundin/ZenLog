'use client';

  const ASIDE = 'absolute top-0 left-0 h-14 w-screen bg-white z-10'; 

export default function Sidebar() {
  return (
    <aside className={ASIDE}>
      <div className="flex justify-between items-center h-full px-4">
        <h1>Sidebar</h1>
      </div>
    </aside>
  );
}
