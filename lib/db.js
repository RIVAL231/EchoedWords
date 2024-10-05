import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGO_URI;
let client;
let clientPromise;

if (!uri) {
  throw new Error("Please define the MONGO_URI environment variable inside .env");
}

// Only create the MongoDB client once, and reuse it for all future requests
if (!client) {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  clientPromise = client.connect().then((client) => {
    console.log('Connected to MongoDB');
    return client.db('poetry_blog');
  }).catch((error) => {
    console.error('MongoDB connection failed:', error);
    throw new Error('MongoDB connection failed');
  });
}

// Connection to the database
export async function connectToDatabase() {
  return clientPromise;
}

// Helper function to convert MongoDB documents
const convertPoem = (poem) => ({
  ...poem,
  _id: poem._id.toString(), // Convert ObjectId to string
});

// Function to add a pending poem
export async function addPendingPoem(poem) {
  const db = await connectToDatabase();
  const result = await db.collection('pending_poems').insertOne(poem);
  return result;
}

// Function to get all pending poems
export async function getPendingPoems() {
  const db = await connectToDatabase();
  const poems = await db.collection('pending_poems').find().toArray();
  return poems.map(convertPoem); // Convert ObjectId to string
}

// Function to approve a pending poem
export async function approvePoem(id) {
  const db = await connectToDatabase();
  try {
    const poem = await db.collection('pending_poems').findOne({ _id: new ObjectId(id) });
    if (poem) {
      await db.collection('approved_poems').insertOne({ ...poem, likes: 0, comments: [] });
      await db.collection('pending_poems').deleteOne({ _id: new ObjectId(id) });
    }
  } catch (error) {
    console.error('Error approving poem:', error);
    throw new Error('Error approving poem');
  }
}

// Function to reject a pending poem
export async function rejectPoem(id) {
  const db = await connectToDatabase();
  try {
    await db.collection('pending_poems').deleteOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error('Error rejecting poem:', error);
    throw new Error('Error rejecting poem');
  }
}

// Function to get all approved poems
export async function getApprovedPoems() {
  const db = await connectToDatabase();
  const poems = await db.collection('approved_poems').find().toArray();
  return poems.map(convertPoem); // Convert ObjectId to string
}

// Function to like a poem
export async function likePoem(id) {
  const db = await connectToDatabase();
  try {
    await db.collection('approved_poems').updateOne(
      { _id: new ObjectId(id) },
      { $inc: { likes: 1 } }
    );
  } catch (error) {
    console.error('Error liking poem:', error);
    throw new Error('Error liking poem');
  }
}

// Function to add a comment to a poem
export async function addComment(id, comment) {
  const db = await connectToDatabase();
  try {
    await db.collection('approved_poems').updateOne(
      { _id: new ObjectId(id) },
      { $push: { comments: comment } }
    );
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Error adding comment');
  }
}

// Function to add a newsletter subscriber
export async function addNewsletterSubscriber(email) {
  const db = await connectToDatabase();
  try {
    await db.collection('newsletter_subscribers').insertOne({ email, subscribedAt: new Date() });
  } catch (error) {
    console.error('Error adding subscriber:', error);
    throw new Error('Error adding subscriber');
  }
}
