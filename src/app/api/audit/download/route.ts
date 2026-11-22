import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'SARANG_AI_Architecture_Audit_Report.md');
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Disposition': 'attachment; filename="SARANG_AI_Architecture_Audit_Report.md"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to download audit report.' }, { status: 500 });
  }
}
