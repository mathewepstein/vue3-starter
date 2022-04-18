import NProgress from 'nprogress'

export const install = ({ router }) => {
  NProgress.configure({ parent: '#app' })
  router.beforeEach(() => {
    NProgress.start()
  })
  router.afterEach(() => {
    NProgress.done()
  })
}
