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
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Feeds</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {feeds.map((feed) => (
          <Card key={feed.id} className="shadow hover:shadow-xl transition">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{feed.title}</CardTitle>
              {feed.company && (
                <CardDescription className="mt-1">{feed.company}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {feed.description || 'No description provided.'}
              </p>
            </CardContent>
            <CardFooter className="pt-2">
              <p className="text-xs text-muted-foreground">Feed ID: {feed.id}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
