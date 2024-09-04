import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { temperature, humidity } = body;

    if (!temperature || !humidity) {
      return new NextResponse("Temperature and humidity are required.");
    }

    const climateRecord = await db.climate.create({
      data: {
        temperature,
        humidity,
      },
    });

    return NextResponse.json(climateRecord);
  } catch (error) {
    console.log("[SENSOR_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
