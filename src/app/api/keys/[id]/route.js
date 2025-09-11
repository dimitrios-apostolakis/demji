import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function PATCH(_req, { params }) {
  const body = await _req.json();
  const { id } = params;
  const { data, error } = await supabaseAdmin
    .from('api_keys')
    .update({ api_key: body.key })
    .eq('id', id)
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req, { params }) {
  const { id } = params;
  const { error } = await supabaseAdmin
    .from('api_keys')
    .delete()
    .eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}


