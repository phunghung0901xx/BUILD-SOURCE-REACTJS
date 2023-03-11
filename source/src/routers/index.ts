// import { lazy, memo, Suspense } from 'react'
// import { BrowserRouter, useRoutes } from 'react-router-dom'
// import LoadingFallback from '@components/LoadingFallback'
// import PrivateRouter from '@components/PrivateRouter'
// import MobileLayout from '@components/MobileLayout'
// import { useMobile } from '@hooks/useResponsiv

// const LoginPage = lazy(() => import('@pages/LoginPage'))
// /**
//  * Router for Web view
//  * @returns routes config
//  */
// const PcRoutes = () => {
//     const routes = useRoutes([
//         {
//             path: '/',
//             element: <PrivateRouter />,
//       children: PRIVATE_ROUTERS
//         },
//         ...PUBLIC_ROUTERS,
//         {
//             path: '/login',
//             element: <LoginPage />
//         },
//         {
//             path: '*',
//             element: <div></div>
//         }
//     ])

//     return routes
// }

// /**
//  * Router for Mobile view
//  * @returns routes config
//  */
// const MobileRoutes = () => {
//     const routes = useRoutes([
//         {
//             path: '/',
//             element: <MobileLayout />,
//       children: [...PRIVATE_ROUTERS, ...PUBLIC_ROUTERS, ...MOBILE_ROUTERS]
//         },

//         {
//             path: '/login',
//             element: <LoginPage />
//         },
//         {
//             path: '*',
//             element: <div></div>
//         }
//     ])

//     return routes
// }

// const ApplicationRouters = () => {
//     const isMobile = useMobile()

//     return (
//         <BrowserRouter>
//         <Suspense fallback= {< LoadingFallback fullscreen />}> { isMobile?<MobileRoutes /> : <PcRoutes />}</Suspense >
//             </BrowserRouter>
//   )
// }

// // Prevent re-render router objecsts
// export default memo(ApplicationRouters)
