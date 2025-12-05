
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { content, visitorId, sessionId, senderType = 'VISITOR' } = body;

        if (!content || !visitorId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let currentSessionId = sessionId;

        // Create session if it doesn't exist
        if (!currentSessionId) {
            const session = await prisma.chatSession.create({
                data: {
                    visitorId,
                    status: 'OPEN',
                },
            });
            currentSessionId = session.id;
        }

        // Create message
        const message = await prisma.chatMessage.create({
            data: {
                content,
                senderType,
                sessionId: currentSessionId,
                read: senderType === 'AGENT', // Auto-read if sent by agent
            },
        });

        // Update session timestamp
        await prisma.chatSession.update({
            where: { id: currentSessionId },
            data: {
                lastMessageAt: new Date(),
                unreadCount: senderType === 'VISITOR' ? { increment: 1 } : 0
            },
        });

        return NextResponse.json({ success: true, message, sessionId: currentSessionId });
    } catch (error) {
        console.error('Chat Error:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const sessionId = searchParams.get('sessionId');

        if (!sessionId) {
            return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
        }

        const messages = await prisma.chatMessage.findMany({
            where: { sessionId },
            orderBy: { createdAt: 'asc' },
        });

        return NextResponse.json({ messages });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}
