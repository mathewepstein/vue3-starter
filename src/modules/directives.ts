import { type AppModule } from '~/types'

// Setup directives
export const install: AppModule = ({ isClient, initialState, app }) => {
  const directivesMap = Object.entries(
    import.meta.glob(['../directives/*.ts', '../directives/*.js'])
  ).map(([path, directive]) => [
    path.match(/([\w-]*)\.(ts|js)$/)?.[1],
    directive,
  ])

  directivesMap.forEach(async ([name, directive]) => {
    if (!directive) return

    const dir = await directive()
    app.directive(name as string, dir.default)
  })
}
