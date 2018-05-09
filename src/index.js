// This will fail
import('./chunk1' /* webpackChunkName: "early" */)

console.log('This is index')

export default {
  lazy() {
    // This will succeed
    import('./chunk2', /* webpackChunkName: "lazy" */)
  }
}
