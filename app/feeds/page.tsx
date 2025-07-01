import React from 'react';

export default async function FeedsPage() {
  console.log("Rendering FeedsPage...");
  try {
    const res = await fetch('http://localhost:3000/api/feeds', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch feeds. Status: ${res.status}`);
    }
    const data = await res.json();
    console.log("Fetched feeds:", data);

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Feeds</h1>
        {Array.isArray(data) && data.length > 0 ? (
          data.map((feed: any) => (
            <div key={feed.id} className="mb-4 border border-gray-200 rounded p-3">
              <h2 className="font-semibold text-lg">{feed.title}</h2>
              <p className="text-sm text-gray-600">{feed.description}</p>
            </div>
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
