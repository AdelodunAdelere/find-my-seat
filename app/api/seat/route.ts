import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const query = typeof body?.query === "string" ? body.query.trim() : "";

  if (!query) {
    return NextResponse.json({ matches: [] });
  }

  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("guests")
    .select("full_name, assigned_table")
    .ilike("full_name", `%${query}%`)
    .order("full_name")
    .limit(8);

  if (error) {
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ matches: data ?? [] });
}
