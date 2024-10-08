
# Echoed Words - Poetry Blog

## Overview
Welcome to **Echoed Words**, a personal poetry blog created by **Sankalp Sharma**, that allows users to showcase their poetic creations alongside mine. The platform emphasizes community contributions while maintaining a personal touch.


## Features
- **Featured Poems Section**: A section showcasing selected or popular poems, both from the user and the community.
- **Community Contributions**: Users can submit their poetry, which goes through a moderation process before being published.
- **User Profiles**: Each contributor has a profile showcasing their submitted poems.
- **Commenting System**: Readers can leave comments on both featured and community poems, encouraging interaction.
- **Voting System**: Users can like or upvote poems, highlighting the most appreciated works.
- **Poem Viewing**: All users can view poems, leave a like, and drop comments on individual pieces.
- **Poetry Submissions**: Users can contribute their own poems through a submission form, subject to moderation before being featured.
- **Responsive Design**: The site is optimized for both desktop and mobile viewing.


## Tech Stack
- **Front-End**: 
  - Next.js
- **Back-End**: 
  - Next.js for server-side rendering and routing.
  - MongoDB for storing user data and poems.

## Installation

### Prerequisites
- Node.js
- npm or yarn

### Steps to Run Locally

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/RIVAL231/poetry-blog.git
   cd poetry-blog
   ```

2. **Install Dependencies**  
   Using npm:
   ```bash
   npm install
   ```
   or using yarn:
   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**  
   Create a `.env.local` file and add the following environment variables:
   ```
   MONGODB_URI=your-mongodb-uri
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the Development Server**  
   Using npm:
   ```bash
   npm run dev
   ```
   or using yarn:
   ```bash
   yarn dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

5. **Build and Run for Production**  
   To build the app for production and start the server:
   ```bash
   npm run build
   npm start
   ```
   or with yarn:
   ```bash
   yarn build
   yarn start
   ```

6. **Run Tests (Optional)**  
   If you have tests set up, you can run them using:
   ```bash
   npm test
   ```
   or:
   ```bash
   yarn test
   ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes you'd like to propose.


