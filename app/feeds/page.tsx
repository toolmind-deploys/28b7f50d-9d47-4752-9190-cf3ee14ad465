import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default async function FeedsPage() {
  console.log("Rendering FeedsPage...");
  try {
    const res = await fetch('http://localhost:3000/api/feeds', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch feeds. Status: ${res.status}`);
    }

    const feeds = await res.json();
    console.log("Fetched feeds:", feeds);

    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Feeds</h1>
        {Array.isArray(feeds) && feeds.length > 0 ? (
          feeds.map((feed: any) => (
            <Card key={feed.id} className="border rounded shadow-sm">
              <CardHeader>
                <CardTitle>{feed.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {feed.company} – {feed.jobType}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800">{feed.description || "No description available."}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No feeds found.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error in FeedsPage:", error);
    return (
      <div className="p-4">
        <h1>Feeds</h1>
        <p className="text-red-500">Failed to load feeds.</p>
      </div>
    );
  }
}
