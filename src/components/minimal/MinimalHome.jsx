import '../../minimal.css'
import MinimalNav from './MinimalNav'
import MinimalHero from './MinimalHero'
import MinimalExperience from './MinimalExperience'
import MinimalWork from './MinimalWork'
import MinimalContact from './MinimalContact'

export default function MinimalHome() {
  return (
    <div className="minimal-page">
      <MinimalNav />
      <main>
        <MinimalHero />
        <MinimalExperience />
        <MinimalWork />
        <MinimalContact />
      </main>
    </div>
  )
}
