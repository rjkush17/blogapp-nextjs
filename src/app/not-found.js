"use client"
import Image from "next/image";
import notFound from "/public/page404.jpg"
import { useRouter } from 'next/navigation'


function NotFoundPage() {
  const router = useRouter()

  return (
    <main>
      <div className="w-11/12 mx-auto mt-24">
        <Image
          src={notFound}
          alt="Website Logo"
          width={3200}
          height={3200}
          priority={true}
          className="w-7/12 h-auto mx-auto"
        />
      </div>
      <div className="w-fit mx-auto">
        <button
          className="button bg-red-400 text-white" onClick={() => router.push('/')}>
          Go Home
        </button>
      </div>
    </main>
  );
}

export default NotFoundPage;
