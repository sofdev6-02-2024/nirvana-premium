import Header from './components/Header'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-orange-500 mb-4">
            Your next great adventure starts here!
          </h1>
          <p className="text-gray-600">
            Let us guide you to your next challenge. We analyze your CV and give you the tools to reach your career goals.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <StatCard title="Jobs" count="18K" icon="🏢" />
          <StatCard title="Developers" count="18K" icon="<>" />
          <StatCard title="Companies & Recruiters" count="10K" icon="📅" />
        </div>
      </div>
    </main>
  )
}

function StatCard({ title, count, icon }: { title: string; count: string; icon: string }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col items-center text-center">
        <span className="text-3xl mb-4">{icon}</span>
        <span className="text-2xl font-bold text-gray-900">{count}</span>
        <h3 className="text-gray-600">{title}</h3>
      </div>
    </div>
  )
}