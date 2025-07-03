'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const events = [
  {
    name: 'Tech Conference 2024',
    date: 'June 15-16, 2024',
    location: 'Mohali, Punjab',
    slug: 'tech-conference-2024',
    description: 'Explore the latest in technology and innovation.',
  },
  {
    name: 'Design Workshop',
    date: 'July 22, 2024',
    location: 'Delhi, India',
    slug: 'design-workshop',
    description: 'Master UI/UX design principles and techniques.',
  },
  {
    name: 'Innovation Summit',
    date: 'August 5-7, 2024',
    location: 'Mumbai, Maharashtra',
    slug: 'innovation-summit',
    description: 'Discover groundbreaking innovations across industries.',
  },
  {
    name: 'Startup Pitch Day',
    date: 'September 12, 2024',
    location: 'Kashmir, J&K',
    slug: 'startup-pitch-day',
    description: 'Connect with emerging startups and investors.',
  },
];

const EventFeedbackPage = () => {
  const params = useParams();
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const eventSlug = params.slug as string;
  const selectedEvent = events.find((event) => event.slug === eventSlug);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (rating === 0) {
  //     setFormError('Please provide a rating for the event');
  //     return;
  //   }

  //   // Log form data for API integration
  //   console.log({
  //     eventName: selectedEvent?.name,
  //     rating,
  //     comments: comments || 'No additional comments',
  //   });

  //   setIsSubmitted(true);

  //   // Reset form after submission
  //   setTimeout(() => {
  //     setIsSubmitted(false);
  //     setRating(0);
  //     setComments('');
  //     setFormError('');
  //   }, 5000);
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      setFormError('Please provide a rating for the event');
      return;
    }

    try {
      // Submit feedback
      const response = await fetch('/api/submit-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventSlug: selectedEvent?.slug,
          rating,
          comments,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        // Reset the form after submission
        setTimeout(() => {
          setIsSubmitted(false);
          setRating(0);
          setComments('');
          setFormError('');
        }, 5000);
      } else {
        setFormError(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setFormError('An error occurred. Please try again later.');
    }
  };

  if (!selectedEvent) {
    return (
      <div className="container mx-auto p-8 text-center">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Event Not Found</AlertTitle>
          <AlertDescription>The event you are looking for does not exist.</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-8">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 max-w-lg mx-auto p-6 bg-white shadow-xl rounded-lg">
        {' '}
        <Card>
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <CheckCircle2 className="mx-auto h-24 w-24 text-green-500 mb-4" />
                  <h2 className="text-2xl font-bold text-green-600 mb-2">
                    Feedback Submitted Successfully
                  </h2>
                  <p className="text-gray-600">Thank you for sharing your valuable feedback.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {formError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Submission Error</AlertTitle>
                      <AlertDescription>{formError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="mb-6">
                    <h2 className="text-xl text-center font-semibold text-gray-800 mb-4">
                      Provide Feedback for {selectedEvent.name}
                    </h2>
                    <div className="flex justify-center space-x-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRating(value)}
                          className={`
                          transition-all duration-200 transform
                          ${rating >= value ? 'text-yellow-500' : 'text-gray-300'}
                          hover:scale-110 hover:text-yellow-600
                        `}
                          aria-label={`Rate ${value} out of 5`}
                        >
                          <Star
                            size={40}
                            fill={rating >= value ? 'currentColor' : 'transparent'}
                            strokeWidth={1.5}
                          />
                        </button>
                      ))}
                    </div>
                    {rating > 0 && (
                      <p className="text-center text-sm text-gray-600 mt-2">{rating} / 5 rating</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="comments"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Additional Comments (Optional)
                    </label>
                    <Textarea
                      id="comments"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Share your thoughts about the event..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Feedback
                  </Button>
                </form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventFeedbackPage;
