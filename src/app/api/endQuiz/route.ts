import { prisma } from '@/lib/db';
import { endGameSchema } from '@/schemas/questions';
import { Prisma } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Parse the request body and validate it
    const body = await req.json();
    const { gameId } = endGameSchema.parse(body);

    // Check if the game exists
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });

    if (!game) {
      return NextResponse.json(
        {
          message: 'Game not found',
        },
        {
          status: 404,
        }
      );
    }

    // Update the game's timeEnded field
    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        timeEnded: new Date(),
      },
    });

    // Respond with success
    return NextResponse.json({
      gameId: game.id,
    });
  } catch (error) {
    console.error('Error in POST /endQuiz:', error);

    // Prisma-specific error handling
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        {
          message: 'Database connection issue. Please try again later.',
        },
        { status: 500 }
      );
    }

    // Handle other errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: 'Something went wrong.',
          error: error.message,
        },
        { status: 500 }
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      {
        message: 'An unknown error occurred.',
      },
      { status: 500 }
    );
  }
}
