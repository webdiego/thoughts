import { atom } from 'jotai'
import { ThoughtType } from '../types/dashboard'
export const toggleDrawerAtom = atom(false)
export const thoughtsAtom = atom<ThoughtType[] | []>([])
