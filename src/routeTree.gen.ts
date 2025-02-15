/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LayoutImport } from './routes/_layout'
import { Route as LayoutIndexImport } from './routes/_layout/index'
import { Route as LayoutUserImport } from './routes/_layout/user'
import { Route as LayoutSignupImport } from './routes/_layout/signup'
import { Route as LayoutPostsImport } from './routes/_layout/posts'
import { Route as LayoutLoginImport } from './routes/_layout/login'
import { Route as LayoutHomeImport } from './routes/_layout/home'
import { Route as LayoutAboutImport } from './routes/_layout/about'
import { Route as LayoutPostPostIdImport } from './routes/_layout/post.$postId'

// Create/Update Routes

const LayoutRoute = LayoutImport.update({
  id: '/_layout',
  getParentRoute: () => rootRoute,
} as any)

const LayoutIndexRoute = LayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutUserRoute = LayoutUserImport.update({
  id: '/user',
  path: '/user',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutSignupRoute = LayoutSignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutPostsRoute = LayoutPostsImport.update({
  id: '/posts',
  path: '/posts',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutLoginRoute = LayoutLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutHomeRoute = LayoutHomeImport.update({
  id: '/home',
  path: '/home',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutAboutRoute = LayoutAboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => LayoutRoute,
} as any)

const LayoutPostPostIdRoute = LayoutPostPostIdImport.update({
  id: '/post/$postId',
  path: '/post/$postId',
  getParentRoute: () => LayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_layout': {
      id: '/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/_layout/about': {
      id: '/_layout/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof LayoutAboutImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/home': {
      id: '/_layout/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof LayoutHomeImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/login': {
      id: '/_layout/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LayoutLoginImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/posts': {
      id: '/_layout/posts'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof LayoutPostsImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/signup': {
      id: '/_layout/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof LayoutSignupImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/user': {
      id: '/_layout/user'
      path: '/user'
      fullPath: '/user'
      preLoaderRoute: typeof LayoutUserImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutIndexImport
      parentRoute: typeof LayoutImport
    }
    '/_layout/post/$postId': {
      id: '/_layout/post/$postId'
      path: '/post/$postId'
      fullPath: '/post/$postId'
      preLoaderRoute: typeof LayoutPostPostIdImport
      parentRoute: typeof LayoutImport
    }
  }
}

// Create and export the route tree

interface LayoutRouteChildren {
  LayoutAboutRoute: typeof LayoutAboutRoute
  LayoutHomeRoute: typeof LayoutHomeRoute
  LayoutLoginRoute: typeof LayoutLoginRoute
  LayoutPostsRoute: typeof LayoutPostsRoute
  LayoutSignupRoute: typeof LayoutSignupRoute
  LayoutUserRoute: typeof LayoutUserRoute
  LayoutIndexRoute: typeof LayoutIndexRoute
  LayoutPostPostIdRoute: typeof LayoutPostPostIdRoute
}

const LayoutRouteChildren: LayoutRouteChildren = {
  LayoutAboutRoute: LayoutAboutRoute,
  LayoutHomeRoute: LayoutHomeRoute,
  LayoutLoginRoute: LayoutLoginRoute,
  LayoutPostsRoute: LayoutPostsRoute,
  LayoutSignupRoute: LayoutSignupRoute,
  LayoutUserRoute: LayoutUserRoute,
  LayoutIndexRoute: LayoutIndexRoute,
  LayoutPostPostIdRoute: LayoutPostPostIdRoute,
}

const LayoutRouteWithChildren =
  LayoutRoute._addFileChildren(LayoutRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof LayoutRouteWithChildren
  '/about': typeof LayoutAboutRoute
  '/home': typeof LayoutHomeRoute
  '/login': typeof LayoutLoginRoute
  '/posts': typeof LayoutPostsRoute
  '/signup': typeof LayoutSignupRoute
  '/user': typeof LayoutUserRoute
  '/': typeof LayoutIndexRoute
  '/post/$postId': typeof LayoutPostPostIdRoute
}

export interface FileRoutesByTo {
  '/about': typeof LayoutAboutRoute
  '/home': typeof LayoutHomeRoute
  '/login': typeof LayoutLoginRoute
  '/posts': typeof LayoutPostsRoute
  '/signup': typeof LayoutSignupRoute
  '/user': typeof LayoutUserRoute
  '/': typeof LayoutIndexRoute
  '/post/$postId': typeof LayoutPostPostIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_layout': typeof LayoutRouteWithChildren
  '/_layout/about': typeof LayoutAboutRoute
  '/_layout/home': typeof LayoutHomeRoute
  '/_layout/login': typeof LayoutLoginRoute
  '/_layout/posts': typeof LayoutPostsRoute
  '/_layout/signup': typeof LayoutSignupRoute
  '/_layout/user': typeof LayoutUserRoute
  '/_layout/': typeof LayoutIndexRoute
  '/_layout/post/$postId': typeof LayoutPostPostIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/about'
    | '/home'
    | '/login'
    | '/posts'
    | '/signup'
    | '/user'
    | '/'
    | '/post/$postId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/about'
    | '/home'
    | '/login'
    | '/posts'
    | '/signup'
    | '/user'
    | '/'
    | '/post/$postId'
  id:
    | '__root__'
    | '/_layout'
    | '/_layout/about'
    | '/_layout/home'
    | '/_layout/login'
    | '/_layout/posts'
    | '/_layout/signup'
    | '/_layout/user'
    | '/_layout/'
    | '/_layout/post/$postId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_layout"
      ]
    },
    "/_layout": {
      "filePath": "_layout.tsx",
      "children": [
        "/_layout/about",
        "/_layout/home",
        "/_layout/login",
        "/_layout/posts",
        "/_layout/signup",
        "/_layout/user",
        "/_layout/",
        "/_layout/post/$postId"
      ]
    },
    "/_layout/about": {
      "filePath": "_layout/about.tsx",
      "parent": "/_layout"
    },
    "/_layout/home": {
      "filePath": "_layout/home.tsx",
      "parent": "/_layout"
    },
    "/_layout/login": {
      "filePath": "_layout/login.tsx",
      "parent": "/_layout"
    },
    "/_layout/posts": {
      "filePath": "_layout/posts.tsx",
      "parent": "/_layout"
    },
    "/_layout/signup": {
      "filePath": "_layout/signup.tsx",
      "parent": "/_layout"
    },
    "/_layout/user": {
      "filePath": "_layout/user.tsx",
      "parent": "/_layout"
    },
    "/_layout/": {
      "filePath": "_layout/index.tsx",
      "parent": "/_layout"
    },
    "/_layout/post/$postId": {
      "filePath": "_layout/post.$postId.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
