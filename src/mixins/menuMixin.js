export default {
  methods: {
    toggleHamberger() {
      const menuListSP = document.getElementById('-menuListSP')
      if (menuListSP.classList.contains('on')) {
        menuListSP.classList.remove('on')
      } else {
        menuListSP.classList.add('on')
      }
    }
  }
}
