import { firestore } from 'firebase-admin';
import { initFirebaseAdminSDK } from '@/config/firebase-admin-config';
import { NextRequest, NextResponse } from 'next/server';

initFirebaseAdminSDK();
const fsdb = firestore();

export async function GET(_: NextRequest) {
  console.log('[GET] /api/dog requested');
  try {
    // Query the 'dogs' collection
    const snapshot = await fsdb.collection('dogs').get();
    const dogData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log('Fetched dog data:', dogData);
    return NextResponse.json(dogData);
  } catch (error) {
    console.error('Error retrieving dog data:', error);
    return NextResponse.json({ error: 'Failed to retrieve dog data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  console.log('[POST] /api/dog requested');
  try {
    const body = await request.json();
    console.log('Received new dog data:', body);

    // Validate input here as needed
    const newDocRef = await fsdb.collection('dogs').add(body);
    const newDoc = await newDocRef.get();
    const newDog = { id: newDoc.id, ...newDoc.data() };

    console.log('Created new dog document:', newDog);
    return NextResponse.json(newDog);
  } catch (error) {
    console.error('Error creating dog document:', error);
    return NextResponse.json({ error: 'Failed to create dog document' }, { status: 500 });
  }
}
