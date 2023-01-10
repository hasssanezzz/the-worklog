import Conatiner from '../components/containers/Container'
import SettingsList from '../components/settings/SettingsList'

export default function Settings() {
  return (
    <Conatiner className="pb-10">
      <h2 className="text-4xl text-center font-bold my-5">Settings</h2>

      <SettingsList />
    </Conatiner>
  )
}
