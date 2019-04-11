import { shallowMount, mount, createLocalVue } from "@vue/test-utils"
import App from "@/App.vue"
import router from "vue-router"
import LedgersRoute from "@/components/Ledgers.vue"
import routes from "@/routes.js"

const localVue = createLocalVue()
localVue.use(router)

describe("App", () => {
  it("renders a child component via routing", () => {
    const router = new router({ routes })
    const wrapper = mount(App, { localVue, router })

    router.push("/ledgers")

    expect(wrapper.find(LedgersRoute).exists()).toBe(true)
  })
})