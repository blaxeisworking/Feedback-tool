import EventList from '../../components/EventList'; // Import the EventList component

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      {/* <h1 className="text-3xl flex justify-center items-center font-bold mb-8">{`Welcome, ${user || 'Guest'}!`}</h1> */}

      <div className="w-full max-w-7xl">
        <EventList />
      </div>

      
    </div>
  );
}
