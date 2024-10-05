import Navigation from '../../components/Navigation'
import SubmissionForm from '../../components/SubmissionCard'

export default function SubmitPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-serif mb-4 text-indigo-800">Submit Your Poem</h1>
        <Navigation />
      </header>
      <main>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Share Your Poetry</h2>
          <p className="mb-4">
            We welcome submissions from poets of all backgrounds and experience levels. Please use the form below to submit your poem for consideration.
          </p>
          <SubmissionForm />
        </div>
      </main>
    </div>
  )
}