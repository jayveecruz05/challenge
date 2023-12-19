import { useState } from 'react'
import './App.scss'
import Challenge1 from '@/components/Challenge1'
import Challenge2 from '@/components/Challenge2'

type Tab = 'challenge-1' | 'challenge-2'

const App = () => {
  const [tab, setTab] = useState<Tab>('challenge-1')

  const handelTabChange = (tab: Tab) => { setTab(tab) }

  const isActiveTab = (tabName: string): string => { return (tabName === tab) ? ' active' : '' }
  
  return (
    <div id="app">
      <div id="tab-wrapper">
        <span className={`tab${isActiveTab('challenge-1')}`} onClick={() => handelTabChange('challenge-1')}>Challenge 1</span>
        <span className={`tab${isActiveTab('challenge-2')}`} onClick={() => handelTabChange('challenge-2')}>Challenge 2</span>
      </div>
      {(tab === 'challenge-1') ? <Challenge1/> : <Challenge2/>}
    </div>
  )
}

export default App
