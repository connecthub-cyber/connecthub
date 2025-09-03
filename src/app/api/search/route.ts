import { NextRequest, NextResponse } from 'next/server';
import { eventsIndex, usersIndex } from '@/lib/algolia';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  const type = searchParams.get('type');

  if (!query) {
    return NextResponse.json({ message: 'Query parameter is required' }, { status: 400 });
  }

  try {
    let results;
    if (type === 'events') {
      results = await eventsIndex.search(query);
    } else if (type === 'users') {
      results = await usersIndex.search(query);
    } else {
      const [eventResults, userResults] = await Promise.all([
        eventsIndex.search(query),
        usersIndex.search(query),
      ]);
      results = { events: eventResults.hits, users: userResults.hits };
    }
    return NextResponse.json(results);
  } catch (error) {
    console.error('Algolia search error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}


