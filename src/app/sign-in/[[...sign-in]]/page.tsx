import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
        <div className='flex justufy-center items-center h-screen'>
            <SignIn />
        </div>
    )
}
