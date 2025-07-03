import type { CollectionConfig } from 'payload';

export const Feedback: CollectionConfig = {
  slug: 'feedback',
  fields: [
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      label: 'Rating',
      defaultValue: 3,
    },
    {
      name: 'comments',
      type: 'textarea',
      label: 'Comments',
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
      label: 'Associated Event',
    },
  ],
};

export default Feedback;
