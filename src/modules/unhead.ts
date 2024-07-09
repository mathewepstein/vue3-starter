import { createHead } from '@unhead/vue'
import { type AppModule } from '~/types'

export const install: AppModule = ({ app }) => {
  const head = createHead()
  app.use(head)
}
