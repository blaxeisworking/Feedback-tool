import type { NextApiRequest, NextApiResponse } from 'next';
import { getPayload } from 'payload';
import config from '@payload-config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Failde to Submit' });
  }

  const { eventSlug, rating, comments } = req.body;

  // Check if required fields are provided
  if (!eventSlug || !rating) {
    return res.status(400).json({ message: 'Event and rating are required.' });
  }

  try {
    const payload = await getPayload({ config });

    // Fetch the event by slug to ensure it exists
    const event = await payload.find({
      collection: 'events',
      where: {
        slug: {
          equals: eventSlug,
        },
      },
    });

    if (event.docs.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // NeW feedback entry
    const feedback = await payload.create({
      collection: 'feedback',
      data: {
        rating,
        comments,
        event: event.docs[0].id,
      },
    });

    return res.status(200).json({ message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
