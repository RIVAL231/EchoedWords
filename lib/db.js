import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGO_URI;
let client;

if (!uri) {
  throw new Error("Please define the MONGO_URI environment variable inside .env");
}

export async function connectToDatabase() {
    if (!client) {
      client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      try {
        await client.connect();
        console.log('Connected to MongoDB');
  
        const db = client.db('poetry_blog');
  
        // Create collections if they don't exist
        await db.createCollection('pending_poems').catch(err => {
          if (err.code !== 48) {
            console.error('Error creating pending_poems collection:', err);
          }
        });
        await db.createCollection('approved_poems').catch(err => {
          if (err.code !== 48) {
            console.error('Error creating approved_poems collection:', err);
          }
        });
        await db.createCollection('newsletter_subscribers').catch(err => {
          if (err.code !== 48) {
            console.error('Error creating newsletter_subscribers collection:', err);
          }
        });
  
      } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw new Error('MongoDB connection failed');
      }
    }
    return client.db('poetry_blog');
}

// Helper function to convert MongoDB documents
const convertPoem = (poem) => ({
  ...poem,
  _id: poem._id.toString(), // Convert ObjectId to string
});

export async function addPendingPoem(poem) {
  const db = await connectToDatabase();
  const result = await db.collection('pending_poems').insertOne(poem);
  return result;
}

export async function getPendingPoems() {
  const db = await connectToDatabase();
  const poems = await db.collection('pending_poems').find().toArray();
  return poems.map(convertPoem); // Convert ObjectId to string
}

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
  }
}

export async function rejectPoem(id) {
  const db = await connectToDatabase();
  await db.collection('pending_poems').deleteOne({ _id: new ObjectId(id) });
}

export async function getApprovedPoems() {
  const db = await connectToDatabase();
  const poems = await db.collection('approved_poems').find().toArray();
  return poems.map(convertPoem); // Convert ObjectId to string
}

export async function likePoem(id) {
  const db = await connectToDatabase();
  await db.collection('approved_poems').updateOne(
    { _id: new ObjectId(id) },
    { $inc: { likes: 1 } }
  );
}

export async function addComment(id, comment) {
  const db = await connectToDatabase();
  await db.collection('approved_poems').updateOne(
    { _id: new ObjectId(id) },
    { $push: { comments: comment } }
  );
}

export async function addNewsletterSubscriber(email) {
  const db = await connectToDatabase();
  await db.collection('newsletter_subscribers').insertOne({ email, subscribedAt: new Date() });
}
