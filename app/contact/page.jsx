'use-client'

import Navigation from '../../components/Navigation'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-12 text-center animate-fade-in">
        <h1 className="text-5xl font-serif mb-4 text-indigo-800">Contact</h1>
        <Navigation />
      </header>
      <main className="animate-fade-in">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Get in Touch</h2>
          <p className="mb-4 text-gray-700">
            We'd love to hear from you! Whether you have a question, want to submit a poem, or just want to say hello, feel free to reach out using the information below.
          </p>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Contact Information</h3>
            <p className="text-gray-700">Email: <a href="mailto:sankalpsharma250@gmail.com" className="text-indigo-600 hover:text-indigo-800 transition-colors">sankalpsharma250@gmail.com</a></p>
            <p className="text-gray-700">Phone: +91 9616040112</p>
          </div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Social Media</h3>
            <p className="text-gray-700">
              Follow us on social media for the latest updates, featured poems, and poetry prompts:
            </p>
            <ul className="list-disc list-inside mt-2">
              {/* <li>Twitter: <a href="https://twitter.com/sankalppoetry" className="text-indigo-600 hover:text-indigo-800 transition-colors">@sankalppoetry</a></li> */}
              <li>Instagram: <a href="https://instagram.com/sankalp_0403" className="text-indigo-600 hover:text-indigo-800 transition-colors">@sankalp_0403</a></li>
              {/* <li>Facebook: <a href="https://facebook.com/sankalpspoetrymusings" className="text-indigo-600 hover:text-indigo-800 transition-colors">Sankalp's Poetic Musings</a></li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-indigo-700">Feedback</h3>
            <p className="text-gray-700">
              We value your feedback and suggestions. If you have any ideas on how we can improve our blog or if you'd like to collaborate, please don't hesitate to reach out.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}