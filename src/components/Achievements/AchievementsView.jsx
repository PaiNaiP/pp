import React from 'react'
import { AchievementsCards } from './AchievementsCards'

export const AchievementsView = ({achievements}) => {
  return (
    achievements.map((achievement)=>(
        <AchievementsCards key={achievements.id} achievements={achievement}/>
    ))
  )
}
