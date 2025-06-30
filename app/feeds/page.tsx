import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Feeds</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {feeds.map((feed) => (
          <Card key={feed.id} className="shadow">
            <CardHeader>
              <CardTitle>{feed.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{feed.company || 'No company'}</p>
              <p className="mt-2">{feed.description || 'No description provided.'}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
