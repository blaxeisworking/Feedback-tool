import { GetServerSideProps } from 'next';

type Event = {
  id: string;
  name: string;
  description: string;
  slug: string;
};

const events: Event[] = [
  {
    id: '1',
    name: 'Tech Conference 2024',
    description: 'Explore the latest in technology and innovation.',
    slug: 'tech-conference-2024',
  },
  {
    id: '2',
    name: 'Design Workshop',
    description: 'Master UI/UX design principles and techniques.',
    slug: 'design-workshop',
  },
  {
    id: '3',
    name: 'Innovation Summit',
    description: 'Discover groundbreaking innovations across industries.',
    slug: 'innovation-summit',
  },
  {
    id: '4',
    name: 'Startup Pitch Day',
    description: 'Connect with emerging startups and investors.',
    slug: 'startup-pitch-day',
  },
];

// Fetch events based on a slug parameter
const fetchEventBySlug = (slug: string): Event | undefined => {
  return events.find((event) => event.slug === slug);
};

const EventList = ({ event }: { event: Event | null }) => {
  if (!event) {
    return (
      <div className="container">
        <h1>Event Not Found</h1>
        <p>We couldn't find the event you're looking for.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{event.name}</h1>
      <p>{event.description}</p>
    </div>
  );
};

// Fetch the event when the page is requested based on the slug
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const event = fetchEventBySlug(slug);

  return {
    props: {
      event: event || null,
    },
  };
};

export default EventList;
