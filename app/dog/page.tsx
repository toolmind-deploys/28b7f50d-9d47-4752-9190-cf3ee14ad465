import React from 'react';

export default async function DogPage() {
  console.log("Rendering DogPage...");
  try {
    const res = await fetch('/api/dog', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch dog data. Status: ${res.status}`);
    }

    const dogs = await res.json();
    console.log("Fetched dog data:", dogs);

    return (
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold mb-4">Dog Page</h1>
        {Array.isArray(dogs) && dogs.length > 0 ? (
          dogs.map((dog: any) => (
            <div key={dog.id} className="border rounded p-4 shadow-sm">
              <h2 className="font-semibold text-lg">{dog.name || 'Unnamed Dog'}</h2>
              <p>Breed: {dog.breed || 'Unknown'}</p>
              <p>Age: {dog.age || 'Unknown'}</p>
            </div>
          ))
        ) : (
          <p>No dog data found.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error in DogPage:", error);
    return (
      <div className="p-4">
        <h1>Dog Page</h1>
        <p className="text-red-500">Failed to load dog data.</p>
      </div>
    );
  }
}
