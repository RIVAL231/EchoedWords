import LandingPage from "./landing/page";
import { connectToDatabase } from "@/lib/db";

export default async function HomePage() {
  const db = await connectToDatabase();
  const approvedPoems = await db.collection('approved_poems').find().toArray();

  return (
    <LandingPage poems={approvedPoems} />
  );
}
