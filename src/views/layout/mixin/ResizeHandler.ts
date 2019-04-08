import { Component, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { DeviceType, SlidebarState } from '@/interface/storeIF'
import MyVue from '@/MyVue'
const WIDTH = 992 // refer to Bootstrap's responsive design

@Component
export default class ResizeHandlerMixin extends MyVue {
  @Getter readonly device!: DeviceType
  @Getter readonly sidebar!: SlidebarState
  @Action readonly CloseSideBar!: Function
  @Action readonly ToggleDevice!: Function

  @Watch('$route')
  private OnRouteChange() {
    if (this.device === DeviceType.Mobile && this.sidebar.opened) {
      this.CloseSideBar(false)
    }
  }

  private beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }

  private mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      this.ToggleDevice(DeviceType.Mobile)
      this.CloseSideBar(true)
    }
  }

  private isMobile() {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      this.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop)
      if (isMobile) {
        this.CloseSideBar(true)
      }
    }
  }
}
