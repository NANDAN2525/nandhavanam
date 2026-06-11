import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'leads.json')

interface Lead {
  id: string
  name: string
  phone: string
  area: string
  plan: string
  createdAt: string
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, area, plan } = body as { name?: string; phone?: string; area?: string; plan?: string }
    if (!name || !phone || !area) {
      return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 })
    }

    const lead: Lead = { id: `lead_${Date.now()}`, name, phone, area, plan: plan ?? '', createdAt: new Date().toISOString() }
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })

    let existing: Lead[] = []
    try {
      const raw = await fs.readFile(DATA_FILE, 'utf8')
      existing = JSON.parse(raw)
    } catch {
      existing = []
    }

    existing.push(lead)
    await fs.writeFile(DATA_FILE, JSON.stringify(existing, null, 2), 'utf8')
    return NextResponse.json({ ok: true, id: lead.id, createdAt: lead.createdAt }, { status: 201 })
  } catch {
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}
