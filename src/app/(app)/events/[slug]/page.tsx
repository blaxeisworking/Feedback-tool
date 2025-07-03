// import { GetServerSideProps } from 'next';
import { useParams } from 'next/navigation';

type Event = {
  id: string;
  name: string;
  description: string;
  slug: string;
};

const fetchEventBySlug = async (slug: string): Promise<Event | null> => {
  const events = [
    {
      id: '1',
      name: 'Tech Conference 2024',
      description: 'Explore tech',
      slug: 'tech-conference-2024',
    },
    { id: '2', name: 'Design Workshop', description: 'UI/UX design', slug: 'design-workshop' },
  ];

  return events.find((event) => event.slug === slug) || null;
};

const EventPage = async () => {
  const { slug } = useParams();
  if (!slug) {
    return <div>Event not found.</div>;
  }

  const event = await fetchEventBySlug(slug as string);

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div className="container">
      <h1>{event.name}</h1>
      <p>{event.description}</p>
    </div>
  );
};

export default EventPage;
