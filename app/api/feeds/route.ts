import { firestore } from 'firebase-admin';
import { initFirebaseAdminSDK } from '@/config/firebase-admin-config';
import { NextRequest, NextResponse } from 'next/server';

initFirebaseAdminSDK();
const fsdb = firestore();

export async function GET(_: NextRequest) {
  console.log("[GET] /api/feeds requested");
  try {
    const snapshot = await fsdb.collection('feeds').get();
    const feedsData = snapshot.docs.map((doc) => {
      const docData = doc.data();
      return {
        id: doc.id,
        ...docData
      };
    });
    console.log("Fetched feeds:", feedsData);
    return NextResponse.json(feedsData);
  } catch (error) {
    console.error("Error retrieving feeds:", error);
    return NextResponse.json({ error: 'Failed to retrieve feeds' }, { status: 500 });
  }
}
