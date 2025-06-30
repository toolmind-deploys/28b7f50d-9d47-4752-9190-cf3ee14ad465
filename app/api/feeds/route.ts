import { firestore } from 'firebase-admin';
import { initFirebaseAdminSDK } from '@/config/firebase-admin-config';
import { NextRequest, NextResponse } from 'next/server';

initFirebaseAdminSDK();
const fsdb = firestore();

export async function GET(_req: NextRequest) {
  console.log('[GET /api/feeds]: Retrieving feeds from Firestore');
  try {
    const snapshot = await fsdb.collection('feeds').get();
    const feeds: any[] = [];
    snapshot.forEach((doc) => {
      feeds.push({ id: doc.id, ...doc.data() });
    });
    console.log('[GET /api/feeds]: Feeds fetched:', feeds.length);
    return NextResponse.json(feeds, { status: 200 });
  } catch (error: any) {
    console.error('[GET /api/feeds]: Error retrieving feeds', error);
    return NextResponse.json({ error: 'Error retrieving feeds' }, { status: 500 });
  }
}
