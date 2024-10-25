import Header from '../components/Header'

export default function SelectRole() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-2xl text-center text-orange-500 font-bold mb-12">
          Select Your Role
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RoleCard
            title="Recruiter"
            icon="🏢"
            description="Rhoncus morbi et augue nec, in id ullamcorper at sit."
          />
          <RoleCard
            title="Company"
            icon="📅"
            description="Rhoncus morbi et augue nec, in id ullamcorper at sit."
          />
          <RoleCard
            title="Developer"
            icon="<>"
            description="Rhoncus morbi et augue nec, in id ullamcorper at sit."
          />
        </div>
      </div>
    </main>
  )
}

function RoleCard({ 
  title, 
  icon, 
  description 
}: { 
  title: string
  icon: string
  description: string 
}) {
  return (
    <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-center text-center">
        <span className="text-3xl mb-4">{icon}</span>
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">{description}</p>
        <label className="flex items-center space-x-2 text-sm text-gray-500">
          <input type="radio" name="role" className="text-orange-500" />
          <span>I am a {title}</span>
        </label>
      </div>
    </div>
  )
}