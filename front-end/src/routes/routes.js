import { lazy } from "react";

export const paths = {
    registration: "/",
    login: "/login",
    profiles: "/profiles",
    dashboard: "/dashboard",
    users: "/users",
    user: "/user"
}


export const routes = [
    {
        path: paths.registration,
        label: "/",
        exact: true,
        component: lazy(() => import("../pages/RegisterPage/RegisterPage") /* webpackChunkName: "registration-page" */),
        private: false,
        restricted: true,
    },
    {
        path: paths.login,
        label: "login",
        exact: false,
        component: lazy(() => import("../pages/LoginPage/LoginPage") /* webpackChunkName: "login-page" */),
        private: false,
        restricted: true,
    },
    {
        path: paths.profiles,
        label: "profiles",
        exact: false,
        component: lazy(() => import("../pages/ProfilesPage/ProfilesPage") /* webpackChunkName: "profiles-page" */),
        private: true,
        restricted: true,
    },
    {
        path: paths.dashboard,
        label: "dashboard",
        exact: false,
        component: lazy(() => import("../pages/DashboardPage/DashboardPage") /* webpackChunkName: "dashboard-page" */),
        private: true,
        restricted: true,
    },
    {
        path: paths.users,
        label: "users",
        exact: true,
        component: lazy(() => import("../pages/UsersPage/UsersPage") /* webpackChunkName: "users-page" */),
        private: true,
        restricted: true,
    },
    {
        path: paths.user,
        label: "user",
        exact: true,
        component: lazy(() => import("../pages/UserPage/UserPage") /* webpackChunkName: "user-page" */),
        private: true,
        restricted: true,
    }

]