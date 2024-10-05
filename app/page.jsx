// app/page.jsx
import { connectToDatabase } from "@/lib/db";
import LandingPage from "./landing/page";  // Ensure the import path is correct

export default async function HomePage() {
  const db = await connectToDatabase();
  const approvedPoems = await db.collection('approved_poems').find().toArray();

  // Convert _id fields to strings
  const poems = approvedPoems.map(poem => ({
    ...poem,
    _id: poem._id.toString(),  // Convert _id to string
  }));

  return (
    <LandingPage poems={poems} />
  );
}
