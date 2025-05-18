/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/search/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const term = searchParams.get("term");

  if (!term) {
    return NextResponse.json({ error: "Missing search term" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&attribute=artistTerm&country=NG`
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
  console.error('iTunes API error:', error);
  return NextResponse.json({ error: "Failed to fetch from iTunes" }, { status: 500 });
}

}
