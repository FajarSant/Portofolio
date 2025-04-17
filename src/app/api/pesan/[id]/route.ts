// app/api/pesan/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server'
import { getPesanById, updatePesan, deletePesan } from '@/services/pesanService'
import { standarResponse } from '@/utils/response'
import { IPesan } from '@/types'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const id = Number(url.searchParams.get('id'))

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 })
  }

  try {
    const pesan = await getPesanById(id)
    if (!pesan) {
      return NextResponse.json(standarResponse(false, null, 'Data tidak ditemukan'), { status: 404 })
    }
    return NextResponse.json(standarResponse(true, pesan))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan internal'
    return NextResponse.json(standarResponse(false, null, message), { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const url = new URL(req.url)
  const id = Number(url.searchParams.get('id'))

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 })
  }

  try {
    const body: IPesan = await req.json()
    const updated = await updatePesan(id, body)
    return NextResponse.json(standarResponse(true, updated))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan internal'
    return NextResponse.json(standarResponse(false, null, message), { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url)
  const id = Number(url.searchParams.get('id'))

  if (isNaN(id)) {
    return NextResponse.json(standarResponse(false, null, 'ID tidak valid'), { status: 400 })
  }

  try {
    await deletePesan(id)
    return NextResponse.json(standarResponse(true, null), { status: 204 })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Terjadi kesalahan internal'
    return NextResponse.json(standarResponse(false, null, message), { status: 500 })
  }
}
