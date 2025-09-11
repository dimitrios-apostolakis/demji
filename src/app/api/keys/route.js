import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

// Table: api_keys
// Columns: id (uuid, pk, default uuid_generate_v4()), name text, type text, usage int8, api_key text, created_at date

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('api_keys')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const newRow = {
    name: body.name ?? 'key',
    type: body.type ?? 'dev',
    usage: body.usage ?? 0,
    api_key: body.key,
  };
  const { data, error } = await supabaseAdmin
    .from('api_keys')
    .insert(newRow)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}


