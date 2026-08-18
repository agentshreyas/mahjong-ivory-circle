import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/qrredirect')({
  component: QRRedirectComponent,
})

function QRRedirectComponent() {
  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor
    if (/android/i.test(ua)) {
      window.location.href =
        'https://play.google.com/store/apps/details?id=com.mahjongcircle.app'
    } else if (/iPad|iPhone|iPod/.test(ua)) {
      window.location.href = 'https://apps.apple.com/app/id6790778933'
    } else {
      window.location.href = 'https://www.mahjongcircle.in/landing'
    }
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Redirecting...
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Taking you to the app store to download Mahjong Circle.
        </p>
      </div>
    </div>
  )
}
