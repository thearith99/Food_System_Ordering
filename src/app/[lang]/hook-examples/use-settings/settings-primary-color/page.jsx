'use client'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

const SettingsPrimaryColor = () => {
  // Hooks
  const { settings, updateSettings } = useSettings()

  const handleChange = (field, value) => {
    updateSettings({
      [field]: value
    })
  }

  return (
    <main className='p-4 flex-grow'>
      <div className='flex flex-col gap-4'>
        <p>Change the primary color from below input</p>
        <input
          type='color'
          value={settings.primaryColor}
          onChange={event => handleChange('primaryColor', event.target.value)}
        />
        <p>Primary Color: {settings.primaryColor}</p>
      </div>
    </main>
  )
}

export default SettingsPrimaryColor
