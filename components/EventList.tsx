import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Event } from '@/payload-types';
import config from '@payload-config';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getPayload } from 'payload';

async function getEvents(): Promise<Event[]> {
  let events: Event[] = [];

  try {
    const payload = await getPayload({ config });
    const response = await payload.find({
      collection: 'events',
      where: {
        active: {
          equals: true,
        },
      },
    });

    events = response.docs;
  } catch (error) {
    console.error('Error fetching events:', error);
  }

  return events;
}

const EventList = async () => {
  const events = await getEvents();

  // Error message if no active events
  if (events.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-xl text-gray-600">No active events available.</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-br from-blue-100 to-purple-200 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 my-2">
          Event Feedback Portal
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 py-8">
        {events.map((event) => (
          <Card
            key={event.id} // Unique identifier
            className="bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl group border border-gray-200 p-4"
          >
            <CardHeader className="p-0"></CardHeader>
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {event.name || 'Unnamed Event'}
              </h3>
              <p className="text-gray-600 mb-4">
                {event.description || 'No description available.'}
              </p>

              <Button
                asChild
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:scale-105 transition-transform shadow-md"
              >
                <Link href={`/f/${event.slug}`}>
                  Provide Feedback
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventList;
