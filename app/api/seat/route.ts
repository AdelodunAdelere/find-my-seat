import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const query = typeof body?.query === "string" ? body.query.trim() : "";

  if (!query) {
    return NextResponse.json({ matches: [] });
  }

  let supabase;
  try {
    supabase = createSupabaseClient();
  } catch (err) {
    console.error("Failed to create Supabase client:", err);
    return NextResponse.json(
      { error: "Server is misconfigured. Please contact the host." },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("guests")
    .select("full_name, assigned_table")
    .ilike("full_name", `%${query}%`)
    .order("full_name")
    .limit(8);

  if (error) {
    console.error("Supabase query failed:", error);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ matches: data ?? [] });
}
