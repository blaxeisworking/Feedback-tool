export interface Event {
  name: string;
  slug: string;
  date: string;
  location: string;
  color: string;
}

export const events: Event[] = [
  {
    name: 'Tech Conference 2024',
    slug: 'tech-conference-2024',
    date: 'June 15-16',
    location: 'Mohali',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    name: 'Design Workshop',
    slug: 'design-workshop',
    date: 'July 22',
    location: 'Delhi',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    name: 'Innovation Summit',
    slug: 'innovation-summit',
    date: 'August 5-7',
    location: 'Mumbai',
    color: 'bg-green-100 text-green-800',
  },
  {
    name: 'Startup Pitch Day',
    slug: 'startup-pitch-day',
    date: 'September 12',
    location: 'Kashmir',
    color: 'bg-orange-100 text-orange-800',
  },
];

export const getEventBySlug = (slug: string) => {
  return events.find((event) => event.slug === slug);
};
