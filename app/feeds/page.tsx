import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

interface Feed {
  id: string;
  title: string;
  description?: string;
  company?: string;
}

export default async function FeedsPage() {
  console.log('[FeedsPage]: Fetching feeds from /api/feeds');
  const res = await fetch('http://localhost:3000/api/feeds', { cache: 'no-store' });

  if (!res.ok) {
    console.error('[FeedsPage]: Failed to fetch feeds');
    throw new Error('Failed to fetch feeds');
  }

  const feeds: Feed[] = await res.json();
  console.log('[FeedsPage]: Successfully fetched feeds:', feeds.length);

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Latest Feeds</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {feeds.map((feed) => (
          <Card
            key={feed.id}
            className="shadow-lg hover:shadow-2xl transition-shadow rounded-md border border-gray-200"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">{feed.title}</CardTitle>
              {feed.company && (
                <CardDescription className="italic mt-1 text-gray-500">
                  {feed.company}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                {feed.description || 'No description provided.'}
              </p>
            </CardContent>
            <CardFooter className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-400">Feed ID: {feed.id}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
