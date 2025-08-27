import { NextResponse } from 'next/server'

export async function GET() {
  const manifest = {
    "accountAssociation": {
      "header": "eyJmaWQiOjEwMTE2ODgsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhhMzQ5NzFDNTI5NDBBRTk4ZTVENjI3YzJFMjgyOGQwM2ZiZGI4MmFEIn0",
      "payload": "eyJkb21haW4iOiJiYXNlbGlzay52ZXJjZWwuYXBwIn0",
      "signature": "MHg4ZjA4OWVmNGI4Njc2MmI1MTIzYmFjZjBjZGNkYzYxMTU5MDRkNTAxN2U3YTQ0OTE2YzNhZDNhMTM4YTYxMjYyNTM2ODQ0MTYxMGU3ZGIyOGNmYmM3NWZhN2Y5NWRkNjBmY2E3YThmYmU3ODNkOTc0YWZiZDI5YmE4ZTAyYWE2NzFj"
    }
  }

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}
