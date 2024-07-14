'use client'
import { useRouter } from 'next/navigation'

export default function UserButton({ id }) {
    const router = useRouter()

    function handleClick() {
        router.push(`/users/${id}`)
    }

    return (
        <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            View
        </button>
    )
}