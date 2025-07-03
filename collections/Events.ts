import type { CollectionConfig } from 'payload';

export const Events: CollectionConfig = {
  slug: 'events',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        {
          label: 'Rating',
          value: 'rating',
        },
      ],
      required: true,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      required: true,
    },
  ],
};
