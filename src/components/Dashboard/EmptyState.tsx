import { useAtom } from 'jotai'
import { toggleDrawerAtom } from '../../jotai/atom'

export default function EmptyState() {
  const [toggleDrawer, setToggleDrawer] = useAtom(toggleDrawerAtom)

  return (
    <div className="h-screen flex flex-col items-center justify-start mt-28 px-6">
      <h1 className="text-xl font-bold tracking-tight text-gray-900 text-center">
        Don&apos;t share your thoughts with the world.
      </h1>
      <p className="mt-2 text-sm text-gray-600 text-center">
        THOUGHTS is a private journaling app that allows you to write down your
        thoughts and feelings.
      </p>
      <button
        onClick={() => setToggleDrawer(true)}
        type="button"
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black/60 focus:ring-offset-2 max-w-2xl mx-auto mt-10 "
      >
        <svg
          className="mx-auto h-8 w-8 text-gray-400"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#000000"
            d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8s-8-3.589-8-8s3.589-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2z"
          />
        </svg>
        <span className="mt-2 block text-sm font-semibold text-gray-900">
          Add your first thought
        </span>
      </button>
    </div>
  )
}
