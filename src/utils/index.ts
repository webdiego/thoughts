import { ThoughtType } from '@/types/dashboard'

export const sortByNewest = function (thoughts: ThoughtType[]) {
  return thoughts?.sort((a: ThoughtType, b: ThoughtType) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
}

export const sortByOldest = function (thoughts: ThoughtType[]) {
  return thoughts?.sort((a: ThoughtType, b: ThoughtType) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })
}
