import { useState } from 'react'
import { Session } from 'next-auth'
import Modal from '@components/Shared/Modal'
import axios from 'axios'
export default function Profile({ session }: { session: Session }) {
  const [modalOpen, setModalOpen] = useState(false)

  const handleDeleteAccount = async () => {
    await axios
      .delete('/api/deleteAccount')
      .then((res) => {
        window.location.href = '/'
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  return (
    <>
      <Modal
        title="Delete your account"
        description="Are you sure you want to delete your account? This action cannot be undone."
        btnActionText="delete"
        handleBtnAction={handleDeleteAccount}
        {...{ modalOpen, setModalOpen }}
      />
      <div className="max-w-2xl mx-auto py-28 px-6">
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Your personal information is never shared with anyone.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="full-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="full-name"
                    id="full-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 bg-slate-200 cursor-not-allowed"
                    placeholder={session.user?.name ?? ''}
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 bg-slate-200 cursor-not-allowed"
                    placeholder={session.user?.email ?? ''}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Delete account
          </button>
        </div>
      </div>
    </>
  )
}
